angular.
    module('appGustatIF').
    component('wgifHeader', {
        controllerAs: 'header',
        templateUrl: 'wgif-header/wgif-header.template.html',
        controller: function RestaurantListController($scope,$stateParams,$state,userService) {
            var ctrl = this;
            this.loading = true;
            this.isLogin = false;
            this.user = {};
            this.deconnexion = function(){
                userService.logout(function(){});
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