app.service('sysServicos', ['$rootScope', function ($rootScope) {
    this.sendErrorMsg = function (status, statusText, configUrl, mensagem) {
        var item;

        switch (status) {
            case 400:
                item = '<small>' + mensagem + '</small>';
                break
            case 401:
                item = '<small>Não autorizado. <br>Você não tem permissão para realizar essa ação.</small>';
                break
            case 406:
                item = '<small>' + mensagem + '</small>';
                break
            case 412:
                item = '<small>' + mensagem + '</small>';
                break
            case 500:
                item = '<small>Erro interno</small>';
                break
        };
        $rootScope.$broadcast('alert', item);
    }

    this.sendWarnMsg = function (msgText) {
        var item = msgText;
        $rootScope.$broadcast('warn', item);
    }

    this.sendSuccessMsg = function (msgText) {
        var item = msgText;
        $rootScope.$broadcast('success', item);
    }
}
]);

app.service('serviceScrollTop', ['$rootScope', function ($rootScope) {
    this.scrollTop = function () {
        window.scrollTo(0, 0);
    };
}])