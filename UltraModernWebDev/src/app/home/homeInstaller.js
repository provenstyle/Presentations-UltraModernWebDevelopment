(function() {

    angular
        .module('ultraModernWebDev')
        .config(homeConfig);

    homeConfig.$inject = ['$stateProvider'];
    function homeConfig($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'app/home/home.html',
            controller: 'homeController',
            controllerAs: 'vm'
        });
    }

})();
