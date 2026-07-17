let seq = { usuarios:1, agricultores:1, parcelas:1, cultivos:1, siembras:1, insumos:1,
  proveedores:1, compras:1, detalleCompra:1, trabajadores:1, actividades:1, cosechas:1,
  clientes:1, ventas:1, detalleVenta:1 };

const db = {
  usuarios: [],
  agricultores: [],
  parcelas: [],
  cultivos: [],
  siembras: [],
  insumos: [],
  proveedores: [],
  compras: [],
  detalleCompra: [],
  trabajadores: [],
  actividades: [],
  cosechas: [],
  clientes: [],
  ventas: [],
  detalleVenta: [],
  auditoria: []
};

function recalcCompras(){
  db.compras.forEach(c=>{
    c.monto = db.detalleCompra.filter(d=>d.idCompra===c.id).reduce((s,d)=>s+d.cantidad*d.precio,0);
  });
}
function recalcVentasYDisponibilidad(){
  db.cosechas.forEach(co=> co.disponibleKg = co.cantidadKg - co.perdidaKg );
  db.detalleVenta.forEach(dv=>{
    const co = db.cosechas.find(c=>c.id===dv.idCosecha);
    if(co) co.disponibleKg -= dv.cantidadKg;
  });
  db.ventas.forEach(v=>{
    v.monto = db.detalleVenta.filter(d=>d.idVenta===v.id).reduce((s,d)=>s+d.cantidadKg*d.precio,0);
  });
}
const STORAGE_KEY = 'sga_offline_state_v1';

function loadPersistedState(){
  if (typeof window === 'undefined' || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('No se pudo leer el estado persistido:', e.message);
    return null;
  }
}

function savePersistedState(){
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ db, seq }));
  } catch (e) {
    console.warn('No se pudo guardar el estado persistido:', e.message);
  }
}

const persistedState = loadPersistedState();
if (persistedState) {
  if (persistedState.db) {
    Object.keys(persistedState.db).forEach(key => {
      if (persistedState.db[key] !== undefined) db[key] = persistedState.db[key];
    });
  }
  if (persistedState.seq) {
    seq = { ...seq, ...persistedState.seq };
  }
}

recalcCompras();
recalcVentasYDisponibilidad();

function addAudit(tabla,op,detalle){
  const local = {id: db.auditoria.length+1, tabla, op, detalle, fecha: new Date().toLocaleString('es-PE')};
  db.auditoria.unshift(local);
  
  if(apiConnected){
    (async () => {
      try {
        const payload = { TablaAfectada: tabla, Operacion: op, IdRegistro: null, DetalleAnterior: null, DetalleNuevo: detalle };
        const res = await insertRow('auditoria', payload);
        if(res && res.success && res.id){
          local.id = Number(res.id);
        }
      } catch(e){
        console.warn('No se pudo persistir auditoría en BD:', e.message);
      }
    })();
  }
}

const API_URL = 'http://localhost:3000/api';
let apiConnected = false;

async function checkApiConnection(){
  try {
    const res = await fetch(`${API_URL}/health`);
    const data = await res.json();
    apiConnected = data.ok;
    console.log('✓ Backend conectado', data.database);
    return true;
  } catch(e) {
    apiConnected = false;
    console.warn('✗ Backend desconectado:', e.message);
    return false;
  }
}

async function callProcedure(procName, params = {}, method = 'GET'){
  if(!apiConnected) return null;
  try {
    const opts = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };
    let url = `${API_URL}/procedures/${procName}`;
    
    if(method === 'GET'){
      const qs = new URLSearchParams(params).toString();
      if(qs) url += '?' + qs;
    } else {
      opts.body = JSON.stringify(params);
    }
    
    const res = await fetch(url, opts);
    const data = await res.json();
    if(data.success) return data;
    throw new Error(data.message || 'Error en procedimiento');
  } catch(e) {
    console.error(`Error en ${procName}:`, e.message);
    return null;
  }
}

async function syncTableFromDB(tableName){
  const mapping = {
    agricultores: 'sp_ListarAgricultores',
    trabajadores: 'sp_ListarTrabajadores',
    parcelas: 'sp_ListarParcelas',
    cultivos: 'sp_ListarCultivos',
    siembras: 'sp_ListarSiembras',
    cosechas: 'sp_ListarCosechas',
    insumos: 'sp_ListarInsumos',
    compras: 'sp_ListarCompras',
    detalleCompra: 'sp_ListarDetalleCompra',
    ventas: 'sp_ListarVentas',
    detalleVenta: 'sp_ListarDetalleVenta',
    clientes: 'sp_ListarClientes',
    proveedores: 'sp_ListarProveedores',
  };
  
  const procName = mapping[tableName];
  if(!procName) return;
  
  const result = await callProcedure(procName);
  if(result && result.rows.length > 0){
    db[tableName] = result.rows;
    console.log(`✓ Tabla ${tableName} sincronizada (${result.rows.length} registros)`);
  }
}

async function insertRow(tableName, data){
  const mapping = {
    agricultores: 'sp_InsertarAgricultor',
    trabajadores: 'sp_InsertarTrabajador',
    parcelas: 'sp_InsertarParcela',
    cultivos: 'sp_InsertarCultivo',
    siembras: 'sp_InsertarSiembra',
    cosechas: 'sp_InsertarCosecha',
    insumos: 'sp_InsertarInsumo',
    compras: 'sp_InsertarCompra',
    ventas: 'sp_InsertarVenta',
    clientes: 'sp_InsertarCliente',
    proveedores: 'sp_InsertarProveedor',
    auditoria: 'sp_InsertarAuditoria',
  };
  
  const procName = mapping[tableName];
  if(!procName) return null;
  
  const result = await callProcedure(procName, data, 'POST');
  return result;
}

async function updateRow(tableName, data){
  const mapping = {
    agricultores: 'sp_ActualizarAgricultor',
    trabajadores: 'sp_ActualizarTrabajador',
    parcelas: 'sp_ActualizarParcela',
    cultivos: 'sp_ActualizarCultivo',
    siembras: 'sp_ActualizarSiembra',
    cosechas: 'sp_ActualizarCosecha',
    insumos: 'sp_ActualizarInsumo',
    compras: 'sp_ActualizarCompra',
    ventas: 'sp_ActualizarVenta',
    clientes: 'sp_ActualizarCliente',
    proveedores: 'sp_ActualizarProveedor',
  };
  
  const procName = mapping[tableName];
  if(!procName) return null;
  
  const result = await callProcedure(procName, data, 'POST');
  return result;
}

