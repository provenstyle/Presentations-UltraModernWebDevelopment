(function() {

    angular
        .module('ultraModernWebDev')
        .controller('homeController', homeController);

    homeController.$inject = ['greeter'];
    function homeController(greeter) {
        this.message = greeter.message() + ', World!';
    }

})();
