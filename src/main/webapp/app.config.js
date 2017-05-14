angular.module('appGustatIF')
    .config(function($stateProvider, $urlRouterProvider) {
        
        $stateProvider
            // HOME STATES AND NESTED VIEWS ========================================
            .state('restaurant', {
                url: '/restaurant/',
                template : '<restaurant-liste></restaurant-liste>',
                //component : 'restaurantListe'/*
                //templateUrl: 'restaurant-liste/restaurant-liste.template.html',
                //controller : 'restaurantListe'
            })
            .state('shop', {
                url: '/shop/restaurant/:restaurantId',
                template : '<commande-editor></commande-editor>',
            })
            .state('validation', {
                url: '/validation/restaurant/:restaurantId',
                template : '<commande-validation></commande-validation>'
            })
            .state('login', {
                url: '/login',
                template : '<login></login>'
            })
            .state('livreur', {
                url: '/livreur',
                template : '<livreur></livreur>'
            })
            .state('gestionnaire', {
                url: '/gestionnaire/:type',
                template : '<livreurs-managers></livreurs-managers>'
            })
            .state('map', {
                url: '/carte',
                template : '<map></map>'
            })
            $urlRouterProvider.otherwise(function ($injector, $location) {
                var $state = $injector.get('$state');
                $state.go('login');
                testc = $state;
                /*
                $state.go('defaultLayout.error', {
                    title: "Page not found",
                    message: 'Could not find a state associated with url "'+$location.$$url+'"'
                });
                */
            });

    });
    
$(function(){$(".body-container").css("min-height",window.innerHeight-110);});