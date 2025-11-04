# 2-proyecto-intermodular

# Catálogo de Películas y Series

## Descripción del proyecto
Aplicación web que permite gestionar un catálogo personal de películas y series.  
El usuario puede añadir, visualizar, filtrar, editar y eliminar elementos del catálogo, con persistencia local mediante **localStorage**.  
El objetivo es practicar la colaboración en equipo utilizando **GitHub** y desarrollar habilidades con tecnologías **front-end modernas**.

---

## Integrantes del equipo

| Nombre  | Rol / Módulo |
|----------|---------------|
| Ferran | HTML y formulario de añadir/visualizar |
| Izan | Funcionalidades de búsqueda y filtros |
| Nacho | Editar, eliminar y ordenar contenido |
| David | CSS (estilos y responsive), localStorage y documentación |

---

## Tecnologías utilizadas
- HTML5  
- CSS3  
- JavaScript (ES6)  
- localStorage (persistencia de datos en navegador)

---

## Funcionalidades implementadas

| Funcionalidad | Estado |
|----------------|---------|
| Formulario para crear y ordenar una serie/pelicula | ✅ |
| Ver catálogo completo con todas las películas/series | ✅ |
| Buscar por título con filtrado en tiempo real | ✅ |
| Filtrar por género | ✅ |
| Filtrar por director/creador | ✅ |
| Eliminar película/serie del catálogo | ✅ |
| Editar datos de las película/serie existente | ✅ |
| Ver mejor valoradas (ordenadas por valoración con estrellas visuales) | ✅ |
| Guardar automáticamente todos los datos en localStorage | ✅ |
| Cargar automáticamente los datos al abrir la página | ✅ |

---

## Estructura del proyecto

```plaintext
2-Proyecto-Intermodular/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── pelicula.js
│   ├── formulario.js
│   ├── filtros.js
│   └── storage.js
│
└── README.md