CREATE DATABASE BD_AGRICOLA;
GO

USE BD_AGRICOLA;
GO

CREATE TABLE Usuarios (
    IdUsuario        INT IDENTITY(1,1) PRIMARY KEY,
    NombreUsuario    VARCHAR(50)  NOT NULL UNIQUE,
    Contrasena       VARCHAR(200) NOT NULL,
    Rol              VARCHAR(20)  NOT NULL CHECK (Rol IN ('Administrador','Operador','Ventas','Consulta')),
    Activo           BIT          NOT NULL DEFAULT 1,
    FechaCreacion    DATETIME     NOT NULL DEFAULT GETDATE()
);
GO

CREATE TABLE Agricultores (
    IdAgricultor     INT IDENTITY(1,1) PRIMARY KEY,
    IdUsuario        INT NULL,
    Nombres          VARCHAR(50)  NOT NULL,
    Apellidos        VARCHAR(50)  NOT NULL,
    DNI              VARCHAR(15)  NOT NULL UNIQUE,
    Telefono         VARCHAR(20)  NULL,
    Direccion        VARCHAR(150) NULL,
    FechaRegistro    DATETIME     NOT NULL DEFAULT GETDATE(),
    Activo           BIT          NOT NULL DEFAULT 1,
    CONSTRAINT FK_Agricultores_Usuarios 
    FOREIGN KEY (IdUsuario) REFERENCES Usuarios(IdUsuario)
);
GO

CREATE TABLE Parcelas (
    IdParcela        INT IDENTITY(1,1) PRIMARY KEY,
    IdAgricultor     INT NOT NULL,
    NombreParcela    VARCHAR(80)  NOT NULL,
    Ubicacion        VARCHAR(150) NOT NULL,
    AreaHectareas    DECIMAL(10,2) NOT NULL CHECK (AreaHectareas > 0),
    TipoSuelo        VARCHAR(50)  NULL,
    FechaRegistro    DATETIME     NOT NULL DEFAULT GETDATE(),
    CONSTRAINT FK_Parcelas_Agricultores 
    FOREIGN KEY (IdAgricultor) REFERENCES Agricultores(IdAgricultor)
);
GO

CREATE TABLE Cultivos (
    IdCultivo             INT IDENTITY(1,1) PRIMARY KEY,
    NombreCultivo         VARCHAR(60) NOT NULL UNIQUE,
    TipoCultivo           VARCHAR(40) NOT NULL,
    CicloDias             INT NOT NULL CHECK (CicloDias > 0),
    PrecioReferencialKg   DECIMAL(10,2) NOT NULL CHECK (PrecioReferencialKg >= 0)
);
GO

CREATE TABLE Siembras (
    IdSiembra           INT IDENTITY(1,1) PRIMARY KEY,
    IdParcela           INT NOT NULL,
    IdCultivo           INT NOT NULL,
    FechaSiembra        DATE NOT NULL,
    CantidadSemillaKg   DECIMAL(10,2) NOT NULL CHECK (CantidadSemillaKg > 0),
    CampaniaAgricola    VARCHAR(20) NOT NULL,
    EstadoSiembra       VARCHAR(20) NOT NULL DEFAULT 'Sembrado'
    CHECK (EstadoSiembra IN ('Sembrado','En Crecimiento','Cosechado','Perdido')),
    CONSTRAINT FK_Siembras_Parcelas 
    FOREIGN KEY (IdParcela) REFERENCES Parcelas(IdParcela),
    CONSTRAINT FK_Siembras_Cultivos 
    FOREIGN KEY (IdCultivo) REFERENCES Cultivos(IdCultivo)
);
GO

CREATE TABLE Insumos (
    IdInsumo         INT IDENTITY(1,1) PRIMARY KEY,
    NombreInsumo     VARCHAR(80) NOT NULL,
    TipoInsumo       VARCHAR(40) NOT NULL 
    CHECK (TipoInsumo IN ('Fertilizante','Pesticida','Semilla','Herramienta','Otro')),
    UnidadMedida     VARCHAR(15) NOT NULL,
    StockActual      DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (StockActual >= 0),
    StockMinimo      DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (StockMinimo >= 0),
    PrecioUnitario   DECIMAL(10,2) NOT NULL CHECK (PrecioUnitario >= 0)
);
GO

CREATE TABLE Proveedores (
    IdProveedor      INT IDENTITY(1,1) PRIMARY KEY,
    RazonSocial      VARCHAR(100) NOT NULL,
    RUC              VARCHAR(15)  NOT NULL UNIQUE,
    Telefono         VARCHAR(20)  NULL,
    Direccion        VARCHAR(150) NULL,
    Email            VARCHAR(100) NULL
);
GO

CREATE TABLE Compras (
    IdCompra          INT IDENTITY(1,1) PRIMARY KEY,
    IdProveedor       INT NOT NULL,
    FechaCompra       DATETIME NOT NULL DEFAULT GETDATE(),
    NumeroFactura     VARCHAR(30) NOT NULL UNIQUE,
    MontoTotal        DECIMAL(12,2) NOT NULL DEFAULT 0 CHECK (MontoTotal >= 0),
    Estado            VARCHAR(20) NOT NULL DEFAULT 'Registrada'
                       CHECK (Estado IN ('Registrada','Pagada','Anulada')),
    CONSTRAINT FK_Compras_Proveedores FOREIGN KEY (IdProveedor) REFERENCES Proveedores(IdProveedor)
);
GO

CREATE TABLE DetalleCompra (
    IdDetalleCompra   INT IDENTITY(1,1) PRIMARY KEY,
    IdCompra          INT NOT NULL,
    IdInsumo          INT NOT NULL,
    Cantidad          DECIMAL(10,2) NOT NULL CHECK (Cantidad > 0),
    PrecioUnitario    DECIMAL(10,2) NOT NULL CHECK (PrecioUnitario >= 0),
    Subtotal          AS (Cantidad * PrecioUnitario) PERSISTED,
    CONSTRAINT FK_DetalleCompra_Compras 
    FOREIGN KEY (IdCompra) REFERENCES Compras(IdCompra),
    CONSTRAINT FK_DetalleCompra_Insumos 
    FOREIGN KEY (IdInsumo) REFERENCES Insumos(IdInsumo)
);
GO

