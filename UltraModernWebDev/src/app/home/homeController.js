(function() {

    angular
        .module('ultraModernWebDev')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope', 'greeter'];
    function homeController($scope, greeter) {

        this.greet = function() {
            greeter.message().then((message) => {
                $scope.$applyAsync(() => {
                    this.message = `${message}, World!`;
                });
            });
        };

        this.greet();
    }

})();
