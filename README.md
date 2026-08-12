# Calistenia + Pesas — rutina y tracker de Pablo

App de una sola página (`index.html`) con la rutina completa de 5 días (Push / Pull / Legs / Upper / Lower+Core) y un registro de peso y repeticiones por ejercicio.

- Los registros se guardan primero en `localStorage` del dispositivo (la app funciona sin conexión), y se sincronizan solos entre tu celular y tu computadora vía `api/data.js` (Redis).
- Cada ejercicio tiene un botón `?` con la técnica correcta, las repeticiones recomendadas, y una foto de ejemplo del movimiento (tocar para abrir/cerrar). Las fotos vienen de [wger.de](https://wger.de) (base de datos de ejercicios de código abierto, licencia CC-BY-SA); solo **L-sit** se queda sin foto porque no hay ninguna disponible para ese movimiento en la base de datos.
- Cada día trae un bloque de **calentamiento específico** (5 min) arriba de los ejercicios, plegado por default — toca para abrir. Los pasos de movilidad general (círculos de brazo, leg swings, puente de glúteo) no traen foto por la misma razón; los que sí tienen un ejercicio equivalente fotografiable (dead hang, face pull, remo invertido, sentadilla, zancada, bisagra de cadera) sí la muestran.
- Si ya entrenaste hoy, Inicio te lo dice ("Ya entrenaste hoy: X") y cambia la sugerencia a "para tu próxima sesión" en vez de empujarte a repetir el mismo día.
- La pestaña **Progreso** muestra sesiones, peso máximo, última vez entrenado, una gráfica de evolución, el historial completo por ejercicio, y permite **borrar un entrenamiento** completo desde "Historial".
- La app sugiere automáticamente el siguiente día según el último que registraste (rotación Push → Pull → Legs → Upper → Lower+Core).
- Switch **kg/lb** en Inicio: convierte lo que ya tienes guardado al vuelo, sin duplicar ni perder datos (siempre se guarda en kg internamente).
- La app pide una **contraseña** la primera vez que se abre en un dispositivo (se guarda ahí después, no hay que escribirla cada vez).

## Sincronización entre dispositivos

Cada entreno guardado tiene un `id` único. Al abrir la app se baja lo del servidor y se **une** (no se sobrescribe) con lo que ya había en el dispositivo. Borrar un entrenamiento no lo quita del arreglo: lo marca como `deleted:true` (una "lápida"), así la sincronización sabe que se borró en vez de creerlo un entreno que el otro dispositivo simplemente no tenía y volver a agregarlo. Esto significa que la sincronización nunca pierde datos por accidente, sin importar qué dispositivo estaba sin conexión o en qué orden se sincronizaron. Si no hay conexión, la app sigue funcionando 100% con lo que ya tiene guardado localmente (indicador "Sin conexión — guardado solo aquí" bajo la fecha).

Requiere estar desplegado en **Vercel** con:
- Una base de datos Redis conectada (variable de entorno `REDIS_URL`) — GitHub Pages no puede correr `api/data.js` porque es solo hosting estático.
- La variable de entorno `APP_PASSWORD` con la contraseña que quieras usar. `api/data.js` rechaza (401) cualquier petición sin el header `x-app-password` correcto — la protección real vive en el servidor, no solo en la pantalla de candado del cliente.

## Deploy

- GitHub Pages sigue sirviendo la app estática directo desde `main` (sin sincronización ahí, ya que no hay backend).
- Para tener sincronización real: importar este repo en Vercel, conectarle una base de datos Redis (Storage → Redis en el dashboard de Vercel) y usar la URL de Vercel en el celular y la computadora en vez de la de GitHub Pages.