CREATE TABLE Trabajadores (
    IdTrabajador       INT IDENTITY(1,1) PRIMARY KEY,
    Nombres            VARCHAR(50) NOT NULL,
    Apellidos          VARCHAR(50) NOT NULL,
    DNI                VARCHAR(15) NOT NULL UNIQUE,
    Telefono           VARCHAR(20) NULL,
    Cargo              VARCHAR(40) NOT NULL,
    SalarioDiario      DECIMAL(10,2) NOT NULL CHECK (SalarioDiario >= 0),
    FechaContratacion  DATE NOT NULL,
    Activo             BIT NOT NULL DEFAULT 1
);
GO

CREATE TABLE ActividadesAgricolas (
    IdActividad       INT IDENTITY(1,1) PRIMARY KEY,
    IdSiembra         INT NOT NULL,
    IdTrabajador      INT NOT NULL,
    TipoActividad     VARCHAR(40) NOT NULL 
    CHECK (TipoActividad IN ('Preparacion Terreno','Siembra','Riego','Fertilizacion','Control Plagas','Deshierbe','Cosecha','Otro')),
    FechaActividad    DATE NOT NULL,
    HorasTrabajadas   DECIMAL(5,2) NOT NULL CHECK (HorasTrabajadas > 0),
    Observaciones     VARCHAR(200) NULL,
    CONSTRAINT FK_Actividades_Siembras FOREIGN KEY (IdSiembra) REFERENCES Siembras(IdSiembra),
    CONSTRAINT FK_Actividades_Trabajadores FOREIGN KEY (IdTrabajador) REFERENCES Trabajadores(IdTrabajador)
);
GO

CREATE TABLE Cosechas (
    IdCosecha         INT IDENTITY(1,1) PRIMARY KEY,
    IdSiembra         INT NOT NULL UNIQUE,
    FechaCosecha      DATE NOT NULL,
    CantidadKg        DECIMAL(10,2) NOT NULL CHECK (CantidadKg >= 0),
    CalidadCosecha    VARCHAR(15) NOT NULL DEFAULT 'Buena' CHECK (CalidadCosecha IN ('Excelente','Buena','Regular','Mala')),
    PerdidaKg         DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (PerdidaKg >= 0),
    CantidadDisponibleKg DECIMAL(10,2) NOT NULL DEFAULT 0 CHECK (CantidadDisponibleKg >= 0),
    CONSTRAINT FK_Cosechas_Siembras 
    FOREIGN KEY (IdSiembra) REFERENCES Siembras(IdSiembra)
);
GO

CREATE TABLE Clientes (
    IdCliente        INT IDENTITY(1,1) PRIMARY KEY,
    NombreCliente    VARCHAR(100) NOT NULL,
    TipoCliente      VARCHAR(20)  NOT NULL CHECK (TipoCliente IN ('Natural','Empresa')),
    DocumentoID      VARCHAR(15)  NOT NULL UNIQUE,
    Telefono         VARCHAR(20)  NULL,
    Direccion        VARCHAR(150) NULL,
    Email            VARCHAR(100) NULL,
    FechaRegistro    DATETIME     NOT NULL DEFAULT GETDATE()
);
GO

CREATE TABLE Ventas (
    IdVenta              INT IDENTITY(1,1) PRIMARY KEY,
    IdCliente            INT NOT NULL,
    FechaVenta           DATETIME NOT NULL DEFAULT GETDATE(),
    NumeroComprobante    VARCHAR(30) NOT NULL UNIQUE,
    MontoTotal           DECIMAL(12,2) NOT NULL DEFAULT 0 CHECK (MontoTotal >= 0),
    Estado               VARCHAR(20) NOT NULL DEFAULT 'Registrada'
                          CHECK (Estado IN ('Registrada','Pagada','Anulada')),
    CONSTRAINT FK_Ventas_Clientes 
    FOREIGN KEY (IdCliente) REFERENCES Clientes(IdCliente)
);
GO

CREATE TABLE DetalleVenta (
    IdDetalleVenta   INT IDENTITY(1,1) PRIMARY KEY,
    IdVenta          INT NOT NULL,
    IdCosecha        INT NOT NULL,
    CantidadKg       DECIMAL(10,2) NOT NULL CHECK (CantidadKg > 0),
    PrecioUnitario   DECIMAL(10,2) NOT NULL CHECK (PrecioUnitario >= 0),
    Subtotal         AS (CantidadKg * PrecioUnitario) PERSISTED,
    CONSTRAINT FK_DetalleVenta_Ventas FOREIGN KEY (IdVenta) REFERENCES Ventas(IdVenta) ON DELETE CASCADE,
    CONSTRAINT FK_DetalleVenta_Cosechas FOREIGN KEY (IdCosecha) REFERENCES Cosechas(IdCosecha)
);
GO

CREATE TABLE Auditoria (
    IdAuditoria      INT IDENTITY(1,1) PRIMARY KEY,
    TablaAfectada    VARCHAR(50)  NOT NULL,
    Operacion        VARCHAR(10)  NOT NULL CHECK (Operacion IN ('INSERT','UPDATE','DELETE')),
    IdRegistro       INT          NULL,
    UsuarioBD        VARCHAR(100) NOT NULL DEFAULT SUSER_SNAME(),
    FechaOperacion   DATETIME     NOT NULL DEFAULT GETDATE(),
    DetalleAnterior  VARCHAR(1000) NULL,
    DetalleNuevo     VARCHAR(1000) NULL
);
GO