async function deleteRow(tableName, id){
  const mapping = {
    agricultores: 'sp_EliminarAgricultor',
    trabajadores: 'sp_EliminarTrabajador',
    parcelas: 'sp_EliminarParcela',
    cultivos: 'sp_EliminarCultivo',
    siembras: 'sp_EliminarSiembra',
    cosechas: 'sp_EliminarCosecha',
    insumos: 'sp_EliminarInsumo',
    compras: 'sp_EliminarCompra',
    ventas: 'sp_EliminarVenta',
    clientes: 'sp_EliminarCliente',
    proveedores: 'sp_EliminarProveedor',
  };
  
  const procName = mapping[tableName];
  if(!procName) return null;
  
  const result = await callProcedure(procName, {id}, 'POST');
  return result;
}

const fmt = n => (Number(n)||0).toLocaleString('es-PE',{minimumFractionDigits:2,maximumFractionDigits:2});
const money = n => 'S/ ' + fmt(n);
function toast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(window._tt);
  window._tt=setTimeout(()=>t.classList.remove('show'),2600);
}
function icon(name){
  const icons = {
    dashboard:'<path d="M3 3h7v9H3V3zm0 11h7v7H3v-7zm11-11h7v5h-7V3zm0 7h7v11h-7V10z"/>',
    people:'<circle cx="9" cy="7" r="3"/><path d="M2 20c0-4 3-6 7-6s7 2 7 6"/><circle cx="17" cy="8" r="2.4"/><path d="M15.5 14c2.8.4 4.5 2.2 4.5 6"/>',
    field:'<path d="M3 20h18M4 20V9l8-6 8 6v11M9 20v-6h6v6"/>',
    seed:'<path d="M12 22c5-2 8-6 8-11a8 8 0 0 0-8-8 8 8 0 0 0-8 8c0 5 3 9 8 11z"/><path d="M12 12v10"/>',
    sprout:'<path d="M12 3c0 5-3 6-3 10a3 3 0 0 0 6 0c0-4-3-5-3-10z"/><path d="M12 22V13"/>',
    box:'<path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v9l9 5 9-5V8"/><path d="M12 13V22"/>',
    truck:'<rect x="1" y="6" width="13" height="10"/><path d="M14 10h5l3 3v3h-8z"/><circle cx="5" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
    cart:'<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.4 12.4a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 7H5.6"/>',
    worker:'<circle cx="12" cy="7" r="3.2"/><path d="M5 21c0-4.5 3.1-7 7-7s7 2.5 7 7"/>',
    task:'<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M8 9h8M8 13h8M8 17h4"/>',
    harvest:'<path d="M6 12c0-5 3-9 6-9s6 4 6 9-3 6-6 6-6-1-6-6z"/><path d="M12 18v3"/>',
    client:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.5 3.6-7 8-7s8 2.5 8 7"/>',
    sale:'<path d="M3 12l6-8h6l6 8-6 8H9z"/><path d="M12 8v8"/>',
    report:'<path d="M4 3h12l4 4v14H4z"/><path d="M16 3v4h4"/><path d="M8 12h8M8 16h8M8 8h4"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    edit:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    trash:'<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M6 6l1 14h10l1-14"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  };
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[name]||''}</svg>`;
}

const modules = [
  {group:'General', items:[
    {key:'dashboard', label:'Resumen', icon:'dashboard'},
  ]},
  {group:'Personas', items:[
    {key:'agricultores', label:'Agricultores', icon:'people', table:'agricultores'},
    {key:'trabajadores', label:'Trabajadores', icon:'worker', table:'trabajadores'},
    {key:'clientes', label:'Clientes', icon:'client', table:'clientes'},
    {key:'proveedores', label:'Proveedores', icon:'truck', table:'proveedores'},
  ]},
  {group:'Producción', items:[
    {key:'parcelas', label:'Parcelas', icon:'field', table:'parcelas'},
    {key:'cultivos', label:'Cultivos', icon:'seed', table:'cultivos'},
    {key:'siembras', label:'Siembras', icon:'sprout', table:'siembras'},
    {key:'actividades', label:'Actividades', icon:'task', table:'actividades'},
    {key:'cosechas', label:'Cosechas', icon:'harvest', table:'cosechas'},
  ]},
  {group:'Insumos y comercio', items:[
    {key:'insumos', label:'Insumos', icon:'box', table:'insumos'},
    {key:'compras', label:'Compras', icon:'cart', table:'compras'},
    {key:'ventas', label:'Ventas', icon:'sale', table:'ventas'},
  ]},
  {group:'Análisis', items:[
    {key:'reportes', label:'Reportes y rankings', icon:'report'},
    {key:'auditoria', label:'Auditoría', icon:'edit'},
  ]},
];

let currentView='dashboard';
let editingId=null;

function buildNav(){
  const nav=document.getElementById('nav');
  nav.innerHTML='';
  modules.forEach(g=>{
    const label=document.createElement('div');
    label.className='nav-group-label'; label.textContent=g.group;
    nav.appendChild(label);
    g.items.forEach(it=>{
      const el=document.createElement('div');
      el.className='nav-item'+(it.key===currentView?' active':'');
      el.onclick=()=>navigate(it.key);
      const count = it.table ? `<span class="nav-count">${db[it.table].length}</span>` : '';
      el.innerHTML = icon(it.icon) + `<span class="label">${it.label}</span>` + count;
      nav.appendChild(el);
    });
  });
}
function navigate(key){
  currentView=key;
  buildNav();
  render();
}

function render(){
  const root=document.getElementById('viewRoot');
  const titleEl=document.getElementById('pageTitle');
  const descEl=document.getElementById('pageDesc');
  const crumbEl=document.getElementById('crumb');
  const actionsEl=document.getElementById('topbarActions');
  actionsEl.innerHTML='';
  root.innerHTML='';

  const titles = {
    dashboard:['Panel','Resumen de campaña','Estado general de parcelas, cosechas, inventario y ventas.'],
    agricultores:['Personas','Agricultores','Padrón de agricultores asociados y sus datos de contacto.'],
    trabajadores:['Personas','Trabajadores','Personal de campo disponible para actividades agrícolas.'],
    clientes:['Personas','Clientes','Compradores registrados de las cosechas.'],
    proveedores:['Personas','Proveedores','Proveedores de insumos agrícolas.'],
    parcelas:['Producción','Parcelas','Terrenos registrados por cada agricultor.'],
    cultivos:['Producción','Cultivos','Catálogo de cultivos y su precio referencial por kilo.'],
    siembras:['Producción','Siembras','Siembras activas e históricas por parcela y cultivo.'],
    actividades:['Producción','Actividades agrícolas','Labores de campo registradas por trabajador.'],
    cosechas:['Producción','Cosechas','Cosechas registradas y su disponibilidad para venta.'],
    insumos:['Insumos y comercio','Inventario de insumos','Stock actual frente al mínimo definido.'],
    compras:['Insumos y comercio','Compras a proveedores','Historial de compras de insumos.'],
    ventas:['Insumos y comercio','Ventas a clientes','Historial de ventas de cosechas.'],
    reportes:['Análisis','Reportes y rankings','Producción, costos, ingresos y clasificaciones.'],
    auditoria:['Análisis','Registro de auditoría','Bitácora de cambios sobre las tablas principales.'],
  };
  const [crumb,title,desc]=titles[currentView];
  crumbEl.textContent=crumb; titleEl.textContent=title; descEl.textContent=desc;

  if(currentView==='dashboard') return renderDashboard(root);
  if(currentView==='reportes') return renderReportes(root);
  if(currentView==='auditoria') return renderAuditoria(root);

  renderTableView(root, actionsEl, currentView);
}

function renderDashboard(root){
  const totalKg = db.cosechas.reduce((s,c)=>s+c.cantidadKg,0);
  const totalVentas = db.ventas.filter(v=>v.estado!=='Anulada').reduce((s,v)=>s+v.monto,0);
  const bajoStock = db.insumos.filter(i=>i.stock<=i.stockMin).length;
  const parcelasActivas = db.siembras.filter(s=>s.estado!=='Cosechado').length;

  root.innerHTML = `
  <div class="kpi-row">
    <div class="ticket">
      <div class="tk-label">Producción total</div>
      <div class="tk-value">${fmt(totalKg)} <small style="font-size:14px;font-family:'Public Sans'">kg</small></div>
      <div class="tk-foot"><span>${db.cosechas.length} cosechas registradas</span><span class="tk-flag ok">Vigente</span></div>
    </div>
    <div class="ticket">
      <div class="tk-label">Ingresos por ventas</div>
      <div class="tk-value">${money(totalVentas)}</div>
      <div class="tk-foot"><span>${db.ventas.length} comprobantes</span><span class="tk-flag ok">Acumulado</span></div>
    </div>
    <div class="ticket">
      <div class="tk-label">Insumos bajo mínimo</div>
      <div class="tk-value">${bajoStock}</div>
      <div class="tk-foot"><span>de ${db.insumos.length} insumos</span><span class="tk-flag ${bajoStock>0?'warn':'ok'}">${bajoStock>0?'Reabastecer':'OK'}</span></div>
    </div>
    <div class="ticket">
      <div class="tk-label">Siembras en curso</div>
      <div class="tk-value">${parcelasActivas}</div>
      <div class="tk-foot"><span>de ${db.siembras.length} siembras</span><span class="tk-flag info">Campaña 2025-II</span></div>
    </div>
  </div>

  <div class="panel-grid">
    <div class="panel">
      <h3>Producción por cultivo <small>kg cosechados</small></h3>
      <div id="barCultivos"></div>
    </div>
    <div class="panel">
      <h3>Ranking de agricultores <small>por ingresos</small></h3>
      <ul class="rank-list" id="rankAgricultores"></ul>
    </div>
  </div>

  <div class="panel-grid">
    <div class="panel">
      <h3>Inventario crítico <small>stock vs. mínimo</small></h3>
      <div id="barInsumos"></div>
    </div>
    <div class="panel">
      <h3>Ranking de clientes <small>por compras</small></h3>
      <ul class="rank-list" id="rankClientes"></ul>
    </div>
  </div>
  `;

  
  const prodCultivo = db.cultivos.map(c=>{
    const kg = db.siembras.filter(s=>s.idCultivo===c.id).reduce((sum,s)=>{
      const co = db.cosechas.find(x=>x.idSiembra===s.id);
      return sum + (co?co.cantidadKg:0);
    },0);
    return {nombre:c.nombre, kg};
  }).filter(x=>x.kg>0).sort((a,b)=>b.kg-a.kg);
  const maxKg = Math.max(...prodCultivo.map(x=>x.kg),1);
  document.getElementById('barCultivos').innerHTML = prodCultivo.map(x=>`
    <div class="bar-row">
      <div>${x.nombre}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${x.kg/maxKg*100}%"></div></div>
      <div class="bar-val">${fmt(x.kg)}</div>
    </div>`).join('');

  
  const insumosSorted = [...db.insumos].sort((a,b)=> (a.stock/a.stockMin) - (b.stock/b.stockMin)).slice(0,6);
  const maxStock = Math.max(...insumosSorted.map(x=>x.stock),1);
  document.getElementById('barInsumos').innerHTML = insumosSorted.map(x=>{
    const crit = x.stock<=x.stockMin;
    return `<div class="bar-row">
      <div>${x.nombre}</div>
      <div class="bar-track"><div class="bar-fill" style="width:${Math.min(x.stock/maxStock*100,100)}%; background:${crit?'var(--clay)':'var(--canal)'}"></div></div>
      <div class="bar-val">${fmt(x.stock)} ${x.unidad}</div>
    </div>`;
  }).join('');

  
  const rankAg = db.agricultores.map(a=>{
    const parcelasIds = db.parcelas.filter(p=>p.idAgricultor===a.id).map(p=>p.id);
    const siembraIds = db.siembras.filter(s=>parcelasIds.includes(s.idParcela)).map(s=>s.id);
    const cosechaIds = db.cosechas.filter(c=>siembraIds.includes(c.idSiembra)).map(c=>c.id);
    const ingreso = db.detalleVenta.filter(dv=>cosechaIds.includes(dv.idCosecha)).reduce((s,dv)=>s+dv.cantidadKg*dv.precio,0);
    return {nombre:`${a.nombres} ${a.apellidos}`, ingreso};
  }).sort((a,b)=>b.ingreso-a.ingreso).slice(0,6);
  document.getElementById('rankAgricultores').innerHTML = rankAg.map((r,i)=>`
    <li><div class="rank-num">${i+1}</div><div class="rank-name">${r.nombre}</div><div class="rank-val">${money(r.ingreso)}</div></li>
  `).join('');

  
  const rankCl = db.clientes.map(c=>{
    const total = db.ventas.filter(v=>v.idCliente===c.id && v.estado!=='Anulada').reduce((s,v)=>s+v.monto,0);
    return {nombre:c.nombre, total};
  }).sort((a,b)=>b.total-a.total).slice(0,6);
  document.getElementById('rankClientes').innerHTML = rankCl.map((r,i)=>`
    <li><div class="rank-num">${i+1}</div><div class="rank-name">${r.nombre}</div><div class="rank-val">${money(r.total)}</div></li>
  `).join('');
}

function renderReportes(root){
  
  const porParcela = db.parcelas.map(p=>{
    const ag = db.agricultores.find(a=>a.id===p.idAgricultor);
    const siembraIds = db.siembras.filter(s=>s.idParcela===p.id).map(s=>s.id);
    const kg = db.cosechas.filter(c=>siembraIds.includes(c.idSiembra)).reduce((s,c)=>s+c.cantidadKg,0);
    return {parcela:p.nombre, agricultor: ag?`${ag.nombres} ${ag.apellidos}`:'—', kg};
  }).sort((a,b)=>b.kg-a.kg);

  
  const porProveedor = db.proveedores.map(p=>{
    const compras = db.compras.filter(c=>c.idProveedor===p.id);
    return {proveedor:p.razonSocial, n:compras.length, total: compras.reduce((s,c)=>s+c.monto,0)};
  }).sort((a,b)=>b.total-a.total);

  
  const porTrabajador = db.trabajadores.map(t=>{
    const acts = db.actividades.filter(a=>a.idTrabajador===t.id);
    return {trabajador:`${t.nombres} ${t.apellidos}`, n:acts.length, horas: acts.reduce((s,a)=>s+a.horas,0)};
  }).sort((a,b)=>b.n-a.n);

  
  const camp = {};
  db.siembras.forEach(s=>{
    const cos = db.cosechas.find(c=>c.idSiembra===s.id);
    if(!cos) return;
    const ingreso = db.detalleVenta.filter(dv=>dv.idCosecha===cos.id).reduce((sum,dv)=>sum+dv.cantidadKg*dv.precio,0);
    camp[s.campania] = (camp[s.campania]||0) + ingreso;
  });

  
  const rankCultivos = db.cultivos.map(c=>{
    const kg = db.siembras.filter(s=>s.idCultivo===c.id).reduce((sum,s)=>{
      const co=db.cosechas.find(x=>x.idSiembra===s.id); return sum+(co?co.cantidadKg:0);
    },0);
    return {nombre:c.nombre, kg};
  }).sort((a,b)=>b.kg-a.kg);

  root.innerHTML = `
    <div class="panel-grid">
      <div class="panel">
        <h3>Producción por parcela <small>kg cosechados</small></h3>
        <div class="table-wrap"><table><thead><tr><th>Parcela</th><th>Agricultor</th><th class="num">Kg</th></tr></thead>
        <tbody>${porParcela.map(r=>`<tr><td>${r.parcela}</td><td>${r.agricultor}</td><td class="num">${fmt(r.kg)}</td></tr>`).join('')}</tbody></table></div>
      </div>
      <div class="panel">
        <h3>Ranking de cultivos <small>mayor producción</small></h3>
        <ul class="rank-list">${rankCultivos.map((r,i)=>`<li><div class="rank-num">${i+1}</div><div class="rank-name">${r.nombre}</div><div class="rank-val">${fmt(r.kg)} kg</div></li>`).join('')}</ul>
      </div>
    </div>

    <div class="panel-grid">
      <div class="panel">
        <h3>Compras por proveedor</h3>
        <div class="table-wrap"><table><thead><tr><th>Proveedor</th><th class="num">N° compras</th><th class="num">Total</th></tr></thead>
        <tbody>${porProveedor.map(r=>`<tr><td>${r.proveedor}</td><td class="num">${r.n}</td><td class="num">${money(r.total)}</td></tr>`).join('')}</tbody></table></div>
      </div>
      <div class="panel">
        <h3>Trabajadores <small>por actividades</small></h3>
        <div class="table-wrap"><table><thead><tr><th>Trabajador</th><th class="num">Actividades</th><th class="num">Horas</th></tr></thead>
        <tbody>${porTrabajador.map(r=>`<tr><td>${r.trabajador}</td><td class="num">${r.n}</td><td class="num">${fmt(r.horas)}</td></tr>`).join('')}</tbody></table></div>
      </div>
    </div>

    <div class="panel-grid">
      <div class="panel">
        <h3>Ingresos por campaña agrícola</h3>
        <div class="table-wrap"><table><thead><tr><th>Campaña</th><th class="num">Ingreso</th></tr></thead>
        <tbody>${Object.entries(camp).map(([k,v])=>`<tr><td>${k}</td><td class="num">${money(v)}</td></tr>`).join('')}</tbody></table></div>
      </div>
      <div class="panel">
        <h3>Inventario actual <small>valor total</small></h3>
        <div class="table-wrap"><table><thead><tr><th>Insumo</th><th class="num">Stock</th><th class="num">Valor</th></tr></thead>
        <tbody>${db.insumos.map(i=>`<tr><td>${i.nombre}</td><td class="num">${fmt(i.stock)} ${i.unidad}</td><td class="num">${money(i.stock*i.precio)}</td></tr>`).join('')}</tbody></table></div>
      </div>
    </div>
  `;
}

function renderAuditoria(root){
  if(db.auditoria.length===0){
    root.innerHTML = `<div class="table-wrap"><div class="empty-state"><b>Sin movimientos todavía</b>Los cambios que hagas en Compras, Ventas, Cosechas e Insumos quedarán registrados aquí, igual que los triggers de auditoría en SQL Server.</div></div>`;
    return;
  }
  root.innerHTML = `<div class="table-wrap"><table><thead><tr><th>Fecha</th><th>Tabla</th><th>Operación</th><th>Detalle</th></tr></thead>
    <tbody>${db.auditoria.map(a=>`<tr><td>${a.fecha}</td><td>${a.tabla}</td><td><span class="pill ${a.op==='INSERT'?'ok':a.op==='DELETE'?'bad':'info'}">${a.op}</span></td><td>${a.detalle}</td></tr>`).join('')}</tbody></table></div>`;
}

const tableConfigs = {
  agricultores:{
    title:'Nuevo agricultor',
    cols:[
      {k:'nombres',label:'Nombres'},{k:'apellidos',label:'Apellidos'},
      {k:'dni',label:'DNI'},{k:'telefono',label:'Teléfono'},{k:'direccion',label:'Dirección'},
    ],
    fields:[
      {k:'nombres',label:'Nombres',type:'text',req:true},
      {k:'apellidos',label:'Apellidos',type:'text',req:true},
      {k:'dni',label:'DNI',type:'text',req:true,unique:true,inputMode:'numeric',maxLength:8,pattern:'\\d{8}'},
      {k:'telefono',label:'Teléfono',type:'text',inputMode:'numeric',maxLength:9,pattern:'\\d{9}'},
      {k:'direccion',label:'Dirección',type:'text'},
    ],
  },
  trabajadores:{
    title:'Nuevo trabajador',
    cols:[{k:'nombres',label:'Nombres'},{k:'apellidos',label:'Apellidos'},{k:'dni',label:'DNI'},{k:'cargo',label:'Cargo'},{k:'salario',label:'Salario/día',num:true},{k:'fechaContrato',label:'Contratado'}],
    fields:[
      {k:'nombres',label:'Nombres',type:'text',req:true},
      {k:'apellidos',label:'Apellidos',type:'text',req:true},
      {k:'dni',label:'DNI',type:'text',req:true,unique:true,inputMode:'numeric',maxLength:8,pattern:'\\d{8}'},
      {k:'telefono',label:'Teléfono',type:'text',inputMode:'numeric',maxLength:9,pattern:'\\d{9}'},
      {k:'cargo',label:'Cargo',type:'select',options:['Jornalero','Capataz','Regador','Fumigador'],req:true},
      {k:'salario',label:'Salario diario (S/)',type:'number',req:true},
      {k:'fechaContrato',label:'Fecha de contratación',type:'date',req:true},
    ],
  },
  clientes:{
    title:'Nuevo cliente',
    cols:[{k:'nombre',label:'Nombre / Razón social'},{k:'tipo',label:'Tipo'},{k:'doc',label:'Documento'},{k:'telefono',label:'Teléfono'}],
    fields:[
      {k:'nombre',label:'Nombre / razón social',type:'text',req:true},
      {k:'tipo',label:'Tipo de cliente',type:'select',options:['Natural','Empresa'],req:true},
      {k:'doc',label:'DNI / RUC',type:'text',req:true,unique:true},
      {k:'telefono',label:'Teléfono',type:'text'},
      {k:'direccion',label:'Dirección',type:'text'},
      {k:'email',label:'Correo',type:'text'},
    ],
  },
  proveedores:{
    title:'Nuevo proveedor',
    cols:[{k:'razonSocial',label:'Razón social'},{k:'ruc',label:'RUC'},{k:'telefono',label:'Teléfono'},{k:'email',label:'Correo'}],
    fields:[
      {k:'razonSocial',label:'Razón social',type:'text',req:true},
      {k:'ruc',label:'RUC',type:'text',req:true,unique:true},
      {k:'telefono',label:'Teléfono',type:'text'},
      {k:'direccion',label:'Dirección',type:'text'},
      {k:'email',label:'Correo',type:'text'},
    ],
  },
  parcelas:{
    title:'Nueva parcela',
    cols:[{k:'nombre',label:'Parcela'},{k:'_agricultor',label:'Agricultor'},{k:'ubicacion',label:'Ubicación'},{k:'area',label:'Ha',num:true},{k:'suelo',label:'Suelo'}],
    fields:[
      {k:'nombre',label:'Nombre de la parcela',type:'text',req:true},
      {k:'idAgricultor',label:'Agricultor',type:'select',ref:'agricultores',refLabel:a=>`${a.nombres} ${a.apellidos}`,req:true},
      {k:'ubicacion',label:'Ubicación',type:'text',req:true},
      {k:'area',label:'Área (hectáreas)',type:'number',req:true},
      {k:'suelo',label:'Tipo de suelo',type:'select',options:['Arenoso','Franco','Arcilloso','Franco Arenoso','Franco Arcilloso'],req:true},
    ],
  },
  cultivos:{
    title:'Nuevo cultivo',
    cols:[{k:'nombre',label:'Cultivo'},{k:'tipo',label:'Tipo'},{k:'ciclo',label:'Ciclo (días)',num:true},{k:'precio',label:'Precio ref./kg',num:true}],
    fields:[
      {k:'nombre',label:'Nombre del cultivo',type:'text',req:true,unique:true},
      {k:'tipo',label:'Tipo',type:'select',options:['Industrial','Hortaliza','Fruta','Cereal','Tuberculo','Legumbre'],req:true},
      {k:'ciclo',label:'Ciclo (días)',type:'number',req:true},
      {k:'precio',label:'Precio referencial por kg (S/)',type:'number',req:true},
    ],
  },
  siembras:{
    title:'Nueva siembra',
    cols:[{k:'_parcela',label:'Parcela'},{k:'_cultivo',label:'Cultivo'},{k:'fecha',label:'Fecha siembra'},{k:'campania',label:'Campaña'},{k:'estado',label:'Estado', pill:true}],
    fields:[
      {k:'idParcela',label:'Parcela',type:'select',ref:'parcelas',refLabel:p=>p.nombre,req:true},
      {k:'idCultivo',label:'Cultivo',type:'select',ref:'cultivos',refLabel:c=>c.nombre,req:true},
      {k:'fecha',label:'Fecha de siembra',type:'date',req:true},
      {k:'semillaKg',label:'Semilla utilizada (kg)',type:'number',req:true},
      {k:'campania',label:'Campaña agrícola',type:'text',req:true,placeholder:'2026-I'},
      {k:'estado',label:'Estado',type:'select',options:['Sembrado','En Crecimiento','Cosechado','Perdido'],req:true},
    ],
  },
  actividades:{
    title:'Nueva actividad agrícola',
    cols:[{k:'_siembra',label:'Siembra'},{k:'_trabajador',label:'Trabajador'},{k:'tipo',label:'Actividad'},{k:'fecha',label:'Fecha'},{k:'horas',label:'Horas',num:true}],
    fields:[
      {k:'idSiembra',label:'Siembra',type:'select',ref:'siembras',refLabel:s=>{const c=db.cultivos.find(x=>x.id===s.idCultivo);const p=db.parcelas.find(x=>x.id===s.idParcela);return `#${s.id} · ${p?p.nombre:''} · ${c?c.nombre:''}`;},req:true},
      {k:'idTrabajador',label:'Trabajador',type:'select',ref:'trabajadores',refLabel:t=>`${t.nombres} ${t.apellidos}`,req:true},
      {k:'tipo',label:'Tipo de actividad',type:'select',options:['Preparacion Terreno','Siembra','Riego','Fertilizacion','Control Plagas','Deshierbe','Cosecha','Otro'],req:true},
      {k:'fecha',label:'Fecha',type:'date',req:true},
      {k:'horas',label:'Horas trabajadas',type:'number',req:true},
    ],
  },
  cosechas:{
    title:'Registrar cosecha',
    cols:[{k:'_siembra',label:'Siembra'},{k:'fecha',label:'Fecha'},{k:'cantidadKg',label:'Kg cosechados',num:true},{k:'perdidaKg',label:'Pérdida kg',num:true},{k:'disponibleKg',label:'Disponible',num:true},{k:'calidad',label:'Calidad',pill:true}],
    fields:[
      {k:'idSiembra',label:'Siembra',type:'select',ref:'siembras',refLabel:s=>{const c=db.cultivos.find(x=>x.id===s.idCultivo);const p=db.parcelas.find(x=>x.id===s.idParcela);return `#${s.id} · ${p?p.nombre:''} · ${c?c.nombre:''}`;},req:true,filter:s=>!db.cosechas.some(c=>c.idSiembra===s.id)},
      {k:'fecha',label:'Fecha de cosecha',type:'date',req:true},
      {k:'cantidadKg',label:'Cantidad cosechada (kg)',type:'number',req:true},
      {k:'perdidaKg',label:'Pérdida (kg)',type:'number'},
      {k:'calidad',label:'Calidad',type:'select',options:['Excelente','Buena','Regular','Mala'],req:true},
    ],
    onSave(rec, isNew){
      rec.perdidaKg = rec.perdidaKg||0;
      rec.disponibleKg = rec.cantidadKg - rec.perdidaKg;
      const s = db.siembras.find(x=>x.id===rec.idSiembra);
      if(s){
        s.estado='Cosechado';
        addAudit('Siembras','UPDATE', `Siembra #${s.id} marcada como Cosechado`);
      }
      addAudit('Cosechas', isNew?'INSERT':'UPDATE', `Cosecha #${rec.id} registrada/actualizada (${rec.cantidadKg} kg)`);
    },
  },
  insumos:{
    title:'Nuevo insumo',
    cols:[{k:'nombre',label:'Insumo'},{k:'tipo',label:'Tipo'},{k:'stock',label:'Stock',num:true},{k:'stockMin',label:'Mínimo',num:true},{k:'precio',label:'Precio unit.',num:true},{k:'_estado',label:'Estado',pill:true}],
    fields:[
      {k:'nombre',label:'Nombre del insumo',type:'text',req:true},
      {k:'tipo',label:'Tipo',type:'select',options:['Fertilizante','Pesticida','Semilla','Herramienta','Otro'],req:true},
      {k:'unidad',label:'Unidad de medida',type:'select',options:['kg','lt','unidad','metro'],req:true},
      {k:'stock',label:'Stock actual',type:'number',req:true},
      {k:'stockMin',label:'Stock mínimo',type:'number',req:true},
      {k:'precio',label:'Precio unitario (S/)',type:'number',req:true},
    ],
  },
  compras:{
    title:'Nueva compra',
    cols:[{k:'factura',label:'N° Factura'},{k:'_proveedor',label:'Proveedor'},{k:'fecha',label:'Fecha'},{k:'_insumo',label:'Insumo'},{k:'monto',label:'Monto',num:true},{k:'estado',label:'Estado',pill:true}],
    fields:[
      {k:'idProveedor',label:'Proveedor',type:'select',ref:'proveedores',refLabel:p=>p.razonSocial,req:true},
      {k:'factura',label:'N° de factura',type:'text',req:true,unique:true},
      {k:'fecha',label:'Fecha de compra',type:'date',req:true},
      {k:'estado',label:'Estado',type:'select',options:['Registrada','Pagada','Anulada'],req:true},
      {k:'idInsumo',label:'Insumo comprado',type:'select',ref:'insumos',refLabel:i=>i.nombre,req:true},
      {k:'cantidad',label:'Cantidad',type:'number',req:true},
      {k:'precio',label:'Precio unitario (S/)',type:'number',req:true},
    ],
    validate(rec){
      if(rec.cantidad <= 0){
        return 'La cantidad debe ser mayor a 0.';
      }
      return null;
    },
    onSave(rec, isNew){
      const det = {idInsumo:rec.idInsumo, cantidad:rec.cantidad, precio:rec.precio};
      delete rec.idInsumo; delete rec.cantidad; delete rec.precio;
      rec.monto = det.cantidad*det.precio;
      if(isNew){
        db.detalleCompra.push({id:seq.detalleCompra++, idCompra:rec.id, ...det});
        const ins = db.insumos.find(i=>i.id===det.idInsumo);
        if(ins){ ins.stock += det.cantidad; addAudit('Insumos','UPDATE',`Stock actualizado: ${ins.nombre} +${det.cantidad}`); }
        addAudit('Compras','INSERT', `Compra #${rec.id} creada (factura ${rec.factura})`);
      } else {
        addAudit('Compras','UPDATE', `Compra #${rec.id} modificada (factura ${rec.factura})`);
      }
    },
  },
  ventas:{
    title:'Nueva venta',
    cols:[{k:'comprobante',label:'Comprobante'},{k:'_cliente',label:'Cliente'},{k:'fecha',label:'Fecha'},{k:'_cosecha',label:'Cosecha'},{k:'monto',label:'Monto',num:true},{k:'estado',label:'Estado',pill:true}],
    fields:[
      {k:'idCliente',label:'Cliente',type:'select',ref:'clientes',refLabel:c=>c.nombre,req:true},
      {k:'comprobante',label:'N° de comprobante',type:'text',req:true,unique:true},
      {k:'fecha',label:'Fecha de venta',type:'date',req:true},
      {k:'estado',label:'Estado',type:'select',options:['Registrada','Pagada','Anulada'],req:true},
      {k:'idCosecha',label:'Cosecha vendida',type:'select',ref:'cosechas',refLabel:c=>{const s=db.siembras.find(x=>x.id===c.idSiembra);const cu=s?db.cultivos.find(x=>x.id===s.idCultivo):null;return `#${c.id} · ${cu?cu.nombre:''} · disp. ${fmt(c.disponibleKg)} kg`;},req:true},
      {k:'cantidadKg',label:'Cantidad a vender (kg)',type:'number',req:true},
      {k:'precio',label:'Precio unitario (S/)',type:'number',req:true},
    ],
    validate(rec){
      if(rec.cantidadKg <= 0){
        return 'La cantidad debe ser mayor a 0.';
      }
      const co = db.cosechas.find(c=>c.id===rec.idCosecha);
      if(co && rec.cantidadKg > co.disponibleKg){
        return `La cosecha #${co.id} solo tiene ${fmt(co.disponibleKg)} kg disponibles.`;
      }
      return null;
    },
    onSave(rec, isNew){
      const det = {idCosecha:rec.idCosecha, cantidadKg:rec.cantidadKg, precio:rec.precio};
      delete rec.idCosecha; delete rec.cantidadKg; delete rec.precio;
      rec.monto = det.cantidadKg*det.precio;
      if(isNew){
        db.detalleVenta.push({id:seq.detalleVenta++, idVenta:rec.id, ...det});
        const co = db.cosechas.find(c=>c.id===det.idCosecha);
        if(co){
          co.disponibleKg -= det.cantidadKg;
          addAudit('Cosechas','UPDATE', `Cosecha #${co.id} disponible ajustado -${det.cantidadKg} kg`);
        }
        addAudit('Ventas','INSERT', `Venta #${rec.id} creada (comprobante ${rec.comprobante})`);
      } else {
        addAudit('Ventas','UPDATE', `Venta #${rec.id} modificada (comprobante ${rec.comprobante})`);
      }
    },
  },
};

