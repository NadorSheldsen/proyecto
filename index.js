const morgan = require('morgan')
const express = require('express');
const app = express();
const user = require('./routes/user');
const empleado = require('./routes/empleado');

const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound.js');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res, next) => {
    res.status(200).json({code: 1, message: "Bienvenido al departamento de recursos humanos de la empresa Taller de Node.js S.A. de C.V."});
});


app.use("/empleado", empleado);

app.use((req, res, next) => {
    try
    {
        const token = req.headers.authotization.split(" ")[1];
        const decoded = jwt.verify(token, "debugkey");
        req.user = decoded;
        next();
    }
    catch (error)
    {
        return res.status(401).json({code: 401, message: "No tienes permiso :("});
    }
});

app.get("/", index)
app.use("/user", user);
app.use(auth);
app.use(notFound);




app.use((req, res, next) => {
    return res.status(404).json({code: 404, message: "ULR no encontrada"});
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});
