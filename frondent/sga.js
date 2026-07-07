/* ============================================================================
   DATOS (equivalentes a los INSERT del script BD_AGRICOLA)
   ============================================================================ */
let seq = { usuarios:11, agricultores:11, parcelas:11, cultivos:11, siembras:11, insumos:11,
  proveedores:11, compras:11, detalleCompra:11, trabajadores:11, actividades:11, cosechas:8,
  clientes:11, ventas:11, detalleVenta:11 };

const db = {
  usuarios:[
    {id:1,usuario:'jperez',rol:'Administrador',activo:1},
    {id:2,usuario:'mrodrig',rol:'Operador',activo:1},
    {id:3,usuario:'lcastro',rol:'Ventas',activo:1},
    {id:4,usuario:'rvargas',rol:'Operador',activo:1},
    {id:5,usuario:'acortez',rol:'Consulta',activo:1},
    {id:6,usuario:'ssanchez',rol:'Ventas',activo:1},
    {id:7,usuario:'dflores',rol:'Operador',activo:1},
    {id:8,usuario:'hmedina',rol:'Administrador',activo:1},
    {id:9,usuario:'pcastillo',rol:'Operador',activo:0},
    {id:10,usuario:'jguerra',rol:'Consulta',activo:1},
  ],
  agricultores:[
    {id:1,nombres:'Juan',apellidos:'Perez Lima',dni:'10101010',telefono:'987654321',direccion:'Av. Los Andes 123'},
    {id:2,nombres:'Maria',apellidos:'Gomez Torres',dni:'10101011',telefono:'987654322',direccion:'Jr. Sucre 456'},
    {id:3,nombres:'Carlos',apellidos:'Ramirez Diaz',dni:'10101012',telefono:'987654323',direccion:'Calle Real 789'},
    {id:4,nombres:'Ana',apellidos:'Flores Vega',dni:'10101013',telefono:'987654324',direccion:'Av. Grau 234'},
    {id:5,nombres:'Pedro',apellidos:'Suarez Leon',dni:'10101014',telefono:'987654325',direccion:'Jr. Libertad 111'},
    {id:6,nombres:'Rosa',apellidos:'Chavez Mora',dni:'10101015',telefono:'987654326',direccion:'Av. Sol 222'},
    {id:7,nombres:'Luis',apellidos:'Herrera Paz',dni:'10101016',telefono:'987654327',direccion:'Calle Union 333'},
    {id:8,nombres:'Elena',apellidos:'Quispe Rios',dni:'10101017',telefono:'987654328',direccion:'Jr. Amazonas 444'},
    {id:9,nombres:'Miguel',apellidos:'Torres Nina',dni:'10101018',telefono:'987654329',direccion:'Av. Peru 555'},
    {id:10,nombres:'Sofia',apellidos:'Mamani Cruz',dni:'10101019',telefono:'987654330',direccion:'Calle Lima 666'},
  ],
  parcelas:[
    {id:1,idAgricultor:1,nombre:'Parcela El Sol',ubicacion:'Ica - Valle Verde',area:3.50,suelo:'Arenoso'},
    {id:2,idAgricultor:2,nombre:'Parcela La Esperanza',ubicacion:'Ica - San Jose',area:2.00,suelo:'Franco'},
    {id:3,idAgricultor:3,nombre:'Parcela Los Olivos',ubicacion:'Ica - Ocucaje',area:5.00,suelo:'Arcilloso'},
    {id:4,idAgricultor:4,nombre:'Parcela El Milagro',ubicacion:'Ica - Pueblo Nuevo',area:1.80,suelo:'Franco Arenoso'},
    {id:5,idAgricultor:5,nombre:'Parcela Santa Rosa',ubicacion:'Ica - Subtanjalla',area:4.20,suelo:'Franco'},
    {id:6,idAgricultor:6,nombre:'Parcela El Progreso',ubicacion:'Ica - La Tinguina',area:2.75,suelo:'Arenoso'},
    {id:7,idAgricultor:7,nombre:'Parcela Buena Vista',ubicacion:'Ica - Parcona',area:3.10,suelo:'Franco Arcilloso'},
    {id:8,idAgricultor:8,nombre:'Parcela El Paraiso',ubicacion:'Ica - Salas',area:2.40,suelo:'Franco'},
    {id:9,idAgricultor:9,nombre:'Parcela San Martin',ubicacion:'Ica - Los Molinos',area:6.00,suelo:'Arenoso'},
    {id:10,idAgricultor:10,nombre:'Parcela La Union',ubicacion:'Ica - Guadalupe',area:1.50,suelo:'Franco Arenoso'},
  ],
  cultivos:[
    {id:1,nombre:'Algodon',tipo:'Industrial',ciclo:180,precio:3.50},
    {id:2,nombre:'Esparrago',tipo:'Hortaliza',ciclo:365,precio:5.20},
    {id:3,nombre:'Uva',tipo:'Fruta',ciclo:210,precio:4.80},
    {id:4,nombre:'Maiz',tipo:'Cereal',ciclo:120,precio:1.20},
    {id:5,nombre:'Papa',tipo:'Tuberculo',ciclo:150,precio:1.80},
    {id:6,nombre:'Tomate',tipo:'Hortaliza',ciclo:90,precio:2.10},
    {id:7,nombre:'Palta',tipo:'Fruta',ciclo:300,precio:6.00},
    {id:8,nombre:'Cebolla',tipo:'Hortaliza',ciclo:120,precio:1.50},
    {id:9,nombre:'Camote',tipo:'Tuberculo',ciclo:130,precio:1.30},
    {id:10,nombre:'Frijol',tipo:'Legumbre',ciclo:100,precio:3.00},
  ],
  siembras:[
    {id:1,idParcela:1,idCultivo:1,fecha:'2025-08-01',semillaKg:120,campania:'2025-II',estado:'Cosechado'},
    {id:2,idParcela:2,idCultivo:2,fecha:'2025-07-15',semillaKg:80,campania:'2025-II',estado:'Cosechado'},
    {id:3,idParcela:3,idCultivo:3,fecha:'2025-06-10',semillaKg:60,campania:'2025-I',estado:'Cosechado'},
    {id:4,idParcela:4,idCultivo:4,fecha:'2025-09-01',semillaKg:45,campania:'2025-II',estado:'Cosechado'},
    {id:5,idParcela:5,idCultivo:5,fecha:'2025-09-10',semillaKg:300,campania:'2025-II',estado:'Cosechado'},
    {id:6,idParcela:6,idCultivo:6,fecha:'2025-10-01',semillaKg:20,campania:'2025-II',estado:'Cosechado'},
    {id:7,idParcela:7,idCultivo:7,fecha:'2025-05-01',semillaKg:40,campania:'2025-I',estado:'Cosechado'},
    {id:8,idParcela:8,idCultivo:8,fecha:'2025-10-15',semillaKg:30,campania:'2025-II',estado:'En Crecimiento'},
    {id:9,idParcela:9,idCultivo:9,fecha:'2025-11-01',semillaKg:250,campania:'2025-II',estado:'En Crecimiento'},
    {id:10,idParcela:10,idCultivo:10,fecha:'2025-11-05',semillaKg:35,campania:'2025-II',estado:'Sembrado'},
  ],
  insumos:[
    {id:1,nombre:'Urea',tipo:'Fertilizante',unidad:'kg',stock:500,stockMin:100,precio:2.50},
    {id:2,nombre:'Fosfato Diamonico',tipo:'Fertilizante',unidad:'kg',stock:300,stockMin:80,precio:3.20},
    {id:3,nombre:'Sulfato de Potasio',tipo:'Fertilizante',unidad:'kg',stock:250,stockMin:50,precio:4.10},
    {id:4,nombre:'Insecticida Cipermetrina',tipo:'Pesticida',unidad:'lt',stock:60,stockMin:15,precio:25.00},
    {id:5,nombre:'Fungicida Mancozeb',tipo:'Pesticida',unidad:'kg',stock:40,stockMin:10,precio:18.50},
    {id:6,nombre:'Semilla Certificada Maiz',tipo:'Semilla',unidad:'kg',stock:200,stockMin:50,precio:6.00},
    {id:7,nombre:'Semilla Papa',tipo:'Semilla',unidad:'kg',stock:400,stockMin:100,precio:3.80},
    {id:8,nombre:'Pala',tipo:'Herramienta',unidad:'unidad',stock:25,stockMin:5,precio:15.00},
    {id:9,nombre:'Manguera Riego',tipo:'Herramienta',unidad:'metro',stock:150,stockMin:30,precio:2.20},
    {id:10,nombre:'Herbicida Glifosato',tipo:'Pesticida',unidad:'lt',stock:50,stockMin:10,precio:22.00},
  ],
  proveedores:[
    {id:1,razonSocial:'Agroquimicos del Sur SAC',ruc:'20451234561',telefono:'056123456',direccion:'Av. Industrial 100, Ica',email:'ventas@agrosur.com'},
    {id:2,razonSocial:'Semillas Peru EIRL',ruc:'20451234562',telefono:'056123457',direccion:'Jr. Comercio 200, Ica',email:'contacto@semillasperu.com'},
    {id:3,razonSocial:'Fertilizantes Nacionales SA',ruc:'20451234563',telefono:'056123458',direccion:'Av. Los Fundos 300, Ica',email:'info@fertinacional.com'},
    {id:4,razonSocial:'AgroInsumos Ica SAC',ruc:'20451234564',telefono:'056123459',direccion:'Calle Industrial 400, Ica',email:'contacto@agroinsumosica.com'},
    {id:5,razonSocial:'Distribuidora El Campo',ruc:'20451234565',telefono:'056123460',direccion:'Av. Panamericana 500, Ica',email:'ventas@elcampo.com'},
    {id:6,razonSocial:'Quimica Agricola SRL',ruc:'20451234566',telefono:'056123461',direccion:'Jr. Ayacucho 600, Ica',email:'contacto@quimicagricola.com'},
    {id:7,razonSocial:'Ferreteria Agro Ica',ruc:'20451234567',telefono:'056123462',direccion:'Av. Cutervo 700, Ica',email:'ventas@ferreagro.com'},
    {id:8,razonSocial:'Semillas y Mas SAC',ruc:'20451234568',telefono:'056123463',direccion:'Calle Piura 800, Ica',email:'info@semillasymas.com'},
    {id:9,razonSocial:'Agroquimica Peruana SA',ruc:'20451234569',telefono:'056123464',direccion:'Av. Tacna 900, Ica',email:'contacto@agroquimicaperuana.com'},
    {id:10,razonSocial:'Insumos del Valle EIRL',ruc:'20451234570',telefono:'056123465',direccion:'Jr. Cusco 1000, Ica',email:'ventas@insumosdelvalle.com'},
  ],
  compras:[
    {id:1,idProveedor:1,fecha:'2025-07-01',factura:'F001-0001',estado:'Pagada',monto:0},
    {id:2,idProveedor:2,fecha:'2025-07-05',factura:'F001-0002',estado:'Pagada',monto:0},
    {id:3,idProveedor:3,fecha:'2025-07-10',factura:'F001-0003',estado:'Pagada',monto:0},
    {id:4,idProveedor:4,fecha:'2025-08-01',factura:'F001-0004',estado:'Pagada',monto:0},
    {id:5,idProveedor:5,fecha:'2025-08-10',factura:'F001-0005',estado:'Registrada',monto:0},
    {id:6,idProveedor:6,fecha:'2025-08-15',factura:'F001-0006',estado:'Pagada',monto:0},
    {id:7,idProveedor:7,fecha:'2025-09-01',factura:'F001-0007',estado:'Registrada',monto:0},
    {id:8,idProveedor:8,fecha:'2025-09-10',factura:'F001-0008',estado:'Pagada',monto:0},
    {id:9,idProveedor:9,fecha:'2025-09-20',factura:'F001-0009',estado:'Registrada',monto:0},
    {id:10,idProveedor:10,fecha:'2025-10-01',factura:'F001-0010',estado:'Pagada',monto:0},
  ],
  detalleCompra:[
    {id:1,idCompra:1,idInsumo:1,cantidad:100,precio:2.50},
    {id:2,idCompra:2,idInsumo:6,cantidad:50,precio:6.00},
    {id:3,idCompra:3,idInsumo:2,cantidad:80,precio:3.20},
    {id:4,idCompra:4,idInsumo:4,cantidad:20,precio:25.00},
    {id:5,idCompra:5,idInsumo:7,cantidad:100,precio:3.80},
    {id:6,idCompra:6,idInsumo:3,cantidad:60,precio:4.10},
    {id:7,idCompra:7,idInsumo:5,cantidad:15,precio:18.50},
    {id:8,idCompra:8,idInsumo:8,cantidad:10,precio:15.00},
    {id:9,idCompra:9,idInsumo:9,cantidad:60,precio:2.20},
    {id:10,idCompra:10,idInsumo:10,cantidad:20,precio:22.00},
  ],
  trabajadores:[
    {id:1,nombres:'Jose',apellidos:'Aguilar Rios',dni:'20101010',telefono:'911111111',cargo:'Jornalero',salario:45.00,fechaContrato:'2024-01-10'},
    {id:2,nombres:'Marco',apellidos:'Bustamante Diaz',dni:'20101011',telefono:'911111112',cargo:'Capataz',salario:60.00,fechaContrato:'2024-02-15'},
    {id:3,nombres:'Teresa',apellidos:'Campos Vega',dni:'20101012',telefono:'911111113',cargo:'Jornalero',salario:45.00,fechaContrato:'2024-03-01'},
    {id:4,nombres:'Raul',apellidos:'Delgado Nina',dni:'20101013',telefono:'911111114',cargo:'Regador',salario:50.00,fechaContrato:'2024-03-20'},
    {id:5,nombres:'Carmen',apellidos:'Espinoza Luna',dni:'20101014',telefono:'911111115',cargo:'Jornalero',salario:45.00,fechaContrato:'2024-04-05'},
    {id:6,nombres:'Victor',apellidos:'Fernandez Cruz',dni:'20101015',telefono:'911111116',cargo:'Fumigador',salario:55.00,fechaContrato:'2024-04-18'},
    {id:7,nombres:'Gladys',apellidos:'Garcia Mora',dni:'20101016',telefono:'911111117',cargo:'Jornalero',salario:45.00,fechaContrato:'2024-05-01'},
    {id:8,nombres:'Oscar',apellidos:'Huaman Paz',dni:'20101017',telefono:'911111118',cargo:'Capataz',salario:60.00,fechaContrato:'2024-05-15'},
    {id:9,nombres:'Rocio',apellidos:'Ibarra Leon',dni:'20101018',telefono:'911111119',cargo:'Jornalero',salario:45.00,fechaContrato:'2024-06-01'},
    {id:10,nombres:'Fredy',apellidos:'Jimenez Soto',dni:'20101019',telefono:'911111120',cargo:'Regador',salario:50.00,fechaContrato:'2024-06-20'},
  ],
  actividades:[
    {id:1,idSiembra:1,idTrabajador:1,tipo:'Preparacion Terreno',fecha:'2025-07-28',horas:8.0},
    {id:2,idSiembra:1,idTrabajador:2,tipo:'Siembra',fecha:'2025-08-01',horas:6.0},
    {id:3,idSiembra:2,idTrabajador:3,tipo:'Riego',fecha:'2025-07-20',horas:4.0},
    {id:4,idSiembra:3,idTrabajador:4,tipo:'Fertilizacion',fecha:'2025-06-25',horas:5.0},
    {id:5,idSiembra:4,idTrabajador:5,tipo:'Control Plagas',fecha:'2025-09-15',horas:6.5},
    {id:6,idSiembra:5,idTrabajador:6,tipo:'Deshierbe',fecha:'2025-09-25',horas:7.0},
    {id:7,idSiembra:6,idTrabajador:7,tipo:'Cosecha',fecha:'2025-12-20',horas:8.0},
    {id:8,idSiembra:7,idTrabajador:8,tipo:'Riego',fecha:'2025-05-10',horas:3.0},
    {id:9,idSiembra:8,idTrabajador:9,tipo:'Fertilizacion',fecha:'2025-10-20',horas:5.5},
    {id:10,idSiembra:9,idTrabajador:10,tipo:'Siembra',fecha:'2025-11-01',horas:6.0},
  ],
  cosechas:[
    {id:1,idSiembra:1,fecha:'2026-01-15',cantidadKg:4200,calidad:'Buena',perdidaKg:100,disponibleKg:0},
    {id:2,idSiembra:2,fecha:'2026-01-20',cantidadKg:3500,calidad:'Excelente',perdidaKg:50,disponibleKg:0},
    {id:3,idSiembra:3,fecha:'2025-12-30',cantidadKg:6000,calidad:'Buena',perdidaKg:200,disponibleKg:0},
    {id:4,idSiembra:4,fecha:'2025-12-28',cantidadKg:3600,calidad:'Regular',perdidaKg:150,disponibleKg:0},
    {id:5,idSiembra:5,fecha:'2026-01-05',cantidadKg:9000,calidad:'Excelente',perdidaKg:100,disponibleKg:0},
    {id:6,idSiembra:6,fecha:'2025-12-25',cantidadKg:1800,calidad:'Buena',perdidaKg:60,disponibleKg:0},
    {id:7,idSiembra:7,fecha:'2025-02-15',cantidadKg:5000,calidad:'Excelente',perdidaKg:80,disponibleKg:0},
  ],
  clientes:[
    {id:1,nombre:'Mercado Mayorista Ica SAC',tipo:'Empresa',doc:'20551234561',telefono:'056900001',direccion:'Av. Grau 100, Ica',email:'compras@mercadoica.com'},
    {id:2,nombre:'Exportadora AgroPeru SA',tipo:'Empresa',doc:'20551234562',telefono:'056900002',direccion:'Av. Industrial 200, Ica',email:'compras@agroperu.com'},
    {id:3,nombre:'Juan Delgado Rios',tipo:'Natural',doc:'30101010',telefono:'922000001',direccion:'Calle Real 12, Ica',email:'jdelgado@mail.com'},
    {id:4,nombre:'Supermercados Andinos SAC',tipo:'Empresa',doc:'20551234563',telefono:'056900003',direccion:'Av. Los Andes 300, Ica',email:'logistica@andinos.com'},
    {id:5,nombre:'Rosa Huaman Silva',tipo:'Natural',doc:'30101011',telefono:'922000002',direccion:'Jr. Piura 45, Ica',email:'rhuaman@mail.com'},
    {id:6,nombre:'Distribuidora Frutas SAC',tipo:'Empresa',doc:'20551234564',telefono:'056900004',direccion:'Av. Peru 400, Ica',email:'ventas@distrifrutas.com'},
    {id:7,nombre:'Carlos Ortega Vega',tipo:'Natural',doc:'30101012',telefono:'922000003',direccion:'Calle Lima 78, Ica',email:'cortega@mail.com'},
    {id:8,nombre:'Restaurantes Unidos SA',tipo:'Empresa',doc:'20551234565',telefono:'056900005',direccion:'Av. Sol 500, Ica',email:'compras@restaurantesunidos.com'},
    {id:9,nombre:'Ana Salas Chura',tipo:'Natural',doc:'30101013',telefono:'922000004',direccion:'Jr. Cusco 90, Ica',email:'asalas@mail.com'},
    {id:10,nombre:'Comercial Agricola del Sur',tipo:'Empresa',doc:'20551234566',telefono:'056900006',direccion:'Av. Tacna 600, Ica',email:'contacto@comercialagricola.com'},
  ],
  ventas:[
    {id:1,idCliente:1,fecha:'2026-01-18',comprobante:'B001-0001',estado:'Pagada',monto:0},
    {id:2,idCliente:2,fecha:'2026-01-22',comprobante:'B001-0002',estado:'Pagada',monto:0},
    {id:3,idCliente:3,fecha:'2026-01-05',comprobante:'B001-0003',estado:'Pagada',monto:0},
    {id:4,idCliente:4,fecha:'2026-01-02',comprobante:'B001-0004',estado:'Registrada',monto:0},
    {id:5,idCliente:5,fecha:'2026-01-10',comprobante:'B001-0005',estado:'Pagada',monto:0},
    {id:6,idCliente:6,fecha:'2025-12-30',comprobante:'B001-0006',estado:'Pagada',monto:0},
    {id:7,idCliente:1,fecha:'2026-01-25',comprobante:'B001-0007',estado:'Registrada',monto:0},
    {id:8,idCliente:7,fecha:'2025-02-20',comprobante:'B001-0008',estado:'Pagada',monto:0},
    {id:9,idCliente:8,fecha:'2026-01-08',comprobante:'B001-0009',estado:'Pagada',monto:0},
    {id:10,idCliente:9,fecha:'2025-12-29',comprobante:'B001-0010',estado:'Registrada',monto:0},
  ],
  detalleVenta:[
    {id:1,idVenta:1,idCosecha:1,cantidadKg:1500,precio:3.60},
    {id:2,idVenta:2,idCosecha:2,cantidadKg:1200,precio:5.30},
    {id:3,idVenta:3,idCosecha:3,cantidadKg:2000,precio:4.90},
    {id:4,idVenta:4,idCosecha:4,cantidadKg:1000,precio:1.25},
    {id:5,idVenta:5,idCosecha:5,cantidadKg:3000,precio:1.85},
    {id:6,idVenta:6,idCosecha:6,cantidadKg:500,precio:2.20},
    {id:7,idVenta:7,idCosecha:1,cantidadKg:800,precio:3.60},
    {id:8,idVenta:8,idCosecha:7,cantidadKg:2500,precio:6.10},
    {id:9,idVenta:9,idCosecha:3,cantidadKg:1500,precio:4.90},
    {id:10,idVenta:10,idCosecha:5,cantidadKg:2000,precio:1.85},
  ],
  auditoria:[]
};

