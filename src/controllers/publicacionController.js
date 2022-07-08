const publicationService = require('../services/publicationService.js');
const generalService = require('../services/generalService.js');

class PublicacionController {
    async create(req, res) {

        //extraigo el id del expediente enviado en los parametros de la solicitud
        let idExp = req.query.idExpediente;

        let response;
        try {
            //busco los archivos
            let myFiles = publicationService.fetchFiles(idExp);

            //hasheo los archivos y creo un objeto con los hashes
            let myFileHashes = {
                "pbcg": generalService.hashFile(myFiles.pbcg),
                "pbcp": generalService.hashFile(myFiles.pbcp),
                "dipbcg": generalService.hashFile(myFiles.dipbcg),
                "dipbcp": generalService.hashFile(myFiles.dipbcp)
            };
            
            console.log(myFileHashes);

            //creo la constancia en la blockchain
            response=await publicationService.createPublicacion(idExp, myFileHashes);
        } catch (err) {
            console.log(err)
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
            response=await publicationService.searchPublicacion(myQuery);
        }catch(err){
            response=err.message;
        }
        res.send(response);
    }
    
}
module.exports = new PublicacionController();