
var app = angular.module('appreco', []);

app.controller('ProdutosController', function($scope, $http) {

    $scope.id_usuario = 0;
    $scope.produto = [];
    $scope.produtos = [];
    $scope.itens_pesquisados = 0;

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

});