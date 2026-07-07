/* ============================================================================
   PROCEDIMIENTOS PARA LA API DEL FRONTEND (sga.js)
   ----------------------------------------------------------------------------
   sga.js ya viene preparado para llamar a http://localhost:3000/api/procedures/<nombre>
   con GET (listar) o POST (insertar/actualizar/eliminar). Este script agrega
   los procedimientos que faltan sobre la base BD_AGRICOLA (no reemplaza nada
   de BD_AGRICOLA.sql, solo lo complementa).

   Ejecutar DESPUES de BD_AGRICOLA.sql, en la misma base de datos.
   Requiere SQL Server 2016+ (usa CREATE OR ALTER, para poder re-ejecutar
   este script sin errores si ya existen los procedimientos).
   ============================================================================ */

USE BD_AGRICOLA;
GO

/* ---------------------------- AGRICULTORES ------------------------------- */
CREATE OR ALTER PROCEDURE sp_ListarAgricultores
AS
BEGIN
    SET NOCOUNT ON;
    SELECT IdAgricultor AS id, Nombres AS nombres, Apellidos AS apellidos,
           DNI AS dni, Telefono AS telefono, Direccion AS direccion
    FROM Agricultores
    ORDER BY IdAgricultor;
END
GO

CREATE OR ALTER PROCEDURE sp_InsertarAgricultor
    @nombres VARCHAR(50), @apellidos VARCHAR(50), @dni VARCHAR(15),
    @telefono VARCHAR(20) = NULL, @direccion VARCHAR(150) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Agricultores (Nombres, Apellidos, DNI, Telefono, Direccion)
    VALUES (@nombres, @apellidos, @dni, @telefono, @direccion);
    SELECT SCOPE_IDENTITY() AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_ActualizarAgricultor
    @id INT, @nombres VARCHAR(50), @apellidos VARCHAR(50), @dni VARCHAR(15),
    @telefono VARCHAR(20) = NULL, @direccion VARCHAR(150) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Agricultores
    SET Nombres = @nombres, Apellidos = @apellidos, DNI = @dni,
        Telefono = @telefono, Direccion = @direccion
    WHERE IdAgricultor = @id;
    SELECT @id AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_EliminarAgricultor @id INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Agricultores WHERE IdAgricultor = @id;
END
GO

/* ---------------------------- TRABAJADORES -------------------------------- */
CREATE OR ALTER PROCEDURE sp_ListarTrabajadores
AS
BEGIN
    SET NOCOUNT ON;
    SELECT IdTrabajador AS id, Nombres AS nombres, Apellidos AS apellidos, DNI AS dni,
           Telefono AS telefono, Cargo AS cargo, SalarioDiario AS salario,
           CONVERT(varchar(10), FechaContratacion, 23) AS fechaContrato
    FROM Trabajadores
    ORDER BY IdTrabajador;
END
GO

CREATE OR ALTER PROCEDURE sp_InsertarTrabajador
    @nombres VARCHAR(50), @apellidos VARCHAR(50), @dni VARCHAR(15),
    @telefono VARCHAR(20) = NULL, @cargo VARCHAR(40), @salario DECIMAL(10,2),
    @fechaContrato DATE
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Trabajadores (Nombres, Apellidos, DNI, Telefono, Cargo, SalarioDiario, FechaContratacion)
    VALUES (@nombres, @apellidos, @dni, @telefono, @cargo, @salario, @fechaContrato);
    SELECT SCOPE_IDENTITY() AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_ActualizarTrabajador
    @id INT, @nombres VARCHAR(50), @apellidos VARCHAR(50), @dni VARCHAR(15),
    @telefono VARCHAR(20) = NULL, @cargo VARCHAR(40), @salario DECIMAL(10,2),
    @fechaContrato DATE
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Trabajadores
    SET Nombres = @nombres, Apellidos = @apellidos, DNI = @dni, Telefono = @telefono,
        Cargo = @cargo, SalarioDiario = @salario, FechaContratacion = @fechaContrato
    WHERE IdTrabajador = @id;
    SELECT @id AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_EliminarTrabajador @id INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Trabajadores WHERE IdTrabajador = @id;
END
GO

/* ------------------------------- PARCELAS --------------------------------- */
CREATE OR ALTER PROCEDURE sp_ListarParcelas
AS
BEGIN
    SET NOCOUNT ON;
    SELECT IdParcela AS id, IdAgricultor AS idAgricultor, NombreParcela AS nombre,
           Ubicacion AS ubicacion, AreaHectareas AS area, TipoSuelo AS suelo
    FROM Parcelas
    ORDER BY IdParcela;
END
GO

