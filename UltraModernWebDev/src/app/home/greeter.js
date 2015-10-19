(function() {

    angular
        .module('ultraModernWebDev')
        .factory('greeter', greeter);

    function greeter () {
        return {
            message: () => {
                return $.get('api/greeting').then((data) => {
                    return data.message;
                });
            }
        };
    }
})();
