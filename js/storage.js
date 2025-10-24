const STORAGE_KEY = 'catalogoPeliculas';

export function guardarEnLocalStorage(catalogo) {
    try {
        const datosJSON = JSON.stringify(catalogo);
        localStorage.setItem(STORAGE_KEY, datosJSON);
        console.log('✅ Catálogo guardado automáticamente en localStorage.');
    } catch (error) {
        console.error('❌ Error al guardar en localStorage:', error);
    }
}

export function cargarDeLocalStorage() {
    try {
        const datosJSON = localStorage.getItem(STORAGE_KEY);
        if (datosJSON === null || datosJSON === '[]') {
            console.log('ℹ️ No se encontraron datos previos. Inicializando catálogo vacío.');
            return [];
        }
        const catalogo = JSON.parse(datosJSON);
        console.log(`✅ Catálogo cargado con éxito. Total de ítems: ${catalogo.length}`);
        return catalogo;
    } catch (error) {
        console.error('❌ Error al cargar de localStorage. Retornando catálogo vacío.', error);
        return [];
    }
}
