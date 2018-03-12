app.controller("appController", [
  "$scope",
  "$http",
  "$rootScope",
  "ngNotify",
  "AuthenticationService",
  "sysServicos",
  'deviceDetector',
  function(
    $scope,
    $http,
    $rootScope,
    ngNotify,
    AuthenticationService,
    sysServicos,
    deviceDetector
  ) {
    var controllerMaster; //usado para passar o nome do controller quando ocorre um erro na promise

    $scope.flagMsgRecSenha = true;

    //verifica se o navegador esta com cookies habilitados
    if (!navigator.cookieEnabled) {
      $rootScope.$broadcast(
        "alertLogin",
        '<span class="ngn-alertLogin">Este sistema utiliza Cookies.</span>'
      );
    }

    //esqueci minha senha
    $scope.esqueciSenha = function() {
        if ($scope.initializedCpf == '' || $scope.initializedCpf == undefined) {
            sysServicos.sendWarnMsg('Preencher o campo Usuario.');
        } else {
            objCpf = {};
            objCpf.cpf = $scope.initializedCpf;
            var promise = $http.post(rootURL + 'acesso/esqueceuSenha', { cpf: $scope.initializedCpf });
            promise.then(
          function(ret) {
              sysServicos.sendSuccessMsg('Enviamos uma nova Senha verifique o email cadastrado!');
            setTimeout(animPop("boxForgot"), 3000);
          },
          function(err) {
            if (err.data.Message != undefined) {
              sysServicos.sendErrorMsgEsp(
                err.status,
                err.statusText,
                err.data.Message
              );
            } else {
              sysServicos.sendErrorMsg(
                err.status,
                err.statusText,
                err.config.url
              );
            }
          }
        );
      }
    };

    $scope.login = function() {

        AuthenticationService.Login($scope.usuario, $scope.senha, function (response) {
          $scope.access_token_01 = response.access_token;
          //Aqui pegamos o tempo de retorno da expiração e armazenamos para posterior consulta
          $scope.token_expires = moment().add(response.expires_in, "seconds");

          AuthenticationService.ClearCredentials();
          //Passamos para frente o momento de expiração do token
          AuthenticationService.SetCredentials($scope.token_expires, response);
          window.open(rootURLInter + "app/", "_self");
        }
      );
    };

    var formatUsuario = function(doc) {
      return (
        doc.substr(0, 3) +
        "." +
        doc.substr(3, 3) +
        "." +
        doc.substr(6, 3) +
        "-" +
        doc.substr(9, 2)
      );
    };
  }
]);
