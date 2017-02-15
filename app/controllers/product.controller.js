{
  'use strict';

  angular
  .module('app')
  .controller('ProductController', Controller);

  Controller.$inject = ['$scope', '$rootScope', 'productService', 'currencyConverterService', '$state', '$stateParams'];
 
  function Controller($scope, $rootScope, productService, currencyConverterService, $state, $stateParams) {
    $scope.mode = "Product";
    $scope.items = [];
    $scope.imptlabels = [
      {"name" : "ID", "code" : "_id"},
      {"name" : "name", "code" : "name"},
      {"name" : "description", "code" : "description"},
      {"name" : "value (USD)", "code" : "value"}];
    $scope.labels = [
      {"name" : "ID", "code" : "_id", "required": "false", "type": "text"},
      {"name" : "name", "code" : "name", "required": "true", "type": "text"},
      {"name" : "description", "code" : "description", "required": "false", "type": "text"},
      {"name" : "value (USD)", "code" : "value", "required": "true", "type": "number"},
      {"name" : "width (inches)", "code" : "width", "required": "false", "type": "number"},
      {"name" : "length (inches)", "code" : "length", "required": "false", "type": "number"},
      {"name" : "height (inches)", "code" : "height", "required": "false", "type": "number"},
      {"name" : "weight (lbs)", "code" : "weight", "required": "false", "type": "number"}];
    const inCurr = 'USD';
    $scope.currencies = currencyConverterService.currencies;
    $scope.total = (value, outCurr) => {
      return currencyConverterService.convert(value, inCurr, outCurr);
    };

    $scope.deleteProduct = (id) => {
      if (confirm('Are you sure you want to delete?')) {
        productService.deleteProduct(id).then((res) => {
          if (res.data == "deleted") {
            $state.go("products", {}, { reload: true });
          } else alert("Delete failed, please check inputs!");
        }).catch((err) => {
          console.error(err);
          alert("Delete failed, please refresh and make sure product has not been deleted already.");
        });
      }
    };

    if ($state.current.name == "products") {
      $rootScope.Title = "Product Listing";
      productService.getProducts().then((res) => {
        $scope.items = res.data;
      }).catch((err) => {
        console.error(err);
        alert("Unable to get Product Listing, please try again!");
      });
    } else if ($state.current.name == "editProduct") {
      $rootScope.Title = "Edit Product";
      const id = $stateParams.id;
      productService.getProduct(id).then((res) => {
        $scope.item = res.data;
      }).catch((err) => {
        console.error(err);
        alert("Didn't managed to find product to edit, please try again!");
      });

      $scope.saveData = () => {
        if ($scope.formData.$valid) {
          productService.updateProduct($scope.item).then((res) => {
          if (res.data == "updated") {
            $state.go("products");
          } else alert("Update failed, please check inputs!");
          }).catch((err) => {
            console.error(err);
            alert("Update failed, please try again!");
          });
        } else alert("Update failed, please check inputs!");
      };
    } else if ($state.current.name == "createProduct") {
      $rootScope.Title = "Create Product";
      $scope.item = {};
      $scope.saveData = () => {
        $scope.formData.$submitted = true;
        if ($scope.formData.$valid) {
          $scope.IsSubmit = true;
          productService.createProduct($scope.item).then((res) => {
            if (res.data == "created") {
              $state.go("products");
            } else alert("Create failed, please check inputs!");
          }).catch((err) => {
            console.error(err);
            alert("Create failed, please try again!");
          });
        } else alert("Create failed, please check inputs!");
      }
    } else if ($state.current.name == "detailsProduct") {
      $rootScope.Title = "Product Details";
      const id = $stateParams.id;
      productService.getProduct(id).then((res) => {
        $scope.item = res.data;
      }).catch((err) => {
        console.error(err);
        alert("Couldn't find product details, please try again!");
      });
    }
  }
}