CREATE OR ALTER PROCEDURE sp_InsertarParcela
    @idAgricultor INT, @nombre VARCHAR(80), @ubicacion VARCHAR(150),
    @area DECIMAL(10,2), @suelo VARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Parcelas (IdAgricultor, NombreParcela, Ubicacion, AreaHectareas, TipoSuelo)
    VALUES (@idAgricultor, @nombre, @ubicacion, @area, @suelo);
    SELECT SCOPE_IDENTITY() AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_ActualizarParcela
    @id INT, @idAgricultor INT, @nombre VARCHAR(80), @ubicacion VARCHAR(150),
    @area DECIMAL(10,2), @suelo VARCHAR(50) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Parcelas
    SET IdAgricultor = @idAgricultor, NombreParcela = @nombre, Ubicacion = @ubicacion,
        AreaHectareas = @area, TipoSuelo = @suelo
    WHERE IdParcela = @id;
    SELECT @id AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_EliminarParcela @id INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Parcelas WHERE IdParcela = @id;
END
GO

/* ------------------------------- CULTIVOS --------------------------------- */
CREATE OR ALTER PROCEDURE sp_ListarCultivos
AS
BEGIN
    SET NOCOUNT ON;
    SELECT IdCultivo AS id, NombreCultivo AS nombre, TipoCultivo AS tipo,
           CicloDias AS ciclo, PrecioReferencialKg AS precio
    FROM Cultivos
    ORDER BY IdCultivo;
END
GO

CREATE OR ALTER PROCEDURE sp_InsertarCultivo
    @nombre VARCHAR(60), @tipo VARCHAR(40), @ciclo INT, @precio DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Cultivos (NombreCultivo, TipoCultivo, CicloDias, PrecioReferencialKg)
    VALUES (@nombre, @tipo, @ciclo, @precio);
    SELECT SCOPE_IDENTITY() AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_ActualizarCultivo
    @id INT, @nombre VARCHAR(60), @tipo VARCHAR(40), @ciclo INT, @precio DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Cultivos
    SET NombreCultivo = @nombre, TipoCultivo = @tipo, CicloDias = @ciclo, PrecioReferencialKg = @precio
    WHERE IdCultivo = @id;
    SELECT @id AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_EliminarCultivo @id INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Cultivos WHERE IdCultivo = @id;
END
GO

/* ------------------------------- SIEMBRAS --------------------------------- */
CREATE OR ALTER PROCEDURE sp_ListarSiembras
AS
BEGIN
    SET NOCOUNT ON;
    SELECT IdSiembra AS id, IdParcela AS idParcela, IdCultivo AS idCultivo,
           CONVERT(varchar(10), FechaSiembra, 23) AS fecha, CantidadSemillaKg AS semillaKg,
           CampaniaAgricola AS campania, EstadoSiembra AS estado
    FROM Siembras
    ORDER BY IdSiembra;
END
GO

CREATE OR ALTER PROCEDURE sp_InsertarSiembra
    @idParcela INT, @idCultivo INT, @fecha DATE, @semillaKg DECIMAL(10,2),
    @campania VARCHAR(20), @estado VARCHAR(20) = 'Sembrado'
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Siembras (IdParcela, IdCultivo, FechaSiembra, CantidadSemillaKg, CampaniaAgricola, EstadoSiembra)
    VALUES (@idParcela, @idCultivo, @fecha, @semillaKg, @campania, @estado);
    SELECT SCOPE_IDENTITY() AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_ActualizarSiembra
    @id INT, @idParcela INT, @idCultivo INT, @fecha DATE, @semillaKg DECIMAL(10,2),
    @campania VARCHAR(20), @estado VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Siembras
    SET IdParcela = @idParcela, IdCultivo = @idCultivo, FechaSiembra = @fecha,
        CantidadSemillaKg = @semillaKg, CampaniaAgricola = @campania, EstadoSiembra = @estado
    WHERE IdSiembra = @id;
    SELECT @id AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_EliminarSiembra @id INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Siembras WHERE IdSiembra = @id;
END
GO

/* ------------------------------- COSECHAS --------------------------------- */
CREATE OR ALTER PROCEDURE sp_ListarCosechas
AS
BEGIN
    SET NOCOUNT ON;
    SELECT IdCosecha AS id, IdSiembra AS idSiembra, CONVERT(varchar(10), FechaCosecha, 23) AS fecha,
           CantidadKg AS cantidadKg, CalidadCosecha AS calidad, PerdidaKg AS perdidaKg,
           CantidadDisponibleKg AS disponibleKg
    FROM Cosechas
    ORDER BY IdCosecha;
END
GO

