var app = angular.module("sysMaster", [
  "oc.lazyLoad",
  "ngNotify",
  "loader",
  "ui.router",
  "ngResource",
  "ngAnimate",
  "ngCookies",
  "ngAria",
  "ngMessages",
  "ngSanitize",
  "ui.grid",
  "ui.grid.pagination",
  "ui.grid.autoResize",
  "ui.grid.resizeColumns",
  "ui.grid.moveColumns",
  "ui.grid.selection",
  "ngMaterial",
  "ncy-angular-breadcrumb",
  "ui.utils.masks",
  "Authentication",
  "ngFileUpload",
  "ngTagsInput",
  "ng.deviceDetector"
]);

//inicia scripts
app.run([
  "$http",
  "$rootScope",
  "$cookieStore",
  function($http, $rootScope, $cookieStore) {
    $rootScope.globals = $cookieStore.get("globals");

    //verifica se o cookie de autenticacao existe
    if ($rootScope.globals === null) {
      //if ($rootScope.globals != null) {
      window.open(rootURLInter, "_self");
    } else {
      $http.defaults.headers.common["Authorization"] =
        "Bearer " + $rootScope.globals[0].access_token;
    }
  }
]);
