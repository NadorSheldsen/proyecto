const express = require('express');
const empleado = express.Router(); 
const db = require('../config/database');

empleado.post("/", async (req, res, next) => {
    const { NombreEmp, ApellidosEmp, TelefonoEmp, CorreoEmp, DireccionEmp } = req.body;

    if (NombreEmp && ApellidosEmp && TelefonoEmp && CorreoEmp && DireccionEmp) {
        let query = "INSERT INTO empleado(NombreEmp, ApellidosEmp, TelefonoEmp, CorreoEmp, DireccionEmp)";
        query += ` VALUES('${NombreEmp}', ${ApellidosEmp}, ${TelefonoEmp}, ${CorreoEmp}, ${DireccionEmp})`;

        const rows = await db.query(query);

        if (rows.affectedRows === 1) {
            return res.status(201).json({ code: 201, message: "Empleado insertado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }

    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

empleado.delete("/:idEmp([0-9]{1,3})", async (req, res, next) => {
    const query = `DELETE FROM empleado WHERE IdEmp=${req.params.id}`;
    const rows = await db.query(query);

    if (rows.affectedRows === 1) {
        return res.status(200).json({ code: 200, message: "Empleado borrado correctamente" });
    }

    return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

empleado.put("/:idEmp([0-9]{1,3})", async (req, res, next) => {
    const { NombreEmp, ApellidosEmp, TelefonoEmp, CorreoEmp, DireccionEmp } = req.body;

    if (NombreEmp && ApellidosEmp && TelefonoEmp && CorreoEmp && DireccionEmp) {
        let query = `UPDATE empleado SET NombreEmp='${NombreEmp}', ApellidosEmp=${ApellidosEmp},`;
        query += ` TelefonoEmp=${TelefonoEmp}, CorreoEmp=${CorreoEmp}, DireccionEmp=${DireccionEmp} WHERE IdEmp = ${req.params.id};`;

        const rows = await db.query(query);

        if (rows.affectedRows === 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }

    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

empleado.patch("/:nombreEmp([A-Za-z]+)", async (req, res, next) => {
    if (req.body.NombreEmp) {
        let query = `UPDATE empleado SET NombreEmp='${req.body.NombreEmp}' WHERE IdEmp = ${req.params.idEmp};`;
        const rows = await db.query(query);

        if (rows.affectedRows === 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }

    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

empleado.get("/", async (req, res, next) => {
    const employees = await db.query("SELECT * FROM empleado");
    return res.status(200).json({ code: 200, message: employees });
});

empleado.get("/:idEmp([0-9]{1,3})", async (req, res, next) => {
    const id = req.params.id;
    if (id >= 1 && id <= 722) {
        const employee = await db.query("SELECT * FROM empleado WHERE IdEmp=" + id + ";");
        return res.status(200).json({ code: 200, message: employee });
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

empleado.get("/:nombreEmp([A-Za-z]+)", async (req, res, next) => {
    const name = req.params.name;
    const employee = await db.query("SELECT * FROM empleado WHERE IdEmp=" + name + ";");
    if (employee.length > 0) {
        return res.status(200).json({ code: 200, message: employee });
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

module.exports = empleado;