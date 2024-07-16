export async function loadProjects () {
    const projectsContainer = document.getElementById('projectscontainer');
    if (projectsContainer) {
        projectsContainer.innerHTML = '';
        try {
            const apiurl = 'http://localhost:3000'
            const res = await fetch(`${apiurl}/api/projects`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            if (!res.ok) {
                console.error("Error fetching projects");
                return;
            }

            const projects = await res.json();
            projects.forEach(project => {
                const newProject = document.createElement('div');
                newProject.className = 'workspace';
                newProject.innerHTML = `
                    <h2 class="wk-name" id="projectName">${project.name}</h2                                                       <a></a><a href="./Views/AppViews/Projects.html?projectId=${project.id}" class="project-link"><i class='bx bxs-chevron-right i-wk'></i></a>
                `;
                projectsContainer.appendChild(newProject);

                 // Agregar event listener al nuevo enlace
                        const newProjectLink = newProject.querySelector('.project-link');
                        if (newProjectLink) {
                            newProjectLink.addEventListener('click', (e) => {
                                localStorage.setItem('currentProjectId', project.id);
                                localStorage.setItem('currentProjectName', project.name);
                            });
                        }
            });

        } catch (err) {
            console.error("Error fetching projects: ", err.message);
        }
    }

};

