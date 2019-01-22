
app.config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/galeria");

    $ocLazyLoadProvider.config({
        'debug': true, // For debugging 'true/false'
        'events': true, // For Event 'true/false'
        'modules': [{
                name: 'galeria',
                files: ['../app/modules/galeria/controllers/galeriaCtrl.js']
            }]
    });

    $stateProvider

        //Galeria List
        .state('galeria', {
            url: '/galeria',
            views: {
                '': {
                    templateUrl: '../app/modules/galeria/views/galeriaList.html',
                    controller: 'galeriaController',
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('galeria');
                }]
            }
        })

        //Galeria Detalhes
        .state('galeriaDetalhe', {
            url: '/galeria/:galeriaId',
            views: {
                '': {
                    templateUrl: '../app/modules/galeria/views/galeriaDetalhe.html',
                    controller: 'galeriaDetController',
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('galeria');
                }]
            }
        })

        .state('galeriaCadastro', {
          url: '/galeria/cadastro',
          views: {
            '': {
              templateUrl: '../app/modules/galeria/views/galeriaDetalhe.html',
              controller: 'galeriaCadController',
            }
          },
          resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
              return $ocLazyLoad.load('galeria');
            }]
          },
        })

        .state('galeriaVisualizar', {
          url: '/visualizar',
          views: {
            '': {
              templateUrl: '../app/modules/galeria/views/galeriaVisualizar.html',
              controller: 'galeriaDetController',
            }
          },
          // resolve: {
          //   loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
          //     return $ocLazyLoad.load('galeria');
          //   }]
          // },
        })



}).run(function ($rootScope, $state) {
    $rootScope.$state = $state;
});