export const formatDate = date => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const dateObj = new Date(date);

  return dateObj.toLocaleDateString("en-US", options);
};
