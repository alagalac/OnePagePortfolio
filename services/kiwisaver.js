'use strict';

angular.module('OnePagePortfolio.services', []).service('kiwisaver', function() {
    this.Salary = 50000;
    this.Age = 15;
    this.ContributionRate = 4; // in %
    this.Return = 5; // in %, real.
    this.CurrentValuation = 25000;
    
    // constants. Shouldn't probably change
    this.RetirementAge = 65;
    this.EmployerContributionRate = 3; // in %
    this.MaxGovtContribution = 512.43;
    
    this.GetTimeframe = function()
    {
        return this.RetirementAge - this.Age;
    }
    
    
    this.GetTotalIncome = function()
    {
        var ret = [];
        
        var investmentIncome = this.GetInvestmentEarnings();
        var salaryIncome = this.GetSalaryIncome();
        
        for (var i = 0; i <= this.GetTimeframe(); i++){
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
        
        var monthlySavings = this.Salary * ((this.ContributionRate + this.EmployerContributionRate) / 100) / 12;
        
        var annualContribution = monthlySavings;
        
        // for a year.
        for (var i = 0; i < 12; i++){
            var contGrowth = annualContribution * monthlyReturn;
            annualContribution = annualContribution + contGrowth + monthlySavings;
        }
        
        // for each year
        for (var i = 0; i <= this.GetTimeframe(); i++){
            var investmentReturn = balance * annualReturn;
            var contributionsReturn = annualContribution - (monthlySavings * 12);
            balance = balance + annualContribution + investmentReturn + contributionsReturn;
            ret.push(investmentReturn);
        }
        
        return ret;
    }
    
    this.GetPersonalContributions = function()
    {
        var ret = [];
        
        // for each year
        for (var i = 0; i <= this.GetTimeframe(); i++){
            var newContributions = this.Salary * (this.ContributionRate / 100);
            ret.push(newContributions);
        }
        
        return ret;
    }
    
    this.GetEmployerContributions = function()
    {
        var ret = [];
        
        // for each year
        for (var i = 0; i <= this.GetTimeframe(); i++){
            var newContributions = this.Salary * (this.EmployerContributionRate / 100);
            ret.push(newContributions);
        }
        
        return ret;
    }
    
    this.GetGovernmentContributions = function()
    {
        var ret = [];
        
        var personalContributions = this.Salary * (this.ContributionRate / 100);
        
        var govtContribution = Math.min(this.MaxGovtContribution, personalContributions / 2);
        
        // for each year
        for (var i = 0; i <= this.GetTimeframe(); i++){
            ret.push(govtContribution);
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
        var personalContributions = this.GetPersonalContributions();
        var governmentContributions = this.GetGovernmentContributions();
        var employerContributions = this.GetEmployerContributions();
        
        // for each year
        for (var i = 1; i <= this.GetTimeframe(); i++){
            balance = balance + investmentEarnings[i - 1] + personalContributions[i - 1] + governmentContributions[i - 1] + employerContributions[i - 1];
            ret.push(balance);
        }
        
        return ret;
    }
    
    this.GetPersonalContributionsValue = function()
    {
        var ret = [];
        
        ret.push(0);
        
        var totalContributions = 0;
        
        // for each year
        for (var i = 1; i <= this.GetTimeframe(); i++){
            var newContributions = this.Salary * (this.ContributionRate / 100);
            totalContributions = totalContributions + newContributions;
            ret.push(totalContributions);
        }
        
        return ret;
    }
    
    this.GetEmployerContributionsValue = function()
    {
        var ret = [];
        
        ret.push(0);
        
        var totalContributions = 0;
        
        // for each year
        for (var i = 1; i <= this.GetTimeframe(); i++){
            var newContributions = this.Salary * (this.EmployerContributionRate / 100);
            totalContributions = totalContributions + newContributions;
            ret.push(totalContributions);
        }
        
        return ret;
    }
    
    this.GetGovernmentContributionsValue = function()
    {
        var ret = [];
        
        var personalContributions = this.Salary * (this.ContributionRate / 100);
        
        var govtContribution = Math.min(this.MaxGovtContribution, personalContributions / 2);
        
        ret.push(0);
        
        var totalContributions = 0;
        
        // for each year
        for (var i = 1; i <= this.GetTimeframe(); i++){
            totalContributions = totalContributions + govtContribution;
            ret.push(totalContributions);
        }
        
        return ret;
    } 
    
})