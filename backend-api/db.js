require('dotenv').config();
const sql = require('mssql');

const config = {
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_DATABASE || 'BD_AGRICOLA',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_CERT !== 'false',
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

// Instancia con nombre (ej. DESKTOP-AEVFHR7\SEKHARSQL): se usa options.instanceName
// y NO se especifica puerto fijo (el driver lo resuelve vía SQL Browser, UDP 1434).
// Instancia por defecto o IP directa: se usa DB_PORT (por defecto 1433).
if (process.env.DB_INSTANCE) {
  config.options.instanceName = process.env.DB_INSTANCE;
} else {
  config.port = Number(process.env.DB_PORT) || 1433;
}

let poolPromise = null;

function getPool() {
  if (!poolPromise) {
    poolPromise = new sql.ConnectionPool(config)
      .connect()
      .catch((err) => {
        poolPromise = null; // permite reintentar en la próxima petición
        throw err;
      });
  }
  return poolPromise;
}

module.exports = { getPool, sql, config };
