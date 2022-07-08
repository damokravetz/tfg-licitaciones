const generalService = require('./generalService.js');
const Web3 = require("web3");
const web3=new Web3('http://localhost:7545');
const abi_contract= require("../../build/contracts/Licitaciones.json").abi;
const contract_address= require("../../build/contracts/Licitaciones.json").networks[5777].address;
const sender_address= process.env.PUBLIC_KEY;

class SuscripcionService {
    async createSuscripcion(idExp, myFileHashes){
        const licitacionesContract = new web3.eth.Contract(abi_contract, contract_address);
        try {
            return await licitacionesContract.methods.createSuscripcion(idExp, myFileHashes.convenio, myFileHashes.garantia)
                .send({ from: sender_address, gas: 3000000 })
        } catch (err) {
            throw new Error("An error ocurred while trying to reach the smart contract");
        }
    }

    async searchSuscripcion(query) {
        const licitacionesContract = new web3.eth.Contract(abi_contract, contract_address);
        try {
            let suscripcionCount = await licitacionesContract.methods.suscripcionCount().call();
            let suscripciones = [];
            for (var i = 1; i <= suscripcionCount; i++) {
                let mySuscripcion = await licitacionesContract.methods.suscripciones(i).call();
                if (mySuscripcion.idExpediente == query || mySuscripcion.convenio == query || mySuscripcion.garantia == query) {

                    let suscripcionSchema = {
                        "id": mySuscripcion.id,
                        "idExpediente": mySuscripcion.idExpediente,
                        "convenio": mySuscripcion.convenio,
                        "garantia": mySuscripcion.garantia,
                        "timestamp": mySuscripcion.timestamp
                    };
                    suscripciones.push(suscripcionSchema);
                }
            }
            return suscripciones;
        } catch (err) {
            throw new Error("An error ocurred while trying to reach the smart contract");
        }
    }

    fetchFiles(idExp) {
        //busco el archivo del convenio
        let myConvenioFiles = this.fetchConvenio(idExp);

        //busco el archivo de la garantia
        let myGarantiaFiles = this.fetchGarantia(idExp);

        let myFiles;

        if (myConvenioFiles.length == 1 && myGarantiaFiles.length == 1) {

            //armo una objeto con todos los archivos
            myFiles = {"convenio": myConvenioFiles[0], "garantia": myGarantiaFiles[0]};

        } else {
            throw new Error("There are not matching files for that expedient");
        }
        return myFiles;
    }

    fetchConvenio(idExp) {
        let myDir = idExp + "/suscripcion/convenio/";
        return generalService.fetchFile(myDir);
    }

    fetchGarantia(idExp) {
        let myDir = idExp + "/suscripcion/garantia/";
        return generalService.fetchFile(myDir);
    }

}
module.exports = new SuscripcionService();