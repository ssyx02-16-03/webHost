//module1 is a dependency to run.
/*define(['module1'], function (module1ref) {
    var module1 = new module1ref();
    var returnedModule = function () {
        this.getModule1Name = function () {
            return module1.getName();
        }
    };
  
    return returnedModule;
  
});



/*
// The module pattern
var feature = (function() {
 
    // Private variables and functions
    var privateThing = "secret";
    var publicThing = "not secret";
 
    var changePrivateThing = function() {
        privateThing = "super secret";
    };
 
    var sayPrivateThing = function() {
        console.log( privateThing );
        changePrivateThing();
    };
 
    // Public API
    return {
        publicThing: publicThing,
        sayPrivateThing: sayPrivateThing
    };
})();
*/
