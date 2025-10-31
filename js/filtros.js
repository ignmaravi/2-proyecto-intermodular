const inputBusqueda = document.querySelector("#busqueda");
const filtroGenero = document.querySelector("#filtroGenero");
const filtroValoracion = document.querySelector("#filtroValoracion");

let filtrosActivos = {
  texto: "",
  genero: "",
  valoracion: ""
};

inputBusqueda.addEventListener("input", () => {
  filtrosActivos.texto = inputBusqueda.value.toLowerCase();
  document.dispatchEvent(new CustomEvent("filtrosActualizados", { detail: filtrosActivos }));
});

filtroGenero.addEventListener("change", () => {
  filtrosActivos.genero = filtroGenero.value;
  document.dispatchEvent(new CustomEvent("filtrosActualizados", { detail: filtrosActivos }));
});

filtroValoracion.addEventListener("change", () => {
  filtrosActivos.valoracion = filtroValoracion.value;
  document.dispatchEvent(new CustomEvent("filtrosActualizados", { detail: filtrosActivos }));
});
