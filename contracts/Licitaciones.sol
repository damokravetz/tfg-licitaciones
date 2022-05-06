pragma solidity >=0.5.16 <0.9.0;

contract Licitaciones{
    uint public publicacionCount=0;
    uint public ofertaCount=0;
    uint public adjudicacionCount=0;

  struct Publicacion {
    uint id;
    string idExpediente;
    string pbcg;
    string pbcp;
    string dipbcg;
    string dipbcp;
    uint timestamp;
  }

  struct Oferta {
    uint id;
    string idExpediente;
    string comprobante;
    uint timestamp;
  }

  struct Adjudicacion {
    uint id;
    string idExpediente;
    string disposicion;
    uint timestamp;
  }

  mapping(uint => Publicacion) public publicaciones;

  mapping(uint => Oferta) public ofertas;

  mapping(uint => Adjudicacion) public adjudicaciones;

  event PublicacionCreated(
    uint id,
    string idExpediente,
    string pbcg,
    string pbcp,
    string dipbcg,
    string dipbcp,
    uint timestamp
  );

  event OfertaCreated(
    uint id,
    string idExpediente,
    string comprobante,
    uint timestamp
  );

  event AdjudicacionCreated(
    uint id,
    string idExpediente,
    string disposicion,
    uint timestamp
  );

  event PublicacionFound(
    uint id,
    string idExpediente,
    string pbcg,
    string pbcp,
    string dipbcg,
    string dipbcp,
    uint timestamp
  );

  event OfertaFound(
    uint id,
    string idExpediente,
    string comprobante,
    uint timestamp
  );

  event AdjudicacionFound(
    uint id,
    string idExpediente,
    string disposicion,
    uint timestamp
  );

  constructor() public {
    createPublicacion("EE-Prueba-01", "prueba-pbcg", "prueba-pbcp", "prueba-dipbcg", "prueba-dipbcp");
    createOferta("EE-Prueba-01", "prueba-comprobante");
    createAdjudicacion("EE-Prueba-01", "prueba-di");
  }

  function createPublicacion(string memory _idExpediente, string memory _pbcg, string memory _pbcp, string memory _dipbcg, string memory _dipbcp) public {
    publicacionCount ++;
    publicaciones[publicacionCount] = Publicacion(publicacionCount, _idExpediente, _pbcg, _pbcp, _dipbcg, _dipbcp, block.timestamp);
    emit PublicacionCreated(publicacionCount, _idExpediente, _pbcg, _pbcp, _dipbcg, _dipbcp, block.timestamp);
  }

  function createOferta(string memory _idExpediente, string memory _comprobante) public {
    ofertaCount ++;
    ofertas[ofertaCount] = Oferta(ofertaCount, _idExpediente, _comprobante, block.timestamp);
    emit OfertaCreated(ofertaCount, _idExpediente, _comprobante, block.timestamp);
  }

  function createAdjudicacion(string memory _idExpediente, string memory _disposicion) public {
    adjudicacionCount ++;
    adjudicaciones[adjudicacionCount] = Adjudicacion(adjudicacionCount, _idExpediente, _disposicion, block.timestamp);
    emit AdjudicacionCreated(adjudicacionCount, _idExpediente, _disposicion, block.timestamp);
  }

}