function renderTableView(root, actionsEl, key){
  const cfg = tableConfigs[key];
  actionsEl.innerHTML = `<button class="btn" id="btnNew">${icon('plus')} ${cfg.title}</button>`;
  document.getElementById('btnNew').onclick=()=>openForm(key,null);

  root.innerHTML = `
    <div class="toolbar">
      <div class="search-box">${icon('search')}<input type="text" id="searchInput" placeholder="Buscar en ${cfg.cols[0].label.toLowerCase()}..."></div>
    </div>
    <div class="table-wrap" id="tableWrap"></div>
  `;
  document.getElementById('searchInput').oninput = e=> paintTable(key, e.target.value);
  paintTable(key,'');
}

function decorate(key, row){
  const cfg = tableConfigs[key];
  const out = {...row};
  if(key==='parcelas'){ const a=db.agricultores.find(x=>x.id===row.idAgricultor); out._agricultor = a?`${a.nombres} ${a.apellidos}`:'—'; }
  if(key==='siembras'){
    const p=db.parcelas.find(x=>x.id===row.idParcela); const c=db.cultivos.find(x=>x.id===row.idCultivo);
    out._parcela = p?p.nombre:'—'; out._cultivo = c?c.nombre:'—';
  }
  if(key==='actividades'){
    const s=db.siembras.find(x=>x.id===row.idSiembra); const t=db.trabajadores.find(x=>x.id===row.idTrabajador);
    const c = s? db.cultivos.find(x=>x.id===s.idCultivo):null;
    out._siembra = s? `#${s.id} · ${c?c.nombre:''}` : '—';
    out._trabajador = t?`${t.nombres} ${t.apellidos}`:'—';
  }
  if(key==='cosechas'){
    const s=db.siembras.find(x=>x.id===row.idSiembra); const c= s?db.cultivos.find(x=>x.id===s.idCultivo):null;
    const p = s? db.parcelas.find(x=>x.id===s.idParcela):null;
    out._siembra = `${c?c.nombre:''} · ${p?p.nombre:''}`;
  }
  if(key==='insumos'){ out._estado = row.stock<=row.stockMin ? 'Reabastecer' : 'OK'; }
  if(key==='compras'){
    const pr=db.proveedores.find(x=>x.id===row.idProveedor);
    const det = db.detalleCompra.find(d=>d.idCompra===row.id);
    const ins = det? db.insumos.find(x=>x.id===det.idInsumo):null;
    out._proveedor = pr?pr.razonSocial:'—';
    out._insumo = ins? `${ins.nombre} (${det.cantidad} ${ins.unidad})` : '—';
  }
  if(key==='ventas'){
    const cl=db.clientes.find(x=>x.id===row.idCliente);
    const det = db.detalleVenta.find(d=>d.idVenta===row.id);
    const co = det? db.cosechas.find(x=>x.id===det.idCosecha):null;
    const s = co? db.siembras.find(x=>x.id===co.idSiembra):null;
    const cu = s? db.cultivos.find(x=>x.id===s.idCultivo):null;
    out._cliente = cl?cl.nombre:'—';
    out._cosecha = det? `${cu?cu.nombre:''} · ${fmt(det.cantidadKg)} kg` : '—';
  }
  return out;
}

