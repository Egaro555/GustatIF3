// Register the `restaurantList` component on the `restaurantList` module,
angular.
    module('appGustatIF').
    component('login', {
        controllerAs : 'login',
        templateUrl: 'login/login.template.html',
        controller: function RestaurantListController($scope, $state, userService) {
            var ctrl = this;
            this.loading = true;
            if(!this.user_type){
                this.user_type='client';
            }
            var checkRediraction = function(){
                if(userService.isLogin()){
                    switch(userService.getType()){
                        case "client":
                            $state.go('restaurant');
                            break;
                        case "livreur":
                            $state.go('livreur');
                            break;
                        case "gestionnaire":
                            $state.go('gestionnaire',{type:"Drones"});
                    }
                }else{
                    ctrl.loading = false;
                }
            };
            userService.onLoad($scope, checkRediraction);
            userService.onLogin($scope, function(){userService.redirect("lastState");});
            this.connexion = function(){
                var dataConnexion;
                switch(this.user_type){
                    case "client":
                        dataConnexion = {email: ctrl.email, idClient : ctrl.mdp };
                        break;
                    case "livreur":
                        dataConnexion = {idLivreur : ctrl.idLivreur };
                        break;
                    case "gestionnaire":
                        dataConnexion = {};
                        break;
                }
                userService.login(this.user_type,dataConnexion,function(data){
                    if(data.err){
                        ctrl.err = data.err;
                    }
                })
            }
            this.inscription = function(){
                alert("inscription[Not implemented]");
            }
        }
    })
    .factory('userService', function($state,$http,$rootScope) {
        var is_login = false;
        var loading = true;
        var userType = null;
        var user = {};
        var savedStat = null;
        $http({
            method: 'GET',
            url: '/service/getUtilisateur'
        }).then(function successCallback(reponse){ 
            loading = false;
            if(reponse.data.client){
                userType = "client";
                user = reponse.data.client;
                is_login = true;
            }else if(reponse.data.livreur){
                userType = "livreur";
                user = reponse.data.livreur;
                is_login = true;
            }else if(reponse.data.gestionnaire){
                userType = "gestionnaire";
                user = reponse.data.gestionnaire;
                is_login = true;
            }
            $rootScope.$emit('login-load-event');
        }, function errorCallback(response) {
            loading = false;
            $rootScope.$emit('login-load-event');
        });
        var redirect= function(stat){
            if(stat == "lastState"){
                stat = savedStat;
            }
            if(stat){
                $state.go(savedStat.name,savedStat.params);
            }else{
                if(!is_login){
                    $state.go('login');
                }else if(userType == "client"){
                    $state.go('restaurant');
                }else if(userType == "livreur"){
                    $state.go('livreur');
                }else if(userType == "gestionnaire"){
                    $state.go('gestionnaire',{type:"Drones"});
                }
            }
        }
        var getUser = function(){
            return user;
        }
        var onLogin = function(scope, callback){
            var handler = $rootScope.$on('login-event', function(){callback(user)});
            scope.$on('$destroy', handler);
        }
        var onLoad = function(scope, callback){
            if(loading == false){
                callback();
            }else{
                var handler = $rootScope.$on('login-load-event', callback);
                scope.$on('$destroy', handler);
            }
        }
        var onLogout = function(scope, callback){
            var handler = $rootScope.$on('logout-event', callback);
            scope.$on('$destroy', handler);
        }
        var login = function(type,connexionData, callback){
            var url;
            switch (type){
                case "client":
                    url = '/service/connexionClientEmail'
                    break;
                case "livreur":
                    url = '/service/connexionLivreur'
                    break;
                case "gestionnaire":
                    url = '/service/connexionGestionnaire'
                    break;
                default:
                    callback({err:"Erreur du navigateur inattendue !"});
                    return;
            }
            $http({
                method: 'GET',
                url: url,
                params: connexionData
            }).then(function successCallback(reponse){ 
                if(reponse.data.client){
                    userType = "client";
                    user = reponse.data.client;
                    is_login = true;
                    $rootScope.$emit('login-event');
                }else if(reponse.data.livreur){
                    userType = "livreur";
                    user = reponse.data.livreur;
                    is_login = true;
                    $rootScope.$emit('login-event');
                }else if(reponse.data.gestionnaire){
                    userType = "gestionnaire";
                    user = reponse.data.gestionnaire;
                    is_login = true;
                    $rootScope.$emit('login-event');
                }else{
                    console.log(reponse.data);
                    callback({err:"Connexion impossible ! Vérifier vos identifiants"});
                    return;
                }
                callback({success:true});
            }, function errorCallback(response) {
                callback({err:"Erreur de connexion avec le service demandé. Réessayer plus tard."});
            });
        }
        var logout = function(callback){
            $http({
                method: 'GET',
                url: '/service/deconnexion'
            });
            is_login = false;
            user = null;
            $rootScope.$emit('logout-event');
            callback();
        }
        var isLogin = function(){return is_login;}
        var getType = function(){return userType;}
        var requirLogin = function(typeLogin, scope, callback){
            onLoad(scope,function(){
                if(!is_login){
                    savedStat = {name : $state.current.name, params : $state.params} ;
                    $state.go('login');
                }else if(typeLogin!=userType){
                    redirect();
                }else{
                    onLogout(scope,function(){
                        savedStat = {name : $state.current.name, params : $state.params} ;
                        $state.go('login');
                    });
                    callback({success:true});
                }
            })
        }
        return {
            //refresh
            getUser : getUser,
            onLogin : onLogin,
            onLoad : onLoad,
            onLogout : onLogout,
            login : login,
            logout : logout,
            isLogin : isLogin,
            getType : getType,
            requirLogin : requirLogin,
            redirect:redirect
        };
    });
    
    
    /*
    .factory('NotifyingService', function($rootScope) {
    return {
        subscribe: function(scope, callback) {
            var handler = $rootScope.$on('notifying-service-event', callback);
            scope.$on('$destroy', handler);
        },

        notify: function() {
            $rootScope.$emit('notifying-service-event');
        }
    };
});
//*/