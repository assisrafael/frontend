'use strict';

angular.module('projetobrasilFrontApp')
.controller('ModalInstanceCtrl', function ($scope, $modalInstance, UserRegister, $log) {

  // $scope.items = items;
  // $scope.selected = {
  //   item: $scope.items[0]
  // };

  $scope.isDisabled = false;
  $scope.registerButtonText = "Registrar agora";

  // $scope.setLoadingOn = function(){
  //   $scope.isDisabled = true;
  //   $scope.registerButtonText = "Aguarde...";
  // };

  // $scope.setLoadingOff = function(){
  //   $scope.isDisabled = false;
  //   $scope.registerButtonText = "Registrar agora";
  // };

  $scope.register = function (registeredUser) {

    UserRegister.register(registeredUser,
        function() {
          $log.info('Sucesso no registro!');
          $modalInstance.close(true);
        },
        function(err) {
          //$scope.setLoadingOff();
          $log.error('Deu erro no registros: ' + err);
        });
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

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContentLogin.html',
      controller: 'ModalInstanceCtrl',
      size: size
      // resolve: {
      //   items: function () {
      //     return $scope.items;
      //   }
      // }
    });

    modalInstance.result.then(function (sucessRegister) {
      if(sucessRegister){

      }
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
});
