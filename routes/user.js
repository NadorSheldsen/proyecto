const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router(); 
const db = require('../config/database');

user.post("/singin", async(req, res, next) => {
    const { user_name, user_mail, user_password } = req.body
    if(user_nam && user_mail && user_password)
    {
        let query = "INSERT INTO user (user_name, user_mail, user_password)";
        query += `VALUES ('${user_name}','${user_mail}','${user_password}')`;
        const rows = await db.query(query);
        if(rows.affectedRows == 1)
        {
            return res.status(201).json({code: 201, message: "Usuario registrado correctamente"});

        }
        return res.status(500).json({code: 500, message: "Ocurrió un error"});
    }
    return res.status(500).json({code: 500, message: "Campos incompletos"});

});

user.post("/login", async(req, res, next) => {
    const { user_mail, user_password } = req.body;
    const query = `SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = ' ${user_password}';`;
    const rows = await db.query(query);

    if(rows.lenght ==1)
    {
        if(user_mail && user_password)
        {
            const token = jwt.sing({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, "debugkey");
            return res.status(200).json({code: 200, token});
        }
        else{
            return res.status(401).json({code: 401, message:"usuario y/o contraseña incorrectos"});
        }
    }
    return res.status(500).json({code: 500, message:"campos incompletos"});

});

user.get("/", async (req, res, next) => {
    const query = "SELECT * FROM user";
    const rows =  await db.query({code: 200, message: rows});

    return res.status(200).json({code: 200, message: rows});
});
module.exports = user;