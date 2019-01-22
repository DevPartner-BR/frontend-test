angular.module('galeriaModule', [])
    .controller('galeriaController', ['$scope', '$http', '$rootScope', 'sysServicos', '$stateParams', '$timeout','$state',
        function ($scope, $http, $rootScope, sysServicos, $stateParams, $timeout,$state) {

          $scope.getData = function() {
            $scope.returnItems = sessionStorage.getItem('items');
            console.log('retrievedObject: ', JSON.parse($scope.returnItems));
            return $scope.returnItems;
          }

          $scope.deleteItems = function () {
            $scope.items = [];
            $scope.returnItems = [];
            $sessionStorage.empty();
            $scope.returnItems = sessionStorage.getItem('items');
            console.log('sessionStorage: ', JSON.parse($scope.returnItems));
          }

        },
    ])

    .controller('galeriaDetController', ['$scope', '$http', '$rootScope', 'sysServicos', '$stateParams', '$timeout','$state',
    function ($scope, $http, $rootScope, sysServicos, $stateParams, $timeout,$state) {

      $scope.items = [];
      $scope.itemsToAdd = [{
        titulo: '',
        subtitulo: '',
        texto: '',
        youtubeId: '',
      }];

      $scope.submit = function (itemToAdd) {

        var index = $scope.itemsToAdd.indexOf(itemToAdd);
        $scope.itemsToAdd.splice(index, 1);
        $scope.items.push(angular.copy(itemToAdd));
        window.sessionStorage.setItem("items", JSON.stringify($scope.items));

        $scope.itemsToAdd.push({
          titulo: '',
          subtitulo: '',
          texto: '',
          youtubeId: '',
        });
      }
    },
])
