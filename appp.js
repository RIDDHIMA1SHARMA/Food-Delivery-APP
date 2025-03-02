var app = angular.module("foodApp", []);

app.controller("FoodController", function ($scope, $http) {
    $scope.foods = [];
    $scope.cart = [];
    $scope.customerName = "";

    // Fetch available food items
    $http.get("http://localhost:5000/foods")
        .then(function (response) {
            $scope.foods = response.data;
        });

    // Add to Cart
    $scope.addToCart = function (food) {
        $scope.cart.push(food);
    };

    // Remove from Cart
    $scope.removeFromCart = function (index) {
        $scope.cart.splice(index, 1);
    };

    // Calculate total price
    $scope.getTotal = function () {
        return $scope.cart.reduce((total, item) => total + item.price, 0);
    };

    // Place Order
    $scope.placeOrder = function () {
        if ($scope.customerName === "" || $scope.cart.length === 0) {
            alert("Please enter your name and add items to the cart!");
            return;
        }

        const orderData = {
            customerName: $scope.customerName,
            items: $scope.cart,
            total: $scope.getTotal()
        };

        $http.post("http://localhost:5000/order", orderData)
            .then(function (response) {
                alert(response.data.message);
                $scope.cart = [];
                $scope.customerName = "";
            });
    };
});
