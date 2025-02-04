import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Field, Form } from 'formik';

const TaskForm = ({ refreshTasks }) => {
  return (
    <Formik
      initialValues={{ title: '' }}
      onSubmit={async (values, { resetForm }) => {
        await axios.post('http://127.0.0.1:5000/tasks', {
          title: values.title,
        });
        refreshTasks();
        resetForm();
      }}
    >
      <Form>
        <Field name="title" placeholder="New Task" required />
        <button type="submit">Add Task</button>
      </Form>
    </Formik>
  );
};

const TaskList = ({ tasks, refreshTasks }) => {
  const handleToggleComplete = async (task) => {
    await axios.put(`http://127.0.0.1:5000/tasks/${task.id}`, {
      completed: !task.completed,
    });
    refreshTasks();
  };

  const handleDelete = async (taskId) => {
    await axios.delete(`http://127.0.0.1:5000/tasks/${taskId}`);
    refreshTasks();
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title} - {task.completed ? 'Completed' : 'Pending'}
          <button onClick={() => handleToggleComplete(task)}>Toggle Complete</button>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

function App() {
  const [tasks, setTasks] = useState([]);

  const refreshTasks = async () => {
    const result = await axios.get('http://127.0.0.1:5000/tasks');
    setTasks(result.data);
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm refreshTasks={refreshTasks} />
      <TaskList tasks={tasks} refreshTasks={refreshTasks} />
    </div>
  );
}

export default App;
