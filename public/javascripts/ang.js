var app=angular.module('peopleComments',['ui.router']);
app.factory('comments',['$http', function($http){
  var c={
    comments:[]
  };

//loading all existing comments with getAll()
  c.getAll=function(){
  	return $http.get('/comments').success(function(data){
  		angular.copy(data, c.comments);
  	});
  };

//function which creates the new comments for updating in the database
  c.create = function(comment) {
  return $http.post('/comments', comment).success(function(data){
    c.comments.push(data);
  });
 };

//function to increase the upvotes
 c.upvote = function(comment) {
  return $http.put('/comments/' + comment._id + '/upvote')
    .success(function(data){
      comment.upvotes += 1;
    });
};

//function to increase the downvotes
c.upvote = function(comment) {
  return $http.put('/comments/' + comment._id + '/downvote')
    .success(function(data){
      comment.downvotes += 1;
    });
};
  return c;
}]);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

//setting up a home state
  $stateProvider
	.state('home', {
  		url: '/home',
  		templateUrl: '/home.html',
  		controller: 'Base',
  		resolve: {
    		comment: ['comments', function(comments){ //using resolve property of ui-router - not rendering???
      			return comments.getAll();
    	}]
  	}
});

  $urlRouterProvider.otherwise('home');
}]);

app.controller('Base',[
	'$scope','comments',function($scope,comments){
		$scope.addComment=function(){ //add new comments to the server
			$scope.comments=comments.comments;
			if(!$scope.username||$scope.username==''){$scope.username='Anonymous';}
			if(!$scope.contents||$scope.contents==''){return;}
			// comments.create({
   //  			username: $scope.username,
   //  			contents: $scope.contents,
  	// 			});
			$scope.comments.push({username:$scope.username,contents:$scope.contents,upvotes:0,downvotes:0});
			$scope.username='';
			$scope.contents='';
		}
		$scope.increaseUpvotes = function(comment) {  //function which updates the upvotes to the database
  			comments.upvote(comment);
		}
		//  $scope.increaseUpvotes=function(comment){  //function which increases upvotes in the page
		//  	comment.upvotes+=1;
		// }
		$scope.increaseDownvotes=function(comment){   //function which updates the downvotes to the database
			comment.downvotes+=1;
		}
		// $scope.increaseDownvotes=function(comment){  //function which increases downvotes in the page
		// 	comment.downvotes+=1;
		// }
$scope.comments = [
  {username: 'Diana', contents:'In either a quantum world or in a higher dimension, the past, present and future co-exist!', upvotes: 5, downvotes:0},
  {username: 'Stella', contents:'If Betelgeuse would explode transiting from the red super giant stage to supernova then our sky would light continuously for two months. It can happen anytime, within a couple of thousand years, tomorrow or even now!', upvotes: 9, downvotes:1},
  {username: 'Jake', contents:'One species of jellyfish, Turritopsis nutricula, are immortal.', upvotes: 6, downvotes:2},
  {username: 'Cindy', contents:'Never wash strawberries or any berry unless you intend to eat them right away or they will mold.', upvotes: 7, downvotes:0},
  {username: 'Michael', contents:'The H-bomb is the bloodless weapon. It leaves only radioactive ash in a 20km radius.', upvotes: 6, downvotes:3}
];
	}]);
