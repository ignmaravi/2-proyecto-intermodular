function guardarEnLocalStorage(catalogo) {
  localStorage.setItem("catalogoPeliculas", JSON.stringify(catalogo));
}

function cargarDeLocalStorage() {
  return JSON.parse(localStorage.getItem("catalogoPeliculas")) || [];
}

const lista = document.querySelector("#peliculas");
const editarSeccion = document.querySelector("#editarSeccion");
const form = document.querySelector("#editarForm");
const cancelar = document.querySelector("#cancelarEdicion");

let catalogo = [], editando = null;

document.addEventListener("DOMContentLoaded", () => {
  catalogo = cargarDeLocalStorage();
  render();
});

document.addEventListener("peliculaActualizada", () => {
  catalogo = cargarDeLocalStorage();
  render();
});

function render() {
  lista.innerHTML = "";
  catalogo.forEach(p => {
    const li = document.createElement("li");
    li.innerHTML = `
      <h3>${p.titulo} (${p.año || "?"})</h3>
      <p><b>Director:</b> ${p.director || "?"}</p>
      <p><b>Género:</b> ${p.genero || "?"}</p>
      <p><b>Valoración:</b> ${"⭐".repeat(p.valoracion || 0)}</p>
      <button class="editar">Editar</button>
      <button class="borrar">Borrar</button><hr>
    `;
    li.querySelector(".editar").onclick = () => editar(p);
    li.querySelector(".borrar").onclick = () => borrar(p.titulo);
    lista.appendChild(li);
  });
}

function editar(p) {
  editando = p.titulo;
  editarSeccion.hidden = false;
  form.editarTitulo.value = p.titulo;
  form.editarDirector.value = p.director;
  form.editarAño.value = p.año;
  form.editarGenero.value = p.genero;
  form.editarValoracion.value = p.valoracion;
}

form.onsubmit = e => {
  e.preventDefault();
  const i = catalogo.findIndex(p => p.titulo === editando);
  if (i !== -1) {
    catalogo[i] = {
      titulo: form.editarTitulo.value.trim(),
      director: form.editarDirector.value.trim(),
      año: form.editarAño.value.trim(),
      genero: form.editarGenero.value.trim(),
      valoracion: form.editarValoracion.value
    };
    guardarEnLocalStorage(catalogo);
  }
  editarSeccion.hidden = true;
  form.reset();
  render();
};

cancelar.onclick = e => {
  e.preventDefault();
  editarSeccion.hidden = true;
  form.reset();
};

function borrar(titulo) {
  catalogo = catalogo.filter(p => p.titulo !== titulo);
  guardarEnLocalStorage(catalogo);
  render();
}