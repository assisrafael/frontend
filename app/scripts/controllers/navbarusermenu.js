'use strict';

angular.module('projetobrasilFrontApp')
.controller('ModalInstanceCtrl', function ($scope, $modalInstance, UserRegister, UserLogin, $log, modalType) {

  // $scope.items = items;
  // $scope.selected = {
  //   item: $scope.items[0]
  // };

  $scope.modalType = modalType;

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

  $scope.register = function (registeredUser) {
    UserRegister.register(registeredUser,
        function() {
          $log.info('Sucesso no registro!');
          $scope.successRegister = true;
          // $modalInstance.close(true);
        },
        function(err) {
          //$scope.setLoadingOff();
          $log.error('Deu erro no registros: ' + err);
        });
  };

  $scope.login = function (loginUser){
    UserLogin.login(loginUser,
      function() {
        $log.info('Sucesso no login');
        $scope.sucessRegister = true;
      },
      function(err){
        $log.error('Erro no login');
      }
    );
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
})
.controller('NavbarUserMenuCtrl', function ($scope, $modal, $log, UserRegister) {
  $scope.user = {
    firstName : 'João Silva',
    avatarUrl : 'images/avatars/users/augusto.jpg'
  };

  // $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (modalType) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContentLogin.html',
      controller: 'ModalInstanceCtrl',
      size: 'sm',
      resolve: {
        modalType: function () {
          return modalType;
        }
      }
    });

    modalInstance.result.then(function (sucessRegister) {
      if(sucessRegister){

      }
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});
