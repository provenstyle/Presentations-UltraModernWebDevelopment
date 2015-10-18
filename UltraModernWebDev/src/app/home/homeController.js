new function() {

  var home = new base2.Package(this, {
    name:    'home',
    parent:  temp1,
    imports: 'miruken.mvc,temp1.greeting',
    exports: 'HomeController'
  });

  eval(this.imports);

  var HomeController = Controller.extend({
    $properties:{
      message: ''
    },
    initialize: function() {
        this.message = Greeting(this.context).message() + ', Columbus';
    }
  });

  eval(this.exports);

}
