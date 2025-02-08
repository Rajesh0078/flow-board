export const addMember = async () => {
  try {
    const res = await fetch("https://randomuser.me/api");
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// Uitility functions

export const getRandomColor = () => {
  const colors = ["#3498DB", "#8E44AD", "#1ABC9C", "#E74C3C", "#9B59B6"];
  return colors[Math.floor(Math.random() * colors.length)];
};