CREATE OR ALTER PROCEDURE sp_InsertarCosecha
    @idSiembra INT, @fecha DATE, @cantidadKg DECIMAL(10,2), @calidad VARCHAR(15) = 'Buena',
    @perdidaKg DECIMAL(10,2) = 0, @disponibleKg DECIMAL(10,2) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    IF @disponibleKg IS NULL SET @disponibleKg = @cantidadKg - @perdidaKg;
    INSERT INTO Cosechas (IdSiembra, FechaCosecha, CantidadKg, CalidadCosecha, PerdidaKg, CantidadDisponibleKg)
    VALUES (@idSiembra, @fecha, @cantidadKg, @calidad, @perdidaKg, @disponibleKg);
    SELECT SCOPE_IDENTITY() AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_ActualizarCosecha
    @id INT, @idSiembra INT, @fecha DATE, @cantidadKg DECIMAL(10,2), @calidad VARCHAR(15),
    @perdidaKg DECIMAL(10,2), @disponibleKg DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Cosechas
    SET IdSiembra = @idSiembra, FechaCosecha = @fecha, CantidadKg = @cantidadKg,
        CalidadCosecha = @calidad, PerdidaKg = @perdidaKg, CantidadDisponibleKg = @disponibleKg
    WHERE IdCosecha = @id;
    SELECT @id AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_EliminarCosecha @id INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Cosechas WHERE IdCosecha = @id;
END
GO

/* -------------------------------- INSUMOS --------------------------------- */
CREATE OR ALTER PROCEDURE sp_ListarInsumos
AS
BEGIN
    SET NOCOUNT ON;
    SELECT IdInsumo AS id, NombreInsumo AS nombre, TipoInsumo AS tipo, UnidadMedida AS unidad,
           StockActual AS stock, StockMinimo AS stockMin, PrecioUnitario AS precio
    FROM Insumos
    ORDER BY IdInsumo;
END
GO

CREATE OR ALTER PROCEDURE sp_InsertarInsumo
    @nombre VARCHAR(80), @tipo VARCHAR(40), @unidad VARCHAR(15),
    @stock DECIMAL(10,2) = 0, @stockMin DECIMAL(10,2) = 0, @precio DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Insumos (NombreInsumo, TipoInsumo, UnidadMedida, StockActual, StockMinimo, PrecioUnitario)
    VALUES (@nombre, @tipo, @unidad, @stock, @stockMin, @precio);
    SELECT SCOPE_IDENTITY() AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_ActualizarInsumo
    @id INT, @nombre VARCHAR(80), @tipo VARCHAR(40), @unidad VARCHAR(15),
    @stock DECIMAL(10,2), @stockMin DECIMAL(10,2), @precio DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Insumos
    SET NombreInsumo = @nombre, TipoInsumo = @tipo, UnidadMedida = @unidad,
        StockActual = @stock, StockMinimo = @stockMin, PrecioUnitario = @precio
    WHERE IdInsumo = @id;
    SELECT @id AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_EliminarInsumo @id INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Insumos WHERE IdInsumo = @id;
END
GO

/* ------------------------------ PROVEEDORES -------------------------------- */
CREATE OR ALTER PROCEDURE sp_ListarProveedores
AS
BEGIN
    SET NOCOUNT ON;
    SELECT IdProveedor AS id, RazonSocial AS razonSocial, RUC AS ruc,
           Telefono AS telefono, Direccion AS direccion, Email AS email
    FROM Proveedores
    ORDER BY IdProveedor;
END
GO

CREATE OR ALTER PROCEDURE sp_InsertarProveedor
    @razonSocial VARCHAR(100), @ruc VARCHAR(15), @telefono VARCHAR(20) = NULL,
    @direccion VARCHAR(150) = NULL, @email VARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Proveedores (RazonSocial, RUC, Telefono, Direccion, Email)
    VALUES (@razonSocial, @ruc, @telefono, @direccion, @email);
    SELECT SCOPE_IDENTITY() AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_ActualizarProveedor
    @id INT, @razonSocial VARCHAR(100), @ruc VARCHAR(15), @telefono VARCHAR(20) = NULL,
    @direccion VARCHAR(150) = NULL, @email VARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Proveedores
    SET RazonSocial = @razonSocial, RUC = @ruc, Telefono = @telefono,
        Direccion = @direccion, Email = @email
    WHERE IdProveedor = @id;
    SELECT @id AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_EliminarProveedor @id INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Proveedores WHERE IdProveedor = @id;
END
GO

/* -------------------------------- COMPRAS ---------------------------------- */
CREATE OR ALTER PROCEDURE sp_ListarCompras
AS
BEGIN
    SET NOCOUNT ON;
    SELECT IdCompra AS id, IdProveedor AS idProveedor, CONVERT(varchar(10), FechaCompra, 23) AS fecha,
           NumeroFactura AS factura, Estado AS estado, MontoTotal AS monto
    FROM Compras
    ORDER BY IdCompra;
END
GO

