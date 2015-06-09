angular.module('app').
	controller('PostsCrtl', ['$scope', '$rootScope', 'Posts', 'Comments', '$mdDialog','toast', '$routeParams', function($scope, $rootScope, Posts, Comments, $mdDialog, toast, $routeParams) {
		// $cookies.NameOfMyCookie = "Setting a value";
        // console.log('---------------------------------',$cookies.get('secretKey'));

		if(CKEDITOR.instances['postContent']) {
		 	//ckeditor already exists; No need to recreate it
		} else {
		 	CKEDITOR.replace('postContent');
		}
		
		$scope.getAll = function() {
			var allPosts = Posts.query(function() {
			});
			return allPosts;
		};
		$scope.showPosts = $scope.getAll();

		// console.log("the id is " + $routeParams.postId)
		$scope.createPosts = function() {
			var posts = new Posts({
				content: CKEDITOR.instances.postContent.getData()
			});

			posts.$save(function(err, data) {
				if(err) {
					console.log(err);
					return;
				}
			});
			CKEDITOR.instances.postContent.setData('');
			$scope.showPosts = $scope.getAll();

		};

		$scope.deletePosts = function(id, index) {
			Posts.delete({
				post_id: id,
			}, function(resp) {
				$scope.showPosts.splice(index, 1);
				toast('Post has been deleted');
			}, function(err) {
				toast('Error has occurred');
				console.log(err);
			});
		};

		$scope.getOnePost = function() {
			var posts = Posts.get({ post_id: $routeParams.postId }, function() {	
				console.log('Just posts',$scope.currentPost);
  		});
  		return posts;
		};
		$scope.currentPost = $scope.getOnePost();

		$scope.showDialog = function($event, index, currentPost) {
	    var parentEl = angular.element(document.body);
	     	$mdDialog.show({
	       parent: parentEl,
	       targetEvent: $event,
	       templateUrl:'view/commentDialog.html',
	       controller: function ($scope, $mdDialog, Comments, toast) {
		        $scope.closeDialog = function() {
		          $mdDialog.hide();
		        };
		        $scope.createComment = function() { 
							var comments = new Comments({
								body: $scope.newComment,
								post_id: currentPost.id
							});
							comments.$save(function(data) {
								console.log(data.body);	
								currentPost.comments.push(data);
							});

							$scope.closeDialog();
							// $scope.currentPost = $scope.getOnePost();
							// $scope.getOnePost();
						  // $scope.currentPost;
		        };
		        $scope.deleteComment = function(id, index) {
		        	console.log('Helloooooooooooo');
		        	Comments.delete({
		        		id: id
		        	}, function(resp) {
		        		currentPost.comments.splice(index, 1);
		        	}, function(err) {
		        		toast('Error has occured');
		        	});
		        };
		      }
	    }); 
	  };
}]).directive('hmRead', function () {
    return {
    	restrict:'AE',
    	scope:{
    		hmtext : '@',
    		hmlimit : '@',
    		hmfulltext:'@',
        hmMoreText:'@',
        hmLessText:'@',
        hmMoreClass:'@',
        hmLessClass:'@'
    	},
        templateUrl: 'view/limitView.html',
        transclude: true,
        controller : function($scope){
        	  $scope.toggleValue=function(){
              //Inverts hmfulltext flag to either TRUE/FALSE on each click
              $scope.hmfulltext = !$scope.hmfulltext;
            };      
        }
    };
  });
