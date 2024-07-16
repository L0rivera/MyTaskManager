// Controller for the Register

//We select the register form with his Id, then create an event when the submit button is actioned
document.getElementById("Mysignup").addEventListener("submit", async (e) => {
    e.preventDefault();
    const apiurl = 'http://localhost:3000'
    //We make a fetch to pull the information of the parameters
    const res = await fetch(`${apiurl}/api/register`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: e.target.firstElementChild.children.username.value,
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

