/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insa.gustatif.web;

import com.insa.gustatif.metier.modele.Commande;
import com.insa.gustatif.metier.modele.Livreur;
import com.insa.gustatif.metier.service.ServiceMetier;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Benjamin
 */
class getCommandeLivreurAction implements Action {

    Commande commande = null;
    Livreur user;

    public getCommandeLivreurAction(Livreur livreur) {
        user = ServiceMetier.findLivreurById(livreur.getIdLivreur());
    }

    @Override
    public void execute(HttpServletRequest request) {
        if (user != null) {
            commande = user.getCmdeEnCours();
        }
    }

    Commande getResult() {
        return commande;
    }

}
