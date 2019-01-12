
app.config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise("/galeria");

    $ocLazyLoadProvider.config({
        'debug': false, // For debugging 'true/false'
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
                    templateUrl: '../app/modules/galeria/views/galeriaList.html'
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
            params: { tipo: null, objeto: {} },
            views: {
                '': {
                    templateUrl: '../app/modules/galeria/views/galeriaDetalhe.html'
                }
            },
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load('galeria');
                }]
            }
        })



}).run(function ($rootScope, $state) {
    $rootScope.$state = $state;
});