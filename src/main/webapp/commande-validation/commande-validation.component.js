angular.
    module('appGustatIF').
    component('commandeValidation', {
        controllerAs: 'validationCMD',
        templateUrl: 'commande-validation/commande-validation.template.html',
        controller: function RestaurantListController($state,$http,$scope, $stateParams,$state,userService,commandeService) {
            var ctrl = this;
            this.loading = 1;
            this.loadingValidation = false;
            this.restaurantId = $stateParams.restaurantId;
            this.finish = false;
            this.lockValidation = false;
            this.adresse;
            this.restaurant;
            this.cardIsEmpty;
            commandeService.onUpdate($scope,function(){
                ctrl.cardIsEmpty = commandeService.isEmpty();
            });
            commandeService.onLoad($scope,function(){
                ctrl.cardIsEmpty = commandeService.isEmpty();
            });
            
            this.gotoHome = function(){
                $state.go('restaurant');
            }
            this.loadRestaurant = function(){
                ctrl.loading++;
                $http({
                    method: 'GET',
                    url: '/service/getRestaurant',
                    params : {id:this.restaurantId}
                }).then(function successCallback(reponse){
                    if(reponse.data.restaurant){
                        ctrl.restaurant = reponse.data.restaurant;
                    }else{
                        ctrl.err="Une erreur imprevue est suvenu!";
                        ctrl.lockValidation = true;
                    }
                    ctrl.loading--;
                },function errorCallback(response) {
                    ctrl.err="Un service distant n'est pas acécible actuelement. Veuillez resseyer plus tard!";
                    ctrl.lockValidation = true;
                    ctrl.loading--;
                });
            }
            
            this.quantite = 1;
            
            this.valider=function(){
                if(ctrl.lockValidation)return;
                ctrl.lockValidation = true;
                ctrl.loadingValidation = true;
                $http({
                    method: 'GET',
                    url: '/service/traiterCommande',
                }).then(function successCallback(reponse){
                    if(reponse.error){
                        ctrl.err="une erreur imprevue est suvenu!";
                        ctrl.lockValidation = false;
                    }else if(reponse.data.result){
                        ctrl.finish=true;
                    ctrl.loadingValidation = false;
                        commandeService.reloadCard();
                    }else{
                        ctrl.err="La commande n'a pas pu étre valider!"
                        ctrl.lockValidation = false;
                        ctrl.loadingValidation = false;
                    }
                },function errorCallback(response) {
                    ctrl.err="Un service distant n'est pas acécible actuelement. Veuillez resseyer plus tard!";
                    ctrl.lockValidation = false;
                    ctrl.loadingValidation = false;
                });
            }
            this.annuler=function(){
                if(ctrl.lockValidation)return;
                commandeService.cleanCard();
                $state.go('restaurant');
            }
            
            this.getLinkEditor = function(){
                return $state.href('shop',{restaurantId:this.restaurantId}); 
            }
            
            
            // MAINE OF VALIDATION :
            userService.requirLogin('client',$scope,function(){
                ctrl.loadRestaurant();
                ctrl.adresse = userService.getUser().addresse;
                ctrl.loading --; 
            });
        }
    });