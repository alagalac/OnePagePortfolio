'use strict';

angular.module('OnePagePortfolio.controllers').controller('investmentsController',
    ['$scope', 'investments', function($scope, investments){
        
    
    $scope.valuationData = {
        labels: [],
        series: []
    };
    
    $scope.incomeData = {
        labels: [],
        series: []
    };
    
    this.FinanciallyIndependent = 0; // in years
    this.IndefiniteWithdrawal = 0;
    
    $scope.data = investments;
    
    
    this.updateLabels = function()
    {
        $scope.valuationData.labels = [];
        $scope.incomeData.labels = [];
        this.ReturnYears = [];
        
        for (var i = 0; i <= investments.Timeframe; i++)
        {
            $scope.valuationData.labels.push(i);
        }
        
        for (var i = 1; i <= investments.Timeframe + 1; i++)
        {
            $scope.incomeData.labels.push(i);
        }
        
        for (var i = 1; i <= investments.Timeframe; i++)
        {
            this.ReturnYears.push(i);
        }
    }
    
    this.updateData = function()
    {
        $scope.valuationData.series = [];
        $scope.valuationData.series.push(investments.GetTotalValue());
        $scope.valuationData.series.push(investments.GetContributionsValue());
        
        
        $scope.incomeData.series = [];
        $scope.incomeData.series.push(investments.GetTotalIncome());
        $scope.incomeData.series.push(investments.GetSalaryIncome());
        //$scope.incomeData.series.push(investments.GetInvestmentEarnings());
        
        
        this.FinanciallyIndependent = investments.GetYearsUntilFinanciallyIndependent();
        if (this.FinanciallyIndependent === -1)
        {
            this.FinanciallyIndependent = '∞';
        }
        
        this.IndefiniteWithdrawal = investments.GetIndefiniteWithdrawalFigure();
        
        this.updateLabels();
        this.saveConfiguration();
    }
    
    
    
    this.saveConfiguration = function()
    {
        try {
            localStorage.setItem('OPP.investments', JSON.stringify(investments));
        } catch (ex) {
            console.error(ex);
        }
    }
    
    this.loadConfiguration = function()
    {
        try {
            var savedData = localStorage.getItem('OPP.investments');
            if (savedData != null) {
                var obj = JSON.parse(savedData); // this is how you parse a string into JSON 
                investments.Salary = obj.Salary;
                investments.MonthlySavings = obj.MonthlySavings;
                investments.Timeframe = obj.Timeframe;
                investments.Return = obj.Return;
                investments.CurrentValuation = obj.CurrentValuation;
                investments.SafeWithdrawalRate = obj.SafeWithdrawalRate;
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