INSERT INTO Usuarios (NombreUsuario, Contrasena, Rol, Activo) VALUES
('jperez',   'Hash123$', 'Administrador', 1),
('mrodrig',  'Hash124$', 'Operador',      1),
('lcastro',  'Hash125$', 'Ventas',        1),
('rvargas',  'Hash126$', 'Operador',      1),
('acortez',  'Hash127$', 'Consulta',      1),
('ssanchez', 'Hash128$', 'Ventas',        1),
('dflores',  'Hash129$', 'Operador',      1),
('hmedina',  'Hash130$', 'Administrador', 1),
('pcastillo','Hash131$', 'Operador',      0),
('jguerra',  'Hash132$', 'Consulta',      1);
GO

INSERT INTO Agricultores (IdUsuario, Nombres, Apellidos, DNI, Telefono, Direccion) VALUES
(2,  'Juan',      'Perez Lima',      '10101010', '987654321', 'Av. Los Andes 123'),
(4,  'Maria',     'Gomez Torres',    '10101011', '987654322', 'Jr. Sucre 456'),
(NULL,'Carlos',   'Ramirez Diaz',    '10101012', '987654323', 'Calle Real 789'),
(NULL,'Ana',      'Flores Vega',     '10101013', '987654324', 'Av. Grau 234'),
(NULL,'Pedro',    'Suarez Leon',     '10101014', '987654325', 'Jr. Libertad 111'),
(NULL,'Rosa',     'Chavez Mora',     '10101015', '987654326', 'Av. Sol 222'),
(NULL,'Luis',     'Herrera Paz',     '10101016', '987654327', 'Calle Union 333'),
(NULL,'Elena',    'Quispe Rios',     '10101017', '987654328', 'Jr. Amazonas 444'),
(NULL,'Miguel',   'Torres Nina',     '10101018', '987654329', 'Av. Peru 555'),
(NULL,'Sofia',    'Mamani Cruz',     '10101019', '987654330', 'Calle Lima 666');
GO

INSERT INTO Parcelas (IdAgricultor, NombreParcela, Ubicacion, AreaHectareas, TipoSuelo) VALUES
(1, 'Parcela El Sol',      'Ica - Valle Verde',      3.50, 'Arenoso'),
(2, 'Parcela La Esperanza','Ica - San Jose',         2.00, 'Franco'),
(3, 'Parcela Los Olivos',  'Ica - Ocucaje',          5.00, 'Arcilloso'),
(4, 'Parcela El Milagro',  'Ica - Pueblo Nuevo',     1.80, 'Franco Arenoso'),
(5, 'Parcela Santa Rosa',  'Ica - Subtanjalla',      4.20, 'Franco'),
(6, 'Parcela El Progreso', 'Ica - La Tinguina',      2.75, 'Arenoso'),
(7, 'Parcela Buena Vista', 'Ica - Parcona',          3.10, 'Franco Arcilloso'),
(8, 'Parcela El Paraiso',  'Ica - Salas',            2.40, 'Franco'),
(9, 'Parcela San Martin',  'Ica - Los Molinos',      6.00, 'Arenoso'),
(10,'Parcela La Union',    'Ica - Guadalupe',        1.50, 'Franco Arenoso');
GO

INSERT INTO Cultivos (NombreCultivo, TipoCultivo, CicloDias, PrecioReferencialKg) VALUES
('Algodon',    'Industrial',  180, 3.50),
('Esparrago',  'Hortaliza',   365, 5.20),
('Uva',        'Fruta',       210, 4.80),
('Maiz',       'Cereal',      120, 1.20),
('Papa',       'Tuberculo',   150, 1.80),
('Tomate',     'Hortaliza',    90, 2.10),
('Palta',      'Fruta',       300, 6.00),
('Cebolla',    'Hortaliza',   120, 1.50),
('Camote',     'Tuberculo',   130, 1.30),
('Frijol',     'Legumbre',    100, 3.00);
GO

INSERT INTO Siembras (IdParcela, IdCultivo, FechaSiembra, CantidadSemillaKg, CampaniaAgricola, EstadoSiembra) VALUES
(1, 1, '2025-08-01', 120.00, '2025-II', 'Cosechado'),
(2, 2, '2025-07-15', 80.00,  '2025-II', 'Cosechado'),
(3, 3, '2025-06-10', 60.00,  '2025-I',  'Cosechado'),
(4, 4, '2025-09-01', 45.00,  '2025-II', 'Cosechado'),
(5, 5, '2025-09-10', 300.00, '2025-II', 'Cosechado'),
(6, 6, '2025-10-01', 20.00,  '2025-II', 'Cosechado'),
(7, 7, '2025-05-01', 40.00,  '2025-I',  'Cosechado'),
(8, 8, '2025-10-15', 30.00,  '2025-II', 'En Crecimiento'),
(9, 9, '2025-11-01', 250.00, '2025-II', 'En Crecimiento'),
(10,10,'2025-11-05', 35.00,  '2025-II', 'Sembrado');
GO

INSERT INTO Insumos (NombreInsumo, TipoInsumo, UnidadMedida, StockActual, StockMinimo, PrecioUnitario) VALUES
('Urea',                  'Fertilizante', 'kg',  500.00, 100.00, 2.50),
('Fosfato Diamonico',     'Fertilizante', 'kg',  300.00, 80.00,  3.20),
('Sulfato de Potasio',    'Fertilizante', 'kg',  250.00, 50.00,  4.10),
('Insecticida Cipermetrina','Pesticida',  'lt',  60.00,  15.00,  25.00),
('Fungicida Mancozeb',    'Pesticida',    'kg',  40.00,  10.00,  18.50),
('Semilla Certificada Maiz','Semilla',    'kg',  200.00, 50.00,  6.00),
('Semilla Papa',          'Semilla',      'kg',  400.00, 100.00, 3.80),
('Pala',                  'Herramienta',  'unidad', 25.00, 5.00, 15.00),
('Manguera Riego',        'Herramienta',  'metro', 150.00, 30.00, 2.20),
('Herbicida Glifosato',   'Pesticida',    'lt',   50.00,  10.00,  22.00);
GO

