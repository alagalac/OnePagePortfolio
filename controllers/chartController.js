'use strict';

angular.module('OnePagePortfolio.controllers').controller('chartController',
    ['$scope', function($scope){
        
    this.Options = {
        axisX: {
            labelInterpolationFnc: function(value) {
                return value;
            }
        },
        chartPadding: 20,
        showArea: true,
        low: 0
        
    };
    
    this.ResponsiveOptions = [
        ['screen and (min-width: 1025px)', {
            showPoint: false,
            showLine: false,
            height: '300px',
            axisX: {
                labelInterpolationFnc: function(value, index) {
                    return index % 2 === 0 ? value : null;
                }
            }
        }],
        ['screen and (min-width: 641px) and (max-width: 1024px)', {
            showPoint: false,
            showLine: false,
            height: '300px',
            axisX: {
                labelInterpolationFnc: function(value, index) {
                    return index % 2 === 0 ? value : null;
                }
            }
        }],
        ['screen and (max-width: 640px)', {
            showPoint: false,
            showLine: false,
            height: '200px',
            axisX: {
                labelInterpolationFnc: function(value, index) {
                    return index % 2 === 0 ? value : null;
                }
            }
        }]
    ];
}]);