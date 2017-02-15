{
  'use strict';

  angular
  .module('app')
  .factory('orderService', Service);

  Service.$inject = ['$http', 'globalConfig'];

  function Service($http, globalConfig) {
    let url = "";
    return {
      getOrders: () => {
        url = globalConfig.apiAddress + "/order";
        return $http.get(url);
      },
      getOrder: (id) => {
        url = globalConfig.apiAddress + "/order/" + id;
        return $http.get(url);
      },
      createOrder: (order) => {
        url = globalConfig.apiAddress + "/order";
        return $http.post(url, order);
      },
      updateOrder: (order) => {
        url = globalConfig.apiAddress + "/order/" + order._id;
        return $http.put(url, order);
      },
      deleteOrder: (id) => {
        url = globalConfig.apiAddress + "/order/" + id;
        return $http.delete(url);
      },
      checkAddress: (form) => {
        url = globalConfig.apiAddress + "/order/";
        url += form.streetAddress + '/';
        url += form.city + '/';
        url += form.state + '/';
        url += form.zipCode;
        return $http.get(url);
      }
    };
  }
}