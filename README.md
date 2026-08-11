# Calistenia + Pesas — rutina y tracker de Pablo

App de una sola página (`index.html`) con la rutina completa de 5 días (Push / Pull / Legs / Upper / Lower+Core) y un registro de peso y repeticiones por ejercicio.

- Los registros se guardan primero en `localStorage` del dispositivo (la app funciona sin conexión), y se sincronizan solos entre tu celular y tu computadora vía `api/data.js` (Redis).
- Cada ejercicio tiene un botón `?` con la técnica correcta (tocar para abrir/cerrar).
- La pestaña **Progreso** muestra sesiones, peso máximo, última vez entrenado, una gráfica de evolución y el historial completo por ejercicio.
- La app sugiere automáticamente el siguiente día según el último que registraste (rotación Push → Pull → Legs → Upper → Lower+Core).

## Sincronización entre dispositivos

Cada entreno guardado tiene un `id` único. Al abrir la app se baja lo del servidor y se **une** (no se sobrescribe) con lo que ya había en el dispositivo — como no hay forma de editar o borrar un entreno ya guardado, unir por id nunca pierde datos, sin importar qué dispositivo estaba sin conexión o en qué orden se sincronizaron. Si no hay conexión, la app sigue funcionando 100% con lo que ya tiene guardado localmente (indicador "Sin conexión — guardado solo aquí" bajo la fecha).

Requiere estar desplegado en **Vercel** con una base de datos Redis conectada (variable de entorno `REDIS_URL`) — GitHub Pages no puede correr `api/data.js` porque es solo hosting estático.

## Deploy

- GitHub Pages sigue sirviendo la app estática directo desde `main` (sin sincronización ahí, ya que no hay backend).
- Para tener sincronización real: importar este repo en Vercel, conectarle una base de datos Redis (Storage → Redis en el dashboard de Vercel) y usar la URL de Vercel en el celular y la computadora en vez de la de GitHub Pages.
