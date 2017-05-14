angular.
    module('appGustatIF').
    component('commandeEditor', {
        controllerAs: 'editorCMD',
        templateUrl: 'commande-editor/commande-editor.template.html',
        controller: function RestaurantListController($stateParams,$http,$state,userService,$scope,commandeService) {
            var ctrl = this;
            this.restaurantId = $stateParams.restaurantId;
            this.loading = 1;
            this.addLoading = false;
            this.quantite = 1;
            this.produitCharger = false;
            this.loadArticle = function(){
                ctrl.loading++;
                $http({
                    method: 'GET',
                    url: '/service/searchProduits',
                    params : {research:"",r:this.restaurantId}
                }).then(function successCallback(reponse){
                    if(reponse.data.produits){
                        ctrl.produitCharger = true;
                        ctrl.produits = reponse.data.produits;
                    }else{
                        ctrl.err = "Une erreur imprévue est survenue veuillez recharger la page";
                    }
                    ctrl.loading--;
                },function errorCallback(response) {
                    ctrl.err = "Erreur de connexion avec le serveur ! Veuillez réessayer ultérieurement";
                    ctrl.loading--;
                });
            };
            this.add = function(){
                ctrl.addLoading = true;
                commandeService.addProduit(ctrl.selectedProduit,ctrl.quantite,function(res){
                    if(res.success){
                        ctrl.selectedProduit = null;
                    }else if(res.err){
                        ctrl.err = res.err;
                    }
                    ctrl.addLoading = false;
                });
            };
            this.setSelectedProduit= function(selectedProduit){
                this.selectedProduit = selectedProduit;
                this.quantite=1;
            };
            this.getLinkValidation = function(){
                return $state.href('validation',{restaurantId:this.restaurantId}); 
            }
            
            // MAINE OF EDITOR :
            userService.requirLogin('client',$scope,function(){
                ctrl.loadArticle();
                ctrl.loading --; 
            });
        }
    })