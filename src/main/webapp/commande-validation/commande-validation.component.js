angular.
    module('appGustatIF').
    component('commandeValidation', {
        controllerAs: 'validationCMD',
        templateUrl: 'commande-validation/commande-validation.template.html',
        controller: function RestaurantListController($stateParams,$state) {
            this.loading = false;
            this.restaurantId = $stateParams.restaurantId;
            this.restaurant = {
                        id:0,
                        name: 'Resto del la Muerta',
                        adresse: '5 Rue des cadavres',
                        description: 'Un restorent ou la mort par cannibalisme arrive souvant'
                    };
            this.quantite = 1;
            this.add = function(){
                alert("NOT IMPLEMENTED !!! (commande-editor.comonent.js:l.43)");
            };
            this.setSelectedProduit= function(selectedProduit){
                this.selectedProduit = selectedProduit;
                this.quantite=1;
            };
            this.valider=function(){
                alert("Commande valider[Not implemented]");
            }
            this.annuler=function(){
                alert("Commande annuler[Not implemented]");
            }
            
            this.getLinkEditor = function(){
                return $state.href('shop',{restaurantId:this.restaurantId}); 
            }
        }
    });