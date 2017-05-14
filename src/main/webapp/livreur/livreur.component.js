angular.
    module('appGustatIF').
    component('livreur', {
        controllerAs: 'livreurCMD',
        templateUrl: 'livreur/livreur.template.html',
        controller: function LivreurController($stateParams,$http,$state,userService,$scope,commandeService) {
            var ctrl = this;
            this.loading = 1;
            this.commandeCharger = false;
            this.hasCommande = false;
            this.loadRestaurant = function(){
                ctrl.loading++;
                $http({
                    method: 'GET',
                    url: '/service/getRestaurant',
                    params:{id:ctrl.commande.restaurant}
                }).then(function successCallback(reponse){
                    if(reponse.data.restaurant){
                        ctrl.restaurant = reponse.data.restaurant;
                    }else{
                        ctrl.commandeCharger = false;
                        ctrl.err = "Une erreur imprévue est survenue, veuillez recharger la page";
                    }
                    ctrl.loading--;
                },function errorCallback(response) {
                    ctrl.err = "Erreur de connexion avec le serveur ! Veuillez réessayer ultérieurement";
                    ctrl.commandeCharger = false;
                    ctrl.loading--;
                });
            }
            this.loadClient = function(){
                ctrl.loading++;
                $http({
                    method: 'GET',
                    url: '/service/getClient',
                    params:{id:ctrl.commande.client}
                }).then(function successCallback(reponse){
                    if(reponse.data.client){
                        ctrl.client = reponse.data.client;
                    }else{
                        ctrl.commandeCharger = false;
                        ctrl.err = "Une erreur imprévue est survenue, veuillez recharger la page";
                    }
                    ctrl.loading--;
                },function errorCallback(response) {
                    ctrl.commandeCharger = false;
                    ctrl.err = "Erreur de connexion avec le serveur ! Veuillez réessayer ultérieurement";
                    ctrl.loading--;
                });
            }
            this.loadCommande = function(){
                ctrl.loading++;
                $http({
                    method: 'GET',
                    url: '/service/getCommandeLivreur'
                }).then(function successCallback(reponse){
                    if(reponse.data.result===false){
                        ctrl.commandeCharger = true;
                    }else if(reponse.data.commande){
                        ctrl.commande = reponse.data.commande;
                        ctrl.hasCommande = true;
                        ctrl.commandeCharger = true;
                        ctrl.loadClient();
                        ctrl.loadRestaurant();
                    }else{
                        ctrl.err = "Une erreur imprévue est survenue, veuillez recharger la page";
                    }
                    ctrl.loading--;
                },function errorCallback(response) {
                    ctrl.err = "Erreur de connexion avec le serveur ! Veuillez réessayer ultérieurement";
                    ctrl.loading--;
                });
            };
            this.validerCommande = function(){
                if(ctrl.loadValidation)return;
                ctrl.loadValidation = true;
                $http({
                    method: 'GET',
                    url: '/service/cloturerCommandeLivreur',
                    params:{l:userService.getUser().id,c:ctrl.commande.numCommande}
                }).then(function successCallback(reponse){
                    if(reponse.data.result){
                        ctrl.finish = true;
                    }else{
                        ctrl.err = "Une erreur est survenue lors la validation de commande";
                    }
                    ctrl.loadValidation = false;
                },function errorCallback(response) {
                    ctrl.err = "Erreur de connexion avec le serveur ! Veuillez réessayer ultérieurement";
                    ctrl.loadValidation = false;
                });
            }
            // MAINE OF EDITOR :
            testl = userService
            userService.requirLogin('livreur',$scope,function(){
                ctrl.loadCommande();
                ctrl.loading --; 
            });
        }
    })