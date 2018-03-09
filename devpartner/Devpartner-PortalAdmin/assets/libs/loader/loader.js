angular.module('loader',['chieffancypants.loadingBar'])

.factory('httpInterceptor', ['$q', '$rootScope', '$log','cfpLoadingBar',function ($q, $rootScope, $log,cfpLoadingBar) {
    return {
        request: function (config) {
            // Aqui liga o LOADER
            cfpLoadingBar.start();
            return config || $q.when(config)

        },
        response: function (response) {
            // Aqui desliga o LOADER
            cfpLoadingBar.complete();
            return response || $q.when(response);

        },
        responseError: function (response) {
            // Aqui desliga o LOADER
            cfpLoadingBar.complete();
            return $q.reject(response);
        }
    };
}])
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor');
});