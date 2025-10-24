import { guardarEnLocalStorage, cargarDeLocalStorage } from './storage.js';

let catalogoPeliculas = cargarDeLocalStorage();

const botonAñadir = document.querySelector(".AñadirBoton");
const seccionFormulario = document.querySelector("#seccion");
const formulario = document.querySelector("#pelicula");
const botonCancelar = document.querySelector("#cancelar");

botonAñadir.addEventListener("click", () => {
    seccionFormulario.hidden = false;
    limpiarFormulario();
});

botonCancelar.addEventListener("click", (e) => {
    e.preventDefault();
    limpiarFormulario();
    seccionFormulario.hidden = true;
});

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevaPelicula = {
        id: Date.now(),
        titulo: document.querySelector("#titulo").value.trim(),
        año: document.querySelector("#año").value,
        poster: document.querySelector("#poster").value.trim(),
        synopsis: document.querySelector("#synopsis").value.trim(),
        fechaCreacion: new Date().toISOString()
    };

    if (!validarPelicula(nuevaPelicula)) {
        return;
    }

    catalogoPeliculas.push(nuevaPelicula);
    guardarEnLocalStorage(catalogoPeliculas);

    renderizarPelicula(nuevaPelicula);
    limpiarFormulario();
    seccionFormulario.hidden = true;

    mostrarNotificacion('Película añadida correctamente');
});

function validarPelicula(pelicula) {
    if (!pelicula.titulo) {
        mostrarError('El título es obligatorio');
        return false;
    }

    if (pelicula.año && (pelicula.año < 1900 || pelicula.año > 2100)) {
        mostrarError('El año debe estar entre 1900 y 2100');
        return false;
    }

    if (pelicula.poster && !isValidUrl(pelicula.poster)) {
        mostrarError('La URL del póster no es válida');
        return false;
    }

    return true;
}

function renderizarPelicula(pelicula) {
    const peliculasContainer = document.querySelector("#peliculas");
    const peliculaElement = document.createElement("div");
    peliculaElement.classList.add("pelicula-item");
    
    peliculaElement.innerHTML = `
        <div class="pelicula-content">
            <h3>${pelicula.titulo}</h3>
            ${pelicula.año ? `<p class="año">Año: ${pelicula.año}</p>` : ''}
            ${pelicula.poster ? `<img src="${pelicula.poster}" alt="${pelicula.titulo}" width="150">` : ''}
            ${pelicula.synopsis ? `<p class="synopsis">${pelicula.synopsis}</p>` : ''}
        </div>
        <div class="card-actions">
            <button onclick="editarPelicula(${pelicula.id})">Editar</button>
            <button onclick="eliminarPelicula(${pelicula.id})">Eliminar</button>
        </div>
    `;

    peliculasContainer.appendChild(peliculaElement);
}

function limpiarFormulario() {
    formulario.reset();
    document.querySelectorAll('.error-message').forEach(el => el.remove());
}

function mostrarError(mensaje) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.style.color = 'red';
    errorDiv.textContent = mensaje;
    formulario.insertBefore(errorDiv, formulario.firstChild);
}

function mostrarNotificacion(mensaje) {
    console.log(mensaje);
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    catalogoPeliculas.forEach(pelicula => renderizarPelicula(pelicula));
});

export {
    catalogoPeliculas,
    renderizarPelicula
};

