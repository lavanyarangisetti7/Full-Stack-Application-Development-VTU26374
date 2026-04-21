
document.addEventListener("DOMContentLoaded", function () {

    /* ===============================
       STUDENT REGISTRATION
    =============================== */

    const form = document.getElementById("studentForm");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const roll = document.getElementById("roll").value.trim();
            const email = document.getElementById("email").value.trim();
            const course = document.getElementById("course").value.trim();

            // Validation
            if (!name || !roll || !email || !course) {
                alert("Please fill all fields");
                return;
            }

            fetch("/api/students/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    roll: roll,
                    email: email,
                    course: course
                })
            })
            .then(response => response.json())
            .then(data => {
                alert("Student Registered Successfully");
                form.reset();
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Error saving student");
            });
        });
    }


    /* ===============================
       VIEW STUDENTS
    =============================== */

    const tableBody = document.getElementById("tableBody");

    if (tableBody) {

        fetch("/api/students")
        .then(response => response.json())
        .then(data => {

            tableBody.innerHTML = "";

            data.forEach(student => {

                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.roll}</td>
                    <td>${student.email}</td>
                    <td>${student.course}</td>
                `;

                tableBody.appendChild(row);
            });

        })
        .catch(error => {
            console.error("Error loading students:", error);
        });

    }

});

