new function() {

  var temp1 = new base2.Package(this, {
    name:    'temp1',
    imports: 'miruken.ng,miruken.ioc',
    exports: 'Temp1Installer,Temp1Runner',
    ngModule: [
        'ui.router'
    ]
  });

  eval(this.imports);

  var Temp1Installer = Installer.extend({
    $inject: ['$urlRouterProvider'],
    constructor: function($urlRouterProvider){
      $urlRouterProvider.otherwise('/');
    }
  });

  var Temp1Runner = Runner.extend({
    $inject: ['$rootScope', '$state'],
    constructor: function ($rootScope, $state) {
      // Requiring $state in a run forces the  ui-router to
      // register a listener for '$locationChangeSuccess'
      // before it is raised by the  angular.bootstrap function.
      // Also adding it to the $rootScope for convenience
      $rootScope.$state = $state;
    }
  });

  eval(this.exports);

};
