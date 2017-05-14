// Register the `restaurantList` component on the `restaurantList` module,
angular.
    module('appGustatIF').
    component('livreursManagers', {
        controllerAs : 'livreursManagerCMD',
        templateUrl: 'livreurs-managers/livreurs-managers.template.html',
        controller: function RestaurantListController($stateParams,$scope,$http,$state,userService) {
            var ctrl = this;
            
            this.typeLivreur = $stateParams.type;
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
                            e.err = "Une erreur imprévue est survenue";
                        }
                        e.loading--;
                    },function errorCallback(response) {
                        e.charger = false;
                        e.err = "Erreur de connexion avec le serveur ! Veuillez réessayer ultérieurement";
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
                            e.err = "Une erreur imprévue est survenue";
                        }
                        e.loading--;
                    },function errorCallback(response) {
                        e.charger = false;
                        e.err = "Erreur de connexion avec le serveur ! Veuillez réessayer ultérieurement";
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
                            e.err = "Une erreur imprévue est survenue";
                        }
                        e.loading--;
                    },function errorCallback(response) {
                        e.err = "Erreur de connexion avec le serveur ! Veuillez réessayer ultérieurement";
                        e.loading--;
                    });
                }
            }
            this.livreursCharger = false;
            this.livreurs = [];
            
            this.selectedLivreur;
            
            this.reLoadLivreur = function(callback){
                $http({
                    method: 'GET',
                    url: '/service/findAll'+ctrl.typeLivreur
                }).then(function successCallback(reponse){
                    if(reponse.data.livreurs){
                        ctrl.livreursCharger = true;
                        ctrl.livreurs = reponse.data.livreurs;
                    }else{
                        ctrl.err = "Une erreur est survenue lors de la validation de commande";
                    }
                    if(typeof callback == "function")
                        callback();
                },function errorCallback(response) {
                    ctrl.err = "Erreur de connexion avec le serveur ! Veuillez réessayer ultérieurement";
                    if(typeof callback == "function")
                        callback();
                });
            };
            this.loadLivreur = function(){
                ctrl.loading++;
                ctrl.reLoadLivreur(function(){ctrl.loading--;});
            };
            
            this.detailCommande = function(){
                ctrl.detail.openDetail(ctrl.selectedLivreur.cmdeEnCours);
            };
            this.detailCommande = function(){
                ctrl.detail.openDetail(ctrl.selectedLivreur.cmdeEnCours);
            };
            this.cloturer = function(){
                ctrl.loadValidation = true;
                $http({
                    method: 'GET',
                    url: '/service/cloturerCommandeLivreur',
                    params:{l:ctrl.selectedLivreur.id,c:ctrl.selectedLivreur.cmdeEnCours}
                }).then(function successCallback(reponse){
                    if(reponse.data.result){
                        ctrl.finishCloture = true;
                        ctrl.detail.show = false;
                    }else{
                        ctrl.err = "Une erreur est survenue lors de la validation de commande";
                    }
                    ctrl.loadValidation = false;
                    ctrl.reLoadLivreur();
                },function errorCallback(response) {
                    ctrl.err = "Erreur de connexion avec le serveur ! Veuillez réessayer ultérieurement";
                    ctrl.loadValidation = false;
                });
                ctrl.loadLivreur();
            }
            this.setSelectedLivreur=function(newSelect){
                if(ctrl.loadValidation)return;
                ctrl.selectedLivreur = newSelect;
                ctrl.detail.show = false;
                ctrl.finishCloture = false;
            }
            userService.requirLogin('gestionnaire',$scope,function(){
                ctrl.loadLivreur();
                ctrl.loading --;
            });
        }
    });
//*/