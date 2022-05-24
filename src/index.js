const express = require("express");
const fs = require('fs');
const crypto = require('crypto');
const router = express.Router();
const dotenv = require('dotenv');
const app = express();

dotenv.config();

require('./routes/publicacion.routes.js')(router);
require('./routes/adjudicacion.routes.js')(router);
require('./routes/suscripcion.routes.js')(router);

app.use('/api', router);

app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});