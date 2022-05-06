const express = require("express");
const fs = require('fs');
const crypto = require('crypto');
const router = express.Router();
const app = express();

require('./routes/publicacion.routes.js')(router);

app.use('/api', router);

app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});