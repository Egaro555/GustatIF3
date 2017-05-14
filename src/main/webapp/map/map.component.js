// Register the `restaurantList` component on the `restaurantList` module,
angular.
    module('appGustatIF').
    component('map', {
        controllerAs : 'mapCMD',
        templateUrl: 'map/map.template.html',
        controller: function RestaurantListController($stateParams,$scope,$http,$state,userService) {
            var ctrl = this;
            this.loading = 1;
            this.livreurs;
            this.restaurants;
            mapControler.clean();
            this.loadLivreur = function(){
                ctrl.loading++;
                $http({
                    method: 'GET',
                    url: '/service/findAllLivreurs'
                }).then(function successCallback(reponse){
                    if(reponse.data.livreurs){
                        ctrl.livreurs = reponse.data.livreurs;
                        for(var l in ctrl.livreurs){
                            var livreur = livreurs[l];
                            if(livreur.type=="Drone"){
                                mapControler.push({drone:livreur});
                            }else if(livreur.type=="Velo"){
                                mapControler.push({livreur:livreur});
                            }else{
                                mapControler.push({other:livreur});
                            }
                        }
                    }else{
                        ctrl.err = "Une erreur est survenue lors de la validation de commande";
                    }
                },function errorCallback(response) {
                    ctrl.err = "Erreur de connexion avec le serveur! Veuillez réessayer ultérieurement";
                });
            };
            this.loadRestaurant = function(){
                ctrl.loading++;
                $http({
                    method: 'GET',
                    url: '/service/findAllLivreurs'
                }).then(function successCallback(reponse){
                    if(reponse.data.restaurants){
                        ctrl.restaurants = reponse.data.restaurants;
                        for(var r in ctrl.restaurants){
                            var restaurant = restaurants[r];
                            mapControler.push({restaurant:restaurant});
                        }
                    }else{
                        ctrl.err = "Une erreur est survenue lors de la validation de commande";
                    }
                },function errorCallback(response) {
                    ctrl.err = "Erreur de connexion avec le serveur! Veuillez réessayer ultérieurement";
                });
            };
            userService.requirLogin('gestionnaire',$scope,function(){
                ctrl.loadLivreur();
                ctrl.loadRestauranr();
                ctrl.loading --;
            });
        }
    });
//*/