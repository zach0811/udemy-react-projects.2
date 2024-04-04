import { Link, Outlet, useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import Header from "../Header.jsx";
import { deleteEvent, fetchEvent, queryClient } from "../../util/http.js";
import ErrorBlock from "../UI/ErrorBlock.jsx";
import { useState } from "react";
import Modal from "../UI/Modal.jsx";
export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isPending, error, isError } = useQuery({
    queryFn: ({ signal }) => fetchEvent({ signal, id: id }),
    queryKey: ["events", id],
    enabled: id !== undefined,
  });
  let content;
  if (isPending) {
    content = (
      <div id="event-details-content" className="center">
        <p>Fetching Event Details...</p>
      </div>
    );
  }

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      }),
        navigate("/events");
    },
  });

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  function handleDelete() {
    mutate({ id: id });
  }

  if (isError) {
    content = (
      <ErrorBlock
        id="event-details-content"
        className="center"
        message={error.info?.message || "Failed to Fetch Event Data"}
      >
        <p>Failed to Fetch Event Details</p>
      </ErrorBlock>
    );
  }

  if (data) {
    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${data.image}`} alt="" />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>
                {`${data.date} @ ${data.time}`}
              </time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are You Sure?</h2>
          <p>Do you really want to delete this event?</p>
          <div className="form-actions">
            {isPendingDeletion && <p>Deleting...</p>}
            {!isPendingDeletion && (
              <>
                <button onClick={handleStopDelete} className="button-text">
                  Cancel
                </button>
                <button onClick={handleDelete} className="button">
                  Delete
                </button>
              </>
            )}
          </div>
          {isErrorDeleting && (
            <ErrorBlock
              title={"Failed to Delete Event"}
              message={deleteError.info?.message || "Failed to Delete Event"}
            ></ErrorBlock>
          )}
        </Modal>
      )}

      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">{content}</article>
    </>
  );
}
