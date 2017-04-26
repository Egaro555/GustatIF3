/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insa.gustatif.web;

import com.insa.gustatif.metier.modele.Client;
import com.insa.gustatif.metier.modele.Commande;
import com.insa.gustatif.metier.service.ServiceMetier;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Benjamin
 */
class traiterCommandeAction implements Action {

    boolean result;
    HttpSession session;

    public traiterCommandeAction(HttpSession _session) {
        session = _session;
    }

    @Override
    public void execute(HttpServletRequest request) {

        result = false;
        
        Commande c = (Commande) session.getAttribute("commande");

        if (c.getClient() != null && c.getRestaurant() != null) {

            ServiceMetier.traiterCommande(c);

            session.setAttribute("commande", new Commande((Client) session.getAttribute("client"), new ArrayList(), null, null));

            result = true;
        }
    }

    public boolean getResult() {
        return result;
    }
    
    

}
