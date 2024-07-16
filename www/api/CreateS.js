import { loadSections } from "./loadSections.js";
import { getProjectId } from "../Public/js/getProjectId.js";

document.getElementById("create-sect").addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name-s').value;
    const projectId = getProjectId();

    const apiurl = 'http://localhost:3000'
    const res = await fetch(`${apiurl}/api/section`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, projectId })
    })

    if(!res.ok) {
        console.log('Error fetching');
        return
    }

    const resjson = await res.json();
    if(!resjson) {
        console.log('Error in the resJson');
        return
    }

    await loadSections();
    
})