/* -------- Recalculo inicial (equivalente a los triggers de negocio) -------- */
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
recalcCompras();
recalcVentasYDisponibilidad();

function addAudit(tabla,op,detalle){
  db.auditoria.unshift({id:db.auditoria.length+1, tabla, op, detalle, fecha:new Date().toLocaleString('es-PE')});
}

/* ============================================================================
   CAPA DE API (Conexión con Backend SQL Server)
   ============================================================================ */
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

/* ============================================================================
   UTILIDADES
   ============================================================================ */
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

/* ============================================================================
   CONFIGURACION DE MODULOS
   ============================================================================ */
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

/* ============================================================================
   NAV
   ============================================================================ */
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

/* ============================================================================
   RENDER PRINCIPAL
   ============================================================================ */
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

/* ============================================================================
   DASHBOARD
   ============================================================================ */
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

  // Produccion por cultivo
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

  // Insumos criticos
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

  // Ranking agricultores
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

  // Ranking clientes
  const rankCl = db.clientes.map(c=>{
    const total = db.ventas.filter(v=>v.idCliente===c.id && v.estado!=='Anulada').reduce((s,v)=>s+v.monto,0);
    return {nombre:c.nombre, total};
  }).sort((a,b)=>b.total-a.total).slice(0,6);
  document.getElementById('rankClientes').innerHTML = rankCl.map((r,i)=>`
    <li><div class="rank-num">${i+1}</div><div class="rank-name">${r.nombre}</div><div class="rank-val">${money(r.total)}</div></li>
  `).join('');
}

