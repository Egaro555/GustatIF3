angular.
    module('appGustatIF').
    component('commandeEditor', {
        controllerAs: 'editorCMD',
        templateUrl: 'commande-editor/commande-editor.template.html',
        controller: function RestaurantListController($stateParams,$state) {
            this.loading = false;
            this.restaurantId = $stateParams.restaurantId;
            this.produits = 
            [
                {
                    id : 0,
                    name : "Epanard en boite",
                    description : "De la merde en boite",
                    prix : 0.01
                },
                {
                    id : 1,
                    name : "Gaufres",
                    description : "gaufre disponible chez votre machand de jouneaux du lundi au vendredi*. En plus la franchise est gratuite la plus pard du temp. * Uniquement si vous étes en catre",
                    prix : 1.50
                },
                {
                    id : 2,
                    name : "Sucette",
                    description : "Pour les petits mais pas les grands!",
                    prix : 1.23
                },
                {
                    id : 3,
                    name : "Vin blanc",
                    description : "vin rouge acheter sur le bon coin",
                    prix : 8
                },
                {
                    id : 4,
                    name : "Vin rouge",
                    description : "Du vin rouge couleur diable",
                    prix : 666.01
                }
            ];
            this.quantite = 1;
            this.add = function(){
                this.selectedProduit = null;
                alert("NOT IMPLEMENTED !!! (commande-editor.comonent.js:l.43)");
            };
            this.setSelectedProduit= function(selectedProduit){
                this.selectedProduit = selectedProduit;
                this.quantite=1;
            };
            this.getLinkValidation = function(){
                return $state.href('validation',{restaurantId:this.restaurantId}); 
            }
        }
    })