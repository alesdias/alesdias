
var app = angular.module('appreco', []);

app.controller('PesquisaController', function($scope, $http) {

    $scope.id_usuario = 0;
    $scope.loja = [];
    $scope.lojas = [];
    $scope.produtos = [];
    $scope.itens_pesquisados = 0;
    $scope.dt_pesquisa  = "2016-06-24";
    $scope.PesquisaProdutos = [];
    $scope.mostrarProdutos = true;

    $scope.listarLojas = function(id_usuario){
        $scope.id_usuario = id_usuario;
        $http.get('servicos/loja.php?action=listar&id_usuario=' + id_usuario)
        .success(function(retorno) {
            console.log(retorno);
            $scope.lojas = retorno; 
        })
        .error(function(erro) {
            console.log(erro);
        });
    };

    //Não estou utilizando ainda
    $scope.buscarLoja = function(id_loja){
        $scope.id_usuario = id_usuario;
        $http.get('servicos/loja.php?action=buscar&id_loja=' + id_loja)
        .success(function(retorno) {
            console.log(retorno);
            $scope.lojas = retorno; 
        })
        .error(function(erro) {
            console.log(erro);
        });
    };

    $scope.listarProdutos = function(id_usuario){
        $scope.id_usuario = id_usuario;
        $http.get('servicos/produto.php?action=listar&id_usuario=' + id_usuario)
        .success(function(retorno) {
            console.log(retorno);
            $scope.produtos = retorno; 
        })
        .error(function(erro) {
            console.log(erro);
        });
    };

    $scope.trocarLoja = function(loja) {
        $scope.loja  = loja;
        $scope.mostrarProdutos = true;

        $http.get('servicos/loja.php?action=escolher&id_loja=' + loja.id_loja)
        .success(function(retorno) {
            console.log(retorno);
        })
        .error(function(erro) {
            console.log(erro);
        });
    };

    $scope.setCarregamento = function(carregou){
        if(carregou == 100){
            carregou = 0;
            fecharModal('addLoja');
            setTimeout(reiniciarModal, 500);
        } else {
            $('#carregamento').css("width", carregou + "%" );
            $('#percentual').html(carregou + "%" )
            
            console.log('Carregou : ' + carregou);
            //setTimeout(carregamento, 50); // check again in a second
        }
    };

    $scope.gravarLoja = function(){

        //$scope.setCarregamento(50);
        var idUsuario           = $('#id_usuario').val();
        var nome                = $('#nm_local').val();
        var geo_localizacao     = $('#geo_localizacao').val();
        //$scope.dados           = "[{action: 'gravar', id_usuario: "+ idUsuario +", nm_local: '"+ nome +"', geo_localizacao: "+ geo_localizacao +"}]";


        $.post("servicos/loja.php",{action: 'gravar', id_usuario: idUsuario, nm_local: nome, geo_localizacao: geo_localizacao} 
        ,
        function(data, status){
            $scope.listarLojas($scope.id_usuario);
            $scope.lojaNova = {};
            //$scope.mensagem = "Status: " + status;
             Materialize.toast('Loja incluida com sucesso!', 3000, 'rounded')
            fecharModal('addLoja');

        });
    };   

    $scope.gravarProduto = function(){

        //$scope.setCarregamento(50);

        /*
        nm_produto         =  $("nm_produto").val();
        ds_produto         =  $("ds_produto").val();
        qtd_embalgem       =  $("qtd_embalgem").val();
        cod_barras         =  $("cod_barras").val();
        id_unidade         =  $("id_unidade").val();
        qtd_unidade        =  $("qtd_unidade").val();
        img_produto        =  $("img_produto").val();
        vl_produto         =  $("vl_produto").val();
        qtd_comprado       =  $("qtd_comprado").val();
        id_loja            =  $("id_loja").val();
        dt_pesquisa        =  $("dt_pesquisa").val();
        action             =  $("action").val();
        */

        nm_produto         =  "Produto 01";
        ds_produto         =  "Descrição de Teste";
        qtd_embalgem       =  1;
        cod_barras         =  09889766543;
        id_unidade         =  1;
        qtd_unidade        =  2;
        img_produto        =  "http://www.imagnes.com.br/foto.jpg";
        vl_produto         =  2.34;
        qtd_comprado       =  1;
        id_loja            =  12;
        dt_pesquisa        =  "01/10/2016";
        action             =  "gravar";

        $scope.dados           = "[{action: 'gravar', nm_produto: '"+ nm_produto +"', ds_produto: '"+ ds_produto +"', qtd_embalgem: "+ qtd_embalgem +", cod_barras: '"+ cod_barras +"', id_unidade: "+ id_unidade +", qtd_unidade: "+ qtd_unidade + ", img_produto: '"+ img_produto +"', vl_produto: "+ vl_produto +", qtd_comprado: "+ qtd_comprado+", id_loja: "+ id_loja +", dt_pesquisa: '"+ dt_pesquisa +"' }]";


        $.post("servicos/produto.php",$scope.dados
        ,
        function(data, status){
            alert(data);
            $scope.listarProdutos($scope.id_usuario);
            //$scope.mensagem = "Status: " + status;
            Materialize.toast('Produto incluido com sucesso!', 3000, 'rounded');
            //fecharModal('addLoja');
        });
    
    };

    $scope.buscarProduto - function(){
        alert('tete');
        abrirModal('buscarProduto');
    };

    //Não estou usando ainda
    $scope.incluirItem - function(){
        console.log("addItem");
    };

});
