angular.module('galeriaModule', [])
    .controller('galeriaController', ['$scope', '$http', '$rootScope', 'sysServicos', '$stateParams', '$timeout','$state',
        function ($scope, $http, $rootScope, sysServicos, $stateParams, $timeout,$state) {

          $scope.posts = [];

          $http.get('/v1/post')
            .success(function (posts) {
              console.log(posts)
              $scope.posts = posts;
            }).error(function (erro) {
              console.log(erro)
            })

          $scope.remover = function (post) {
            
            $http.delete('/v1/post', post)
              .success(function (post) {
                console.log("Removido com sucesso!");
              }).error(function (erro) {
                console.log(erro);
              })
          }
/*
          $scope.salvarGaleriaJSON = function () {
            $http.get('./../data/galeria.json')
              .success(function (posts) {
                $scope.posts = posts;
                console.log($scope.posts);
              }).error(function (erro) {
                console.log(erro)
              })

            $http.post('/v1/post', $scope.posts)
              .success(function () {
                console.log($scope.posts);
                console.log("Post adcionado com sucesso")
              }).error(function (erro) {
                console.log(erro)
              })
          }
*/
        }

    ])

    .controller('galeriaCadController', ['$scope', '$http', '$rootScope', 'sysServicos', '$stateParams', '$timeout', '$state',
    function ($scope, $http, $rootScope, sysServicos, $stateParams, $routeParams, $timeout, $state) {

      $http.get('/v1/post')
        .success(function (posts) {
          $scope.posts = posts;
        }).error(function (erro) {
          console.log(erro)
        })

      $scope.add = function () {
        $scope.post.galeriaId = $scope.posts.length + 1;
        $http.post('/v1/post', $scope.post)
          .success(function () {
            console.log($scope.post);
            console.log("Post adcionado com sucesso")
          }).error(function (erro) {
            console.log(erro)
          })
      }

    }

])

.controller('galeriaDetController', ['$scope', '$http', '$rootScope', 'sysServicos', '$stateParams', '$timeout', '$state',
    function ($scope, $http, $rootScope, sysServicos, $stateParams, $routeParams, $timeout, $state) {

      $scope.posts = [];
      $scope.idPost = $stateParams.galeriaId;
      console.log("O id do post é: " + $scope.idPost);

      $http.get('/v1/post')
        .success(function (posts) {
          for (var i = 0; i < posts.length; i++) {
            if (posts[i].galeriaId == $scope.idPost) {
              $scope.post = posts[i];
              console.log(posts)
              console.log($scope.post)
            }
          }
        }).error(function (erro) {
          console.log(erro)
        })


      $scope.add = function () {
        $http.put('/v1/post', $scope.post)
          .success(function (post) {
            $scope.post = post;
          }).error(function (erro) {
            console.log(erro);
          })
      }

    }

])
