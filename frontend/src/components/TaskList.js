import { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTask } from '../api';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            setTasks(tasks.filter(task => task.id !== id));  
        } catch (error) {
            alert("Failed to delete the task.");
        }
    };

    const handleToggleComplete = async (task) => {
        const updatedTask = { ...task, completed: !task.completed };
        try {
            await updateTask(task.id, updatedTask);
            setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));  
        } catch (error) {
            alert("Failed to update the task.");
        }
    };

    return (
        <div>
            {tasks.map(task => (
                <div key={task.id}>
                    <span>{task.title}</span>
                    <button onClick={() => handleToggleComplete(task)}>
                        {task.completed ? "Undo" : "Complete"}
                    </button>
                    <button onClick={() => handleDelete(task.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default TaskList;

