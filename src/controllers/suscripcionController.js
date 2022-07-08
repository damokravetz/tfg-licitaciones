const suscripcionService = require('../services/suscripcionService.js');
const generalService = require('../services/generalService.js');

class SuscripcionController {
    async create(req, res) {

        //extraigo el id del expediente enviado en los parametros de la solicitud
        let idExp = req.query.idExpediente;

        let response;
        try {
            //busco los archivos
            let myFiles = suscripcionService.fetchFiles(idExp);

            //hasheo los archivos y creo un objeto con los hashes
            let myFileHashes = {
                "convenio": generalService.hashFile(myFiles.convenio),
                "garantia": generalService.hashFile(myFiles.garantia)
            };

            console.log(myFileHashes);
            
            //creo la constancia en la blockchain
            response=await suscripcionService.createSuscripcion(idExp, myFileHashes);
        } catch (err) {
            response=err.message;
        }

        res.send(response);
    }

    async search(req, res) {

        //extraigo el hash del archivo enviado en los parametros de la solicitud
        let myQuery = req.query.search;

        let response;
        try{
            //busco la publicacion en la blockchain comparando con el hash
            response=await suscripcionService.searchSuscripcion(myQuery);
        }catch(err){
            response=err.message;
        }
        res.send(response);
    }
    
}
module.exports = new SuscripcionController();