angular.module('galeriaModule', [])
    .controller('galeriaController', ['$scope', '$http', '$rootScope', 'sysServicos', '$stateParams', '$timeout', '$state',
        function ($scope, $http, $rootScope, sysServicos, $stateParams, $timeout, $state) {
            $scope.dados = []
            $scope.carregar = function () {
                $http.get("http://localhost:3000/galeria").then(function (result) {
                    $scope.dados = result.data
                }

                );
            }
            $scope.cadastrar = function (tipo) {
                $state.go('galeriaDetalhe', { tipo: tipo, objeto: {} });
            }
            $scope.detalhes = function (tipo, objeto) {
                $state.go('galeriaDetalhe', { tipo: tipo, objeto: objeto });
            }

        }

    ])

    .controller('galeriaDetController', ['$scope', '$http', '$rootScope', 'sysServicos', '$stateParams', '$timeout', '$state',
        function ($scope, $http, $rootScope, sysServicos, $stateParams, $timeout, $state) {
            $scope.carregar = function () {
                $scope.dado = $stateParams.objeto;
                $scope.tipo = $stateParams.tipo;
                console.log($scope.dado);
            }

            $scope.voltar = function () {
                $state.go('galeria');
            };
            $scope.adicionar = function () {
                $http.post("http://localhost:3000/galeria/", $scope.dado).then(function (result) {
                    $state.go('galeria');
                })
            };
            $scope.deletar = function () {
                $http.delete(`http://localhost:3000/galeria/${$scope.dado._id}`).then(function (result) {
                    $state.go('galeria');
                })
            };
            $scope.alterar = function () {
                $http.put("http://localhost:3000/galeria", $scope.dado).then(function (result) {
                    $state.go('galeria');
                })
            };
        }

    ])
