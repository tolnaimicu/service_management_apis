const API_URL = "http://localhost:3000/api/users";


function createUser() {
    const usernameInput = document.getElementById("username");
    const username = usernameInput.value;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
    })
    .then(response => response.json())
    .then(data => {
        if(data.error){
            alert("Error: " + JSON.stringify(data))
        }
        else{
        alert("Success: " + JSON.stringify(data));
        usernameInput.value = "";
        getUsers();
        }
    })
    .catch(error => console.error("Error:", error));
}


function getUsers() {
    fetch(API_URL)
    .then(response => response.json())
    .then(users => {
        document.getElementById("user-list").innerHTML = users
            .map(user => `<li>ID: ${user.id}, Name: ${user.username}</li>`)
            .join("");
    })
    .catch(error => console.error("Error:", error));
}


function updateUser() {
    const idInput = document.getElementById("update-id");
    const id = idInput.value;

    const usernameInput = document.getElementById("update-username");
    const username = usernameInput.value;


    fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
    })
    .then(response => response.json())
    .then(data => {
        if(data.error){
            alert("Error: " + JSON.stringify(data))
        }
        else{
        alert("Success: " + JSON.stringify(data));
        idInput.value = ""; 
        usernameInput.value = ""; 
        getUsers();
        }
    })
    .catch(error => console.error("Error:", error));
}

function deleteUser() {
    const idInput = document.getElementById("delete-id");
    const id = idInput.value;

    fetch(`http://localhost:3000/api/users/${id}`, 
     { method: "DELETE" })
    .then(response => response.json())
    .then(data => {
        if(data.error){
            alert("Error: " + JSON.stringify(data))
        }
        else{
        alert("Success: " + JSON.stringify(data));
        idInput.value = ""; 
        getUsers();
        }
    })
    .catch(error => console.error("Error:", error));
}



function searchUserById() {
    const idInput = document.getElementById("search-id");
    const id = idInput.value;
    
    fetch(`http://localhost:3000/api/users/${id}`)
        .then(response => response.json())
        .then(user => {
            if (user.error) {
                document.getElementById("search-result").textContent = "User not found";
            } else {
                document.getElementById("search-result").textContent = `ID: ${user.id}, Username: ${user.username}`;
                idInput.value = "";
            }
        })
        .catch(error => console.error("Error:", error));
}

