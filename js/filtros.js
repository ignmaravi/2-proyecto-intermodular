document.addEventListener('DOMContentLoaded', () => {
    const inputTitulo = document.getElementById('input-titulo');
    const selectGenero = document.getElementById('select-genero');
    const inputDirector = document.getElementById('input-director');
    const btnLimpiar = document.getElementById('btn-limpiar-filtros');

    const ejecutarFiltros = () => {
        aplicarFiltros(
            inputTitulo.value,
            selectGenero.value,
            inputDirector.value
        );
    };

    inputTitulo.addEventListener('keyup', ejecutarFiltros);
    inputDirector.addEventListener('keyup', ejecutarFiltros);
    selectGenero.addEventListener('change', ejecutarFiltros);
    
    if (btnLimpiar) {
        btnLimpiar.addEventListener('click', limpiarFiltros);
    }
});
export function aplicarFiltros(titulo, genero, director) {
    let resultadoFiltrado = [...catalogoPeliculas];

    if (titulo) {
        const tituloLower = titulo.toLowerCase().trim();
        resultadoFiltrado = resultadoFiltrado.filter(p => 
            p.titulo.toLowerCase().includes(tituloLower)
        );
    }

    if (genero && genero !== 'todos') {
        resultadoFiltrado = resultadoFiltrado.filter(p => 
            p.genero.toLowerCase() === genero.toLowerCase()
        );
    }
    
    if (director) {
        const directorLower = director.toLowerCase().trim();
        resultadoFiltrado = resultadoFiltrado.filter(p => 
            p.director.toLowerCase().includes(directorLower)
        );
    }

    renderizarCatalogo(resultadoFiltrado);
}

export function limpiarFiltros() {
    document.getElementById('input-titulo').value = '';
    document.getElementById('select-genero').value = 'todos'; 
    document.getElementById('input-director').value = '';
    
    renderizarCatalogo(catalogoPeliculas);
    console.log('Filtros limpiados.');
}
