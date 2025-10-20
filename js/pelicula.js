// Asumiendo que estas funciones se importan desde 'storage.js'
// import { cargarDeLocalStorage, guardarEnLocalStorage } from './storage.js';
// **Variables de Estado Globales**
let catalogoPeliculas = cargarDeLocalStorage();
let peliculaEnEdicion = null; // Rastrea la película que se está editando

// **Función Auxiliar para ID Único (Necesaria)**
function generarIdUnico() {
    return Date.now().toString(); 
}

/**
 * Inicia el proceso de edición: rellena el formulario con los datos de la película.
 * Se llama desde el botón 'Editar' en la tarjeta.
 * @param {string} id - ID único de la película a editar.
 */
window.iniciarEdicion = (id) => {
    const pelicula = catalogoPeliculas.find(p => p.id === id);
    if (!pelicula) return;
    
    // 1. Almacenar el objeto actual en la variable de estado
    peliculaEnEdicion = pelicula;
    
    // 2. Rellenar los campos del formulario (Miembro 1 debe tener los IDs correctos)
    document.getElementById('titulo').value = pelicula.titulo;
    document.getElementById('director').value = pelicula.director;
    document.getElementById('anyo').value = pelicula.anyo;
    document.getElementById('genero').value = pelicula.genero;
    // Lógica para rellenar el selector de valoración (ej. radio buttons o select)
    document.getElementById('valoracion').value = pelicula.valoracion; 

    // 3. Actualizar la interfaz para indicar el modo edición
    document.getElementById('btn-anadir').textContent = 'Guardar Cambios';
};

/**
 * Gestiona el envío del formulario: añade una nueva película o guarda la edición.
 * Esta función DEBE ser llamada por el 'submit' del formulario (Miembro 1).
 * @param {Object} datosFormulario - Objeto con los datos del formulario (sin ID).
 */
export function manejarEnvioFormulario(datosFormulario) {
    if (peliculaEnEdicion) {
        // Modo Edición
        const index = catalogoPeliculas.findIndex(p => p.id === peliculaEnEdicion.id);
        if (index !== -1) {
            // Actualizar la película manteniendo su ID
            catalogoPeliculas[index] = { ...peliculaEnEdicion, ...datosFormulario };
        }
        
        // Resetear el modo edición
        peliculaEnEdicion = null;
        document.getElementById('btn-anadir').textContent = 'Añadir al catálogo';

    } else {
        // Modo Añadir (lógica de Miembro 1)
        const nuevaPelicula = { id: generarIdUnico(), ...datosFormulario };
        catalogoPeliculas.push(nuevaPelicula);
    }

    // 🔑 Tarea del Miembro 4: Guardar y Renderizar después de CADA acción
    guardarEnLocalStorage(catalogoPeliculas); 
    renderizarCatalogo(catalogoPeliculas); // Asumiendo que existe renderizarCatalogo
    document.getElementById('formulario-pelicula').reset();
}


/**
 * Elimina una película del catálogo por su ID.
 * Se llama desde el botón 'Eliminar' en la tarjeta.
 * @param {string} id - ID único de la película a eliminar.
 */
window.eliminarPelicula = (id) => {
    if (confirm('¿Confirmar eliminación?')) {
        // Filtrar el array para excluir el ítem
        catalogoPeliculas = catalogoPeliculas.filter(p => p.id !== id);
        
        // 🔑 Tarea del Miembro 4: Guardar y Renderizar
        guardarEnLocalStorage(catalogoPeliculas); 
        renderizarCatalogo(catalogoPeliculas);
    }
};

/**
 * Ordena el catálogo por valoración de mayor a menor y renderiza el resultado.
 */
export function ordenarPorValoracion() {
    const catalogoOrdenado = [...catalogoPeliculas]; // Clonar para ordenar
    
    // Ordenar por la propiedad 'valoracion' de forma descendente (b - a)
    catalogoOrdenado.sort((a, b) => b.valoracion - a.valoracion); 
    
    // Renderizar la lista ordenada
    renderizarCatalogo(catalogoOrdenado);
    console.log('Catálogo ordenado por Mejor Valoradas.');
}