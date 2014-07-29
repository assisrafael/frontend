'use strict';

angular.module('projetobrasilFrontApp')
.controller('editUserDataFormCtrl',
  function ($scope, $modalInstance, $log, modalType) {


  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})
.controller('loginFormCtrl',
  function ($scope, $modalInstance, UserRegister, UserLogin, $log, modalType, loginMessage) {

  // $scope.items = items;
  // $scope.selected = {
  //   item: $scope.items[0]
  // };

  $scope.modalType = modalType;
  $scope.isLoginMessage = false;
  $scope.isLoginError = false;

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


  // $scope.setLoadingOn = function(){
  //   $scope.isDisabled = true;
  //   $scope.registerButtonText = "Aguarde...";
  // };

  // $scope.setLoadingOff = function(){
  //   $scope.isDisabled = false;
  //   $scope.registerButtonText = "Registrar agora";
  // };

  $log.info($scope.modalType);
  $log.info($scope.loginMessage);


  $scope.register = function (registeredUser) {
    UserRegister.register(registeredUser,
      function(res) {
        $scope.successRegister = true;
        $modalInstance.close(registeredUser);
      },
      function(err) {
          //$scope.setLoadingOff();
          $log.error('Deu erro no registros: ' + err);
        });
  };

  $scope.login = function (loginUser){
    UserLogin.login(loginUser,
      function(res) {
        $log.info('Sucesso no login: Usuario ' + res.user.username );
        $scope.sucessRegister = true;
        $modalInstance.close(loginUser);
      },
      function(err){
        $scope.passwordOrLoginErrorMsg = 'Login ou senha inválidos.';
        $scope.isLoginError = true;
        $log.error('Erro no login');
      }
      );
  };


  $scope.formAction = function(userData) {
    if($scope.modalType == 'register') {
      $scope.register(
        {username: userData.username,
          fullname: userData.fullname,
          password: userData.password
        });
    } else if($scope.modalType == 'login'){
      $scope.login({username: userData.username, password: userData.password});
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})
.controller('NavbarUserMenuCtrl',
  function ($scope, $modal, $log, UserRegister, UserLogin) {


    $scope.$on('event:auth-loginRequired', function() {
          $scope.open('login', 'Você precisa logar para continuar')
        });

    UserLogin.isUserLogged(function(userData){
      $scope.loggedUserData = userData;
      $scope.userIsLogged = true;
      $scope.changeUser(userData);
    },
    function(){
      $scope.userIsLogged = false;
    });
    //$scope.loggedUserData = false;

    $scope.changeUser = function(userData){
      $scope.user = userData;
      $scope.userIsLogged = true;
    };

    $scope.logoutUser = function() {
      UserLogin.logout(function(){
        $scope.user = {};
        $scope.userIsLogged = false;
      },
      function(){
        $log.error('Erro ao efetuar LOGOUT');
      }
      );
    };

  // $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (modalType, loginMessage) {
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
      }
    });

    modalInstance.result.then(function (userData) {
      $scope.changeUser(userData);
      $log.info('Login realizado!!' + userData);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.editUserData = function () {
    var modalInstance = $modal.open({
      templateUrl: 'views/edit-user-data-form.html',
      controller: 'editUserDataCtrl',
      size: 'sm',
      // resolve: {
      //   modalType: function () {
      //     return modalType;
      //   },
      // }
    });

    modalInstance.result.then(function (userData) {
      //$scope.changeUser(userData);
      //$log.info('Login realizado!!' + userData);
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
  };
});
