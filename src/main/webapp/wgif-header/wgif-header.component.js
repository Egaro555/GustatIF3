angular.
    module('appGustatIF').
    component('wgifHeader', {
        controllerAs: 'headerCMD',
        templateUrl: 'wgif-header/wgif-header.template.html',
        controller: function RestaurantListController($scope,$stateParams,$state,userService) {
            var ctrl = this;
            this.loading = true;
            this.isLogin = false;
            function btnStat(titre,statName,attrs,attrsComparator){
                this.getHref = function(){
                    return $state.href(statName,attrs);
                }
                this.isCurantStat=function(){
                    if(statName!=$state.current.name)return false;
                    for(var i=0;i<attrsComparator.length;i++){
                        if($state.params[attrsComparator[i].key]!=attrsComparator[i].value)return false;
                    }
                    return true;
                }
                this.getTitre=function(){
                    return titre;
                }
            }
            var btnValidation = new btnStat("Validation","validation");
            btnValidation.getHref=function(){
                return ($state.params.idRestaurant?$state.href('validation',$state.params):null);
            }
            var btnShop = new btnStat("Commande","shop");
            btnShop.getHref=function(){
                return ($state.params.idRestaurant?$state.href('shop',$state.params):null);
            }
            var btnsStatClient=[
                new btnStat("Restaurants","restaurant"),
                btnShop,
                btnValidation,
            ];
            var btnsStatGestionnaire=[
                new btnStat("Drones","gestionnaire",{type:"Drones"},[{key:"type",value:"Drones"}]),
                new btnStat("Vélo","gestionnaire",{type:"Livreurs"},[{key:"type",value:"Livreurs"}]),
                new btnStat("Carte","map"),
            ];
            
            var getBtnStatGroup =function(){
                if(!userService.isLogin())return null;
                switch(userService.getType()){
                    case "client":
                        return btnsStatClient;
                    case "gestionnaire":
                        return btnsStatGestionnaire;
                }
            }
            this.getBtnStatGroup = getBtnStatGroup;
            
            _test = this;
            _test2 = userService;
            
            this.user = {};
            this.deconnexion = function(){
                userService.logout(function(){});
            }
            this.goto=function(target){
                $state.go(target);
            }
            userService.onLoad($scope, function(){
                if(userService.isLogin()){
                    ctrl.isLogin = true;
                    ctrl.userType = userService.getType();
                    ctrl.user = userService.getUser();
                    console.log(ctrl.user);
                }
                ctrl.loading = false;
            });
            userService.onLogin($scope, function(){
                ctrl.userType = userService.getType();
                ctrl.user = userService.getUser();
                ctrl.isLogin = true;
            });
            userService.onLogout($scope, function(){
                ctrl.isLogin = false;
            });
        }
    })