INSERT INTO Proveedores (RazonSocial, RUC, Telefono, Direccion, Email) VALUES
('Agroquimicos del Sur SAC',   '20451234561', '056123456', 'Av. Industrial 100, Ica', 'ventas@agrosur.com'),
('Semillas Peru EIRL',         '20451234562', '056123457', 'Jr. Comercio 200, Ica',  'contacto@semillasperu.com'),
('Fertilizantes Nacionales SA','20451234563', '056123458', 'Av. Los Fundos 300, Ica','info@fertinacional.com'),
('AgroInsumos Ica SAC',        '20451234564', '056123459', 'Calle Industrial 400, Ica','contacto@agroinsumosica.com'),
('Distribuidora El Campo',     '20451234565', '056123460', 'Av. Panamericana 500, Ica','ventas@elcampo.com'),
('Quimica Agricola SRL',       '20451234566', '056123461', 'Jr. Ayacucho 600, Ica',  'contacto@quimicagricola.com'),
('Ferreteria Agro Ica',        '20451234567', '056123462', 'Av. Cutervo 700, Ica',   'ventas@ferreagro.com'),
('Semillas y Mas SAC',         '20451234568', '056123463', 'Calle Piura 800, Ica',   'info@semillasymas.com'),
('Agroquimica Peruana SA',     '20451234569', '056123464', 'Av. Tacna 900, Ica',     'contacto@agroquimicaperuana.com'),
('Insumos del Valle EIRL',     '20451234570', '056123465', 'Jr. Cusco 1000, Ica',    'ventas@insumosdelvalle.com');
GO

INSERT INTO Compras (IdProveedor, FechaCompra, NumeroFactura, Estado) VALUES
(1, '2025-07-01', 'F001-0001', 'Pagada'),
(2, '2025-07-05', 'F001-0002', 'Pagada'),
(3, '2025-07-10', 'F001-0003', 'Pagada'),
(4, '2025-08-01', 'F001-0004', 'Pagada'),
(5, '2025-08-10', 'F001-0005', 'Registrada'),
(6, '2025-08-15', 'F001-0006', 'Pagada'),
(7, '2025-09-01', 'F001-0007', 'Registrada'),
(8, '2025-09-10', 'F001-0008', 'Pagada'),
(9, '2025-09-20', 'F001-0009', 'Registrada'),
(10,'2025-10-01', 'F001-0010', 'Pagada');
GO

INSERT INTO DetalleCompra (IdCompra, IdInsumo, Cantidad, PrecioUnitario) VALUES
(1, 1, 100.00, 2.50),
(2, 6, 50.00,  6.00),
(3, 2, 80.00,  3.20),
(4, 4, 20.00,  25.00),
(5, 7, 100.00, 3.80),
(6, 3, 60.00,  4.10),
(7, 5, 15.00,  18.50),
(8, 8, 10.00,  15.00),
(9, 9, 60.00,  2.20),
(10,10, 20.00, 22.00);
GO

INSERT INTO Trabajadores (Nombres, Apellidos, DNI, Telefono, Cargo, SalarioDiario, FechaContratacion) VALUES
('Jose',    'Aguilar Rios',    '20101010', '911111111', 'Jornalero',    45.00, '2024-01-10'),
('Marco',   'Bustamante Diaz', '20101011', '911111112', 'Capataz',      60.00, '2024-02-15'),
('Teresa',  'Campos Vega',     '20101012', '911111113', 'Jornalero',    45.00, '2024-03-01'),
('Raul',    'Delgado Nina',    '20101013', '911111114', 'Regador',      50.00, '2024-03-20'),
('Carmen',  'Espinoza Luna',   '20101014', '911111115', 'Jornalero',    45.00, '2024-04-05'),
('Victor',  'Fernandez Cruz',  '20101015', '911111116', 'Fumigador',    55.00, '2024-04-18'),
('Gladys',  'Garcia Mora',     '20101016', '911111117', 'Jornalero',    45.00, '2024-05-01'),
('Oscar',   'Huaman Paz',      '20101017', '911111118', 'Capataz',      60.00, '2024-05-15'),
('Rocio',   'Ibarra Leon',     '20101018', '911111119', 'Jornalero',    45.00, '2024-06-01'),
('Fredy',   'Jimenez Soto',    '20101019', '911111120', 'Regador',      50.00, '2024-06-20');
GO

INSERT INTO ActividadesAgricolas (IdSiembra, IdTrabajador, TipoActividad, FechaActividad, HorasTrabajadas, Observaciones) VALUES
(1, 1, 'Preparacion Terreno', '2025-07-28', 8.00, 'Terreno preparado sin novedad'),
(1, 2, 'Siembra',             '2025-08-01', 6.00, 'Siembra completa'),
(2, 3, 'Riego',               '2025-07-20', 4.00, NULL),
(3, 4, 'Fertilizacion',       '2025-06-25', 5.00, 'Aplicacion de urea'),
(4, 5, 'Control Plagas',      '2025-09-15', 6.50, 'Fumigacion preventiva'),
(5, 6, 'Deshierbe',           '2025-09-25', 7.00, NULL),
(6, 7, 'Cosecha',             '2025-12-20', 8.00, 'Cosecha de tomate'),
(7, 8, 'Riego',               '2025-05-10', 3.00, NULL),
(8, 9, 'Fertilizacion',       '2025-10-20', 5.50, 'Aplicacion de fosfato'),
(9, 10,'Siembra',             '2025-11-01', 6.00, 'Siembra de camote');
GO

INSERT INTO Cosechas (IdSiembra, FechaCosecha, CantidadKg, CalidadCosecha, PerdidaKg, CantidadDisponibleKg) VALUES
(1, '2026-01-15', 4200.00, 'Buena',      100.00, 4100.00),
(2, '2026-01-20', 3500.00, 'Excelente',  50.00,  3450.00),
(3, '2025-12-30', 6000.00, 'Buena',      200.00, 5800.00),
(4, '2025-12-28', 3600.00, 'Regular',    150.00, 3450.00),
(5, '2026-01-05', 9000.00, 'Excelente',  100.00, 8900.00),
(6, '2025-12-25', 1800.00, 'Buena',      60.00,  1740.00),
(7, '2025-02-15', 5000.00, 'Excelente',  80.00,  4920.00);
GO

