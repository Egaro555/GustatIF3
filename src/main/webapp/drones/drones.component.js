// Register the `restaurantList` component on the `restaurantList` module,
angular.
    module('appGustatIF').
    component('drones', {
        controllerAs : 'dronesCMD',
        templateUrl: 'drones/drones.template.html',
        controller: function RestaurantListController($scope,$http,$state,userService) {
            var ctrl = this;
            
            this.loading = 1; // 
            this.detail = {
                loading : 0,
                show : false,
                charger : false,
                data : null,
                loadClient : function(){
                    var e = ctrl.detail;
                    e.loading++;
                    $http({
                        method: 'GET',
                        url: '/service/getClient',
                        params: {id:e.commande.client}
                    }).then(function successCallback(reponse){
                        if(reponse.data.client){
                            e.client = reponse.data.client;
                        }else{
                            e.charger = false;
                            e.err = "Une erreur imprevue est survenu";
                        }
                        e.loading--;
                    },function errorCallback(response) {
                        e.charger = false;
                        e.err = "Erreur de connexion avec le server! Veuiller resseiller ulterieurment";
                        e.loading--;
                    });
                    
                },
                loadRestaurant : function(){
                    var e = ctrl.detail;
                    e.loading++;
                    $http({
                        method: 'GET',
                        url: '/service/getRestaurant',
                        params: {id:e.commande.restaurant}
                    }).then(function successCallback(reponse){
                        if(reponse.data.restaurant){
                            e.restaurant = reponse.data.restaurant;
                        }else{
                            e.charger = false;
                            e.err = "Une erreur imprevue est survenu";
                        }
                        e.loading--;
                    },function errorCallback(response) {
                        e.charger = false;
                        e.err = "Erreur de connexion avec le server! Veuiller resseiller ulterieurment";
                        e.loading--;
                    });
                    
                },
                openDetail : function(commandeId){
                    var e = ctrl.detail;
                    e.show=true;
                    e.charger=false;
                    e.loading++;
                    $http({
                        method: 'GET',
                        url: '/service/getCommandeById',
                        params: {id:commandeId}
                    }).then(function successCallback(reponse){
                        if(reponse.data.commande){
                            e.charger = true;
                            e.commande = reponse.data.commande;
                            e.loadRestaurant();
                            e.loadClient();
                        }else{
                            e.err = "Une erreur imprevue est survenu";
                        }
                        e.loading--;
                    },function errorCallback(response) {
                        e.err = "Erreur de connexion avec le server! Veuiller resseiller ulterieurment";
                        e.loading--;
                    });
                }
            }
            this.dronesCharger = false;
            this.drones = [];
            
            this.selectedDrone;
            
            this.loadDrone = function(){
                ctrl.loading++;
                $http({
                    method: 'GET',
                    url: '/service/findAllDrones'
                }).then(function successCallback(reponse){
                    if(reponse.data.livreurs){
                        ctrl.dronesCharger = true;
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
            
            this.detailCommande = function(){
                ctrl.detail.openDetail(ctrl.selectedDrone.cmdeEnCours);
            };
            
            userService.requirLogin('gestionnaire',$scope,function(){
                ctrl.loadDrone();
                ctrl.loading --;
            });
        }
    });
//*/