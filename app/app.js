{
  'use strict';

  angular.module('app', ["ui.router"])
  .config(($stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise("/");

    $stateProvider.state("products", {
      url: "/products",
      templateUrl: "/views/index.html",
      controller: "ProductController"
    }).state("createProduct", {
      url: "/createproduct",
      templateUrl: "/views/create.html",
      controller: "ProductController"
    }).state("editProduct", {
      url: "/editproduct/:id",
      templateUrl: "/views/create.html",
      controller: "ProductController"
    }).state("detailsProduct", {
      url: "/product/:id",
      templateUrl: "/views/details.html",
      controller: "ProductController"
    }).state("orders", {
      url: "/orders",
      templateUrl: "/views/index.html",
      controller: "OrderController"
    }).state("createOrder", {
      url: "/createorder",
      templateUrl: "/views/create.html",
      controller: "OrderController"
    }).state("editOrder", {
      url: "/editorder/:id",
      templateUrl: "/views/create.html",
      controller: "OrderController"
    }).state("detailsOrder", {
      url: "/order/:id",
      templateUrl: "/views/details.html",
      controller: "OrderController"
    });
  })
  .constant("globalConfig", {
    apiAddress: 'http://localhost:3000/api'
  });
}