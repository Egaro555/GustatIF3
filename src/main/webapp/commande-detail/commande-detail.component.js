angular.
    module('appGustatIF').
    component('commandeDetail', {
        controllerAs: 'detailCMD',
        templateUrl: 'commande-detail/commande-detail.template.html',
        controller: function RestaurantListController(commandeService,$scope) {
            var ctrl = this;
            this.loading = 1;
            this.produits = [];
            this.setQte = function(commandeItem){
                commandeItem.load = true;
                commandeService.setProduit(commandeItem.produit,commandeItem.qte_tmp,function(res){
                    if(res.success){
                        commandeItem.edit = false;
                    }else if(res.err){
                        ctrl.err = res.err;
                    }
                    commandeItem.load = false;
                });
            }
            test5 = false;
            var refreachProduits = function(produits){
                for(var i=0;i<produits.length;i++){
                    var target = null;
                    for(var j=0;j<ctrl.produits.length;j++){
                        if(produits[i].produit.id==ctrl.produits[j].produit.id){
                            target = ctrl.produits[j];
                            break;
                        }
                    }
                    if(target){
                        target.qte = produits[i].qte;
                    }else{
                        ctrl.produits.push(produits[i]);
                    }
                }
                if(produits.length < ctrl.produits){
                    ctrl.produits=ctrl.produits.filter(function(prodFilted){
                        for(var j=0;j<produits.length;j++){
                            if(produits[j].id==prodFilted.id){
                                return true;
                            }
                        }
                        return false;
                    });
                }
            }
            this.getTotal = function(){
                var total = 0;
                for(var i=0;i<ctrl.produits.length;i++){
                    total += ctrl.produits[i].produit.prix * ctrl.produits[i].qte;
                }
                return total;
            };
            commandeService.onLoad($scope,function(){
                test2 = commandeService.getProduits();
                test3 = commandeService;
                refreachProduits(commandeService.getProduits());
                console.log("onLoad commande-detail");
                ctrl.loading--;
            });
            commandeService.onUpdate($scope,function(){
                refreachProduits(commandeService.getProduits());
            });
            commandeService.onUnload($scope,function(){
                this.loading++;
                ctrl.produits = [];
            });
            
            test = this;
            console.log(this);
        },
    })
    .factory('commandeService', function($state,$http,$rootScope,userService) {
        var card = null;
        var cardLoaded = false;
        var onRefresh = false;
        var onUpdate = function(scope,callback ){
            var handler = $rootScope.$on('commande-editor-update-event', callback);
            scope.$on('$destroy', handler);
        };
        var onUnload = function(scope,callback ){
            var handler = $rootScope.$on('commande-editor-unLoad-event', callback);
            scope.$on('$destroy', handler);
        };
        var setProduit = function(produit, qte, callback){
            var produitId;
            if(typeof produit == "number"){
                produitId = produit;
            }else{
                produitId = produit.id;
            }
            $http({
                method: 'GET',
                url: '/service/setProduitCommande',
                params:{p:produitId,qte:qte}
            }).then(function successCallback(reponse){
                if(reponse.data.commande){
                    card = reponse.data.commande;
                    test10 = reponse;
                    if(cardLoaded){
                        $rootScope.$emit('commande-editor-update-event');
                    }else{
                        cardLoaded = true;
                        $rootScope.$emit('commande-editor-load-event');
                    }
                    if(typeof callback == "function")
                        callback({success:true});
                }else{
                    if(typeof callback == "function")
                        callback({err:"La commande na pas pu étre changer, merci de bien vouloir recharger la page"});
                }
            }, function errorCallback(response) {
                if(typeof callback == "function")
                    callback({err:"Le service est ectuellement indisponible"});
            });
        }
        var reloadCard = function(callback){
            $http({
                method: 'GET',
                url: '/service/getCommande'
            }).then(function successCallback(reponse){
                if(reponse.data.commande){
                    card = reponse.data.commande;
                    if(cardLoaded){
                        $rootScope.$emit('commande-editor-update-event');
                    }else{
                        cardLoaded = true;
                        $rootScope.$emit('commande-editor-load-event');
                    }
                }
                if(typeof callback == "function")
                    callback();
            }, function errorCallback(response) {
                if(typeof callback == "function")
                    callback();
            });
        }
        reloadCard();
        var onLoad = function(scope,callback ){
            if(cardLoaded){
                callback();
            }
            var handler= $rootScope.$on('commande-editor-load-event', callback);
            scope.$on('$destroy', handler);
        }
        var addProduit = function(produit, qte, callback){
            for(var i=0;i<card.produitCommande.length;i++){
                if(card.produitCommande[i].id=produit.id){
                    return setProduit(produit,qte + card.produitCommande[i].qte,callback)
                }
            }
            return setProduit(produit,qte,callback);
        }
        var getProduits = function(){
            return card.produitCommande;
        }
        var getCommande = function(){
            return card;
        }
        var isLoad = function(){
            return cardLoaded;
        }
        userService.onLogout($rootScope,function(){
            cardLoaded = false; 
            $rootScope.$emit('commande-editor-unload-event'); 
        });
        userService.onLogin($rootScope,function(){
            reloadCard();
        });
        
        
        return {
            onUpdate:onUpdate,
            onLoad:onLoad,
            onUnload:onUnload,
            addProduit:addProduit,
            setProduit:setProduit,
            getProduits:getProduits,
            getCommande:getCommande,
            reloadCard:reloadCard,
            isLoad:isLoad
        };
    });