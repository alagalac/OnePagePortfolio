'use strict';

angular.module('OnePagePortfolio.services',[] );
angular.module('OnePagePortfolio.controllers',['OnePagePortfolio.services'] );

// Declare app level module which depends on views, and components
var app = angular.module('OnePagePortfolio', ['angular-chartist', 'OnePagePortfolio.services', 'OnePagePortfolio.controllers']);

app.directive('convertToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) {
        return parseInt(val, 10);
      });
      ngModel.$formatters.push(function(val) {
        return '' + val;
      });
    }
  };
});

