// Register the `restaurantList` component on the `restaurantList` module,
angular.
    module('appGustatIF').
    component('login', {
        controllerAs : 'login',
        templateUrl: 'login/login.template.html',
        controller: function RestaurantListController($http,$scope, $state, userService) {
            var ctrl = this;
            console.log(this.rand);
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
            this.randCfg=function(){
                var r = Math.round(Math.random()*10000);
                ctrl.nom='nom'+r;
                ctrl.prenom='prenom'+r;
                ctrl.email='cfg1_'+r+'@free.fr';
                ctrl.livraison=Math.round(r/100)+' Avenue albert einstein';
                ctrl.codepostal='69100';
                ctrl.ville='Villeurbanne';
            }
            userService.onLoad($scope, checkRediraction);
            userService.onLogin($scope, function(){userService.redirect("lastState");});
            this.connexion = function(){
                ctrl.loginLoading = true;
                ctrl.err = null;
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
                    ctrl.loginLoading = false;
                    if(data.err){
                        ctrl.err = data.err;
                    }
                })
            }
            this.inscription = function(){
                var errs=[];
                if(typeof ctrl.email != "string" || !(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(ctrl.email))
                    errs.push("email invalide");
                if(typeof ctrl.nom != "string" || ctrl.nom.length<3)
                    errs.push("nom invalide");
                if(typeof ctrl.prenom != "string" || ctrl.prenom.length<3)
                    errs.push("prenom invalide");
                if(typeof ctrl.livraison != "string" || ctrl.livraison.length<3)
                    errs.push("adresse invalide");
                if(typeof ctrl.ville != "string" || !(/^[A-z]+$/).test(ctrl.ville))
                    errs.push("nom de ville invalide");
                if(typeof ctrl.codepostal != "string" || !(/^[0-9]{5}$/).test(ctrl.codepostal))
                    errs.push("code postale invalide");
                if(errs.length){
                    ctrl.err = errs.join(" , ");
                    return;
                }
                ctrl.err = null;
                ctrl.inscriptionLoading = true;
                var dataIscription = {
                    'nom':ctrl.nom,
                    'prenom':ctrl.prenom,
                    'mail':ctrl.email,
                    'adresse':ctrl.livraison+", "+ctrl.codepostal+" "+ctrl.ville//145 r Marcel Mérieux, 69007 Lyon
                };
                $http({
                    method: 'GET',
                    url: '/service/creerClient',
                    params: dataIscription
                }).then(function successCallback(reponse){ 
                    if(reponse.data.result){
                        ctrl.inscriptionSuccess = true;
                    }else{
                        ctrl.err="Inscription imposible";
                    }
                    ctrl.inscriptionLoading = false;
                }, function errorCallback(response) {
                    ctrl.err="Erreur de connexion avec le servic demander. Reeseyer plus tard.";
                    ctrl.inscriptionLoading = false;
                });
            }
        }
    })
    .factory('userService', function($state,$http,$rootScope) {
        var is_login = false;
        var loading = 1;
        var userType = null;
        var user = {};
        var savedStat = null;
        var verifiLogin = function(sendEvent,callback){
            $http({
                method: 'GET',
                url: '/service/getUtilisateur'
            }).then(function successCallback(reponse){ 
                if(reponse.data.client){
                    if(!is_login || userType != "client" || user.id != reponse.data.client.id){
                        userType = "client";
                        user = reponse.data.client;
                        is_login = true;
                        if(sendEvent)
                            $rootScope.$emit('login-event');
                    }
                }else if(reponse.data.livreur){
                    if(!is_login || userType != "livreur" || user.id != reponse.data.livreur.id){
                        userType = "livreur";
                        user = reponse.data.livreur;
                        is_login = true;
                        if(sendEvent)
                            $rootScope.$emit('login-event');
                    }
                }else if(reponse.data.gestionnaire){
                    if(!is_login || userType != "gestionnaire" || user.id != reponse.data.gestionnaire.id){
                        userType = "gestionnaire";
                        user = reponse.data.gestionnaire;
                        is_login = true;
                        if(sendEvent)
                            $rootScope.$emit('login-event');
                    }
                }else if(reponse.data.result === false && is_login){
                    is_login = false;
                    $rootScope.$emit('logout-event');
                }
                callback();
            }, function errorCallback(response) {
                callback();
            });
        }
        verifiLogin(false,function(){
                loading --;
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
            });
        };
        (function(){
            var f={};
            f.callback=function(){
                //setTimeout(verifiLogin,2000,true,f.callback);
            };
            f.callback();
        })();
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
