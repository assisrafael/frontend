// Based on https://github.com/thomporter/angular-ratings

(function() {
  var app;

  app = angular.module('ratings', []);

  app.directive("angularRatings", function() {
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
              + '</ol></div>',
      controller: [
        '$scope', '$attrs', '$http', function($scope, $attrs, $http) {
          $scope.over = 0;
          $scope.setRating = function(rating) {
            $scope.model = rating;
            $scope.$apply();
            if ($attrs.notifyUrl !== void 0 && $scope.notifyId) {
              // return $http.post($attrs.notifyUrl, {
              //   id: $scope.notifyId,
              //   rating: rating
              return $http.post($attrs.notifyUrl + '/'+ $scope.notifyId, {
                nota: rating
              })
              .error(function(data) {
                if (typeof data === 'string') {
                  //alert(data);
                }
                return $scope.model = 0;
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

          return $scope.setOver = function(n) {
            $scope.over = n;
            return $scope.$apply();
          };
        }
      ],
      link: function(scope, iElem, iAttrs) {
        if (iAttrs.notifyUrl !== void 0) {
          return angular.forEach(iElem.children(), function(ol) {
            return angular.forEach(ol.children, function(li) {
              li.addEventListener('mouseover', function() {
                return scope.setOver(parseInt(li.id));
              });
              li.addEventListener('mouseout', function() {
                return scope.setOver(0);
              });
              return li.addEventListener('click', function() {
                return scope.setRating(parseInt(li.id));
              });
            });
          });
        }
      }
    };
  });

}).call(this);

//# sourceMappingURL=angular.ratings.js.map
