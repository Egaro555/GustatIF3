// Register the `restaurantList` component on the `restaurantList` module,
angular.
    module('appGustatIF').
    component('login', {
        controllerAs : 'login',
        templateUrl: 'login/login.template.html',
        controller: function RestaurantListController($timeout,$state) {
            this.loading = false;
            this.connexion = function(){
                $state.go('restaurant');
            }
            this.inscription = function(){
                alert("inscription[Not implemented]");
            }
        }
    })
//*/