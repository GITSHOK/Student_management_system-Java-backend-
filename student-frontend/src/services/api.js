const API_URL = "http://localhost:8080";

// =========================
// AUTH
// =========================

export async function login(username, password) {

    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    return response.text();
}


export async function register(username, password) {

    const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });

    if (!response.ok) {
        throw new Error("Registration failed");
    }

    return response.json();
}


// =========================
// STUDENTS
// =========================

export async function getStudents() {

    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/students`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error("Failed to get students");
    }

    return response.json();
}


export async function addStudent(student) {

    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(student)
    });

    if (!response.ok) {
        throw new Error("Failed to add student");
    }

    return response.json();
}


export async function updateStudent(id, student) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/students/updateStudent/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(student)
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update student");
    }

    return response.json();
}


export async function deleteStudent(id) {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API_URL}/students/deleteStudent/${id}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete student");
    }

    return response.json();
}