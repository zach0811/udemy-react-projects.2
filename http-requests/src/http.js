export const fetchAvailablePlace = async () => {
  const response = await fetch("http://localhost:3000/places");
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  return data.places;
};

export const fetchUserPlace = async () => {
  const response = await fetch("http://localhost:3000/user-places");
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Something went wrong!");
  }

  return data.places;
};

export const updateUserPlaces = async (places) => {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error("Could not update user places!");
  }

  return data.message;
};
