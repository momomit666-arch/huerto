# Actividades de la Huerta Escolar

Aplicación web desarrollada para registrar las tareas de cada cantero, organizar jornadas de riego y siembra y gestionar los datos de forma persistente con Supabase.

## Enlaces del proyecto
- **Sitio publicado en Render:** [PEGAR AQUÍ TU ENLACE DE RENDER]
- **Repositorio en GitHub:** https://github.com/momomit666-arch/huerto

## Funcionalidades implementadas
- Tabla `actividades_huerta` en Supabase con clave primaria (`id`) y los campos `cantero`, `cultivo`, `tarea`, `fecha` y `equipo_responsable`.
- Registro (`INSERT`) y listado (`SELECT`) de actividades desde el formulario web.
- Modificación (`UPDATE`) y eliminación (`DELETE`) de registros actualizando la vista en pantalla.
- Filtro por tarea (`riego`, `siembra`, entre otras opciones) para mostrar únicamente las coincidencias.
- Persistencia de datos en Supabase al recargar el sitio.

## Uso de Inteligencia Artificial (IA)

### Consulta realizada a la IA
Consulté a la IA cómo estructurar el proyecto web con estilo en tonos rosados conectado a Supabase, cómo configurar la tabla y los permisos en Supabase, y cómo resolver el error de permisos (`401` / `permission denied for table actividades_huerta`) al intentar listar y guardar registros desde el sitio web.

### Decisión tomada y ajustes realizados
Apliqué la estructura de la tabla `actividades_huerta` con sus campos y tipos de datos en Supabase, utilicé la `Project URL` base y la `Publishable key` en el código de conexión, y apliqué los permisos (`GRANT`) y políticas de acceso (`RLS`) para `select`, `insert`, `update` y `delete` en Supabase para destrabar el error de permisos en la web. También guardé y organicé los archivos del proyecto (`index.html`, `styles.css` y `app.js`) con diseño en tonos rosados.

### Prueba realizada y comprobación del resultado
Cargué los registros iniciales incluyendo `riego` y `siembra` en Supabase y comprobé en el navegador que los datos se listan y se mantienen al recargar la página. Luego probé crear, modificar y eliminar registros desde la interfaz, así como filtrar por tarea, verificando que los cambios se reflejen en la tabla web y persistan en Supabase. Finalmente, subí el proyecto a GitHub y verifiqué el funcionamiento desde el enlace publicado en Render.
