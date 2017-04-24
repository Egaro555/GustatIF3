// Register the `restaurantList` component on the `restaurantList` module,
angular.
    module('appGustatIF').
    component('restaurantListe', {
        controllerAs : 'restaurantes',
        templateUrl: 'restaurant-liste/restaurant-liste.template.html',
        controller: function RestaurantListController($timeout,$cookies,$state) {
            this.loading = true;
            this.restaurantes = [];
            this.selectedRestaurante;
            this.linkSelectedRestaurante;
            
            function setSelectedRestaurante(newRestaurante){
                if(!newRestaurante)
                    return;
                this.selectedRestaurante = newRestaurante;
                $cookies.putObject('restaurante',newRestaurante);
                this.linkSelectedRestaurante = {restaurantId : newRestaurante.id};
            };
            this.setSelectedRestaurante  = setSelectedRestaurante;
            var local_ctrl = this;
            this.test = function(){
                $state.go('about');
            };
            this.getLinkSelectedRestaurante = function(){
                if(this.selectedRestaurante){
                        return $state.href('shop',{restaurantId:this.selectedRestaurante.id});    
                }else{
                    return $state.href('.');    
                }
                
            };
            $timeout(function(){// test loading annimation
                    local_ctrl.restaurantes = [
                    {
                        id:0,
                        name: 'Resto del la Muerta',
                        adresse: '5 Rue des cadavres',
                        description: 'Un restorent ou la mort par cannibalisme arrive souvant'
                    }, {
                        id:1,
                        name: 'Le Parisien',
                        adresse: '18 Avenue des journalistes.',
                        description: 'Restorent dont le parisent et forni en plus du repa!'
                    }, {
                        id:2,
                        name: 'Le Prérvert',
                        adresse: '5 Rue de la petite cocine',
                        description: 'Resever au plus de 18 ans'
                    }];
                local_ctrl.setSelectedRestaurante($cookies.getObject('restaurante'));
                local_ctrl.loading = false;
            },1000);
        }
    });
//*/