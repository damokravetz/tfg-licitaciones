const adjudicacionService = require('../services/adjudicacionService.js');
const generalService = require('../services/generalService.js');

class AdjudicacionController {
    async create(req, res) {

        //extraigo el id del expediente enviado en los parametros de la solicitud
        let idExp = req.query.idExpediente;

        let response;
        try {
            //busco los archivos
            let myFiles = adjudicacionService.fetchFiles(idExp);

            //hasheo los archivos y creo un objeto con los hashes
            let myFileHashes = {
                "pbcg": generalService.hashFile(myFiles.pbcg),
                "pbcp": generalService.hashFile(myFiles.pbcp),
                "dipbcg": generalService.hashFile(myFiles.dipbcg),
                "dipbcp": generalService.hashFile(myFiles.dipbcp)
            };
            
            //creo la constancia en la blockchain
            response=await adjudicacionService.createAdjudicacion(idExp, myFileHashes);
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
            response=await adjudicacionService.searchAdjudicacion(myQuery);
        }catch(err){
            response=err.message;
        }
        res.send(response);
    }
    
}
module.exports = new AdjudicacionController();