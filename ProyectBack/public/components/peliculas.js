let editando = false; // Inicializa el estado de edición
let peliculaActualId = null; // Variable para almacenar el ID de la película en edición /zzzzzz

// Cargar el formulario para agregar o editar películas
const formularioAgregar = document.getElementById('formularioAgregar');
formularioAgregar.addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const urlImagen = document.getElementById('urlImagen').value;
    const url = document.getElementById('url').value;

    try {
        if (editando) {
            // Si está en modo de edición, realiza la lógica para actualizar
            await actualizarPelicula({ titulo, urlImagen, url });
            resetFormulario();
        } else {
            // Agregar nueva película
            await agregarPelicula({ titulo, urlImagen, url });
            resetFormulario();
        }
        cargarPeliculas(); // Carga nuevamente las películas
    } catch (error) {
        console.error("Error al agregar/editar la película:", error);
        alert("Error al agregar/editar la película. Por favor, verifica los datos.");
    }
});

// Cargar películas en la página al cargar
document.addEventListener("DOMContentLoaded", cargarPeliculas);

// Función para cargar las películas
async function cargarPeliculas() {
    const container = document.querySelector("#lista-peliculas");
    try {
        const request = await fetch("http://localhost:4321/api/peliculas", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}` // Incluye el token
            },
        });

        if (!request.ok) {
            throw new Error("Error al cargar las películas");
        }

        const data = await request.json();
        container.innerHTML = ''; // Limpiar el contenedor

        data.peliculas.forEach((element) => {
            const div = document.createElement("div");
            div.classList.add("bg-white", "p-4", "rounded-lg", "shadow-lg");

            const imgPel = document.createElement("img");
            imgPel.src = element.urlImagen;
            imgPel.alt = element.titulo;
            imgPel.classList.add("w-full", "h-auto", "object-contain", "rounded-t-lg");

            const titulo = document.createElement("h2");
            titulo.textContent = element.titulo;
            titulo.classList.add("text-xl", "font-bold", "mt-2");

            const verAhoraBtn = document.createElement("button");
            verAhoraBtn.textContent = "Ver Ahora";
            verAhoraBtn.classList.add("bg-blue-500", "text-white", "font-bold", "py-2", "px-4", "mt-2", "rounded-lg", "hover:bg-blue-600", "transition", "duration-300");
            verAhoraBtn.addEventListener("click", () => {
                window.location.href = element.url;
            });

            const editarBtn = document.createElement("button");
            editarBtn.textContent = "Editar";
            editarBtn.classList.add("bg-green-500", "text-white", "font-bold", "py-2", "px-4", "mt-2", "rounded-lg", "hover:bg-green-600", "transition", "duration-300");
            editarBtn.addEventListener("click", () => {
                cargarDatosEnFormulario(element);
            });

            const eliminarBtn = document.createElement("button");
            eliminarBtn.textContent = "Eliminar";
            eliminarBtn.classList.add("bg-red-500", "text-white", "font-bold", "py-2", "px-4", "mt-2", "rounded-lg", "hover:bg-red-600", "transition", "duration-300");
            eliminarBtn.addEventListener("click", () => {
                eliminarPelicula(element._id);
            });

            div.appendChild(imgPel);
            div.appendChild(titulo);
            div.appendChild(verAhoraBtn);
            div.appendChild(editarBtn);
            div.appendChild(eliminarBtn);

            container.appendChild(div);
        });
    } catch (error) {
        console.error("Error al cargar las películas:", error);
        alert("No se pudieron cargar las películas.");
    }
}

// Función para agregar película
async function agregarPelicula(pelicula) {
    const response = await fetch("http://localhost:4321/api/peliculas/add", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(pelicula),
    });

    if (!response.ok) {
        throw new Error("Error al agregar película");
    }

    return await response.json();
}

// Función para actualizar película
async function actualizarPelicula(pelicula) {
    const response = await fetch(`http://localhost:4321/api/peliculas/${peliculaActualId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(pelicula),
    });

    if (!response.ok) {
        throw new Error("Error al actualizar película");
    }

    return await response.json();
}

// Función para eliminar película
async function eliminarPelicula(id) {
    try {
        const response = await fetch(`http://localhost:4321/api/peliculas/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}` // Incluye el token
            },
        });

        const result = await response.json();
        if (response.ok) {
            alert('Película eliminada con éxito');
            cargarPeliculas(); // Recargar la lista de películas
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error al eliminar la película:', error);
        alert('Hubo un error al intentar eliminar la película.');
    }
}

const generarPDFButton = document.getElementById('generarPDF');

if (generarPDFButton) { 
  generarPDFButton.addEventListener('click', () => {
    fetch('/generar-pdf')
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'peliculas.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch(error => console.error('Error al descargar el PDF:', error));
  });
}


// Función para cargar datos en el formulario para editar
function cargarDatosEnFormulario(pelicula) {
    document.getElementById('titulo').value = pelicula.titulo;
    document.getElementById('urlImagen').value = pelicula.urlImagen;
    document.getElementById('url').value = pelicula.url;
    editando = true; // Cambia el estado a editar
    peliculaActualId = pelicula._id; // Guarda el ID de la película actual
}

// Función para reiniciar el formulario
function resetFormulario() {
    formularioAgregar.reset();
    editando = false; // Reinicia el estado
    peliculaActualId = null; // Limpia el ID de la película actual
}