function paintTable(key, filterText){
  const cfg = tableConfigs[key];
  const wrap = document.getElementById('tableWrap');
  let rows = db[key].map(r=>decorate(key,r));
  if(filterText){
    const f = filterText.toLowerCase();
    rows = rows.filter(r=> Object.values(r).some(v=>String(v).toLowerCase().includes(f)));
  }
  if(rows.length===0){
    wrap.innerHTML = `<div class="empty-state"><b>No hay registros</b>Prueba con otro término o crea uno nuevo con el botón de arriba.</div>`;
    return;
  }
  const head = cfg.cols.map(c=>`<th class="${c.num?'num':''}">${c.label}</th>`).join('')+'<th></th>';
  const body = rows.map(r=>{
    const tds = cfg.cols.map(c=>{
      let val = r[c.k];
      if(c.num) val = fmt(val);
      if(c.pill) return `<td><span class="pill ${pillClass(val)}">${val}</span></td>`;
      return `<td class="${c.num?'num':''}">${val!==undefined && val!==null && val!=='' ? val : '—'}</td>`;
    }).join('');
    return `<tr>${tds}<td><div class="row-actions">
      <button class="icon-btn" onclick="openForm('${key}',${r.id})">${icon('edit')}</button>
      <button class="icon-btn del" onclick="removeRow('${key}',${r.id})">${icon('trash')}</button>
    </div></td></tr>`;
  }).join('');
  wrap.innerHTML = `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function pillClass(val){
  const okVals=['OK','Pagada','Cosechado','Excelente','Buena'];
  const warnVals=['Reabastecer','Registrada','En Crecimiento','Regular','Sembrado'];
  const badVals=['Anulada','Perdido','Mala'];
  if(okVals.includes(val)) return 'ok';
  if(warnVals.includes(val)) return 'warn';
  if(badVals.includes(val)) return 'bad';
  return 'info';
}

function openForm(key, id){
  editingId = id;
  const cfg = tableConfigs[key];
  const record = id ? db[key].find(r=>r.id===id) : {};
  document.getElementById('modalTitle').textContent = id ? `Editar registro #${id}` : cfg.title;
  document.getElementById('modalAlert').classList.remove('show');
  const body = document.getElementById('modalFields');
  body.innerHTML = cfg.fields.map(f=>{
    const val = record[f.k]!==undefined ? record[f.k] : '';
    if(f.type==='select'){
      let opts;
      if(f.ref){
        let list = db[f.ref];
        if(f.filter) list = list.filter(item => f.filter(item) || (record && record[f.k] && Number(record[f.k]) === item.id));
        opts = list.map(o=>`<option value="${o.id}" ${String(val)===String(o.id)?'selected':''}>${f.refLabel(o)}</option>`).join('');
      } else {
        opts = f.options.map(o=>`<option ${val===o?'selected':''}>${o}</option>`).join('');
      }
      return `<div class="field"><label>${f.label}${f.req?' *':''}</label><select data-k="${f.k}">${!f.req?'<option value="">—</option>':''}${opts}</select></div>`;
    }
    const attrs = [];
    if(f.type==='number') attrs.push('min="0"', 'step="0.01"');
    if(f.inputMode) attrs.push(`inputmode="${f.inputMode}"`);
    if(f.maxLength) attrs.push(`maxlength="${f.maxLength}"`);
    if(f.pattern) attrs.push(`pattern="${f.pattern}"`);
    const attrText = attrs.join(' ');
    return `<div class="field"><label>${f.label}${f.req?' *':''}</label><input data-k="${f.k}" type="${f.type}" value="${val}" placeholder="${f.placeholder||''}" ${attrText}></div>`;
  }).join('');

  document.getElementById('overlay').classList.add('show');
  document.getElementById('modalSave').onclick = ()=> saveForm(key);
}
function closeModal(){ document.getElementById('overlay').classList.remove('show'); }

