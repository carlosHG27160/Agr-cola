# Conectar el frontend SGA con la base de datos BD_AGRICOLA

## Qué cambió respecto a tu proyecto original

- **No toqué `frondent/`**. Tu archivo `sga.js` (el que usa `sga.html`) ya venía
  preparado para hablar con una API en `http://localhost:3000/api`. Solo hacía
  falta que esa API existiera.
- Agregué `bakend/02_procedimientos_api.sql`: crea los procedimientos
  almacenados que `sga.js` espera (`sp_ListarAgricultores`, `sp_InsertarParcela`,
  `sp_ActualizarVenta`, etc.), usando alias de columnas para que coincidan con
  los nombres de campo que ya usa el frontend (`nombres`, `idAgricultor`, `stock`...).
- Agregué `backend-api/`: un servidor Node.js + Express que recibe esas
  peticiones y ejecuta los procedimientos en SQL Server.

En resumen, el flujo queda así:

```
sga.html/sga.js  →  http://localhost:3000/api/...  →  Express (backend-api)  →  SQL Server (BD_AGRICOLA)
```

Nota aparte: las páginas sueltas (`Parcelas.html`, `Clientes.html`,
`Compras.html`, etc., fuera de `sga.html`) están incompletas — apuntan a
archivos `.css`/`.js` propios que no existen en el proyecto (por ejemplo
`Parcelas.html` pide `Parcelas.js`, que no está). El módulo que sí funciona de
punta a punta es **`sga.html`**, así que la conexión se hizo sobre ese.

## 1. Preparar la base de datos

En SQL Server Management Studio (o `sqlcmd`), en este orden:

1. Ejecuta `bakend/BD_AGRICOLA.sql` (crea la base y los datos de ejemplo).
2. Ejecuta `bakend/02_procedimientos_api.sql` (agrega los procedimientos de la API).

## 2. Configurar y levantar el backend

Necesitas Node.js instalado (v18 o superior).

```bash
cd backend-api
npm install
copy .env.example .env      # en Windows
# cp .env.example .env      # en Mac/Linux
```

Edita `.env` con los datos de tu SQL Server:

```
DB_SERVER=localhost
DB_DATABASE=BD_AGRICOLA
DB_USER=sa
DB_PASSWORD=TuPasswordSegura123
DB_PORT=1433
```

Si usas autenticación de Windows en vez de usuario/contraseña de SQL Server,
avísame y adapto `db.js` para usar `msnodesqlv8` en vez de usuario/clave.

### Si tu servidor es una instancia con nombre (ej. `DESKTOP-AEVFHR7\SEKHARSQL`)

Usa `DB_INSTANCE` en vez de `DB_PORT` en el `.env` (ya viene así en el ejemplo).
Para que esto funcione, en la máquina donde está SQL Server:

1. Abre **SQL Server Configuration Manager** → *SQL Server Network Configuration*
   → *Protocols for SEKHARSQL* → asegúrate que **TCP/IP** esté **habilitado**.
2. En *SQL Server Services*, el servicio **SQL Server Browser** debe estar
   **iniciado** (es el que le dice a los clientes en qué puerto vive cada
   instancia con nombre). Si está detenido, inícialo y ponlo en automático.
3. Reinicia el servicio de la instancia SQL Server después de habilitar TCP/IP.
4. Si hay firewall de Windows activo, abre el puerto UDP 1434 (SQL Browser) y
   el puerto TCP que use tu instancia (o simplemente permite la app `sqlservr.exe`).

Si después de esto sigue sin conectar, dime el error exacto que muestra
`npm start` y lo resolvemos.

Levanta el servidor:

```bash
npm start
```

Deberías ver:

```
API del SGA escuchando en http://localhost:3000
Base de datos configurada: BD_AGRICOLA @ localhost
```

Verifica que responde abriendo en el navegador: `http://localhost:3000/api/health`
Debe devolver algo como `{"ok":true,"database":"BD_AGRICOLA"}`.

## 3. Abrir el frontend

Con el backend corriendo, abre `frondent/sga.html` en el navegador (doble clic
funciona, o sirviendo la carpeta con cualquier servidor estático). Al cargar:

- Si la API responde, verás un aviso "✓ Conectado a base de datos" y las
  tablas (Agricultores, Parcelas, Cultivos, etc.) se llenan con lo que hay en
  SQL Server, no con los datos de ejemplo fijos en el JS.
- Si no la encuentra, sigue funcionando en "modo offline" con los datos de
  ejemplo, para que la app nunca se rompa por completo.
- Los formularios de "Nuevo registro" y "Eliminar" ahora también escriben en
  la base de datos real (si la API está conectada).

## Notas

- El backend valida qué procedimientos se pueden ejecutar (lista blanca en
  `server.js`), así no se puede invocar SQL arbitrario desde el navegador.
- `MontoTotal` en Compras/Ventas se recalcula automáticamente por los
  triggers de `BD_AGRICOLA.sql` cuando se insertan detalles de compra/venta;
  los procedimientos de esta API no tocan esa lógica.
- Si necesitas que también funcionen `DetalleCompra`/`DetalleVenta` como
  formularios editables (hoy solo se listan), o que las demás páginas sueltas
  (`Parcelas.html`, `Clientes.html`, etc.) se conecten igual que `sga.html`,
  dime y lo agrego.
