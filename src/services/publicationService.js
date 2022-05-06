const generalService = require('./generalService.js');
const Web3 = require("web3");
const web3=new Web3('http://localhost:7545');
const abi_contract= require("../../build/contracts/Licitaciones.json").abi;
const contract_address= require("../../build/contracts/Licitaciones.json").networks[5777].address;
const sender_address= process.env.PUBLIC_KEY;

class PublicacionService {
    async createPublicacion(idExp, myFileHashes){
        const licitacionesContract =new web3.eth.Contract(abi_contract, contract_address);
        licitacionesContract.methods
        .createPublicacion(idExp, myFileHashes.pbcg, myFileHashes.pbcp, myFileHashes.dipbcg, myFileHashes.dipbcp)
        .send({from: sender_address, gas:3000000},function(err,res){
            if(err){
                console.log("An error occured", err);
                return;
            }
            console.log("Hash of the transaction: " + res);
        });
    }

    async searchPublicacion(myFileHash){
        const licitacionesContract =new web3.eth.Contract(abi_contract, contract_address);
        licitacionesContract.methods
        .publicaciones(2)
        .call(function(err,res){
            if(err){
                console.log("An error occured", err);
                return;
            }
            console.log(res);
            console.log("Hash of the transaction: " + res);
        });
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
            myFiles = {};
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