function saveForm(key){
  const cfg = tableConfigs[key];
  const alertEl = document.getElementById('modalAlert');
  const inputs = document.querySelectorAll('#modalFields [data-k]');
  const rec = {};
  let missing=false;
  inputs.forEach(inp=>{
    const f = cfg.fields.find(x=>x.k===inp.dataset.k);
    let v = inp.value;
    if(f.type==='number') v = parseFloat(v||0);
    if(f.ref) v = v? parseInt(v) : null;
    if(f.req && (v===''||v===null||Number.isNaN(v))) missing=true;
    rec[f.k]=v;
  });
  if(missing){
    alertEl.textContent='Completa los campos obligatorios (*) antes de guardar.';
    alertEl.classList.add('show');
    return;
  }
  for(const f of cfg.fields){
    const v = rec[f.k];
    if(f.k==='dni' && typeof v === 'string' && !/^\d{8}$/.test(v.trim())){
      alertEl.textContent='El DNI debe tener exactamente 8 dígitos.';
      alertEl.classList.add('show');
      return;
    }
    if(f.k==='telefono' && typeof v === 'string' && !/^\d{9}$/.test(v.trim())){
      alertEl.textContent='El teléfono debe tener exactamente 9 dígitos.';
      alertEl.classList.add('show');
      return;
    }
    if(f.type==='number' && typeof v === 'number' && v < 0){
      alertEl.textContent='No se permiten valores negativos.';
      alertEl.classList.add('show');
      return;
    }
  }
  
  for(const f of cfg.fields){
    if(f.unique){
      const dup = db[key].find(r=>r[f.k]===rec[f.k] && r.id!==editingId);
      if(dup){ alertEl.textContent=`Ya existe un registro con ese ${f.label.toLowerCase()}.`; alertEl.classList.add('show'); return; }
    }
  }
  if(cfg.validate){
    const err = cfg.validate(rec);
    if(err){ alertEl.textContent=err; alertEl.classList.add('show'); return; }
  }

  const isNew = !editingId;
  
  
  if(isNew){
    rec.id = seq[key] ? seq[key]++ : (db[key].length?Math.max(...db[key].map(r=>r.id))+1:1);
  } else {
    rec.id = editingId;
  }

  
  (async () => {
    let savedRecord = rec;
    if(apiConnected){
      try {
        const payload = {...rec};
        if (key === 'compras') {
          delete payload.monto;
          delete payload.idInsumo;
          delete payload.cantidad;
          delete payload.precio;
        }
        if (key === 'ventas') {
          delete payload.monto;
          delete payload.idCosecha;
          delete payload.cantidadKg;
          delete payload.precio;
        }
        const apiResult = isNew ? await insertRow(key, payload) : await updateRow(key, payload);
        if(apiResult && apiResult.success){
          const persistedId = apiResult.id !== undefined && apiResult.id !== null ? Number(apiResult.id) : savedRecord.id;
          savedRecord.id = persistedId;
          rec.id = persistedId;
          if (typeof seq[key] === 'number') {
            seq[key] = Math.max(seq[key], persistedId + 1);
          }
          console.log('✓ Guardado en base de datos');
        } else {
          console.warn('⚠ No se pudo guardar en BD, usando caché local');
        }
      } catch(e) {
        console.warn('⚠ Error en API, guardando localmente:', e.message);
      }
    }
    
    
    if(isNew){
      db[key].push(savedRecord);
    } else {
      const idx = db[key].findIndex(r=>r.id===editingId);
      db[key][idx] = {...db[key][idx], ...savedRecord};
    }
    if(cfg.onSave) cfg.onSave(isNew?savedRecord:db[key].find(r=>r.id===editingId), isNew);

    addAudit(key.charAt(0).toUpperCase()+key.slice(1), isNew?'INSERT':'UPDATE', `Registro #${savedRecord.id||editingId} en ${key}`);
    savePersistedState();
    closeModal();
    buildNav();
    render();
    toast(isNew?'Registro guardado':'Cambios guardados');
  })();
}

