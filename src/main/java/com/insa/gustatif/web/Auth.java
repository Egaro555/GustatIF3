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
    CLIENT,
    LIVREUR,
    CLIENT_OR_LIVREUR;

    @Override
    public String toString() {
        switch (this) {
            case NONE:
                return "None";
            case CLIENT:
                return "Auth as Client";
            case LIVREUR:
                return "Auth as Livreur";
            case CLIENT_OR_LIVREUR:
                return "Auth as Client or Livreur";
        }
        return super.toString(); //To change body of generated methods, choose Tools | Templates.
    }
}
