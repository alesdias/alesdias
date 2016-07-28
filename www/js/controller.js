
angular.module("appreco", []);

angular.module("appreco").controller("pesquisaCntr", function($scope) {
    
    var queryLojas      = "SELECT * FROM lojas    WHERE ic_acao <> 'D' ORDER BY nome ASC";
    var queryProdutos   = "SELECT * FROM produtos WHERE ic_acao <> 'D' ORDER BY nome ASC";

    $scope.log = false;
    $scope.logs = [];  
    $scope.release = "0.02 de 27/07/2016" 
    

    //INFRAESTRUTURA
    $scope.listDados = function(query, callback){

        log('Executando : ' + query);

        // Retorna todos da consulta.
        database.transaction(
            function( transaction ){
                transaction.executeSql(
                    (
                       query
                    ),
                    [],
                    function( transaction, results ){
                        callback(results);
                        log("Sucesso :");
                    },
                    function(transaction, error){
                        log("Erro :" + error.message);
                    }     
                );
            }
        );
    };

    $scope.deleteDados = function(query, callback){

       //Utiliza mesma infra do select
       $scope.listDados(query, callback); 

    };

    $scope.insertDados = function(query, callback){

        log('Executando : ' + query);
        database.transaction(
            function( transaction ){
                transaction.executeSql(
                    (
                       query
                    ),
                    [],
                    function( transaction, results ){//sucess
                        callback(results.insertId);
                        log('Sucesso : registro gerado ' + results.insertId);
                    },
                    function(transaction, error){
                        log("Erro :" + error.message);
                    }
                );
            }
        ); // fim de : database.transaction(

    };

    $scope.inicio = function(){
        $scope.listDados(queryLojas     , $scope.callLojas);    //ListaLojas
        $scope.listDados(queryProdutos  , $scope.callProdutos); //ListaProdutos
    };

    var log = function(texto){
        if($scope.log){
            console.log(texto);
            $scope.logs.push({"texto" : texto})
        }
    }

    $scope.configLog = function(){
        $scope.logs = [];
    }

    //LOJAS
    $scope.salvarLoja = function(nome){
        // Insere registro na tabela de produtos
        var query = "INSERT INTO lojas (nome, ic_acao) VALUES ('"+ nome +"', 'I');";
  
        $scope.insertDados(query, function(retorno){
            if(retorno){
                log("Loja " + retorno +" incluida com sucesso!!");
                $('#loja_nome').val("");
                Materialize.toast('Loja adicionada id:' + retorno , 3000);
                $scope.listDados(queryLojas, $scope.callLojas); //ListaLojas
            }else{
                log("Erro ao incluir Loja!! ");
            }
        }); // fim de : $scope.insertDados(queryProdutos, function(retorno){   
    };

    $scope.callLojas = function(results){
        var lojas = []
        for (var i = 0;i<results.rows.length;i++){
            lojas.push(results.rows.item(i));
        };
        $scope.lojas = lojas;
        $scope.$apply();
    };

    $scope.addLoja = function(){
        var loja    = $('#loja_nome').val();
        $scope.salvarLoja(loja);
    }

    $scope.deletarloja = function(id){
        // Insere registro na tabela de produtos
        var query = "UPDATE lojas set ic_acao = 'D' where id = " + id;
        $scope.deleteDados(query, function(retorno){
            if(retorno){

                Materialize.toast('Loja removida' , 3000);
                $scope.listDados(queryLojas, $scope.callLojas); //ListaLojas

            }else{
                log("Erro ao excluir Loja!! ");
            }
        }); // fim de : $scope.insertDados(queryProdutos, function(retorno){   
    };
    
    $scope.defineLoja = function(loja){
        
        $('#escolhe_produto').show();
        $scope.loja = loja;

    };



    //PRODUTOS
    $scope.salvarProduto = function( codigo_barras, nome, volume, id_volume, qtd_embalagem){
        // Insere registro na tabela de produtos
        var query = "INSERT INTO produtos (nome, volume, id_volume, qtd_embalagem, codigo_barras, ic_acao) VALUES ('"+ nome +"', '"+ volume +"', "+ id_volume +", "+ qtd_embalagem +", '" + codigo_barras + "', 'I')";
  
        $scope.insertDados(query, function(retorno){
            if(retorno){
                
                log("Produto " + retorno +" incluido com sucesso!!");
                $('#codigo_barras').val("");
                $('#produto_nome').val("");
                $('#produto_volume').val("");
                $('#produto_id_volume').val("");
                $('#produto_qtd_embalagem').val("");
                Materialize.toast('Produto adicionado id:' + retorno , 3000);
                $scope.listDados(queryProdutos, $scope.callProdutos); //ListaProdutos
                mostraProdutos('listaProdutos');

            }else{
                log("Erro ao incluir Produto!! ");
            }
        }); // fim de : $scope.insertDados(queryProdutos, function(retorno){   
    };

    $scope.callProdutos = function(results){
        var dados = []
        for (var i = 0;i<results.rows.length;i++){
            dados.push(results.rows.item(i));
        };
        $scope.produtos = dados;
        $scope.$apply();
    };

    $scope.addProduto = function(){
        var barras          = $('#codigo_barras').val();
        var nome            = $('#produto_nome').val();
        var volume          = $('#produto_volume').val();
        var id_volume       = $('#produto_id_volume').val();
        var qtd_embalagem   = $('#produto_qtd_embalagem').val();
        $scope.salvarProduto(barras,nome,volume,id_volume,qtd_embalagem);
    };

    $scope.deletarProduto = function(id){
        // Insere registro na tabela de produtos
        var query = "UPDATE produtos set ic_acao = 'D' where id = " + id;
        $scope.deleteDados(query, function(retorno){
            if(retorno){

                Materialize.toast('Produto removido' , 3000);
                $scope.listDados(queryProdutos, $scope.callProdutos); //ListaProdutos
                mostraProdutos('listaProdutos');

            }else{
                log("Erro ao excluir Produto!! ");
            }
        }); // fim de : $scope.insertDados(queryProdutos, function(retorno){   
    };

}); // fim de : angular.module("appreco").controller("pesquisaCntr", function($scope) 

