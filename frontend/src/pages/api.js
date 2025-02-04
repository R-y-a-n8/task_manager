const API_URL = "http://127.0.0.1:5000/tasks";

const handleApiError = (error) => {
    console.error("API Error:", error);
    alert("An error occurred, please try again.");
};

export const getTasks = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        handleApiError(error);
    }
};

export const addTask = async (task) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
        if (!response.ok) {
            throw new Error('Failed to add task');
        }
        const newTask = await response.json();
        return newTask;
    } catch (error) {
        handleApiError(error);
    }
};

export const updateTask = async (id, updatedTask) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
        });
        if (!response.ok) {
            throw new Error('Failed to update task');
        }
        const updated = await response.json();
        return updated;
    } catch (error) {
        handleApiError(error);
    }
};

export const deleteTask = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
        return { message: 'Task deleted successfully' };
    } catch (error) {
        handleApiError(error);
    }
};