/* ============================================================================
   REPORTES
   ============================================================================ */
function renderReportes(root){
  // Produccion por parcela
  const porParcela = db.parcelas.map(p=>{
    const ag = db.agricultores.find(a=>a.id===p.idAgricultor);
    const siembraIds = db.siembras.filter(s=>s.idParcela===p.id).map(s=>s.id);
    const kg = db.cosechas.filter(c=>siembraIds.includes(c.idSiembra)).reduce((s,c)=>s+c.cantidadKg,0);
    return {parcela:p.nombre, agricultor: ag?`${ag.nombres} ${ag.apellidos}`:'—', kg};
  }).sort((a,b)=>b.kg-a.kg);

  // Compras por proveedor
  const porProveedor = db.proveedores.map(p=>{
    const compras = db.compras.filter(c=>c.idProveedor===p.id);
    return {proveedor:p.razonSocial, n:compras.length, total: compras.reduce((s,c)=>s+c.monto,0)};
  }).sort((a,b)=>b.total-a.total);

  // Trabajadores por actividades
  const porTrabajador = db.trabajadores.map(t=>{
    const acts = db.actividades.filter(a=>a.idTrabajador===t.id);
    return {trabajador:`${t.nombres} ${t.apellidos}`, n:acts.length, horas: acts.reduce((s,a)=>s+a.horas,0)};
  }).sort((a,b)=>b.n-a.n);

  // Ingresos por campania
  const camp = {};
  db.siembras.forEach(s=>{
    const cos = db.cosechas.find(c=>c.idSiembra===s.id);
    if(!cos) return;
    const ingreso = db.detalleVenta.filter(dv=>dv.idCosecha===cos.id).reduce((sum,dv)=>sum+dv.cantidadKg*dv.precio,0);
    camp[s.campania] = (camp[s.campania]||0) + ingreso;
  });

  // Rankings
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

/* ============================================================================
   AUDITORIA
   ============================================================================ */
function renderAuditoria(root){
  if(db.auditoria.length===0){
    root.innerHTML = `<div class="table-wrap"><div class="empty-state"><b>Sin movimientos todavía</b>Los cambios que hagas en Compras, Ventas, Cosechas e Insumos quedarán registrados aquí, igual que los triggers de auditoría en SQL Server.</div></div>`;
    return;
  }
  root.innerHTML = `<div class="table-wrap"><table><thead><tr><th>Fecha</th><th>Tabla</th><th>Operación</th><th>Detalle</th></tr></thead>
    <tbody>${db.auditoria.map(a=>`<tr><td>${a.fecha}</td><td>${a.tabla}</td><td><span class="pill ${a.op==='INSERT'?'ok':a.op==='DELETE'?'bad':'info'}">${a.op}</span></td><td>${a.detalle}</td></tr>`).join('')}</tbody></table></div>`;
}

/* ============================================================================
   VISTA GENERICA DE TABLA (CRUD)
   ============================================================================ */
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
      {k:'dni',label:'DNI',type:'text',req:true,unique:true},
      {k:'telefono',label:'Teléfono',type:'text'},
      {k:'direccion',label:'Dirección',type:'text'},
    ],
  },
  trabajadores:{
    title:'Nuevo trabajador',
    cols:[{k:'nombres',label:'Nombres'},{k:'apellidos',label:'Apellidos'},{k:'dni',label:'DNI'},{k:'cargo',label:'Cargo'},{k:'salario',label:'Salario/día',num:true},{k:'fechaContrato',label:'Contratado'}],
    fields:[
      {k:'nombres',label:'Nombres',type:'text',req:true},
      {k:'apellidos',label:'Apellidos',type:'text',req:true},
      {k:'dni',label:'DNI',type:'text',req:true,unique:true},
      {k:'telefono',label:'Teléfono',type:'text'},
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
    onSave(rec){
      rec.perdidaKg = rec.perdidaKg||0;
      rec.disponibleKg = rec.cantidadKg - rec.perdidaKg;
      const s = db.siembras.find(x=>x.id===rec.idSiembra);
      if(s) s.estado='Cosechado';
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
    onSave(rec, isNew){
      const det = {idInsumo:rec.idInsumo, cantidad:rec.cantidad, precio:rec.precio};
      delete rec.idInsumo; delete rec.cantidad; delete rec.precio;
      rec.monto = det.cantidad*det.precio;
      if(isNew){
        db.detalleCompra.push({id:seq.detalleCompra++, idCompra:rec.id, ...det});
        const ins = db.insumos.find(i=>i.id===det.idInsumo);
        if(ins){ ins.stock += det.cantidad; addAudit('Insumos','UPDATE',`Stock actualizado: ${ins.nombre} +${det.cantidad}`); }
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
        if(co){ co.disponibleKg -= det.cantidadKg; }
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

/* ============================================================================
   FORMULARIOS (modal)
   ============================================================================ */
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
        if(f.filter) list = list.filter(f.filter);
        opts = list.map(o=>`<option value="${o.id}" ${String(val)===String(o.id)?'selected':''}>${f.refLabel(o)}</option>`).join('');
      } else {
        opts = f.options.map(o=>`<option ${val===o?'selected':''}>${o}</option>`).join('');
      }
      return `<div class="field"><label>${f.label}${f.req?' *':''}</label><select data-k="${f.k}">${!f.req?'<option value="">—</option>':''}${opts}</select></div>`;
    }
    return `<div class="field"><label>${f.label}${f.req?' *':''}</label><input data-k="${f.k}" type="${f.type}" step="${f.type==='number'?'0.01':''}" value="${val}" placeholder="${f.placeholder||''}"></div>`;
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
  // Unicidad
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
  
  // Generar ID local si es nuevo
  if(isNew){
    rec.id = seq[key] ? seq[key]++ : (db[key].length?Math.max(...db[key].map(r=>r.id))+1:1);
  } else {
    rec.id = editingId;
  }

  // Intentar guardar en backend si está conectado
  (async () => {
    let savedRecord = rec;
    if(apiConnected){
      try {
        const apiResult = isNew ? await insertRow(key, rec) : await updateRow(key, rec);
        if(apiResult && apiResult.success){
          console.log('✓ Guardado en base de datos');
        } else {
          console.warn('⚠ No se pudo guardar en BD, usando caché local');
        }
      } catch(e) {
        console.warn('⚠ Error en API, guardando localmente:', e.message);
      }
    }
    
    // Actualizar BD local (siempre)
    if(isNew){
      db[key].push(savedRecord);
    } else {
      const idx = db[key].findIndex(r=>r.id===editingId);
      db[key][idx] = {...db[key][idx], ...savedRecord};
    }
    if(cfg.onSave) cfg.onSave(isNew?savedRecord:db[key].find(r=>r.id===editingId), isNew);

    addAudit(key.charAt(0).toUpperCase()+key.slice(1), isNew?'INSERT':'UPDATE', `Registro #${savedRecord.id||editingId} en ${key}`);
    closeModal();
    buildNav();
    render();
    toast(isNew?'Registro guardado':'Cambios guardados');
  })();
}

function removeRow(key, id){
  if(!confirm('¿Eliminar este registro? Esta acción no se puede deshacer.')) return;
  
  // Intentar eliminar del backend si está conectado
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
    
    // Eliminar de BD local (siempre)
    db[key] = db[key].filter(r=>r.id!==id);
    addAudit(key.charAt(0).toUpperCase()+key.slice(1), 'DELETE', `Registro #${id} eliminado de ${key}`);
    buildNav();
    render();
    toast('Registro eliminado');
  })();
}

/* ============================================================================
   INIT
   ============================================================================ */
(async () => {
  console.log('Iniciando aplicación...');
  await checkApiConnection();
  if(apiConnected){
    toast('✓ Conectado a base de datos');
    // Sincronizar tablas principales desde BD
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
