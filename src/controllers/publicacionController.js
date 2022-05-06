const publicationService = require('../services/publicationService.js');
const generalService = require('../services/generalService.js');

class PublicacionController {
    async create(req, res) {

        let idExp = req.query.idExpediente;

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

        await publicationService.createPublicacion(idExp, myFileHashes);

        res.send('Saludos desde express');
    }

    
    
    
}
module.exports = new PublicacionController();