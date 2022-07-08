const generalService = require('./generalService.js');
const Web3 = require("web3");
const web3=new Web3('http://localhost:7545');
const abi_contract= require("../../build/contracts/Licitaciones.json").abi;
const contract_address= require("../../build/contracts/Licitaciones.json").networks[5777].address;
const sender_address= process.env.PUBLIC_KEY;

class AdjudicacionService {
    async createAdjudicacion(idExp, myFileHashes){
        const licitacionesContract = new web3.eth.Contract(abi_contract, contract_address);
        try {
            return await licitacionesContract.methods.createAdjudicacion(idExp, myFileHashes.disposicion)
                .send({ from: sender_address, gas: 3000000 })
        } catch (err) {
            throw new Error("An error ocurred while trying to reach the smart contract");
        }
    }

    async searchAdjudicacion(query) {
        const licitacionesContract = new web3.eth.Contract(abi_contract, contract_address);
        try {
            let adjudicacionCount = await licitacionesContract.methods.adjudicacionCount().call();
            let adjudicaciones = [];
            for (var i = 1; i <= adjudicacionCount; i++) {
                let myAdjudicacion = await licitacionesContract.methods.adjudicaciones(i).call();
                if (myAdjudicacion.idExpediente == query || myAdjudicacion.disposicion == query) {

                    let adjudicacionSchema = {
                        "id": myAdjudicacion.id,
                        "idExpediente": myAdjudicacion.idExpediente,
                        "disposicion": myAdjudicacion.disposicion,
                        "timestamp": myAdjudicacion.timestamp
                    };
                    adjudicaciones.push(adjudicacionSchema);
                }
            }
            return adjudicaciones;
        } catch (err) {
            throw new Error("An error ocurred while trying to reach the smart contract");
        }
    }

    fetchFiles(idExp) {
        //busco el archivo de la disposicion de adjudicacion
        let myDisposicionFiles = this.fetchDisposicion(idExp);

        let myFiles;

        if (myDisposicionFiles.length == 1) {

            //armo una objeto con todos los archivos
            myFiles = {"disposicion": myDisposicionFiles[0]};

        } else {
            throw new Error("There are not matching files for that expedient");
        }
        return myFiles;
    }

    fetchDisposicion(idExp) {
        let myDir = idExp + "/adjudicacion/";
        return generalService.fetchFile(myDir);
    }

}
module.exports = new AdjudicacionService();