'use strict';

angular.module('OnePagePortfolio.controllers').controller('kiwisaverController',
    ['$scope', 'kiwisaver', function($scope, kiwisaver){
        
    $scope.valuationData = {
        labels: [],
        series: []
    };
    
    $scope.incomeData = {
        labels: [],
        series: []
    };
    
    
    $scope.data = kiwisaver;
    
    
    this.updateLabels = function()
    {
        $scope.valuationData.labels = [];
        $scope.incomeData.labels = [];
        this.ReturnYears = [];
        
        for (var i = 0; i <= kiwisaver.GetTimeframe(); i++)
        {
            $scope.valuationData.labels.push(i);
        }
        
        for (var i = 1; i <= kiwisaver.GetTimeframe() + 1; i++)
        {
            $scope.incomeData.labels.push(i);
        }
        
        for (var i = 1; i <= kiwisaver.GetTimeframe(); i++)
        {
            this.ReturnYears.push(i);
        }
    }
    
    this.updateData = function()
    {
        $scope.valuationData.series = [];
        
        
        var personal = kiwisaver.GetPersonalContributionsValue();
        var employer = kiwisaver.GetEmployerContributionsValue();
        var government = kiwisaver.GetGovernmentContributionsValue()
        
        $scope.valuationData.series.push(kiwisaver.GetTotalValue());
        $scope.valuationData.series.push(this.SumArrays(this.SumArrays(personal, employer), government));
        $scope.valuationData.series.push(this.SumArrays(personal, employer));
        $scope.valuationData.series.push(kiwisaver.GetPersonalContributionsValue());
        
        
        $scope.incomeData.series = [];
        $scope.incomeData.series.push(kiwisaver.GetInvestmentEarnings());

        this.updateLabels();
        this.saveConfiguration();
    }
    
    this.SumArrays = function(arr1, arr2)
    {
        var ret = [];
        for (var i = 0; i < arr1.length; i++)
        {
            ret.push(arr1[i] + arr2[i]);
        }
        
        return ret;
    }
    
    
    
    this.saveConfiguration = function()
    {
        try {
            localStorage.setItem('OPP.kiwisaver', JSON.stringify(kiwisaver));
        } catch (ex) {
            console.error(ex);
        }
    }
    
    this.loadConfiguration = function()
    {
        try {
            var savedData = localStorage.getItem('OPP.kiwisaver');
            if (savedData != null) {
                var obj = JSON.parse(savedData); // this is how you parse a string into JSON 
                kiwisaver.Salary = obj.Salary;
                kiwisaver.Age = obj.Age;
                kiwisaver.ContributionRate = obj.ContributionRate;
                kiwisaver.Return = obj.Return;
                kiwisaver.CurrentValuation = obj.CurrentValuation;
            }
        } catch (ex) {
            console.error(ex);
        }
    }
    
    // Try and load data
    this.loadConfiguration();
    
    // To show the initial data
    this.updateData();


}]);