INSERT INTO Clientes (NombreCliente, TipoCliente, DocumentoID, Telefono, Direccion, Email) VALUES
('Mercado Mayorista Ica SAC', 'Empresa', '20551234561', '056900001', 'Av. Grau 100, Ica', 'compras@mercadoica.com'),
('Exportadora AgroPeru SA',   'Empresa', '20551234562', '056900002', 'Av. Industrial 200, Ica','compras@agroperu.com'),
('Juan Delgado Rios',         'Natural', '30101010',    '922000001', 'Calle Real 12, Ica', 'jdelgado@mail.com'),
('Supermercados Andinos SAC', 'Empresa', '20551234563', '056900003', 'Av. Los Andes 300, Ica','logistica@andinos.com'),
('Rosa Huaman Silva',         'Natural', '30101011',    '922000002', 'Jr. Piura 45, Ica', 'rhuaman@mail.com'),
('Distribuidora Frutas SAC',  'Empresa', '20551234564', '056900004', 'Av. Peru 400, Ica', 'ventas@distrifrutas.com'),
('Carlos Ortega Vega',        'Natural', '30101012',    '922000003', 'Calle Lima 78, Ica','cortega@mail.com'),
('Restaurantes Unidos SA',    'Empresa', '20551234565', '056900005', 'Av. Sol 500, Ica',  'compras@restaurantesunidos.com'),
('Ana Salas Chura',           'Natural', '30101013',    '922000004', 'Jr. Cusco 90, Ica', 'asalas@mail.com'),
('Comercial Agricola del Sur','Empresa', '20551234566', '056900006', 'Av. Tacna 600, Ica','contacto@comercialagricola.com');
GO

INSERT INTO Ventas (IdCliente, FechaVenta, NumeroComprobante, Estado) VALUES
(1, '2026-01-18', 'B001-0001', 'Pagada'),
(2, '2026-01-22', 'B001-0002', 'Pagada'),
(3, '2026-01-05', 'B001-0003', 'Pagada'),
(4, '2026-01-02', 'B001-0004', 'Registrada'),
(5, '2026-01-10', 'B001-0005', 'Pagada'),
(6, '2025-12-30', 'B001-0006', 'Pagada'),
(1, '2026-01-25', 'B001-0007', 'Registrada'),
(7, '2025-02-20', 'B001-0008', 'Pagada'),
(8, '2026-01-08', 'B001-0009', 'Pagada'),
(9, '2025-12-29', 'B001-0010', 'Registrada');
GO

INSERT INTO DetalleVenta (IdVenta, IdCosecha, CantidadKg, PrecioUnitario) VALUES
(1, 1, 1500.00, 3.60),
(2, 2, 1200.00, 5.30),
(3, 3, 2000.00, 4.90),
(4, 4, 1000.00, 1.25),
(5, 5, 3000.00, 1.85),
(6, 6, 500.00,  2.20),
(7, 1, 800.00,  3.60),
(8, 7, 2500.00, 6.10),
(9, 3, 1500.00, 4.90),
(10,5, 2000.00, 1.85);
GO


-- Total producido (kg) por parcela
CREATE FUNCTION fn_TotalProducidoPorParcela (@IdParcela INT)
RETURNS DECIMAL(12,2)
AS
BEGIN
    DECLARE @Total DECIMAL(12,2);
    SELECT @Total = ISNULL(SUM(co.CantidadKg), 0)
    FROM Cosechas co
    INNER JOIN Siembras si ON si.IdSiembra = co.IdSiembra
    WHERE si.IdParcela = @IdParcela;
    RETURN @Total;
END
GO

-- Total vendido ($) por cliente
CREATE FUNCTION fn_TotalVentasCliente (@IdCliente INT)
RETURNS DECIMAL(12,2)
AS
BEGIN
    DECLARE @Total DECIMAL(12,2);
    SELECT @Total = ISNULL(SUM(v.MontoTotal), 0)
    FROM Ventas v
    WHERE v.IdCliente = @IdCliente AND v.Estado <> 'Anulada';
    RETURN @Total;
END
GO

-- Stock disponible de un insumo
CREATE FUNCTION fn_StockDisponibleInsumo (@IdInsumo INT)
RETURNS DECIMAL(10,2)
AS
BEGIN
    DECLARE @Stock DECIMAL(10,2);
    SELECT @Stock = StockActual FROM Insumos WHERE IdInsumo = @IdInsumo;
    RETURN ISNULL(@Stock, 0);
END
GO

-- Dias transcurridos desde la siembra hasta hoy
CREATE FUNCTION fn_DiasDesdeSiembra (@IdSiembra INT)
RETURNS INT
AS
BEGIN
    DECLARE @Dias INT;
    SELECT @Dias = DATEDIFF(DAY, FechaSiembra, GETDATE()) FROM Siembras WHERE IdSiembra = @IdSiembra;
    RETURN @Dias;
END
GO

-- Costo total de insumos comprados para una campaña (simplificado: costo total de compras en un rango)
CREATE FUNCTION fn_CostoComprasPeriodo (@FechaInicio DATE, @FechaFin DATE)
RETURNS DECIMAL(12,2)
AS
BEGIN
    DECLARE @Costo DECIMAL(12,2);
    SELECT @Costo = ISNULL(SUM(MontoTotal), 0)
    FROM Compras
    WHERE CAST(FechaCompra AS DATE) BETWEEN @FechaInicio AND @FechaFin
      AND Estado <> 'Anulada';
    RETURN @Costo;
END
GO

-- Registrar un nuevo agricultor
CREATE PROCEDURE sp_RegistrarAgricultor
    @IdUsuario   INT = NULL,
    @Nombres     VARCHAR(50),
    @Apellidos   VARCHAR(50),
    @DNI         VARCHAR(15),
    @Telefono    VARCHAR(20) = NULL,
    @Direccion   VARCHAR(150) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (SELECT 1 FROM Agricultores WHERE DNI = @DNI)
    BEGIN
        RAISERROR('Ya existe un agricultor registrado con ese DNI.', 16, 1);
        RETURN;
    END
    INSERT INTO Agricultores (IdUsuario, Nombres, Apellidos, DNI, Telefono, Direccion)
    VALUES (@IdUsuario, @Nombres, @Apellidos, @DNI, @Telefono, @Direccion);
    SELECT SCOPE_IDENTITY() AS IdAgricultorGenerado;
