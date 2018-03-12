angular
  .module("Authentication",["ng.deviceDetector"])
  .factory("AuthenticationService", [
    "Base64",
    "$http",
    "$cookieStore",
    "$rootScope",
    "$timeout",
    "sysServicos",
    "deviceDetector",
    function (Base64, $http, $cookieStore, $rootScope, $timeout, sysServicos, deviceDetector) {
      var service = {};
      var response = {
        "access_token": "bdYBNhHTTAaRBYm_AxWoKwJmISQ2QXOZmv4gPjt81w1KOMADLUkNn-C2-rxnESrKaNgLn4vP4FJ-zjqGVINJupXZX9Z7LaRyUoxqEyACtxF3hIa9XMZVCvqsY-nOkk85TlTJoudfZVRfo8Xh_eftHrgO5jOOTu0S6XR4iwTdth7b2pD2K5mXv-ufGb9XQMpaD3hF0VtRLVj_2j4hx9ahz-0USfs4g60m9WImdfp0pFGvAG-G9Tgn4Y4kkYlmzPIiKO5ZwsTi9h_zj3pThk5nSw9mY3cqkZy-UiXq1ZlxYWJavlQH-mf3OVKzDm4y9IG9EOaegU9cg_oa1OCFlg6t2iD-XsT14yVLi4NCl_GnB7cTyAYpdrcYC4RiSlyYb54ilYVGz4qsZmfMD6mAFZniUmYR9QNH6TKbXjwmz0hoXJyCssh-I1JwPtbAj3Uh_AH9FXHHRPQfRlkqBLpDch6pv2Jequ4NUprzcsQ_-LBssdjHKFxQwUUrMyUoPDR5TbBJKI2LHbfCFq77h-UYA67gPNbo1Cpwu2fGMehs4UZVmfg",
        "token_type": "bearer",
        "expires_in": 1209599,
        "userName": "admin",
        ".issued": "Mon, 12 Mar 2018 19:51:13 GMT",
        ".expires": "Mon, 26 Mar 2018 19:51:13 GMT"
      };

      //deteccao de origem
      var vm = this;
      vm.data = deviceDetector;
      $rootScope.origem =
        "HOTSITE OS:" +vm.data.os +
        " BROWSER:" +vm.data.browser +
        " DEVICE:" +vm.data.device +
        " OSVERSION:" +vm.data.os_version +
        " BROWSERVERSION:" +vm.data.browser_version;

      service.Login = function(login, senha, callback) {
        var transform = function(data) {
          return $.param(data);
        };
        if (login == 'admin' && senha == 'admin') {
          callback(response);  
        }
        else{
          console.log(response);
              sysServicos.sendWarnMsg('<span class="ngn-alertLogin">' + response.error_description + '</span>');
        }
        
        //Real World
        // $http.post(
        //     rootURL + "Token",
        //     { username: login, password: senha, grant_type: "password", origem:$rootScope.origem },
        //     {
        //       headers: { "Content-Type": "multpart/form-data; charset=UTF-8" },
        //       transformRequest: transform
        //     }
        //   )
        //   .success(function(response) {

        //         callback(response);

        //   }).error(function(response) {

        //       console.log(response);
        //       sysServicos.sendWarnMsg('<span class="ngn-alertLogin">' + response.error_description + '</span>');

        //   });
        
      };

      //Recebemos o momento de expiração do token
      service.SetCredentials = function(token_expires, objLogin) {
        $rootScope.globals = [
          objLogin,
          $rootScope.perfilSelecionado,
          token_expires
        ];
        $http.defaults.headers.common["Authorization"] =
          "Bearer " + objLogin.access_token; // jshint ignore:line
        $cookieStore.put("globals", $rootScope.globals);
      };

      service.ClearCredentials = function() {
        $rootScope.globals = {};
        $cookieStore.remove("globals");
        $http.defaults.headers.common.Authorization = "Basic ";
      };

      return service;
    }
  ])



  //nao utilizado
  .factory("Base64", function() {
    /* jshint ignore:start */

    var keyStr =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    return {
      encode: function(input) {
        var output = "";
        var chr1,
          chr2,
          chr3 = "";
        var enc1,
          enc2,
          enc3,
          enc4 = "";
        var i = 0;

        do {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);

          enc1 = chr1 >> 2;
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output =
            output +
            keyStr.charAt(enc1) +
            keyStr.charAt(enc2) +
            keyStr.charAt(enc3) +
            keyStr.charAt(enc4);
          chr1 = chr2 = chr3 = "";
          enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
      },

      decode: function(input) {
        var output = "";
        var chr1,
          chr2,
          chr3 = "";
        var enc1,
          enc2,
          enc3,
          enc4 = "";
        var i = 0;

        // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
        var base64test = /[^A-Za-z0-9\+\/\=]/g;
        if (base64test.exec(input)) {
          window.alert(
            "There were invalid base64 characters in the input text.\n" +
              "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
              "Expect errors in decoding."
          );
        }
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        do {
          enc1 = keyStr.indexOf(input.charAt(i++));
          enc2 = keyStr.indexOf(input.charAt(i++));
          enc3 = keyStr.indexOf(input.charAt(i++));
          enc4 = keyStr.indexOf(input.charAt(i++));

          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;

          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }

          chr1 = chr2 = chr3 = "";
          enc1 = enc2 = enc3 = enc4 = "";
        } while (i < input.length);

        return output;
      }
    };

    /* jshint ignore:end */
  });

app.service("sysServicos", [
  "$rootScope",
  function($rootScope) {
    this.sendErrorMsg = function(status, statusText, configUrl, mensagem) {
      var item;

      switch (status) {
        case 400:
          item = "<small>" + mensagem + "</small>";
          break;
        case 401:
          item =
            "<small>Não autorizado. <br>Você não tem permissão para realizar essa ação.</small>";
          break;
        case 406:
          item = "<small>" + mensagem + "</small>";
          break;
        case 500:
          item = "<small>Erro interno</small>";
          break;
      }

      $rootScope.$broadcast("alert", item);
    };

    this.sendErrorMsgEsp = function(status, statusText, msg) {
      var item = "Erro: " + status + " - " + statusText + " <br> " + msg;
      $rootScope.$broadcast("alert", item);
    };

    this.sendWarnMsg = function(msgText) {
      var item = msgText;
      $rootScope.$broadcast("warn", item);
    };
  }
]);
