/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insa.gustatif.web;

/**
 *
 * @author Benjamin
 */
public enum Auth {
    NONE,
    GESTIONNAIRE,
    LIVREUR_OR_GESTIONNAIRE,
    CLIENT,
    LIVREUR,
    CLIENT_OR_LIVREUR, CLIENT_OR_LIVREUR_OR_GESTIONNAIRE;

    @Override
    public String toString() {
        switch (this) {
            case NONE:
                return "None";
            case GESTIONNAIRE:
                return "Auth as Gestionnaire";
            case CLIENT:
                return "Auth as Client";
            case LIVREUR:
                return "Auth as Livreur";
            case LIVREUR_OR_GESTIONNAIRE:
                return "Auth as Livreur or Gestionnaire";
            case CLIENT_OR_LIVREUR:
                return "Auth as Client or Livreur";
            case CLIENT_OR_LIVREUR_OR_GESTIONNAIRE:
                return "Auth as Client or Livreur or Gestionnaire";
        }
        return super.toString(); //To change body of generated methods, choose Tools | Templates.
    }
}
