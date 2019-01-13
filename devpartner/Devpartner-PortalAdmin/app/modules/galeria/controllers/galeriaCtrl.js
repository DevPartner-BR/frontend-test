angular.module('galeriaModule', [])
    .controller('galeriaController', ['$scope', '$http', '$rootScope', 'sysServicos', '$stateParams', '$timeout', '$state',
        function ($scope, $http, $rootScope, sysServicos, $stateParams, $timeout, $state) {

            $scope.title = 'Galeria'

            $http.get('http://localhost:4000/items/').success(function (data, status, headers, config) {// ou localhost

                $scope.galeria = data;

            }).error(function (data, status, headers, config) {

            })



        }

    ])

    .controller('galeriaDetController', ['$scope', '$http', '$rootScope', 'sysServicos', '$stateParams', '$timeout', '$state',
        function ($scope, $http, $rootScope, sysServicos, $stateParams, $timeout, $state) {

            $http.get('http://localhost:4000/items/').success(function (data, status, headers, config) {// ou localhost

                $scope.galeria = data;

            }).error(function (data, status, headers, config) {
                console.log(data, 'status do erro: ' + status)
            })

            var obj = {
                galeriaId: '',
                titulo: 'galeria.titulo',
                subTitulo: 'galeria.subTitulo',
                conteudo: 'galeria.conteudo',
                perfilgaleria: [],
                imagemPrincipal: {
                    imagemPrincipalId: "",
                    url: ""
                  },
                  imagemThumbnail: {
                    imagemThumbnailId: "",
                    url: ""
                  },
                  youtubeId: ''
            
            }

            $scope.adicionarGaleria = function (galeria, obj) {
                galeria.push({obj});
                // debugger
            }
        }


    ])

