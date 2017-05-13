// Register the `restaurantList` component on the `restaurantList` module,
angular.
    module('appGustatIF').
    component('restaurantListe', {
        controllerAs : 'restaurantes',
        templateUrl: 'restaurant-liste/restaurant-liste.template.html',
        controller: function RestaurantListController($scope,$http,$state,userService) {
            var ctrl = this;
            
            this.loading = 1; // 
            
            this.restaurantesCharger = false;
            this.restaurantes = [];
            
            this.selectedRestaurante;
            
            this.loadRestaurante = function(){
                ctrl.loading++;
                $http({
                    method: 'GET',
                    url: '/service/findAllRestaurants'
                }).then(function successCallback(reponse){
                    if(reponse.data.restaurants){
                        ctrl.restaurantesCharger = true;
                        ctrl.restaurantes = reponse.data.restaurants;
                    }
                    ctrl.loading--;
                },function errorCallback(response) {
                    ctrl.loading--;
                });
            };
            
            this.getLinkSelectedRestaurante = function(){
                    return (this.selectedRestaurante ?
                            $state.href('shop',{restaurantId:this.selectedRestaurante.id}) :
                            "");
            };
            
            userService.requirLogin('client',$scope,function(){
                ctrl.loadRestaurante();
                ctrl.loading --;
            });
        }
    });
//*/