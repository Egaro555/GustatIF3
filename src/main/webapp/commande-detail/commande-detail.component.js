angular.
    module('appGustatIF').
    component('commandeDetail', {
        controllerAs: 'detailCMD',
        templateUrl: 'commande-detail/commande-detail.template.html',
        controller: function RestaurantListController() {
            this.ed=this.ed;
            console.log(this.ed);
            this.loading = false;
            this.produits = 
            [
                {
                    id : 0,
                    name : "Epanard en boite",
                    description : "De la merde en boite",
                    prix : 0.01,
                    quantite : 3,
                },
                {
                    id : 2,
                    name : "Sucette",
                    description : "Pour les petits mais pas les grands!",
                    prix : 1.23,
                    quantite : 25,
                },
                {
                    id : 3,
                    name : "Vin blanc",
                    description : "vin rouge acheter sur le bon coin",
                    prix : 8,
                    quantite : 1,
                }
            ];            
            this.getTotal = function(){
                var total = 0;
                for(var i=0;i<this.produits.length;i++){
                    total += this.produits[i].prix * this.produits[i].quantite;
                }
                return total;
            };
        },
        truc : function(){
            $http.get("")
        }
    });