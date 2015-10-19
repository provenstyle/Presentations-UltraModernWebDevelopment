(function() {

    angular
        .module('ultraModernWebDev', ['ui.router'])
        .config(routerConfig)
        .run(routerRunner);

    routerConfig.$inject = ['$urlRouterProvider'];
    function routerConfig($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    }

    routerRunner.$inject = ['$rootScope', '$state'];
    function routerRunner($rootScope, $state) {
        // Requiring $state in a run forces the  ui-router to
        // register a listener for '$locationChangeSuccess'
        // before it is raised by the  angular.bootstrap function.
        // Also adding it to the $rootScope for convenience
        $rootScope.$state = $state;
    }

})();
