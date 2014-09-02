'use strict';

angular.module('projetobrasilFrontApp')
.controller('loginFormCtrl',
  function ($scope, $rootScope, $modalInstance, UserRegister, UserLogin, $log, modalType, loginMessage, checklogin) {

  // $scope.items = items;
  // $scope.selected = {
  //   item: $scope.items[0]
  // };

  $scope.modalType = modalType;
  $scope.isLoginMessage = false;
  $scope.isLoginError = false;
  $scope.checkLoginNavbar = checklogin;

  if(loginMessage && loginMessage.length > 1){
    $scope.loginMessage = loginMessage;
    $scope.isLoginMessage = true;
  }

  $scope.isDisabled = false;
  $scope.successRegister = false;

  if($scope.modalType == 'login') {
    $scope.modalTitle = "Fazer login";
    $scope.buttonText = "Entrar";
    $scope.successText = "Sucesso no login";
    $scope.subTitleEmail = "Entrar com e-mail";
    $scope.showName = false;
  } else if($scope.modalType == 'register') {
    $scope.modalTitle = "Registrar";
    $scope.buttonText = "Registrar agora";
    $scope.successText = "Sucesso no registro";
    $scope.subTitleEmail = "Registrar com e-mail";
    $scope.showName = true;
  }

  $scope.register = function (registeredUser) {
    UserRegister.register(registeredUser,
      function(res) {
        toastr.options = {
          "closeButton": true,
          "showMethod": 'slideDown',
          "hideMethod": 'slideUp'
        };
        toastr.info('Registro realizado com sucesso!');
        $scope.successRegister = true;
        $modalInstance.close(registeredUser);
        $rootScope.$broadcast('login');
      },
      function(err) {
        toastr.options = {
          "closeButton": true,
          "showMethod": 'slideDown',
          "hideMethod": 'slideUp'
        };
        toastr.error('Erro: ' + err.error);
        });
  };

  $scope.login = function (loginUser){
    UserLogin.login(loginUser,
      function(res) {

        toastr.options = {
          "closeButton": true,
          "showMethod": 'slideDown',
          "hideMethod": 'slideUp'
        };
        toastr.info('Login realizado com sucesso!');
        $scope.sucessRegister = true;
        $modalInstance.close(loginUser);
      },
      function(err){
        $scope.passwordOrLoginErrorMsg = 'Login ou senha inválidos.';
        $scope.isLoginError = true;
      }
    );
  };

  $scope.formAction = function(userData) {
    if($scope.modalType == 'register') {
      $scope.register(
        {username: userData.username,
          fullname: userData.fullname,
          password: userData.password,
          passwordAgain: userData.passwordAgain
        });
    } else if($scope.modalType == 'login'){
      $scope.login({username: userData.username, password: userData.password});
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  $scope.changeToLogin = function(){
    $scope.modalTitle = "Fazer login";
    $scope.buttonText = "Entrar";
    $scope.successText = "Sucesso no login";
    $scope.subTitleEmail = "Entrar com e-mail";
    $scope.modalType = 'login';
    $scope.showName = false;
  };

  $scope.facebookLogin = function(){
    UserLogin.facebookLogin($scope.cancel);
  };
})
.controller('NavbarUserMenuCtrl',
  function ($scope, $rootScope, $modal, $log, UserRegister, UserLogin) {

    $scope.modalOpened = false;

    $scope.$on('event:auth-loginRequired', function() {
      if( !$scope.modalOpened ){
        $scope.open('register', 'Registre-se para avaliar e comentar as propostas dos candidatos!');
      }
    });

    $scope.checkLoginNavbar = function(){
      UserLogin.promise().then(function() {
        $scope.userIsLogged = UserLogin.isUserLogged();
        $scope.user = UserLogin.getUserData();
      });
    }

    $scope.$on('login', $scope.checkLoginNavbar);
    $scope.$on('logout', $scope.checkLoginNavbar);

    $scope.checkLoginNavbar();

    $scope.logoutUser = function() {
      UserLogin.logout(function(){
        toastr.options = {
          "closeButton": true,
          "showMethod": 'slideDown',
          "hideMethod": 'slideUp'
        };
        toastr.info('Desconectado com sucesso');
      },
      function(){
        $log.error('Erro ao efetuar LOGOUT');
      });
    };

  $scope.open = function (modalType, loginMessage) {
    $scope.modalOpened = true;
    var modalInstance = $modal.open({
      templateUrl: 'views/login-register-form.html',
      controller: 'loginFormCtrl',
      size: 'sm',
      resolve: {
        modalType: function () {
          return modalType;
        },
        loginMessage: function () {
          return loginMessage;
        },
        checklogin: function(){
          return $scope.checkLoginNavbar;
        }
      }
    });

    modalInstance.result.then(function (userData) {
      $scope.checkLoginNavbar();
      $scope.modalOpened = false;
    }, function () {
      $scope.modalOpened = false;
    });
  };
})
.directive('pwCheck', [function () {
  return {
    require: 'ngModel',
    link: function (scope, elem, attrs, ctrl) {
      var firstPassword = '#' + attrs.pwCheck;
      elem.add(firstPassword).on('keyup', function () {
        scope.$apply(function () {
          var v = elem.val()===$(firstPassword).val();
          ctrl.$setValidity('pwmatch', v);
        });
      });
    }
  }
}]);
