const fs = require('fs');
const crypto = require('crypto');

class GeneralService {

    hashFile(file) {
        //instancio un metodo de hasheo sha256
        const hashSum = crypto.createHash('sha256');

        //ingreso el archivo en el hash
        hashSum.update(file, "utf-8");

        //proceso el hash
        const hex = hashSum.digest('hex');

        //devuelvo el hash
        return hex;
    }

    fetchFile(myDir) {
        //creo una lista para guardar los archivos
        let myFiles = [];

        //leo los archivos en el directorio
        let fileNames = fs.readdirSync(myDir)

        //recorro los archivos en el directorio
        fileNames.forEach(function (file) {

            console.log(file);

            //leo archivo
            const data = fs.readFileSync(myDir + file, 'utf8');

            //guardo el archivo en la lista de archivos
            myFiles.push(data);
        });

        //devuelvo la lista de archivos
        return myFiles;
    }
    
}
module.exports = new GeneralService();