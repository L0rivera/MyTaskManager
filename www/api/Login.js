//Controller for the Login
document.getElementById("Mysignin").addEventListener("submit", async (e) => {
    e.preventDefault();
    const apiurl = 'http://localhost:3000'
    const res = await fetch(`${apiurl}/api/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({
            email: e.target.firstElementChild.children.email.value,
            password: e.target.firstElementChild.children.password.value
        })
    })
    if(!res.ok) return;
    const resJson = await res.json();
    if (resJson){
        window.location.href = '/index.html';
    }
})