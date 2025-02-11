const API_URL = "http://localhost:3000/api/users";

// 📌 CREATE User (POST)
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
        alert("User Created: " + JSON.stringify(data));
        usernameInput.value = ""; // ✅ Clears the input field after success
    })
    .catch(error => console.error("Error:", error));
}

// 📌 GET Users (GET)
function getUsers() {
    fetch(API_URL)
    .then(response => response.json())
    .then(users => {
        const userList = document.getElementById("user-list");
        userList.innerHTML = "";
        users.forEach(user => {
            let li = document.createElement("li");
            li.textContent = `ID: ${user.id}, Name: ${user.username}`;
            userList.appendChild(li);
        });
    })
    .catch(error => console.error("Error:", error));
}

function updateUser() {
    const idInput = document.getElementById("update-id");

    const id = idInput.value;

    const usernameInput = document.getElementById("update-username");
    const username = usernameInput.value;

    console.log("XXXXXXXXXXX:   ", username);


    fetch(`http://localhost:3000/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username })
    })
    .then(response => response.json())
    .then(data => {
        alert("User Updated: " + JSON.stringify(data));
        idInput.value = ""; // ✅ Clears ID field
        usernameInput.value = ""; // ✅ Clears username field
    })
    .catch(error => console.error("Error:", error));
}

function deleteUser() {
    const idInput = document.getElementById("delete-id");
    const id = idInput.value;

    fetch(`http://localhost:3000/api/users/${id}`, { method: "DELETE" })
    .then(response => response.json())
    .then(data => {
        alert("User Deleted: " + JSON.stringify(data));
        idInput.value = ""; // ✅ Clears ID field
    })
    .catch(error => console.error("Error:", error));
}

