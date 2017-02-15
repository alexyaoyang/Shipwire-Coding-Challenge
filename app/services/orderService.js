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
      },
      constructAddressMessage: (addrobj, order) => {
        if(addrobj.city_name != order.city || 
          addrobj.zipcode != order.zipCode || 
          addrobj.state_abbreviation != order.state){
          let msg = "Did you mean ",
              address = addrobj.primary_number + " " + addrobj.street_name + " " +  addrobj.street_suffix,
              city = addrobj.city_name,
              state = addrobj.state_abbreviation,
              zipcode = addrobj.zipcode;
              return [true, msg + address + ", " + city + ", " + state + " " + zipcode + "?", address, city, state, zipcode];
          }
        else return [false];
      }
    };
  }
}