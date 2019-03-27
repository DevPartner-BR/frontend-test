app.controller("appController", ["$scope", "$http", "$rootScope", "ngNotify", '$cookieStore', 'sysServicos',
function ($scope, $http, $rootScope, ngNotify, $cookieStore, sysServicos) {
    //var controllerMaster;//usado para passar o nome do controller quando ocorre um erro na promise

    ngNotify.config({
        theme: 'pure',
        position: 'top',
    });

    $rootScope.$on('alert', function (event, args) {
        ngNotify.set(args, {
            sticky: true,
            type: 'error',
            button: true,
            html: true
        });
    });

    $rootScope.$on('warn', function (event, args) {
        ngNotify.set(args, {
            type: 'warn',
            sticky: false,
            duration: 2000,
            button: false,
            html: true
        });
    });

    $rootScope.$on('success', function (event, args) {
        ngNotify.set(args, {
            type: 'success',
            sticky: false,
            duration: 2000,
            button: false,
            html: true
        });
    });

    $scope.logOut = function () {
        $rootScope.globals = null;
        $cookieStore.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic ';
        window.open(rootURLInter, '_self');
    };
    }
]);

app.controller('loadMenu', ['$scope', '$http', '$rootScope', 'sysServicos', '$state', '$stateParams','$location',

    function ($scope, $http, $rootScope, sysServicos, $state, $stateParams, $location) {
        $scope.menuLinks = [];

        /**/
        var promise = $http.get(rootURL + 'Acesso/Modulos');
        promise.then(
            function (ret) {
                $scope.makeMenu(ret.data);
            },
            function (err) {
                sysServicos.sendErrorMsg(err.status, err.statusText, 'loadMenu');
            }
        );

        $scope.makeMenu = function (dataSet) {

            $scope.menuAreas = [];
            for (var n = 0; n < dataSet.length ; n++) {
                $scope.menuAreas[n] = dataSet[n];
            }

            //inicia scripts de animacao apos o carregamento das infromacoes do menu
            $(document).ready(function () {
                setTimeout(startScripts, 100);
                function startScripts() {
                    Core.init();
                    Demo.init();
                }
            });
        }

        //controla as acoes de click nos itens do menu
        $scope.ctrlAction = function (estado,url) {

            if (estado == 'OLD') {
                $state.go('OLD', { stateUrl: url }, { reload: true });
            } else if(url!=''){
                $location.path(url);
                setTimeout(jumpToTop(),1000);
            };
        }
    }
]);

app.controller('getUserData', ['$scope', '$http', '$rootScope', 'sysServicos', '$state',
    function ($scope, $http, $rootScope, sysServicos, $state) {
        //
        $scope.flagMenu = true;
        $scope.flagSubMenu = true;

        $scope.changeMenu = function () {
            $scope.flagMenu = !$scope.flagMenu;
            if (!$scope.flagMenu) {
                angular.element('#menuOptions').addClass('showElem');
            } else {
                angular.element('#menuOptions').removeClass('showElem');
            };
        };

        $scope.changeSubMenu = function () {
            $scope.flagSubMenu = !$scope.flagSubMenu;
            if (!$scope.flagSubMenu) {
                angular.element('#menuSub').toggleClass('showElem2');
                angular.element('#drop').toggleClass('open');
            } else {
                angular.element('#menuSub').toggleClass('showElem2');
                angular.element('#drop').toggleClass('open');
            }
        };
        $scope.closeSubMenu = function () {
            angular.element('#menuSub').removeClass('showElem2');
            angular.element('#drop').removeClass('open');
        };

        $scope.changeMenu1 = function () {
            $scope.flagMenu = !$scope.flagMenu;
            if (!$scope.flagMenu) {
                angular.element('#menuOptions1').addClass('showElem');
            } else {
                angular.element('#menuOptions1').removeClass('showElem');
            };
        };

        $scope.changeSubMenu1 = function () {
            $scope.flagSubMenu = !$scope.flagSubMenu;
            if (!$scope.flagSubMenu) {
                angular.element('#menuSub1').toggleClass('showElem2');
                angular.element('#drop1').toggleClass('open');
            } else {
                angular.element('#menuSub1').toggleClass('showElem2');
                angular.element('#drop1').toggleClass('open');
            }
        };

        // exporta excel relatorio/cadastros
        $scope.excelCadastros = function (target) {
            //console.log('exporta execel');

            var url = rootURL + 'admin/relatorio/cliente';
            $http({
                url: url,
                method: 'GET',
                responseType: 'arraybuffer',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                },
                //data: objEnvio
            }).success(function (data) {
                var blob = new Blob([data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });

                saveAs(blob, target + '.xlsx');
            }).error(function (err) {
                sysServicos.sendErrorMsg(err.status, err.statusText, err.config.url, err.data.mensagem);
            });
        };

        // exporta excel relatorio/acessoVip
        $scope.excelAcessoVip = function (target) {
            //console.log('exporta execel');

            var url = rootURL + 'admin/relatorio/funcionarioEClientesVip';
            $http({
                url: url,
                method: 'GET',
                responseType: 'arraybuffer',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                },
                //data: objEnvio
            }).success(function (data) {
                var blob = new Blob([data], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                });

                saveAs(blob, target + '.xlsx');
            }).error(function (err) {
                sysServicos.sendErrorMsg(err.status, err.statusText, err.config.url, err.data.mensagem);
            });
        };

        /*
        var promise = $http.get(rootURL + 'consumidor');
        promise.then(
            function (ret) {
                $rootScope.userName = ret.data.nomeCompleto;
                //$rootScope.garcomId = ret.data.id;
            },
            function (err) {
                sysServicos.sendErrorMsg(err.status, err.statusText, err.config.url, err.data.mensagem);
            }
        );*/
    }
]);

app.controller('loadMsgAviso', ['$scope', '$http', '$rootScope', 'sysServicos',
    function ($scope, $http, $rootScope, sysServicos) {
        $scope.mgsAvisos = [];

        var promise = $http.get(rootURL + 'notificacao');
        promise.then(
            function (ret) {
                $scope.mgsAvisos = ret.data;
                $scope.mgsAvisos.counter = 0;
                $scope.mgsAvisos.view = false;

                for (n = 0; n < $scope.mgsAvisos.length;n++) {
                    if (!$scope.mgsAvisos[0].visualizada) {
                        $scope.mgsAvisos.counter++;
                    }
                };

                if ($scope.mgsAvisos.counter>0) {
                    $scope.mgsAvisos.view = true;
                };
            },
            function (err) {
                sysServicos.sendErrorMsg(err.status, err.statusText, err.config.url);
            }
        );

        $scope.openAvisos = function () {
            if ($scope.mgsAvisos.counter > 0) {
                $scope.mgsAvisos.view = false;
                $scope.mgsAvisos.counter = 0;

                var promise = $http.put(rootURL + 'notificacao');
                promise.then(
                    function (ret) {
                        console.log(ret);
                    },
                    function (err) {
                        sysServicos.sendErrorMsg(err.status, err.statusText, err.config.url);
                    }
                );
            }
        };
    }
]);