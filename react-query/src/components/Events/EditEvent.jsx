import {
  Link,
  useNavigate,
  useParams,
  redirect,
  useSubmit,
  useNavigation,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchEvent, updateEvent, queryClient } from "../../util/http.js";
// import LoadingIndicator from "../UI/LoadingIndicator.jsx";

import Modal from "../UI/Modal.jsx";
import EventForm from "./EventForm.jsx";
import ErrorBlock from "../UI/ErrorBlock.jsx";

export default function EditEvent() {
  const { state } = useNavigation;
  const navigate = useNavigate();
  const { id } = useParams();
  const submit = useSubmit();

  const { data, isError, error } = useQuery({
    queryFn: ({ signal }) => fetchEvent({ signal, id: id }),
    queryKey: ["events", id],
    staleTime: 10000,
  });

  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     const newEvent = data.event;
  //     await queryClient.cancelQueries({ queryKey: ["events", id] });
  //     const previousEvent = queryClient.getQueryData(["events", id]);
  //     queryClient.setQueryData(["events", id], newEvent);

  //     return { previousEvent, newEvent };
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(["events", id], context.previousEvent);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries(["events", id]);
  //   },
  // });

  // function handleSubmit(formData) {
  //   mutate({
  //     id,
  //     event: formData,
  //   });
  //   navigate("../");
  // }

  function handleSubmit(formData) {
    submit(formData, { method: "PUT" });
  }

  function handleClose() {
    navigate("../");
  }

  let content;

  // if (isPending) {
  //   content = (
  //     <div className="center">
  //       <LoadingIndicator />
  //     </div>
  //   );
  // }

  if (isError) {
    content = (
      <>
        <ErrorBlock
          title="Failed to load event"
          message={error.info?.message || "Failed to load event"}
        />
        <div className="form-actions">
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === "submitting" ? (
          <p className="center">Saving...</p>
        ) : (
          <>
            {" "}
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

//using react router
export const loader = async ({ params }) => {
  return queryClient.fetchQuery({
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
    queryKey: ["events", params.id],
  });
};

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  await queryClient.invalidateQueries(["events"]);
  return redirect("../");
};
