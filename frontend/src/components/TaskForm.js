import { Formik, Form, Field } from 'formik';
import { addTask } from '../api';

const TaskForm = ({ refreshTasks }) => {
    return (
        <Formik
            initialValues={{ title: '' }}
            onSubmit={async (values, { resetForm }) => {
                try {
                    await addTask(values);  
                    refreshTasks();  
                    resetForm();  
                } catch (error) {
                    alert("Failed to add the task.");
                }
            }}
        >
            <Form>
                <Field name="title" placeholder="New Task" required />
                <button type="submit">Add Task</button>
            </Form>
        </Formik>
    );
};

export default TaskForm;
