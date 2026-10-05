# Investigaciones y publicaciones

Las fichas completas están en `research-es.html` y `research.html`. La portada enlaza a cada publicación.

Para editar o añadir una publicación, actualiza `research-data.json`. Cada registro contiene el enlace original, la autoría y el contenido en español e inglés. Los informes de saneamiento acreditan a Andrés Soto Ticse como autor principal, conforme a su indicación. La publicación sobre aerolíneas conserva los coautores del PDF original.

Desde la raíz del repositorio, ejecuta:

```sh
node scripts/build-research.cjs
```

El script genera las páginas de investigación y actualiza la sección de publicaciones de la portada. Edita los datos antes de regenerar, ya que las fichas HTML generadas se sobrescriben. Asigna un `id` único a cada nuevo registro para mantener enlaces directos estables.

El diseño está en `assets/css/research.css`. Las fichas ocupan todo el ancho de lectura y mantienen los párrafos justificados. Los enlaces a Google Docs conservan los permisos de acceso de los documentos originales.
