(function() {
    var app = angular.module('posts', []).config(function ($httpProvider){
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
    });

    //----CONTROLLERS
    app.controller('PostController', ['$http', function($http) {
        var postForm = this;
        this.post = {thumbnail : "https://66.media.tumblr.com/avatar_fe886f20cc95_128.png"};

        this.addPost = function(){
            //default thumbnail is Ron Weasley eating chicken
            if (!this.post.thumbnail) {
                this.post.thumbnail = "https://66.media.tumblr.com/avatar_fe886f20cc95_128.png";
            };
            //post and then refresh
            $http({
                method: 'POST',
                url: '/blog-posts',
                data: {post : postForm.post}
            }).then(function(success){
                //not happy with this refresh; I'd love to find a way to do this more cleanly
                window.location="/";
            });
        };

        //toggle live draft view of new post
        this.draftIsActive = false;
        this.toggleDraft = function() {
            this.draftIsActive = !this.draftIsActive;
        };
    }]);

    //----DIRECTIVES
    app.directive("postContent", function(){
        return {
            restrict: "E",
            templateUrl: "templates/post-content.html"
        };
    });

    app.directive("postForm", function(){
        return {
            restrict: "E",
            templateUrl: "templates/post-form.html"
        };
    });
})();
