(function(){
    //config allows data to be passed in body of post request
    var app = angular.module('blog', ['posts']).config(function ($httpProvider, $httpParamSerializerJQLikeProvider){
        $httpProvider.defaults.transformRequest.unshift($httpParamSerializerJQLikeProvider.$get());
    });

    //----CONTROLLERS
    app.controller('BlogController', ['$rootScope', '$http', function($rootScope, $http) {
        var blog = this;
        this.posts = $rootScope.posts;
        this.counts = [];

        this.count = function(){
            //count instances of unique authors and topics
            var count = {authors : [], topics : []};
            for (var i = 0; i < $rootScope.posts.length; i++) {
                var incremented = {author: false, topic: false};
                for (var j = 0; j < count.authors.length; j++) {
                    if ($rootScope.posts[i].author.id == count.authors[j].author.id) {
                        count.authors[j].count += 1;
                        incremented.author = true;
                        break;
                    };
                };

                for (var k = 0; k < count.topics.length; k++){
                    if ($rootScope.posts[i].topic == count.topics[k].name) {
                        count.topics[k].count += 1;
                        incremented.topic = true;
                        break;
                    };
                };

                //if not found, add to list
                if (!incremented.author) {
                    count.authors.push({author: $rootScope.posts[i].author, count : 1});
                };
                if (!incremented.topic) {
                    count.topics.push({name: $rootScope.posts[i].topic, count : 1});
                };
            };
            return count;
        };

        //take in all blog-posts from JSON API
        $http.get('/blog-posts').then(function(success) {
            $rootScope.posts = success.data;
            $rootScope.counts = blog.count();
        });

    }]);

    app.controller('PanelController', function(){
        //for toggling summary and full-text tabs of posts
        this.tab = 1;
        this.selectTab = function(setTab) {
            this.tab = setTab;
        };
        this.isSelected = function(checkTab) {
            return this.tab == checkTab;
        };
    });

    app.controller('SidebarController', function(){
        //allows counts by user and topic to be toggled individually
        this.active = {topics: false, authors: false};
        this.toggle = function(tab) {
            switch (tab){
                case "topics":
                    this.active.topics = !this.active.topics;
                    break;
                case "authors":
                    this.active.authors = !this.active.authors;
                    break;
            };
        };
    });

    //----DIRECTIVES
    app.directive("sidebar", function(){
        return {
            restrict: "E",
            templateUrl: "templates/sidebar.html"
        };
    });
})();
