// Ejemplo de cómo se integraría en js/filtros.js

document.addEventListener('DOMContentLoaded', () => {
    const inputTitulo = document.getElementById('input-titulo');
    const selectGenero = document.getElementById('select-genero');
    const inputDirector = document.getElementById('input-director');
    const btnLimpiar = document.getElementById('btn-limpiar-filtros');

    // Función que lee los valores y llama a la lógica de filtrado
    const ejecutarFiltros = () => {
        aplicarFiltros(
            inputTitulo.value,
            selectGenero.value,
            inputDirector.value
        );
    };

    // Eventos de filtrado en tiempo real y por cambio
    inputTitulo.addEventListener('keyup', ejecutarFiltros);
    inputDirector.addEventListener('keyup', ejecutarFiltros);
    selectGenero.addEventListener('change', ejecutarFiltros);
    
    // Evento del botón Limpiar
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', limpiarFiltros);
    }
});
// Asumiendo que 'catalogoPeliculas' y 'renderizarCatalogo' son accesibles/exportados
// import { catalogoPeliculas, renderizarCatalogo } from './peliculas.js'; 

/**
 * Aplica filtros combinados (título, género, director) al catálogo.
 * Se llama en cada evento de teclado/cambio en los inputs/selectores.
 * @param {string} titulo - Título a buscar (parcial).
 * @param {string} genero - Género seleccionado.
 * @param {string} director - Director a buscar (parcial).
 */
export function aplicarFiltros(titulo, genero, director) {
    let resultadoFiltrado = [...catalogoPeliculas]; // Usar el array completo

    // 1. Filtrar por Título (Búsqueda en tiempo real)
    if (titulo) {
        const tituloLower = titulo.toLowerCase().trim();
        resultadoFiltrado = resultadoFiltrado.filter(p => 
            p.titulo.toLowerCase().includes(tituloLower)
        );
    }

    // 2. Filtrar por Género
    if (genero && genero !== 'todos') { // Asumiendo que 'todos' es la opción por defecto
        resultadoFiltrado = resultadoFiltrado.filter(p => 
            p.genero.toLowerCase() === genero.toLowerCase()
        );
    }
    
    // 3. Filtrar por Director/Creador
    if (director) {
        const directorLower = director.toLowerCase().trim();
        resultadoFiltrado = resultadoFiltrado.filter(p => 
            p.director.toLowerCase().includes(directorLower)
        );
    }

    // 4. Renderizar los resultados filtrados
    renderizarCatalogo(resultadoFiltrado);
}

/**
 * Limpia los valores de los inputs/selectores de filtro y vuelve a renderizar el catálogo completo.
 */
export function limpiarFiltros() {
    // 1. Limpiar los elementos del DOM (Miembro 2 debe asegurar los IDs)
    document.getElementById('input-titulo').value = '';
    document.getElementById('select-genero').value = 'todos'; 
    document.getElementById('input-director').value = '';
    
    // 2. Renderizar el catálogo principal
    renderizarCatalogo(catalogoPeliculas);
    console.log('Filtros limpiados.');
}