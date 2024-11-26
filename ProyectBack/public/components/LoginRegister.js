

document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem('token');

    // Redirigir a login si no hay token
    if (!token && window.location.pathname === '/peliculas.html') {
        window.location.href = 'login.html'; // Redirige a la página de login
    }
   // Eventos para formularios de registro y login
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    // Registro
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const response = await fetch('http://localhost:4321/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Registro exitoso! Puedes iniciar sesión ahora.');
                window.location.href = 'login.html'; // Redirige a la página de inicio de sesión
            } else {
                alert(`Error: ${data.message}`);
            }
        });
    }

    // Login
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;


             const response = await fetch('http://localhost:4321/api/auth/login', {
             method: 'POST',
                 headers: {
                     'Content-Type': 'application/json',
                 },
                 body: JSON.stringify({ email, password }),
             });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token); // Almacena el token
                window.location.href = 'peliculas.html'; // Redirige a la página de películas
            } else {
                alert(`Error: ${data.message}`);
            }
        });
    }

    // Cerrar sesión
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('token'); // Elimina el token
            window.location.href = 'login.html'; // Redirige a la página de login
        });
    }})
