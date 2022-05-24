pragma solidity >=0.5.16 <0.9.0;

contract Licitaciones{
  
    uint public publicacionCount=0;
    uint public adjudicacionCount=0;
    uint public suscripcionCount=0;

  struct Publicacion {
    uint id;
    string idExpediente;
    string pbcg;
    string pbcp;
    string dipbcg;
    string dipbcp;
    uint timestamp;
  }

  struct Suscripcion {
    uint id;
    string idExpediente;
    string convenio;
    string garantia;
    uint timestamp;
  }

  struct Adjudicacion {
    uint id;
    string idExpediente;
    string disposicion;
    uint timestamp;
  }

  mapping(uint => Publicacion) public publicaciones;

  mapping(uint => Adjudicacion) public adjudicaciones;

  mapping(uint => Suscripcion) public suscripciones;

  event PublicacionCreated(
    uint id,
    string idExpediente,
    string pbcg,
    string pbcp,
    string dipbcg,
    string dipbcp,
    uint timestamp
  );

  event SuscripcionCreated(
    uint id,
    string idExpediente,
    string convenio,
    string garantia,
    uint timestamp
  );

  event AdjudicacionCreated(
    uint id,
    string idExpediente,
    string disposicion,
    uint timestamp
  );

  constructor() public {
    createPublicacion("EE-Prueba-01", "prueba-pbcg", "prueba-pbcp", "prueba-dipbcg", "prueba-dipbcp");
    createSuscripcion("EE-Prueba-01", "prueba-convenio", "prueba-garantia");
    createAdjudicacion("EE-Prueba-01", "prueba-di");
  }

  function createPublicacion(string memory _idExpediente, string memory _pbcg, string memory _pbcp, string memory _dipbcg, string memory _dipbcp) public {
    publicacionCount ++;
    publicaciones[publicacionCount] = Publicacion(publicacionCount, _idExpediente, _pbcg, _pbcp, _dipbcg, _dipbcp, block.timestamp);
    emit PublicacionCreated(publicacionCount, _idExpediente, _pbcg, _pbcp, _dipbcg, _dipbcp, block.timestamp);
  }

  function createSuscripcion(string memory _idExpediente, string memory _convenio, string memory _garantia) public {
    suscripcionCount ++;
    suscripciones[suscripcionCount] = Suscripcion(suscripcionCount, _idExpediente, _convenio, _garantia, block.timestamp);
    emit SuscripcionCreated(suscripcionCount, _idExpediente, _convenio, _garantia, block.timestamp);
  }

  function createAdjudicacion(string memory _idExpediente, string memory _disposicion) public {
    adjudicacionCount ++;
    adjudicaciones[adjudicacionCount] = Adjudicacion(adjudicacionCount, _idExpediente, _disposicion, block.timestamp);
    emit AdjudicacionCreated(adjudicacionCount, _idExpediente, _disposicion, block.timestamp);
  }

}