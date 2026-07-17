require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { getPool, config } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

const ALLOWED_PROCEDURES = new Set([
  'sp_ListarAgricultores', 'sp_ListarTrabajadores', 'sp_ListarParcelas', 'sp_ListarCultivos',
  'sp_ListarSiembras', 'sp_ListarCosechas', 'sp_ListarInsumos', 'sp_ListarCompras',
  'sp_ListarDetalleCompra', 'sp_ListarVentas', 'sp_ListarDetalleVenta', 'sp_ListarClientes',
  'sp_ListarProveedores',

  'sp_InsertarAgricultor', 'sp_InsertarTrabajador', 'sp_InsertarParcela', 'sp_InsertarCultivo',
  'sp_InsertarSiembra', 'sp_InsertarCosecha', 'sp_InsertarInsumo', 'sp_InsertarCompra',
  'sp_InsertarVenta', 'sp_InsertarCliente', 'sp_InsertarProveedor',

  'sp_ActualizarAgricultor', 'sp_ActualizarTrabajador', 'sp_ActualizarParcela', 'sp_ActualizarCultivo',
  'sp_ActualizarSiembra', 'sp_ActualizarCosecha', 'sp_ActualizarInsumo', 'sp_ActualizarCompra',
  'sp_ActualizarVenta', 'sp_ActualizarCliente', 'sp_ActualizarProveedor',

  'sp_EliminarAgricultor', 'sp_EliminarTrabajador', 'sp_EliminarParcela', 'sp_EliminarCultivo',
  'sp_EliminarSiembra', 'sp_EliminarCosecha', 'sp_EliminarInsumo', 'sp_EliminarCompra',
  'sp_EliminarVenta', 'sp_EliminarCliente', 'sp_EliminarProveedor',
  'sp_InsertarAuditoria',
]);

function limpiarParametros(procName, body) {
  const params = { ...body };
  if (procName.startsWith('sp_Insertar')) delete params.id;
  return params;
}

async function ejecutarProcedimiento(procName, params) {
  const pool = await getPool();
  const request = pool.request();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === undefined) return;
    request.input(key, value === '' ? null : value);
  });
  return request.execute(procName);
}

app.get('/api/health', async (req, res) => {
  try {
    await getPool();
    res.json({ ok: true, database: config.database });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/api/procedures/:procName', async (req, res) => {
  const { procName } = req.params;
  if (!ALLOWED_PROCEDURES.has(procName)) {
    return res.status(404).json({ success: false, message: 'Procedimiento no permitido' });
  }
  try {
    const result = await ejecutarProcedimiento(procName, req.query);
    res.json({ success: true, rows: result.recordset || [] });
  } catch (err) {
    console.error(`Error en ${procName}:`, err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post('/api/procedures/:procName', async (req, res) => {
  const { procName } = req.params;
  if (!ALLOWED_PROCEDURES.has(procName)) {
    return res.status(404).json({ success: false, message: 'Procedimiento no permitido' });
  }
  try {
    const params = limpiarParametros(procName, req.body);
    const result = await ejecutarProcedimiento(procName, params);
    const row = result.recordset && result.recordset[0];
    res.json({ success: true, id: row ? row.id : undefined });
  } catch (err) {
    console.error(`Error en ${procName}:`, err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API del SGA escuchando en http://localhost:${PORT}`);
  console.log(`Base de datos configurada: ${config.database} @ ${config.server}`);
});
