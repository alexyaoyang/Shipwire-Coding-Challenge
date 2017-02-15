{
  'use strict';

  angular
  .module('app')
  .factory('currencyConverterService', Service);

  Service.$inject = ['$http'];

  function Service($http) {
    const YAHOO_FINANCE_URL_PATTERN =
        '//query.yahooapis.com/v1/public/yql?q=select * from ' +
        'yahoo.finance.xchange where pair in ("PAIRS")&format=json&' +
        'env=store://datatables.org/alltableswithkeys';
    const currencies = ['USD', 'EUR', 'CNY'];
    let usdToForeignRates = {};

    const convert = (amount, inCurr, outCurr) => {
      return amount * usdToForeignRates[outCurr] / usdToForeignRates[inCurr];
    };

    let refresh = () => {
      let url = YAHOO_FINANCE_URL_PATTERN.replace('PAIRS', 'USD' + currencies.join('","USD'));
      return $http.get(url).then(function(response) {
        let newUsdToForeignRates = {};
        angular.forEach(response.data.query.results.rate, (rate) => {
          let currency = rate.id.substring(3,6);
          newUsdToForeignRates[currency] = window.parseFloat(rate.Rate);
        });
        usdToForeignRates = newUsdToForeignRates;
      });
    };

    refresh();

    return {
      currencies: currencies,
      convert: convert
    };
  }
}