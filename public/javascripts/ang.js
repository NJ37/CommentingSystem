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
    		postPromise: ['comments', function(comments){
      			return comments.getAll();
    	}]
  	}
});

  $urlRouterProvider.otherwise('home');
}]);

app.controller('Base',[
	'$scope','comments',function($scope,comments){
      $scope.comments=comments.comments;
		$scope.addComment=function(){
			if(!$scope.username||$scope.username==''){$scope.username='Anonymous';}
			if(!$scope.contents||$scope.contents==''){return;}
			comments.create({
    			username: $scope.username,
    			contents: $scope.contents,
  				});
			$scope.username='';
			$scope.contents='';
		}
$scope.increaseUpvotes = function(comment) {
  comments.upvote(comment);
}
$scope.decreaseUpvotes = function(comment) {
  comments.downvote(comment);
}

	}]);
