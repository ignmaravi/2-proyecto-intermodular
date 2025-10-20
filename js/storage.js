// js/storage.js

// Nombre de la clave que usaremos en localStorage
const STORAGE_KEY = 'catalogoPeliculas';

/**
 * Guarda el catálogo actual de películas/series en el localStorage.
 * @param {Array<Object>} catalogo - El array de películas a guardar.
 */
export function guardarEnLocalStorage(catalogo) {
    try {
        // 1. Convertir el array de JavaScript a una cadena JSON
        const datosJSON = JSON.stringify(catalogo);
        
        // 2. Guardar la cadena JSON en localStorage
        localStorage.setItem(STORAGE_KEY, datosJSON);
        console.log('✅ Catálogo guardado automáticamente en localStorage.');
    } catch (error) {
        console.error('❌ Error al guardar en localStorage:', error);
    }
}

/**
 * Carga el catálogo de películas/series desde el localStorage.
 * @returns {Array<Object>} El catálogo cargado o un array vacío si no hay datos.
 */
export function cargarDeLocalStorage() {
    try {
        // 1. Obtener la cadena JSON de localStorage
        const datosJSON = localStorage.getItem(STORAGE_KEY);
        
        // 2. Manejar el caso de que no existan datos previos
        if (datosJSON === null || datosJSON === '[]') {
            console.log('ℹ️ No se encontraron datos previos. Inicializando catálogo vacío.');
            return [];
        }
        
        // 3. Convertir la cadena JSON de vuelta a un array de JavaScript
        const catalogo = JSON.parse(datosJSON);
        console.log(`✅ Catálogo cargado con éxito. Total de ítems: ${catalogo.length}`);
        return catalogo;
        
    } catch (error) {
        // Manejar errores de parsing o acceso a localStorage
        console.error('❌ Error al cargar de localStorage. Retornando catálogo vacío.', error);
        return [];
    }
}