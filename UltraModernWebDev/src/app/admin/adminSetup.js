(function() {

    angular
        .module('ultraModernWebDev')
        .config(adminConfig);

    adminConfig.$inject = ['$stateProvider'];
    function adminConfig ($stateProvider) {
        $stateProvider.state('admin', {
            url: '/admin',
            templateUrl: 'app/admin/admin.html',
            controller: 'adminController',
            controllerAs: 'vm'
        });
    }

})();
