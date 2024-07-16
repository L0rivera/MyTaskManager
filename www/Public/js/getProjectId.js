  // GET THE PROJECT'S ID
   export function getProjectId() {
    const projectId = localStorage.getItem('currentProjectId');
    if (projectId) {
        console.log(`Project ID retrieved from localStorage: ${projectId}`);
        return projectId;
    } else {
        console.log('No Project ID found in localStorage.');
        return null;
    }
}

