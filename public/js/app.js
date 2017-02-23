(function(){
    //config allows data to be passed in body of post request
    var app = angular.module('blog', ['posts']).config(function ($httpProvider, $httpParamSerializerJQLikeProvider){
        $httpProvider.defaults.transformRequest.unshift($httpParamSerializerJQLikeProvider.$get());
    });

    //----CONTROLLERS
    app.controller('PaintingController', ['$rootScope', '$http', function($rootScope, $http) {
        var slideshow = this;
        this.paintings = $rootScope.paintings;

        //take in all blog-posts from JSON API
        $http.get('/paintings').then(function(success) {
            $rootScope.paintings = success.data;
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