CREATE OR ALTER PROCEDURE sp_InsertarCompra
    @idProveedor INT, @fecha DATETIME = NULL, @factura VARCHAR(30), @estado VARCHAR(20) = 'Registrada'
AS
BEGIN
    SET NOCOUNT ON;
    IF @fecha IS NULL SET @fecha = GETDATE();
    INSERT INTO Compras (IdProveedor, FechaCompra, NumeroFactura, Estado)
    VALUES (@idProveedor, @fecha, @factura, @estado);
    SELECT SCOPE_IDENTITY() AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_ActualizarCompra
    @id INT, @idProveedor INT, @fecha DATETIME, @factura VARCHAR(30), @estado VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Compras
    SET IdProveedor = @idProveedor, FechaCompra = @fecha, NumeroFactura = @factura, Estado = @estado
    WHERE IdCompra = @id;
    SELECT @id AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_EliminarCompra @id INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Compras WHERE IdCompra = @id;
END
GO

CREATE OR ALTER PROCEDURE sp_ListarDetalleCompra
AS
BEGIN
    SET NOCOUNT ON;
    SELECT IdDetalleCompra AS id, IdCompra AS idCompra, IdInsumo AS idInsumo,
           Cantidad AS cantidad, PrecioUnitario AS precio
    FROM DetalleCompra
    ORDER BY IdDetalleCompra;
END
GO

/* --------------------------------- VENTAS ---------------------------------- */
CREATE OR ALTER PROCEDURE sp_ListarVentas
AS
BEGIN
    SET NOCOUNT ON;
    SELECT IdVenta AS id, IdCliente AS idCliente, CONVERT(varchar(10), FechaVenta, 23) AS fecha,
           NumeroComprobante AS comprobante, Estado AS estado, MontoTotal AS monto
    FROM Ventas
    ORDER BY IdVenta;
END
GO

CREATE OR ALTER PROCEDURE sp_InsertarVenta
    @idCliente INT, @fecha DATETIME = NULL, @comprobante VARCHAR(30), @estado VARCHAR(20) = 'Registrada'
AS
BEGIN
    SET NOCOUNT ON;
    IF @fecha IS NULL SET @fecha = GETDATE();
    INSERT INTO Ventas (IdCliente, FechaVenta, NumeroComprobante, Estado)
    VALUES (@idCliente, @fecha, @comprobante, @estado);
    SELECT SCOPE_IDENTITY() AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_ActualizarVenta
    @id INT, @idCliente INT, @fecha DATETIME, @comprobante VARCHAR(30), @estado VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Ventas
    SET IdCliente = @idCliente, FechaVenta = @fecha, NumeroComprobante = @comprobante, Estado = @estado
    WHERE IdVenta = @id;
    SELECT @id AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_EliminarVenta @id INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Ventas WHERE IdVenta = @id;
END
GO

CREATE OR ALTER PROCEDURE sp_ListarDetalleVenta
AS
BEGIN
    SET NOCOUNT ON;
    SELECT IdDetalleVenta AS id, IdVenta AS idVenta, IdCosecha AS idCosecha,
           CantidadKg AS cantidadKg, PrecioUnitario AS precio
    FROM DetalleVenta
    ORDER BY IdDetalleVenta;
END
GO

/* -------------------------------- CLIENTES --------------------------------- */
CREATE OR ALTER PROCEDURE sp_ListarClientes
AS
BEGIN
    SET NOCOUNT ON;
    SELECT IdCliente AS id, NombreCliente AS nombre, TipoCliente AS tipo, DocumentoID AS doc,
           Telefono AS telefono, Direccion AS direccion, Email AS email
    FROM Clientes
    ORDER BY IdCliente;
END
GO

CREATE OR ALTER PROCEDURE sp_InsertarCliente
    @nombre VARCHAR(100), @tipo VARCHAR(20), @doc VARCHAR(15), @telefono VARCHAR(20) = NULL,
    @direccion VARCHAR(150) = NULL, @email VARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO Clientes (NombreCliente, TipoCliente, DocumentoID, Telefono, Direccion, Email)
    VALUES (@nombre, @tipo, @doc, @telefono, @direccion, @email);
    SELECT SCOPE_IDENTITY() AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_ActualizarCliente
    @id INT, @nombre VARCHAR(100), @tipo VARCHAR(20), @doc VARCHAR(15), @telefono VARCHAR(20) = NULL,
    @direccion VARCHAR(150) = NULL, @email VARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Clientes
    SET NombreCliente = @nombre, TipoCliente = @tipo, DocumentoID = @doc,
        Telefono = @telefono, Direccion = @direccion, Email = @email
    WHERE IdCliente = @id;
    SELECT @id AS id;
END
GO

CREATE OR ALTER PROCEDURE sp_EliminarCliente @id INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM Clientes WHERE IdCliente = @id;
END
GO
