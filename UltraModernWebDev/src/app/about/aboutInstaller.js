(function() {

    angular
        .module('ultraModernWebDev')
        .config(aboutConfig);

    aboutConfig.$inject = ['$stateProvider'];
    function aboutConfig ($stateProvider) {
        $stateProvider.state('about', {
            url: '/about',
            templateUrl: 'app/about/about.html',
            controller: 'aboutController',
            controllerAs: 'vm'
        });
    }

})();
