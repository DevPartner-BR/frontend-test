angular.module("Authentication", []);

var app = angular.module("sysLogin", [
  "Authentication",
  "loader",
  "ngNotify",
  "ngSanitize",
  "ui.router",
  "ui.utils.masks",
  "ngCookies",
  "ng.deviceDetector"
]);

//servico para abrir links externos a aplicacao
app.run(function($rootScope, $window) {
  $rootScope.$on("$stateChangeStart", function(
    event,
    toState,
    toParams,
    fromState,
    fromParams
  ) {
    if (toState.externalUrl) {
      event.preventDefault();
      $window.open(toState.externalUrl, "_blank");
    }
  });
});

app.run([
  "$rootScope",
  "$location",
  "$cookieStore",
  "$http",
  function($rootScope, $location, $cookieStore, $http) {
    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get("globals") || {};
    if ($rootScope.globals.currentUser) {
      $http.defaults.headers.common["Authorization"] =
        "Basic " + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on("$locationChangeStart", function(event, next, current) {
      // redirect to login page if not logged in
      if ($location.path() !== "/" && !$rootScope.globals.currentUser) {
        $location.path("/");
      }
    });
  }
]);

//limpa cookies
app.run([
  "AuthenticationService",
  function(service) {
    service.ClearCredentials();
  }
]);

app.run(function($rootScope, ngNotify) {
  ngNotify.config({
    theme: "pure",
    position: "top"
  });

  $rootScope.$on("alertLogin", function(event, args) {
    ngNotify.set(args, {
      sticky: true,
      type: "error",
      button: true,
      html: true
    });
  });

  $rootScope.$on("alert", function(event, args) {
    ngNotify.set(args, {
      sticky: true,
      type: "error",
      button: true,
      html: true
    });
  });

  $rootScope.$on("warn", function(event, args) {
    ngNotify.set(args, {
      type: "warn",
      sticky: false,
      duration: 2000,
      button: false,
      html: true
    });
  });

  $rootScope.$on("success", function(event, args) {
    ngNotify.set(args, {
      type: "success",
      sticky: false,
      duration: 2000,
      button: false,
      html: true
    });
  });
});
