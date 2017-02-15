{
  'use strict';

  angular
  .module('app')
  .factory('productService', Service);

  Service.$inject = ['$http', 'globalConfig'];

  function Service($http, globalConfig) {
    let url = "";
    return {
      getProducts: () => {
        url = globalConfig.apiAddress + "/product";
        return $http.get(url);
      },
      getProduct: (id) => {
        url = globalConfig.apiAddress + "/product/" + id;
        return $http.get(url);
      },
      createProduct: (product) => {
        url = globalConfig.apiAddress + "/product";
        return $http.post(url, product);
      },
      updateProduct: (product) => {
        url = globalConfig.apiAddress + "/product/" + product._id;
        return $http.put(url, product);
      },
      deleteProduct: (id) => {
        url = globalConfig.apiAddress + "/product/" + id;
        return $http.delete(url);
      }
    };
  }
}