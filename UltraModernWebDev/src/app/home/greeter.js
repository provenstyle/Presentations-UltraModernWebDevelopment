(function() {

    angular
        .module('ultraModernWebDev')
        .factory('greeter', greeter);

    function greeter () {
        return {
            message: function() {
                var messages = [
                    'Hello',
                    'Howdy',
                    'Hola',
                    'Hi',
                    'Shalom',
                    'Bonjour'
                ];
                return messages[getRandomInt(0, messages.length)];
            }
        };
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

})();
