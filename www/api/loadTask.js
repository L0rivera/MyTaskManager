export async function loadTask() {
    const sectionIds = JSON.parse(localStorage.getItem('sections'));
    const projectId = localStorage.getItem('currentProjectId');
    if (!projectId || !sectionIds) {
        console.error('No se encontró el ID del proyecto o las secciones en localStorage');
        return;
    }
    const URI = 'http://localhost:3000';

    try {
        for (const sectionId of sectionIds) {
            const res = await fetch(`${URI}/api/tasks?projectId=${projectId}&sectionId=${sectionId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!res.ok) {
                throw new Error(`Error al obtener las tareas: ${res.statusText}`);
            }

            const tasks = await res.json();

            const sectionContainer = document.querySelector(`#section-${sectionId}.main-section`);

            if (!sectionContainer) {
                throw new Error(`No se encontró el contenedor de tareas para la sección con ID ${sectionId}`);
            }

            tasks.forEach(task => {
                const newTask = document.createElement('div');
                newTask.className = 'task';
                newTask.innerHTML = `
                    <div class="taskT">
                        <h3>${task.title}</h3>
                    </div>
                    <div class="importance"></div>
                `;

                sectionContainer.appendChild(newTask);
             
            });
        }
    } catch (error) {
        console.error('Error al cargar las tareas:', error);
    }
}
