'use strict';

angular.module('projetobrasilFrontApp')
	.controller('rakingCtrl', function ($scope, $q, $http, moduleService) {
        $scope.comments = [];

        $scope.increaseScore = function (comment) {
            comment.score += 1;
        };

        $scope.decreaseScore = function (comment) {
            comment.score -= 1;
        };

        $scope.getComments = function(){
        	var promise = moduleService.getComments();
        	promise.then(
				function(result){
					$scope.comments = result.comments;
				},
				function(failMessage){
					 alert('Failed: ' + reason);
				}
			);
	    }
	})
	.service('moduleService', function($http, $q){
		var comments = [];

		this.getComments = function(){
			var deferred = $q.defer();
			$http.get('http://api.projetobrasil.org:4242/v1/comments')
	      		.success(function(data) {
	      			deferred.resolve(data);
				})
				.error(function(data) {
					console.log('Error ao carregar os comentários ' + data);
					deferred.reject(data);
				})
			return deferred.promise;
		}
		this.postComment = function(event, comment){
        	if(comment && event.keyCode === 13){
        		var commentObj = {};

				commentObj = {
	        		idParent: 0,
	        		idComment: 0,
	        		content: comment,
	        		score: 0
				}
				if (event.target.parentElement.className == "comment"){
					comments.comments.push(commentObj);
				}
				else if(event.target.parentElement.className == "mainComment"){
					comments.push(commentObj);
				}
	        }
        }
	})
	.directive('inputDirective', function(moduleService){
		return {
			restrict: 'A',
			template: "<textarea class='form-control' ng-model='comment' ng-keyup='moduleService.postComment($event, comment, idParent, idComment)'></textarea>",
			scope: {
				idParent: '@',
				idComment: '@'
			},
			link : function (scope, elem, attrs, controller) {
				if ( attrs.class === 'mainComment' ){
					elem.children().eq(0).attr('placeholder','Redija um comentario...');
					elem.children().eq(0).addClass('globalInput');
				}
				else if ( attrs.class === 'comment' ){
					elem.children().eq(0).attr('placeholder','Redija uma resposta...');
				}
            }
		};
	});

