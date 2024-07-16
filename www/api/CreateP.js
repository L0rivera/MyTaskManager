import { loadProjects } from "./loadProjects.js";
import { loadSections } from "./loadSections.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadProjects();

  // Solo intenta cargar secciones en la vista de Projects.html
  const sectionsContainer = document.getElementById("taskstate");
  if (sectionsContainer) {
    const projectId = localStorage.getItem("currentProjectId");
    if (projectId) {
      await loadSections(projectId);
    }
  }

  const createPrjForm = document.getElementById("create-prj");
  if (createPrjForm) {
    createPrjForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const description = document.getElementById("description").value;

      try {
        const apiurl = "http://localhost:3000";
        const res = await fetch(`${apiurl}/api/project`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ name, description }),
        });

        if (!res.ok) {
          console.error("Error en la creación del proyecto");
          return;
        }

        const resJson = await res.json();
        const { project, sections } = resJson;

        if (project && sections) {
          const modal = document.getElementById("modal-container");
          const projectsContainer =
            document.getElementById("projectscontainer");

          if (projectsContainer) {
            const newProject = document.createElement("div");
            newProject.className = "workspace";
            newProject.innerHTML = `
                            <h2 class="wk-name" id="projectName">${project.name}</h2>
                            <a><i class='bx bxs-chevron-right i-wk'></i></a><a href="./Views/AppViews/Projects.html?projectId=${project.id}" class="project-link"><i class='bx bxs-chevron-right i-wk'></i></a>
                        `;
            projectsContainer.appendChild(newProject);

            if (modal) {
              modal.style.display = "none";
            }

            const newProjectLink = newProject.querySelector(".project-link");
            if (newProjectLink) {
              newProjectLink.addEventListener("click", () => {
                localStorage.setItem("currentProjectId", project.id);
                localStorage.setItem("currentProjectName", project.name);
              });
            }

            await loadProjects();
          } else {
            console.error(
              "El contenedor de proyectos no se encontró en el DOM"
            );
          }

          if (sectionsContainer) {
            sections.forEach((section) => {
              const newSection = document.createElement("section");
              newSection.className = "main-section";
              newSection.id = "section-contain";
              newSection.innerHTML = `
                                <div class="task-section">
                                    <h1>${section.name}</h1>
                                     <a href="./Task.html"><i class='bx bx-plus'></i></a>
                                    </div>
                                <div class="task" id="task-contain"></div>
                                `;
              sectionsContainer.appendChild(newSection);

              const addtask = newSection.querySelector("i");
              addtask.addEventListener("click", () => {
                localStorage.setItem("currentSectionId", section.id);
                localStorage.setItem("currentSectionName", section.name);
              });

              loadSections(project.id);
            });
          } else {
            console.error(
              "El contenedor de secciones no se encontró en el DOM"
            );
          }
        } else {
          console.error(
            "Error en la respuesta del servidor: datos de proyecto o secciones faltantes"
          );
        }
      } catch (err) {
        console.error("Error en la creación del proyecto: ", err.message);
      }
    });
  } else {
    console.error("Formulario de creación de proyectos no encontrado");
  }
});
