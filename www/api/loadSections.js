import { loadTask } from "./loadTask.js";

export async function loadSections() {
    
    const projectId = localStorage.getItem('currentProjectId');
    if (!projectId) {
        console.error('No se encontró el ID del proyecto en localStorage');
        return;
    }
    const sectionContainer = document.getElementById('taskstate');
    if (sectionContainer) {
        sectionContainer.innerHTML = "";
        const apiurl = 'http://localhost:3000';
        try {
            const res = await fetch(`${apiurl}/api/sections?projectId=${projectId}`, {
                method: 'GET',
                headers: {
                    "Content-type": "application/json"
                },
                credentials: 'include'
            });

            if(!res.ok) {
                console.error("Error fetching sections")
                return
            }

            const sections = await res.json();
            localStorage.setItem('sections', JSON.stringify(sections.map(section => section.id))); // Guardar IDs de secciones
            sections.forEach(section => {
                const newSection = document.createElement('section');
                newSection.className = 'main-section';
                newSection.id = `section-${section.id}`;
                newSection.innerHTML = `
                <div class="task-section">
                <h1>${section.name}</h1>
                <a href="./Task.html"><i class='bx bx-plus sectionid' data-id="${section.id}"></i></a>
                </div>
                
                `;
                sectionContainer.appendChild(newSection);
                
                const addtask = newSection.querySelector('.sectionid')
                if (addtask) {
                    addtask.addEventListener('click', (e) => {
                localStorage.setItem('currentSectionId', section.id);
                localStorage.setItem('currentSectionName', section.name);
                })
                }
            })

        } catch (err) {
            console.error("Error fetching: ", err.message);
        }
    }
    await loadTask();
}