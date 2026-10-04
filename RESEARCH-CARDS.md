# Editar las tarjetas de investigación

Las dos tarjetas son ejemplos de presentación, no publicaciones reales. Están en la sección `id="projects"` de `index-es.html` y `index.html`.

Para publicar una investigación, edita el bloque `<details class="project-card">` correspondiente:

- Cambia la etiqueta «Ejemplo de investigación» por el tipo de publicación.
- Sustituye el título `<h3>` y el párrafo del `<summary>` por el título y una descripción breve.
- En `.project-body`, coloca el resumen y los datos de autoría o fecha.
- Activa el enlace comentado, reemplaza `https://YOUR-PUBLICATION-URL` por la URL real o la ruta de tu PDF y elimina `<!-- Add a publication:` y `-->` alrededor del enlace.

Para añadir otra tarjeta, duplica el bloque completo y asigna un `id` único. Mantén el mismo contenido en ambas versiones de idioma. El diseño ajusta automáticamente las tarjetas de dos columnas en escritorio a una columna en móvil.

Las fichas se abren con clic, Enter o la barra espaciadora, sin JavaScript. Los títulos y etiquetas quedan alineados a la izquierda; los párrafos de lectura usan texto justificado.