END
GO

-- Registrar una compra con su detalle (usando tipo tabla)
CREATE TYPE TT_DetalleCompra AS TABLE (
    IdInsumo        INT,
    Cantidad        DECIMAL(10,2),
    PrecioUnitario  DECIMAL(10,2)
);
GO

CREATE PROCEDURE sp_RegistrarCompra
    @IdProveedor     INT,
    @NumeroFactura   VARCHAR(30),
    @Detalle         TT_DetalleCompra READONLY
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO Compras (IdProveedor, NumeroFactura)
        VALUES (@IdProveedor, @NumeroFactura);

        DECLARE @IdCompra INT = SCOPE_IDENTITY();

        INSERT INTO DetalleCompra (IdCompra, IdInsumo, Cantidad, PrecioUnitario)
        SELECT @IdCompra, IdInsumo, Cantidad, PrecioUnitario FROM @Detalle;

        COMMIT TRANSACTION;
        SELECT @IdCompra AS IdCompraGenerada;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

-- Registrar una venta con su detalle
CREATE TYPE TT_DetalleVenta AS TABLE (
    IdCosecha       INT,
    CantidadKg      DECIMAL(10,2),
    PrecioUnitario  DECIMAL(10,2)
);
GO

CREATE PROCEDURE sp_RegistrarVenta
    @IdCliente          INT,
    @NumeroComprobante  VARCHAR(30),
    @Detalle            TT_DetalleVenta READONLY
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;

        INSERT INTO Ventas (IdCliente, NumeroComprobante)
        VALUES (@IdCliente, @NumeroComprobante);

        DECLARE @IdVenta INT = SCOPE_IDENTITY();

        INSERT INTO DetalleVenta (IdVenta, IdCosecha, CantidadKg, PrecioUnitario)
        SELECT @IdVenta, IdCosecha, CantidadKg, PrecioUnitario FROM @Detalle;

        COMMIT TRANSACTION;
        SELECT @IdVenta AS IdVentaGenerada;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

-- Registrar una cosecha
CREATE PROCEDURE sp_RegistrarCosecha
    @IdSiembra       INT,
    @FechaCosecha    DATE,
    @CantidadKg      DECIMAL(10,2),
    @CalidadCosecha  VARCHAR(15) = 'Buena',
    @PerdidaKg       DECIMAL(10,2) = 0
AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (SELECT 1 FROM Cosechas WHERE IdSiembra = @IdSiembra)
    BEGIN
        RAISERROR('Esta siembra ya tiene una cosecha registrada.', 16, 1);
        RETURN;
    END

    INSERT INTO Cosechas (IdSiembra, FechaCosecha, CantidadKg, CalidadCosecha, PerdidaKg, CantidadDisponibleKg)
    VALUES (@IdSiembra, @FechaCosecha, @CantidadKg, @CalidadCosecha, @PerdidaKg, @CantidadKg - @PerdidaKg);

    UPDATE Siembras SET EstadoSiembra = 'Cosechado' WHERE IdSiembra = @IdSiembra;
END
GO

-- Reporte de stock bajo minimo
CREATE PROCEDURE sp_InsumosBajoStock
AS
BEGIN
    SET NOCOUNT ON;
    SELECT NombreInsumo, TipoInsumo, StockActual, StockMinimo
    FROM Insumos
    WHERE StockActual <= StockMinimo
    ORDER BY StockActual ASC;
END
GO

-- Reporte: produccion por agricultor (parametrizable por rango de fechas de cosecha)
CREATE PROCEDURE sp_ReporteProduccionPorAgricultor
    @FechaInicio DATE = NULL,
    @FechaFin    DATE = NULL
AS
BEGIN
    SET NOCOUNT ON;
    SELECT
        a.IdAgricultor,
        a.Nombres + ' ' + a.Apellidos AS Agricultor,
        SUM(co.CantidadKg) AS TotalKgProducidos
    FROM Agricultores a
    INNER JOIN Parcelas p  ON p.IdAgricultor = a.IdAgricultor
    INNER JOIN Siembras s  ON s.IdParcela = p.IdParcela
    INNER JOIN Cosechas co ON co.IdSiembra = s.IdSiembra
    WHERE (@FechaInicio IS NULL OR co.FechaCosecha >= @FechaInicio)
      AND (@FechaFin    IS NULL OR co.FechaCosecha <= @FechaFin)
    GROUP BY a.IdAgricultor, a.Nombres, a.Apellidos
    ORDER BY TotalKgProducidos DESC;
END
GO

-- Top N clientes por monto comprado
CREATE PROCEDURE sp_TopClientes
    @N INT = 5
AS
BEGIN
    SET NOCOUNT ON;
    SELECT TOP (@N)
        cl.NombreCliente,
        SUM(v.MontoTotal) AS TotalComprado
    FROM Clientes cl
    INNER JOIN Ventas v ON v.IdCliente = cl.IdCliente
    WHERE v.Estado <> 'Anulada'
    GROUP BY cl.NombreCliente
    ORDER BY TotalComprado DESC;
END
GO

-- Anular una venta (revierte estado, no borra historico)
CREATE PROCEDURE sp_AnularVenta
    @IdVenta INT
AS
BEGIN
    SET NOCOUNT ON;
    IF NOT EXISTS (SELECT 1 FROM Ventas WHERE IdVenta = @IdVenta)
    BEGIN
        RAISERROR('La venta no existe.', 16, 1);
        RETURN;
    END
    UPDATE Ventas SET Estado = 'Anulada' WHERE IdVenta = @IdVenta;
END
GO

-- Consultar auditoria de una tabla
CREATE PROCEDURE sp_ConsultarAuditoria
    @TablaAfectada VARCHAR(50) = NULL,
    @Top           INT = 100
