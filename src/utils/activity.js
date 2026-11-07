export const saveActivity = (type, title, description) => {
  const activities =
    JSON.parse(localStorage.getItem("recentActivities")) || [];

  const newActivity = {
    id: Date.now(),
    type,
    title,
    description,
    date: new Date().toISOString()
  };

  const updatedActivities = [newActivity, ...activities].slice(0, 20);

  localStorage.setItem(
    "recentActivities",
    JSON.stringify(updatedActivities)
  );
};  