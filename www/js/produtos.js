var criarProdutos = function (_nome, _codigo_barras, _volume, _id_volume, _qtd_embalagem ) {
    
    /*
    var _nome = "";
    var _codigo_barras   = "";
    var _volume          = 0;
    var _id_volume       = 0;
    var _qtd_embalagem   = 1;
    */

    var getPrecoVolume = function(){
        return 0;
    }

    return{
        nome:           _nome,
        codigo_barras:  _codigo_barras,
        volume:         _volume,
        id_volume:      _id_volume,
        qtd_embalagem:  _qtd_embalagem
       // getPrecoEmbalgem: getPrecoEmbalgem
    }
}

