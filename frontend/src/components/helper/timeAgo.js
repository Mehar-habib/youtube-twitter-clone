export function timeAgo(createdAt) {
  const now = new Date();
  const difference = now - new Date(createdAt);

  const seconds = difference / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30; // Approximate months as 30 days
  const years = days / 365;

  if (seconds < 60) {
    return `${Math.round(seconds)} seconds ago`;
  } else if (minutes < 60) {
    return `${Math.round(minutes)} minutes ago`;
  } else if (hours < 24) {
    return `${Math.round(hours)} hours ago`;
  } else if (days < 7) {
    return `${Math.round(days)} days ago`;
  } else if (weeks < 4) {
    // Consider weeks if they are less than 4 (approximately one month)
    return `${Math.round(weeks)} weeks ago`;
  } else if (months < 12) {
    // Use months if they are less than 12 (approximately one year)
    return `${Math.round(months)} months ago`;
  } else {
    return `${Math.round(years)} years ago`;
  }
}
