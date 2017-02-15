{
  'use strict';

  angular
  .module('app')
  .controller('OrderController', Controller);

  Controller.$inject = ['$scope', '$rootScope', 'orderService', 'productService', '$state', '$stateParams'];
 
  function Controller($scope, $rootScope, orderService, productService, $state, $stateParams) {
    $scope.mode = "Order";
    $scope.items = [];
    $scope.imptlabels = [
      {"name" : "ID", "code" : "_id"},
      {"name" : "recipient Name", "code": "recipientName"},
      {"name" : "product", "code": "product"},
      {"name" : "quantity", "code": "quantity"}];
    $scope.labels = [
      {"name" : "ID", "code" : "_id", "required": "false", "type": "text"},
      {"name" : "recipient Name", "code": "recipientName", "required": "true", "type": "text"},
      {"name" : "street Address", "code": "streetAddress", "required": "true", "type": "text"},
      {"name" : "city", "code": "city", "required": "true", "type": "text"},
      {"name" : "state", "code": "state", "required": "true", "type": "text"},
      {"name" : "zip code", "code": "zipCode", "required": "true", "type": "text"},
      {"name" : "phone Number", "code": "phoneNumber", "required": "true", "type": "text"},
      {"name" : "quantity", "code": "quantity", "required": "true", "type": "number"},
      {"name" : "product ID", "code": "product", "required": "true", "type": "text"}];
    $scope.deleteOrder = (id) => {
      if (confirm('Are you sure you want to delete?')) {
        orderService.deleteOrder(id).then((res) => {
          if (res.data == "deleted") {
            $state.go("orders", {}, { reload: true });
          } else alert("Delete failed, please check inputs!");
        }).catch((err) => {
          console.error(err);
          alert("Delete failed, please refresh and make sure order has not been deleted already.");
        });
      }
    };

    if ($state.current.name == "orders") {
      $rootScope.Title = "Order Listing";
      orderService.getOrders().then((res) => {
        $scope.items = res.data;
      }).catch((err) => {
        console.error(err);
        alert("Unable to get Order Listing, please try again!");
      });
    } else if ($state.current.name == "editOrder") {
      $rootScope.Title = "Edit Order";
      const id = $stateParams.id;
      orderService.getOrder(id).then((res) => {
        $scope.item = res.data;
      }).catch((err) => {
        console.error(err);
        alert("Didn't managed to find order to edit, please try again!");
      });

      $scope.saveData = () => {
        if ($scope.formData.$valid) {
          orderService.checkAddress($scope.item).then((result) => {
            if(typeof result.data == 'object' && result.data.length > 0){
              let addressMsg = orderService.constructAddressMessage(result.data[0].components, $scope.item);
              if(!addressMsg[0] || addressMsg[0] && confirm(addressMsg[1])){
                if(addressMsg.length > 1){
                  $scope.item.streetAddress = addressMsg[2];
                  $scope.item.city = addressMsg[3];
                  $scope.item.state = addressMsg[4];
                  $scope.item.zipCode = addressMsg[5];
                }
                orderService.updateOrder($scope.item).then((res) => {
                if (res.data == "updated") {
                  $state.go("orders");
                } else alert("Update failed, please check inputs!");
                }).catch((err) => {
                  console.error(err);
                  alert("Update failed, please try again!");
                });
              }
            } else alert("Address is not valid! Please enter valid Street Address, City, State and Zipcode.");
          });
        } else {
          console.error("Update failed, please check inputs!");
          alert("Update failed, please check inputs!");
        }
      };
    } else if ($state.current.name == "createOrder") {
      $rootScope.Title = "Create Order";
      $scope.item = {};
      $scope.saveData = () => {
        if ($scope.formData.$valid) {
          orderService.checkAddress($scope.item).then((result) => {
            if(typeof result.data == 'object' && result.data.length > 0){
              let addressMsg = orderService.constructAddressMessage(result.data[0].components, $scope.item);
              if(!addressMsg[0] || addressMsg[0] && confirm(addressMsg[1])){
                if(addressMsg.length > 1){
                  $scope.item.streetAddress = addressMsg[2];
                  $scope.item.city = addressMsg[3];
                  $scope.item.state = addressMsg[4];
                  $scope.item.zipCode = addressMsg[5];
                }
                $scope.IsSubmit = true;
                orderService.createOrder($scope.item).then((res) => {
                  if (res.data == "created") {
                    $state.go("orders");
                  } else alert("Create failed, please check inputs!");
                }).catch((err) => {
                  console.error(err);
                  alert("Create failed, please try again!");
                });
              }
            } else alert("Address is not valid! Please enter valid Street Address, City, State and Zipcode.");
          }).catch((err) => {
            console.error(err);
          });
        } else alert("Create failed, please check inputs!");
      }
    } else if ($state.current.name == "detailsOrder") {
      $rootScope.Title = "Order Details";
      const id = $stateParams.id;
      orderService.getOrder(id).then((res) => {
        $scope.item = res.data;
        productService.getProduct(res.data.product).then((product) => {
          $scope.item.productData = product.data;
        }).catch((err) => {
          console.error(err);
          alert("Couldn't find corresponding product for this order, please try again!");
        });
      }).catch((err) => {
        console.error(err);
        alert("Couldn't find order details, please try again!");
      });
    }
  }
}