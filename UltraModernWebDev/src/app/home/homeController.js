(function() {

    angular
        .module('ultraModernWebDev')
        .controller('homeController', homeController);

    homeController.$inject = ['$scope', 'greeter'];
    function homeController($scope, greeter) {
        this.greet = function() {
            greeter.message().then(function (message) {
                $scope.$applyAsync(function () {
                    this.message = message + ', World!';
                }.bind(this));
            }.bind(this));
        }

        this.greet();
    }

})();
