const generalService = require('./generalService.js');
const Web3 = require("web3");
const web3=new Web3('http://localhost:7545');
const abi_contract= require("../../build/contracts/Licitaciones.json").abi;
const contract_address= require("../../build/contracts/Licitaciones.json").networks[5777].address;
const sender_address= process.env.PUBLIC_KEY;

class PublicacionService {
    async createPublicacion(idExp, myFileHashes){
        const licitacionesContract = new web3.eth.Contract(abi_contract, contract_address);
        try {
            return await licitacionesContract.methods.createPublicacion(idExp, myFileHashes.pbcg, myFileHashes.pbcp, myFileHashes.dipbcg, myFileHashes.dipbcp)
                .send({ from: sender_address, gas: 3000000 })
        } catch (err) {
            throw new Error("An error ocurred while trying to reach the smart contract");
        }
    }

    async searchPublicacion(query) {
        const licitacionesContract = new web3.eth.Contract(abi_contract, contract_address);
        try {
            let publicacionCount = await licitacionesContract.methods.publicacionCount().call();
            let publicaciones = [];
            for (var i = 1; i <= publicacionCount; i++) {
                let myPublicacion = await licitacionesContract.methods.publicaciones(i).call();
                if (myPublicacion.idExpediente == query || myPublicacion.pbcg == query || myPublicacion.pbcp == query || myPublicacion.dipbcg == query || myPublicacion.dipbcp == query) {

                    let publicacionSchema = {
                        "id": myPublicacion.id,
                        "idExpediente": myPublicacion.idExpediente,
                        "pbcg": myPublicacion.pbcg,
                        "pbcp": myPublicacion.pbcp,
                        "dipbcg": myPublicacion.dipbcg,
                        "dipbcp": myPublicacion.dipbcp,
                        "timestamp": myPublicacion.timestamp
                    };
                    publicaciones.push(publicacionSchema);
                }
            }
            return publicaciones;
        } catch (err) {
            throw new Error("An error ocurred while trying to reach the smart contract");
        }
    }

    fetchFiles(idExp) {
        //busco el archivo del pliego de condiciones generales
        let myPbcgFiles = this.fetchPbcg(idExp);

        //busco el archivo del pliego de condiciones particulares
        let myPbcpFiles = this.fetchPbcp(idExp);

        //busco el archivo de la disposicion del pliego de condiciones generales
        let myDipbcgFiles = this.fetchDipbcg(idExp);

        //busco el archivo de la disposicion del pliego de condiciones particulares
        let myDipbcpFiles = this.fetchDipbcp(idExp);

        let myFiles;

        if (myPbcgFiles.length == 1 && myPbcpFiles.length == 1 && myDipbcgFiles.length == 1 && myDipbcpFiles.length == 1) {

            //armo una objeto con todos los archivos
            myFiles = { "pbcg": myPbcgFiles[0], "pbcp": myPbcpFiles[0], "dipbcg": myDipbcgFiles[0], "dipbcp": myDipbcpFiles[0] };

        } else {
            throw new Error("There are not matching files for that expedient");
        }
        return myFiles;
    }

    fetchPbcg(idExp) {
        let myDir = idExp + "/publicacion/pbcg/";
        return generalService.fetchFile(myDir);
    }

    fetchPbcp(idExp) {
        let myDir = idExp + "/publicacion/pbcp/";
        return generalService.fetchFile(myDir);
    }

    fetchDipbcg(idExp) {
        let myDir = idExp + "/publicacion/dipbcg/";
        return generalService.fetchFile(myDir);
    }

    fetchDipbcp(idExp) {
        let myDir = idExp + "/publicacion/dipbcp/";
        return generalService.fetchFile(myDir);
    }

}
module.exports = new PublicacionService();