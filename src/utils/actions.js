export const addMember = async () => {
  try {
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();
    return data.results;
  } catch (error) {
    alert(error.message);
    console.log(error);
  }
};

// Uitility functions

export const getRandomColor = () => {
  const colors = ["#3498DB", "#8E44AD", "#1ABC9C", "#E74C3C", "#9B59B6"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getDueDateLabel = (dueDate) => {
  const now = new Date();
  const due = new Date(dueDate);

  const diffTime = due.getTime() - now.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

  if (diffDays < 0) return "Overdue";
  if (diffDays === 0) return diffHours > 0 ? `In ${diffHours}h` : "Overdue";
  if (diffDays === 1) return "Tomorrow";

  return `In ${diffDays}d`;
};
