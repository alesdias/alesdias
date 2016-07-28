

function abrirModal(modal){
    $('#'+modal).openModal();
}

function fecharModal(modal){
    $('#'+modal).closeModal();
}

var mostrarConteudo = function( mostra ){
    var conteudos = ['home','config'];

    if(mostra == 'conteudo-produtos'){
        mostraProdutos('listaProdutos');
    }

    $('#conteudo-home').hide();
    $('#conteudo-produtos').hide();
    $('#conteudo-pesquisas').hide();
    $('#conteudo-config').hide();
    $('#conteudo-lojas').hide();
    $('#'+mostra).show();
    //$(".button-collapse").sideNav();
    console.log(mostra);
};

var mostraProdutos  = function( mostra ){
    $('#listaProdutos').hide();
    $('#novoProduto').hide();
    $('#'+mostra).show();
};

function cameraClick(){
  cordova.plugins.barcodeScanner.scan(
      function (result) {
          if(result.cancelled != 1){
            $('#codigo_barras').val(result.text);
            $('#codigo_barras2').val(result.text);
            Materialize.toast('Produto [' + result.text + '] ' , 3000);
          }
          console.log("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      }, 
      function (error) {
        Materialize.toast('Erro ao ler o código de barras: ' + error, 3000);
        console.log("Erro ao ler o código de barras: " + error);
      },
      {
          "preferFrontCamera" : false, // iOS and Android
          "showFlipCameraButton" : false, // iOS and Android
          "prompt" : "Coloque o Código de barras no local indicado.", // supported on Android only
         // "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device
      }
   );
};


/*
function xsalvarLoja(){
    reiniciarModal();
    //carregamento();

    var idUsuario           = $('#id_usuario').val();
    var nome                = $('#nm_local').val();
    var geo_localizacao     = $('#geo_localizacao').val();

   // var loja = {"nome:  nome , "geolocalizacao: "  localizacao } 
    $.post("servicos/loja.php",{action: 'gravar', id_usuario: idUsuario, nm_local: nome, geo_localizacao: geo_localizacao} 
    ,
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
    //fecharModal('addLoja');
}

function reiniciarModal(){
    if ($("#lojaForm").css("display") == "block"){
        $("#lojaForm").css("display", "none");
        $("#progress").css("display", "block");
    }else{
        $("#lojaForm").css("display", "block");
        $("#progress").css("display", "none");
    }
}

function enviarDados(url, dados){
    alerta(dados);

    $.post(url,dados 
    ,
    function(data, status){
        alert("Data: " + data + "\nStatus: " + status);
    });
}

var carregamento    = function(){
    if(carregou == 100){
        carregou = 0;
        fecharModal('addLoja');
        setTimeout(reiniciarModal, 500);
    } else {
        carregou = carregou + 1;
        $('#carregamento').css("width", carregou + "%" );
        $('#percentual').html(carregou + "%" )
        
        console.log('Carregou : ' + carregou);
        setTimeout(carregamento, 50); // check again in a second
    }
}
var refreshLojas    = function( results ){
    if (!results){
        return;
    }

    var texto = "";

    //alert("Quantidade Resultados: " + results.rows.length);
    if(results.rows.length > 0 ){
        $('#lojasHeader').show();
    }else{
        $('#lojasHeader').hide();
    }
    for (var i = 0;i<results.rows.length;i++){
        texto = texto + "<tr>";
        texto = texto + "<td>" + results.rows.item(i).nome +"</td>";
        texto = texto + "<td> <a href='#!' onclick='acaoDeletarLoja("+ results.rows.item(i).id +");'><i class='material-icons'>delete</i></a></td>";
        texto = texto + "</tr>";
    }
    //comboLojas(results); // atualiza o combo
    $('#Lojas').html(texto);


    //alert("Quantidade Resultados: " + results.rows.length);
    texto = "";
    texto = texto + "<form action='#'>";
    for (var i = 0;i<results.rows.length;i++){
        texto = texto + "<p>";
        texto = texto + "<input class='with-gap' name='group1' type='radio' id='"+ results.rows.item(i).id +"'/>";
		texto = texto + "<label onclick='defineLoja("+ results.rows.item(i).id +");' for='"+ results.rows.item(i).id +"'>" + results.rows.item(i).nome +"</label>";
        texto = texto + "</p>";
    }
    texto = texto + "</form>";
    console.log(texto);
    $('#escolhe_loja').html(texto);

};

var comboLojas      = function( results ){
    if (!results){
        return;
    }
    var texto = "";
    
    texto = texto + "<select id='produto_loja'>";
    texto = texto + "<option value='' disabled selected>Selecione uma Loja</option>";

   // alert("Quantidade Resultados: " + results.rows.length);
    for (var i = 0;i<results.rows.length;i++){
        texto = texto + "<option value='"+ results.rows.item(i).id +"'>" + results.rows.item(i).nome +"</option></td>";
    }
	texto = texto + "</select>";
	texto = texto + "<label>Loja</label>";
    $('#comboLojas').html(texto);
};

var refreshProdutos = function( results ){
    if (!results){
        return;
    }
    var texto = "";

    //alert("Quantidade Resultados: " + results.rows.length);
    if(results.rows.length > 0 ){
        $('#produtoHeader').show();
    }else{
        $('#produtoHeader').hide();
    }
    for (var i = 0;i<results.rows.length;i++){
        texto = texto + "<tr>";
        texto = texto + "<td>" + results.rows.item(i).nome +"</td>";
        texto = texto + "<td></td>";
        texto = texto + "<td> <a href='#!' onclick='acaoDeletarProduto("+ results.rows.item(i).id +");'><i class='material-icons'>delete</i></a></td>";
        texto = texto + "</tr>";
    }
    $('#Produtos').html(texto);
    mostraProdutos('listaProdutos');
};

var refreshTabelas  = function( results ){
    if (!results){
        return;
    }
    var texto = "";

    //alert("Quantidade Resultados: " + results.rows.length);
    if(results.rows.length > 0 ){
        $('#tabelaHeader').show();
    }else{
        $('#tabelaHeader').hide();
    }
    for (var i = 0;i<results.rows.length;i++){
        texto = texto + "<tr>";
        texto = texto + "<td>" + results.rows.item(i).tbl_name +"</td>";
        texto = texto + "<td></td>";
        texto = texto + "<td> <a href='#!' onclick='acaoDeletarTabela("+ results.rows.item(i).tbl_name +");'><i class='material-icons'>delete</i></a></td>";
        texto = texto + "</tr>";
    }
    $('#Tabelas').html(texto);
};



function addLoja(){
    var loja    = $('#loja_nome').val();

    salvarLoja(loja,function(resultado){
        if( resultado ){
           $('#loja_nome').val("");
           listaLojas(refreshLojas);
        }
    });
}

function delLoja(id){
    deletarLoja(id, function(){
            Materialize.toast('Loja apagada' , 3000);
            listaLojas(refreshLojas);
            fecharModal('LojaDel_Modal');
        }
    );
}

function acaoDeletarLoja(id){
    var texto = "";
    texto = texto + "<a href='#!' class='modal-action modal-close waves-effect btn-flat'>Não</a>";
	texto = texto + "<a href='#!' onclick='delLoja("+id+");' class='waves-effect btn blue'>Sim</a>";
    $('#acaoDeletarLoja').html(texto);
    abrirModal('LojaDel_Modal');
}

function addProduto(){
    var barras          = $('#codigo_barras').val();
    var nome            = $('#produto_nome').val();
    var volume          = $('#produto_volume').val();
    var id_volume       = $('#produto_id_volume').val();
    var qtd_embalagem   = $('#produto_qtd_embalagem').val();

    salvarProduto(barras,nome,volume,id_volume,qtd_embalagem,function(resultado){
        if( resultado ){
            $('#codigo_barras').val("");
            $('#produto_nome').val("");
            $('#produto_volume').val("");
            $('#produto_id_volume').val("");
            $('#produto_qtd_embalagem').val("");
            Materialize.toast('Produto adicionado id:' + resultado , 3000);
            listaProdutos(refreshProdutos);
            mostraProdutos('listaProdutos');
        }
    });
};

function delProdutos(){
    deletarProdutos(function(){
        Materialize.toast('Produtos apagados' , 3000);
        listaProdutos(refreshProdutos);
        }
    );
}

function delProduto(id){
    deletarProduto(id, function(){
            Materialize.toast('Produto apagado' , 3000);
            listaProdutos(refreshProdutos);
        }
    );
    fecharModal('ProdutosDel_Modal');
}

function acaoDeletarProduto(id){
    var texto = "";
    texto = texto + "<a href='#!' class='modal-action modal-close waves-effect btn-flat'>Não</a>";
	texto = texto + "<a href='#!' onclick='delProduto("+id+");' class='waves-effect btn blue'>Sim</a>";
    $('#acaoDeletarProduto').html(texto);
    abrirModal('ProdutosDel_Modal');
}


function carrinhoClick(){
    console.log('carrinhoClick');
};

function onDeviceReady() {
    // Now safe to use the PhoneGap API
    listaProdutos(refreshProdutos);
    //listaLojas(refreshLojas);
    listaTabelas(refreshTabelas);
    //listLojas($scope.pegarLojas);
    console.log("Aplicativo pronto para uso...")
}

document.addEventListener("deviceready", onDeviceReady, false);

*/
