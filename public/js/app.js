(function(){
    //config allows data to be passed in body of post request
    var app = angular.module('blog', ['posts']).config(function ($httpProvider, $httpParamSerializerJQLikeProvider){
        $httpProvider.defaults.transformRequest.unshift($httpParamSerializerJQLikeProvider.$get());
    });

    //----CONTROLLERS
    app.controller('SlideshowController', ['$rootScope', '$http', function($rootScope, $http) {
        var slideshow = this;
        this.paintings = $rootScope.paintings;

        //take in all blog-posts from JSON API
        $http.get('/paintings').then(function(success) {
            $rootScope.paintings = success.data;
        });

    }]);
})();
