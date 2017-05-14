angular.
    module('appGustatIF').
    component('wgifHeader', {
        controllerAs: 'headerCMD',
        templateUrl: 'wgif-header/wgif-header.template.html',
        controller: function RestaurantListController($scope,$rootScope,$stateParams,$state,userService) {
            var ctrl = this;
            this.loading = true;
            this.isLogin = false;
            var updateBtns = function(newState, newParams){
                console.log(newState, newParams,$state.href('shop',newParams.restaurantId));
                if(!userService.isLogin()){
                    ctrl.btns = "Gustat'IF : Livraison almentaire à domicile";
                }else if(userService.getType()=="client"){
                    ctrl.btns = [
                        {
                            titre:"Restaurants",
                            active:(newState=='restaurant'),
                            href:$state.href('restaurant')
                        },
                        {
                            titre:"Commande",
                            active:(newState=='shop'),
                            href:(newParams.restaurantId?$state.href('shop')+newParams.restaurantId:null)
                        },
                        {
                            titre:"Validation",
                            active:(newState=='validation'),
                            href:(newParams.restaurantId?$state.href('validation')+newParams.restaurantId:null)
                        }
                    ];
                }else if(userService.getType()=="gestionnaire"){
                    ctrl.btns = [
                        {
                            titre:"Drones",
                            active:(newState=='gestionnaire'&&newParams.type&&newParams.type=="Drones"),
                            href:$state.href('gestionnaire',{type:"Drones"})
                        },
                        {
                            titre:"Vélo",
                            active:(newState=='gestionnaire'&&newParams.type&&newParams.type=="Velos"),
                            href:$state.href('gestionnaire',{type:"Velos"})
                        },
                        {
                            titre:"Carte",
                            active:(newState=='map'),
                            href:$state.href('map')
                        }
                    ];
                }else{
                    delete ctrl.btns;
                }
                ctrl.btnsType = typeof ctrl.btns;
            }
            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams){
                    updateBtns(toState.name, toParams);
                });
            
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
                updateBtns($state.current.name, $state.params);
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