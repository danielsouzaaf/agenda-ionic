// Ionic sisma App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'sisma' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('sisma', ['ionic'])
.controller('ContatosPostController', function($scope, $http){
  $scope.data = {};

  $scope.postContato = function(){
    var link = 'http://10.21.0.137/20131011110029/api/contato';

    $http.post(link, {Nome: $scope.data.nome, Telefone: $scope.data.telefone}).then(function (res){
      $scope.response = res.data;
    });
  };
})
.controller('ContatosController', function($scope, $http){
  $http.get('http://10.21.0.137/20131011110029/api/contato').
  then(function(response){
    $scope.contatos = response.data;
  });
})
.controller('DemandasController', function($scope, $http) {

$http.get('http://10.21.0.137/20131011110380/api/demanda').
    then(function(response) {
        $scope.demandas = response.data;
    });
})
.controller('LocaisController', function($scope, $http){

  $http.get('http://10.21.0.137/20131011110380/api/local').
    then(function(response) {
      $scope.locais = response.data;
    });
})
.controller('OcorrenciasController', function($scope, $http){

  function setDemanda(demandaId, id)
  {
        $http.get('http://10.21.0.137/20131011110380/api/demanda').
            then(function(responsedemanda) {
                $scope.demandas = responsedemanda.data;
                var demanda = $.grep($scope.demandas, function(e){ return e.id == demandaId; });
                $scope.ocorrencias[id].demanda = demanda;
                console.log($scope.ocorrencias[id].id);
                console.log($scope.ocorrencias[id].demanda);
            });
  }

  function setLocal(localId, id)
  {
    $http.get('http://10.21.0.137/20131011110380/api/local').
        then(function(responselocal) {
            $scope.locais = responselocal.data;
            var local = $.grep($scope.locais, function(e){ return e.id == localId; });
            $scope.ocorrencias[id].local = local;
            console.log($scope.ocorrencias[id].id);
            console.log($scope.ocorrencias[id].local);
        });
  }


  $http.get('http://10.21.0.137/20131011110380/api/ocorrencia').
  then(function(response) {
    $scope.ocorrencias = response.data;
    console.log("oi ayrton");
    console.log($scope.ocorrencias);
    // var demandas = [];
    //     $http.get('http://10.21.0.137/20131011110380/api/demanda').
    //         then(function(responsedemanda) {
    //             demandas = responsedemanda.data;
    //         });
    for (var i = 0; i < $scope.ocorrencias.length; i++)
    {
      setDemanda($scope.ocorrencias[i].demanda, i);
      setLocal($scope.ocorrencias[i].local, i);


      // var local = $.grep(locais, function(e){ return e.id == $scopre.ocorrencias[i].local; });
      // $scope.ocorrencias[i].local = local;
    }
  });
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
