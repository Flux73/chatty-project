export default (timestamp) => {
  const currentTime = new Date();
  const timeDifference = currentTime - new Date(timestamp);

  const sec = Math.floor(timeDifference / 1000);
  const min = Math.floor(timeDifference / (60 * 1000));
  const hour = Math.floor(timeDifference / (1000 * 60 * 60));
  const day = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (day > 0) return `${day}d ago`;
  if (hour > 0) return `${hour}h ago`;
  if (min > 0) return `${min}min ago`;
  if (sec > 0) return "now";
  return "now";
};
