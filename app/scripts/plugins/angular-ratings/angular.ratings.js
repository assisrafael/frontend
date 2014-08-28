// Based on https://github.com/thomporter/angular-ratings

'use strict';

angular.module('projetobrasilFrontApp')
  .directive("angularRatings", function() {
    return {
      restrict: 'E',
      scope: {
        model: '=ngModel',
        notifyId: '=notifyId'
      },
      replace: true,
      transclude: true,
      template: '<div><ol class="angular-ratings">'
              + '<li id="1" ng-class="{active:model>0,over:over>0}" class="fa fa-2x"></li>'
              + '<li id="2" ng-class="{active:model>1,over:over>1}" class="fa fa-2x"></li>'
              + '<li id="3" ng-class="{active:model>2,over:over>2}" class="fa fa-2x"></li>'
              + '<li id="4" ng-class="{active:model>3,over:over>3}" class="fa fa-2x"></li>'
              + '<li id="5" ng-class="{active:model>4,over:over>4}" class="fa fa-2x"></li>'
              + '<li id="checkmark" class="fa fa-2x"></li>'
              + '</ol></div>',
      controller: [
        '$scope', '$rootScope', '$attrs', '$http', function($scope, $rootScope, $attrs, $http) {
          $scope.over = 0;

          $scope.$on('newproposalblindtest', function(){
            $scope.enableRating();
            $scope.over = 0;
          });

          $scope.setRating = function(event) {

            var rating = event.target.id;
            $scope.model = rating;

            if($scope.$parent.getProposalAuthor){
              $scope.$parent.getProposalAuthor();
            }
            if($scope.$parent.testeCego){
              $scope.disableRating();
            }

            $scope.$apply();
            if ($scope.notifyUrl !== void 0 && $scope.notifyId) {
              $http.post($attrs.notifyUrl + '/'+ $scope.notifyId, { nota: parseInt(rating) })
              .success(function(data){
                $scope.$emit('rated', rating);
              })
              .error(function(data) {
                if (typeof data === 'string') {
                  //alert(data);
                }
                $scope.model = 0;
              });
            }
          };

          // $scope.$on('rate', function(ev, rateNum){
          //   console.log(rateNum);
          //   $scope.setRating(parseInt(rateNum));

          // });
          // $scope.$on('rate2', $scope.setRating(2));
          // $scope.$on('rate3', $scope.setRating(3));
          // $scope.$on('rate4', $scope.setRating(4));
          // $scope.$on('rate5', $scope.setRating(5));

          return $scope.setOver = function(event) {
            var overValue;
            if(event.type == "mouseover"){
              overValue = event.target.id;
            } else if(event.type == "mouseout"){
              overValue = 0;
            }
              $scope.over = overValue;
              return $scope.$apply();
          };
        }
      ],
      link: function(scope, iElem, iAttrs) {

        scope.disableRating = function(){
           angular.forEach(iElem.children(), function(ol) {
             angular.forEach(ol.children, function(li) {
              if(li.id == "checkmark"){
                li.style.display = "block";
                return;
              }
              li.removeEventListener('mouseover', scope.setOver);
              li.removeEventListener('mouseout', scope.setOver);
              li.removeEventListener('click', scope.setRating);
              li.style.cursor = "default";
            });
          });
        };

        scope.enableRating = function(){
          angular.forEach(iElem.children(), function(ol) {
             angular.forEach(ol.children, function(li) {
              if(li.id == "checkmark"){
                li.style.display = "none";
                return;
              }
              li.addEventListener('mouseover', scope.setOver);
              li.addEventListener('mouseout', scope.setOver);
              li.addEventListener('click', scope.setRating);
              li.style.cursor = "pointer";
            });
          });
        };

        if (iAttrs.notifyUrl !== void 0) {
           scope.enableRating();
           scope.notifyUrl = iAttrs.notifyUrl;
           //scope.notifyId = iAttrs.notifyId;
        }
      }
    };
  });
