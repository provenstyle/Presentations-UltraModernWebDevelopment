(function() {

    angular
        .module('ultraModernWebDev')
        .factory('greeter', greeter);

    function greeter () {
        return {
            message: function () {
                return $.get('api/greeting')
                    .then(function(data) {
                        return data.message;
                    });
            }
        };
    }
})();