AS
BEGIN
    SET NOCOUNT ON;
    SELECT TOP (@Top) *
    FROM Auditoria
    WHERE (@TablaAfectada IS NULL OR TablaAfectada = @TablaAfectada)
    ORDER BY FechaOperacion DESC;
END
GO

-- Actualizar precio referencial de un cultivo (con validacion)
CREATE PROCEDURE sp_ActualizarPrecioCultivo
    @IdCultivo INT,
    @NuevoPrecio DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;
    IF @NuevoPrecio < 0
    BEGIN
        RAISERROR('El precio no puede ser negativo.', 16, 1);
        RETURN;
    END
    UPDATE Cultivos SET PrecioReferencialKg = @NuevoPrecio WHERE IdCultivo = @IdCultivo;
END
GO

-- Al insertar detalle de compra: aumenta stock del insumo y recalcula el total de la compra
CREATE TRIGGER trg_DetalleCompra_Insert
ON DetalleCompra
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE i
    SET i.StockActual = i.StockActual + ins.Cantidad
    FROM Insumos i
    INNER JOIN inserted ins ON ins.IdInsumo = i.IdInsumo;

    UPDATE c
    SET c.MontoTotal = (SELECT ISNULL(SUM(Subtotal),0) FROM DetalleCompra WHERE IdCompra = c.IdCompra)
    FROM Compras c
    INNER JOIN inserted ins ON ins.IdCompra = c.IdCompra;
END
GO

-- Al eliminar detalle de compra: revierte stock y recalcula total
CREATE TRIGGER trg_DetalleCompra_Delete
ON DetalleCompra
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE i
    SET i.StockActual = i.StockActual - d.Cantidad
    FROM Insumos i
    INNER JOIN deleted d ON d.IdInsumo = i.IdInsumo;

    UPDATE c
    SET c.MontoTotal = (SELECT ISNULL(SUM(Subtotal),0) FROM DetalleCompra WHERE IdCompra = c.IdCompra)
    FROM Compras c
    INNER JOIN deleted d ON d.IdCompra = c.IdCompra
    WHERE EXISTS (SELECT 1 FROM Compras WHERE IdCompra = c.IdCompra);
END
GO

