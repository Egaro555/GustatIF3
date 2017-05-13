// Register the `restaurantList` component on the `restaurantList` module,
angular.
    module('appGustatIF').
    component('drones', {
        controllerAs : 'dronesCMD',
        templateUrl: 'restaurant-liste/restaurant-liste.template.html',
        controller: function RestaurantListController($scope,$http,$state,userService) {
            var ctrl = this;
            
            this.loading = 1; // 
            
            this.restaurantesCharger = false;
            this.restaurantes = [];
            
            this.selectedRestaurante;
            
            this.loadDrone = function(){
                ctrl.loading++;
                $http({
                    method: 'GET',
                    url: '/service/findAllRestaurants'
                }).then(function successCallback(reponse){
                    if(reponse.data.livreurs){
                        ctrl.droneCharger = true;
                        ctrl.drones = reponse.data.livreurs;
                    }else{
                        ctrl.err = "Une erreur est survenu a la validation de commande";
                    }
                    ctrl.loading--;
                },function errorCallback(response) {
                    ctrl.err = "Erreur de connexion avec le server! Veuiller resseiller ulterieurment";
                    ctrl.loading--;
                });
            };
            
            this.getLinkSelectedRestaurante = function(){
                    return (this.selectedRestaurante ?
                            $state.href('shop',{restaurantId:this.selectedRestaurante.id}) :
                            "");
            };
            
            userService.requirLogin('gestionnaire',$scope,function(){
                ctrl.loadDrone();
                ctrl.loading --;
            });
        }
    });
//*/