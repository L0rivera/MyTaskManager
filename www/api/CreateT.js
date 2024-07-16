import { debounce } from "../Public/js/debounce.js";

document.addEventListener('DOMContentLoaded', () => {
    const taskTitle = document.getElementById('task-title');
    const taskDescription = document.getElementById('task-description');
    const saveTaskButton = document.getElementById('save-task');
    const updateTaskButton = document.getElementById('update-task');
    const URI = 'http://localhost:3000';

    // Notificaciones
    const showNotification = (message, isError = false) => {
        const notification = document.createElement('div');
        notification.className = `notification ${isError ? 'error' : 'success'}`;
        notification.innerText = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    };

    // Load task from localStorage
    if (localStorage.getItem('taskTitle')) {
        taskTitle.value = localStorage.getItem('taskTitle');
    }
    if (localStorage.getItem('taskDescription')) {
        taskDescription.value = localStorage.getItem('taskDescription');
    }

    // Save task to localStorage on input (debounced)
    const saveToLocalStorage = debounce(() => {
        localStorage.setItem('taskTitle', taskTitle.value);
        localStorage.setItem('taskDescription', taskDescription.value);
    }, 500);

    taskTitle.addEventListener('input', saveToLocalStorage);
    taskDescription.addEventListener('input', saveToLocalStorage);

    // Save task to database
    saveTaskButton.addEventListener('click', async () => {
        const title = localStorage.getItem('taskTitle');
        const description = localStorage.getItem('taskDescription');
        const sectionId = localStorage.getItem('currentSectionId');

        if (!title || !description) {
            showNotification('Title and description cannot be empty', true);
            return;
        }

        try {
            const res = await fetch(`${URI}/api/task`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title, description, sectionId })
            });

            if (!res.ok) {
                throw new Error('Failed to save task');
            }

            const newTask = await res.json();
            localStorage.setItem('currentTaskId', newTask.id);
            showNotification('Task saved successfully');
        } catch (error) {
            console.error('Error saving task:', error);
            showNotification('Error saving task', true);
        }
    });
});