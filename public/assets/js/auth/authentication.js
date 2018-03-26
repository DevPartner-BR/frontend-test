angular.module('Authentication',['ng.deviceDetector'])

.factory('httpAuthInterceptor', ['$q', '$rootScope','$cookieStore', '$injector','deviceDetector',
function ($q, $rootScope,$cookieStore,$injector,deviceDetector) {
    return {
        request: function (config) {
            //Aqui mantém o header ou cria em branco
            config.headers = config.headers || {};

            //Aqui colocar a autorização para a requisição
            var token = $cookieStore.get('globals');
            if (token) {
                config.headers.Authorization = 'Bearer ' + token[0].access_token;
            }           
            console.log('INICIO DA REQUISICAO: ' + config.url);

            //Continua a requisição
            return config || $q.when(config);
        },
        requestError: function (config) {
            console.log(config);
            return config || $q.when(config);

        },
        response: function (response) {
            console.log('RESPOSTA: ' + response.config.url);
            return response || $q.when(response);

        },
        responseError: function (response) {
            console.log('ERRO DA RESPOSTA: ' + response.config.url);
            var transform = function (data) {
                return $.param(data);
            };
            //Verifica se o Retorno foi de NÃO AUTORIZADO
            if(response.status === 401){
                var tokenExpired = false;
                var authData = $cookieStore.get('globals');
                if (authData) {
                    tokenExpired = moment().isAfter(authData[2]);
                }
                
                if(tokenExpired){
                    //console.log('RENOVAR O TOKEN');
                    var deferred = $q.defer();

                    var refresh_token = authData[0].refresh_token;

                    if (refresh_token) {

                        //deteccao de origem
                        var vm = this;
                        vm.data = deviceDetector;
                        $rootScope.origem =
                            "HOTSITE OS:" +vm.data.os +
                            " BROWSER:" +vm.data.browser +
                            " DEVICE:" +vm.data.device +
                            " OSVERSION:" +vm.data.os_version +
                            " BROWSERVERSION:" +vm.data.browser_version;

                        $injector.get('$http').post(
                            rootURL + "token",
                            { grant_type: 'refresh_token', refresh_token: refresh_token, origem:$rootScope.origem },
                            {
                                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                                transformRequest: transform
                            }
                        ).success(function (newToken) {
                            $rootScope.globals = [newToken,authData[1],moment().add(newToken.expires_in,'seconds')];
                            $cookieStore.remove('globals');
                            $cookieStore.put('globals', $rootScope.globals);

                            $injector.get("$http")(response.config).then(function(resp) {
                                //console.log('Refez a solicitação');
                                deferred.resolve(resp);
                            },function(resp) {
                                //console.log('Deu ruim na re-solicitação');
                                deferred.reject();
                            });

                        }).error(function (err, status) {
                            //console.log("DEU RUIM NA RENOVACAO");
                            deferred.reject(response);
                        });
                    } else {
                        deferred.reject(response);
                    }
                    return deferred.promise;
                }
            }            
            return $q.reject(response);
        }
    };
}])
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpAuthInterceptor');
});