-- Al insertar detalle de venta: valida stock de cosecha disponible, descuenta y recalcula total
CREATE TRIGGER trg_DetalleVenta_Insert
ON DetalleVenta
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS (
        SELECT 1
        FROM inserted ins
        INNER JOIN Cosechas co ON co.IdCosecha = ins.IdCosecha
        WHERE ins.CantidadKg > co.CantidadDisponibleKg
    )
    BEGIN
        RAISERROR('La cantidad vendida supera la cantidad disponible de la cosecha.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END

    UPDATE co
    SET co.CantidadDisponibleKg = co.CantidadDisponibleKg - ins.CantidadKg
    FROM Cosechas co
    INNER JOIN inserted ins ON ins.IdCosecha = co.IdCosecha;

    UPDATE v
    SET v.MontoTotal = (SELECT ISNULL(SUM(Subtotal),0) FROM DetalleVenta WHERE IdVenta = v.IdVenta)
    FROM Ventas v
    INNER JOIN inserted ins ON ins.IdVenta = v.IdVenta;
END
GO

-- Al eliminar detalle de venta: revierte disponibilidad y recalcula total
CREATE TRIGGER trg_DetalleVenta_Delete
ON DetalleVenta
AFTER DELETE
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE co
    SET co.CantidadDisponibleKg = co.CantidadDisponibleKg + d.CantidadKg
    FROM Cosechas co
    INNER JOIN deleted d ON d.IdCosecha = co.IdCosecha;

    UPDATE v
    SET v.MontoTotal = (SELECT ISNULL(SUM(Subtotal),0) FROM DetalleVenta WHERE IdVenta = v.IdVenta)
    FROM Ventas v
    INNER JOIN deleted d ON d.IdVenta = v.IdVenta
    WHERE EXISTS (SELECT 1 FROM Ventas WHERE IdVenta = v.IdVenta);
END
GO

-- Al registrar una cosecha, actualizar automaticamente el estado de la siembra
CREATE TRIGGER trg_Cosechas_Insert
ON Cosechas
AFTER INSERT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE s
    SET s.EstadoSiembra = 'Cosechado'
    FROM Siembras s
    INNER JOIN inserted i ON i.IdSiembra = s.IdSiembra;
END
GO

-- Evitar eliminar un insumo que tenga movimientos de compra registrados
CREATE TRIGGER trg_Insumos_PreventDelete
ON Insumos
INSTEAD OF DELETE
AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (SELECT 1 FROM DetalleCompra dc INNER JOIN deleted d ON d.IdInsumo = dc.IdInsumo)
    BEGIN
        RAISERROR('No se puede eliminar el insumo: tiene compras registradas.', 16, 1);
        RETURN;
    END
    DELETE FROM Insumos WHERE IdInsumo IN (SELECT IdInsumo FROM deleted);
END
GO

--  Auditoria de Usuarios
CREATE TRIGGER trg_Aud_Usuarios
ON Usuarios
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Auditoria (TablaAfectada, Operacion, IdRegistro, DetalleNuevo)
    SELECT 'Usuarios', 'INSERT', IdUsuario,
           'Usuario=' + NombreUsuario + ' Rol=' + Rol
    FROM inserted i
    WHERE NOT EXISTS (SELECT 1 FROM deleted d WHERE d.IdUsuario = i.IdUsuario);

    INSERT INTO Auditoria (TablaAfectada, Operacion, IdRegistro, DetalleAnterior, DetalleNuevo)
    SELECT 'Usuarios', 'UPDATE', i.IdUsuario,
           'Usuario=' + d.NombreUsuario + ' Rol=' + d.Rol + ' Activo=' + CAST(d.Activo AS VARCHAR(1)),
           'Usuario=' + i.NombreUsuario + ' Rol=' + i.Rol + ' Activo=' + CAST(i.Activo AS VARCHAR(1))
    FROM inserted i
    INNER JOIN deleted d ON d.IdUsuario = i.IdUsuario;

    INSERT INTO Auditoria (TablaAfectada, Operacion, IdRegistro, DetalleAnterior)
    SELECT 'Usuarios', 'DELETE', d.IdUsuario,
           'Usuario=' + d.NombreUsuario + ' Rol=' + d.Rol
    FROM deleted d
    WHERE NOT EXISTS (SELECT 1 FROM inserted i WHERE i.IdUsuario = d.IdUsuario);
END
GO

-- Auditoria de Compras
CREATE TRIGGER trg_Aud_Compras
ON Compras
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Auditoria (TablaAfectada, Operacion, IdRegistro, DetalleNuevo)
    SELECT 'Compras', 'INSERT', IdCompra,
           'Factura=' + NumeroFactura + ' Monto=' + CAST(MontoTotal AS VARCHAR(20)) + ' Estado=' + Estado
    FROM inserted i
    WHERE NOT EXISTS (SELECT 1 FROM deleted d WHERE d.IdCompra = i.IdCompra);

    INSERT INTO Auditoria (TablaAfectada, Operacion, IdRegistro, DetalleAnterior, DetalleNuevo)
    SELECT 'Compras', 'UPDATE', i.IdCompra,
           'Monto=' + CAST(d.MontoTotal AS VARCHAR(20)) + ' Estado=' + d.Estado,
           'Monto=' + CAST(i.MontoTotal AS VARCHAR(20)) + ' Estado=' + i.Estado
    FROM inserted i
    INNER JOIN deleted d ON d.IdCompra = i.IdCompra;

    INSERT INTO Auditoria (TablaAfectada, Operacion, IdRegistro, DetalleAnterior)
    SELECT 'Compras', 'DELETE', d.IdCompra,
           'Factura=' + d.NumeroFactura + ' Monto=' + CAST(d.MontoTotal AS VARCHAR(20))
    FROM deleted d
    WHERE NOT EXISTS (SELECT 1 FROM inserted i WHERE i.IdCompra = d.IdCompra);
END
GO

-- Auditoria de Ventas
CREATE TRIGGER trg_Aud_Ventas
ON Ventas
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Auditoria (TablaAfectada, Operacion, IdRegistro, DetalleNuevo)
    SELECT 'Ventas', 'INSERT', IdVenta,
           'Comprobante=' + NumeroComprobante + ' Monto=' + CAST(MontoTotal AS VARCHAR(20)) + ' Estado=' + Estado
    FROM inserted i
    WHERE NOT EXISTS (SELECT 1 FROM deleted d WHERE d.IdVenta = i.IdVenta);

    INSERT INTO Auditoria (TablaAfectada, Operacion, IdRegistro, DetalleAnterior, DetalleNuevo)
    SELECT 'Ventas', 'UPDATE', i.IdVenta,
           'Monto=' + CAST(d.MontoTotal AS VARCHAR(20)) + ' Estado=' + d.Estado,
           'Monto=' + CAST(i.MontoTotal AS VARCHAR(20)) + ' Estado=' + i.Estado
    FROM inserted i
    INNER JOIN deleted d ON d.IdVenta = i.IdVenta;

    INSERT INTO Auditoria (TablaAfectada, Operacion, IdRegistro, DetalleAnterior)
    SELECT 'Ventas', 'DELETE', d.IdVenta,
           'Comprobante=' + d.NumeroComprobante + ' Monto=' + CAST(d.MontoTotal AS VARCHAR(20))
    FROM deleted d
    WHERE NOT EXISTS (SELECT 1 FROM inserted i WHERE i.IdVenta = d.IdVenta);
END
GO

-- Auditoria de Insumos (cambios de stock)
CREATE TRIGGER trg_Aud_Insumos
ON Insumos
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Auditoria (TablaAfectada, Operacion, IdRegistro, DetalleAnterior, DetalleNuevo)
    SELECT 'Insumos', 'UPDATE', i.IdInsumo,
           'Stock=' + CAST(d.StockActual AS VARCHAR(20)),
           'Stock=' + CAST(i.StockActual AS VARCHAR(20))
    FROM inserted i
    INNER JOIN deleted d ON d.IdInsumo = i.IdInsumo
    WHERE i.StockActual <> d.StockActual;
END
GO

-- 9.5 Auditoria de Agricultores (INSERT/UPDATE/DELETE)
CREATE TRIGGER trg_Aud_Agricultores
ON Agricultores
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Auditoria (TablaAfectada, Operacion, IdRegistro, DetalleNuevo)
    SELECT 'Agricultores', 'INSERT', IdAgricultor, 'DNI=' + DNI + ' Nombre=' + Nombres + ' ' + Apellidos
    FROM inserted i
    WHERE NOT EXISTS (SELECT 1 FROM deleted d WHERE d.IdAgricultor = i.IdAgricultor);

    INSERT INTO Auditoria (TablaAfectada, Operacion, IdRegistro, DetalleAnterior, DetalleNuevo)
    SELECT 'Agricultores', 'UPDATE', i.IdAgricultor,
           'Telefono=' + ISNULL(d.Telefono,'') + ' Direccion=' + ISNULL(d.Direccion,''),
           'Telefono=' + ISNULL(i.Telefono,'') + ' Direccion=' + ISNULL(i.Direccion,'')
    FROM inserted i
    INNER JOIN deleted d ON d.IdAgricultor = i.IdAgricultor;

    INSERT INTO Auditoria (TablaAfectada, Operacion, IdRegistro, DetalleAnterior)
    SELECT 'Agricultores', 'DELETE', d.IdAgricultor, 'DNI=' + d.DNI
    FROM deleted d
    WHERE NOT EXISTS (SELECT 1 FROM inserted i WHERE i.IdAgricultor = d.IdAgricultor);
END
GO

EXEC sp_InsumosBajoStock;
GO
EXEC sp_ReporteProduccionPorAgricultor;
GO
EXEC sp_TopClientes @N = 5;
GO
EXEC sp_ConsultarAuditoria @Top = 20;
GO