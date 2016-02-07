'use strict';

angular.module('OnePagePortfolio.services').service('investments', function() {
    this.Salary = 30000;
    this.MonthlySavings = 1000;
    this.Timeframe = 25; // in years
    this.Return = 5; // in %, real.
    this.CurrentValuation = 5000;
    
    this.SafeWithdrawalRate = 4; // in %
    
    
    this.GetTotalIncome = function()
    {
        var ret = [];
        
        var investmentIncome = this.GetInvestmentEarnings();
        var salaryIncome = this.GetSalaryIncome();
        
        for (var i = 0; i <= this.Timeframe; i++){
            ret.push(investmentIncome[i] + salaryIncome[i]);
        }
        
        return ret;
    }
    
    this.GetInvestmentEarnings = function()
    {
        var ret = [];
        
        var balance = this.CurrentValuation
        
        var monthlyReturn = Math.pow(1 + (this.Return / 100), 1 / 12) - 1;
        var annualReturn = this.Return / 100;
        
        var annualContribution = this.MonthlySavings;
        
        // for a year.
        for (var i = 0; i < 12; i++){
            var contGrowth = annualContribution * monthlyReturn;
            annualContribution = annualContribution + contGrowth + this.MonthlySavings;
        }
        
        // for each year
        for (var i = 0; i <= this.Timeframe; i++){
            var investmentReturn = balance * annualReturn;
            var contributionsReturn = annualContribution - (this.MonthlySavings * 12);
            balance = balance + annualContribution + investmentReturn + contributionsReturn;
            ret.push(investmentReturn);
        }
        
        return ret;
    }
    
    this.GetSalaryIncome = function()
    {
        var ret = [];
        
        for (var i = 0; i <= this.Timeframe; i++){
            ret.push(this.Salary);
        }
        
        return ret;
    }
    
    this.GetContributions = function()
    {
        var ret = [];
        
        for (var i = 0; i <= this.Timeframe; i++){
            ret.push(this.MonthlySavings * 12);
        }
        return ret;
    }
    
    this.GetCurrentLifestyle = function()
    {
        var ret = [];
        
        var contributions = this.GetContributions();
        var salary = this.GetSalaryIncome();
        
        for (var i = 0; i <= this.Timeframe; i++){
            ret.push(salary[i] - contributions[i]);
        }
        return ret;
    }
    
    this.GetTotalValue = function()
    {
        var ret = [];
        
        var balance = this.CurrentValuation
        
        // add current position as opening balance.
        ret.push(balance);
        
        var investmentEarnings = this.GetInvestmentEarnings();
        var contributions = this.GetContributions();
        
        // for each year
        for (var i = 1; i <= this.Timeframe; i++){
            balance = balance + investmentEarnings[i - 1] + contributions[i - 1];
            ret.push(balance);
        }
        
        return ret;
    }
    
    this.GetContributionsValue = function()
    {
        var ret = [];
        
        var totalContributions = this.CurrentValuation;
        
        ret.push(totalContributions)
        
        // for each year
        for (var i = 1; i <= this.Timeframe; i++){
            var newContributions = this.MonthlySavings * 12;
            totalContributions = totalContributions + newContributions;
            ret.push(totalContributions);
        }
        
        return ret;
    }    
    
    this.GetYearsUntilFinanciallyIndependent = function()
    {
        var fi = -1;
        
        var currentLifestyle = this.GetCurrentLifestyle();
        var portfolioValue = this.GetTotalValue();
        
        for (var i = 0; i <= 100; i++)
        {
            if(portfolioValue[i] * (this.SafeWithdrawalRate / 100) > (currentLifestyle[i]))
            {
                fi = i;
                break;
            }
        }
        
        return fi;
    }
    
    this.GetIndefiniteWithdrawalFigure = function()
    {

        var portfolioValue = this.GetTotalValue();
        
        return portfolioValue[this.Timeframe - 1] * (this.SafeWithdrawalRate / 100)
    }  
})