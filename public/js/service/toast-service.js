angular.module('app')
  .factory('toast',['$mdToast', function($mdToast) {

    function setMargins(index) {
      if(!index)
        return 'margin: 3px 0 3px 0;';
      else 
        return 'margin: 0 0 3px 0;';
    }

    function generateSpans(text) { 
      var spans = '';
      for(var i=0; i < text.length; i++) {
        spans += '<span style="' + setMargins(i) + '">' + text[i] + '</span>';
      }
      return spans;
    }

    return function(text, error, hideDelay, position, cb) {
      text = text || 'Toast Text Goes Here';
      error = error || false;
      hideDelay = hideDelay || 2000;
      position = position || 'bottom left';

    
      $mdToast.show({
        template: '<md-toast layout="column"' + "ng-class='{" + '"mks-toast-error":' + error + "}'" 
                  + 'style="max-height:initial; height:initial; padding: 10px;">'
                  + generateSpans(text) + 
                  '</md-toast>',
        hideDelay: hideDelay,
        position: position
      });

      if(cb) {
        setTimeout(function() { cb(); }, hideDelay);
      }
    };
  }]);