function removeRow(key, id){
  if(!confirm('¿Eliminar este registro? Esta acción no se puede deshacer.')) return;
  
  
  (async () => {
    if(apiConnected){
      try {
        const apiResult = await deleteRow(key, id);
        if(apiResult && apiResult.success){
          console.log('✓ Eliminado de la base de datos');
        } else {
          console.warn('⚠ No se pudo eliminar de BD, eliminando del caché local');
        }
      } catch(e) {
        console.warn('⚠ Error en API, eliminando localmente:', e.message);
      }
    }
    
    
    db[key] = db[key].filter(r=>r.id!==id);
    addAudit(key.charAt(0).toUpperCase()+key.slice(1), 'DELETE', `Registro #${id} eliminado de ${key}`);
    savePersistedState();
    buildNav();
    render();
    toast('Registro eliminado');
  })();
}

(async () => {
  console.log('Iniciando aplicación...');
  await checkApiConnection();
  if(apiConnected){
    toast('✓ Conectado a base de datos');
    
    await Promise.all([
      syncTableFromDB('agricultores'),
      syncTableFromDB('trabajadores'),
      syncTableFromDB('parcelas'),
      syncTableFromDB('cultivos'),
      syncTableFromDB('siembras'),
      syncTableFromDB('cosechas'),
      syncTableFromDB('insumos'),
      syncTableFromDB('compras'),
      syncTableFromDB('detalleCompra'),
      syncTableFromDB('ventas'),
      syncTableFromDB('detalleVenta'),
      syncTableFromDB('clientes'),
      syncTableFromDB('proveedores'),
    ]);
  } else {
    toast('⚠ Modo offline: usando datos locales');
  }
  buildNav();
  render();
})();
