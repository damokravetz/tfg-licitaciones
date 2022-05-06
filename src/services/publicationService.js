const generalService = require('./generalService.js');
const Web3 = require("web3");
const web3=new Web3('http://localhost:7545');
const abi_contract= require("../../build/contracts/Licitaciones.json").abi;
//const contract_address= require("../../build/contracts/Licitaciones.json").networks. 5777 .address;

class PublicacionService {

    async createPublicacion(idExp, myFileHashes){
        //console.log(contract_address);
        console.log(abi_contract);
        const Licitaciones =new web3.eth.Contract(abi_contract, "0x01b04fb58cfcEc00796e76856265BAd842ac7B77");
        //console.log(Licitaciones);
        Licitaciones.methods
        .createPublicacion(idExp, myFileHashes.pbcg, myFileHashes.pbcp, myFileHashes.dipbcg, myFileHashes.dipbcp)
        .call(function(err,res){
            if(err){
                console.log("An error occured", err);
                return;
            }
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