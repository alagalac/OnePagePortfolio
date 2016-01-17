'use strict';

angular.module('OnePagePortfolio.services',[] );
angular.module('OnePagePortfolio.controllers',['OnePagePortfolio.services'] );

// Declare app level module which depends on views, and components
angular.module('OnePagePortfolio', ['angular-chartist', 'OnePagePortfolio.services', 'OnePagePortfolio.controllers']);



