const API_BASE_URL = "https://server-e9wczkdbb-takudzwa-mutamburigwas-projects.vercel.app";

// Function to fetch tasks
export async function fetchTasks() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks`);
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
}

// Function to add a task
export async function addTask(task) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    return await response.json();
  } catch (error) {
    console.error("Error adding task:", error);
  }
}
