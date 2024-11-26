document.addEventListener("DOMContentLoaded", cargarPeliculas);

const container = document.querySelector("#lista-peliculas");
const formularioAgregar = document.querySelector("#formAdd");
let editando = false; // Variable para saber si estamos editando
let peliculaActualId = null; // Guardar el ID de la película actual que se está editando

// Cargar las películas desde el backend
async function cargarPeliculas() {
  try {
    const request = await fetch("http://localhost:4321/api/peliculas");
    const data = await request.json();

    // Limpiar el contenedor antes de agregar las nuevas películas
    container.innerHTML = '';

    data.peliculas.forEach((element) => {
      // Crear la estructura de la película
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
        prepararEdicion(element._id, element.titulo, element.urlImagen, element.url);
      });

      const eliminarBtn = document.createElement("button");
      eliminarBtn.textContent = "Eliminar";
      eliminarBtn.classList.add("bg-red-500", "text-white", "font-bold", "py-2", "px-4", "mt-2", "rounded-lg", "hover:bg-red-600", "transition", "duration-300");
      eliminarBtn.addEventListener("click", () => {
        eliminarPelicula(element._id);
      });

      // Añadir los elementos al contenedor de la película
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

// Eliminar una película
async function eliminarPelicula(id) {
  try {
    const response = await fetch(`http://localhost:4321/api/peliculas/${id}`, {
      method: 'DELETE',
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


// Preparar para editar una película
function prepararEdicion(id, titulo, urlImagen, url) {
  const tituloInput = document.querySelector('#titulo');
  const urlImagenInput = document.querySelector('#urlImagen');
  const urlInput = document.querySelector('#url');

  // Rellenar el formulario con los valores actuales
  tituloInput.value = titulo;
  urlImagenInput.value = urlImagen;
  urlInput.value = url;

  // Activar modo edición
  editando = true;
  peliculaActualId = id;
}

// Agregar o editar una película
formularioAgregar.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.target));

  try {
    let request;
    if (editando) {
      // Modo edición, hacemos una solicitud PUT
      request = await fetch(`http://localhost:4321/api/peliculas/${peliculaActualId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } else {
      // Modo agregar, hacemos una solicitud POST
      request = await fetch("http://localhost:4321/api/peliculas/add", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    }

    const datajson = await request.json();

    if (request.ok) {
      alert(editando ? "Película editada con éxito!" : "Película agregada con éxito!");
      cargarPeliculas(); // Recargar la lista de películas
      formularioAgregar.reset(); // Limpiar el formulario
      editando = false; // Volver a modo agregar
      peliculaActualId = null; // Limpiar el ID de película actual
    } else {
      alert(`Error: ${datajson.message}`);
    }
  } catch (error) {
    console.error(editando ? 'Error al editar la película:' : 'Error al agregar la película:', error);
    alert(editando ? 'Hubo un error al intentar editar la película.' : 'Hubo un error al intentar agregar la película.');
  }
});
