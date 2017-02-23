(function() {
    var app = angular.module('posts', []).config(function ($httpProvider){
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
    });

    //----CONTROLLERS
    app.controller('PaintingController', ['$http', function($http) {
        var paintingForm = this;
        this.painting = {};

        this.addPainting = function(){
            //post and then refresh
            console.log("Adding painting!");
            $http({
                method: 'POST',
                url: '/paintings',
                data: {painting : paintingForm.painting}
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
    app.directive("painting", function(){
        return {
            restrict: "E",
            templateUrl: "templates/painting.html"
        };
    });

    app.directive("paintingForm", function(){
        return {
            restrict: "E",
            templateUrl: "templates/painting-form.html"
        };
    });
})();
