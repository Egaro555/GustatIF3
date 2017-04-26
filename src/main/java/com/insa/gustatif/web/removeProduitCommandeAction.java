/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insa.gustatif.web;

import com.insa.gustatif.metier.modele.Commande;
import com.insa.gustatif.metier.modele.ProduitCommande;
import com.insa.gustatif.metier.service.ServiceMetier;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Benjamin
 */
class removeProduitCommandeAction implements Action {

    boolean result;
    HttpSession session;

    removeProduitCommandeAction(HttpSession _session) {

        session = _session;
    }

    @Override
    public void execute(HttpServletRequest request) {

        result = false;

        Commande c = (Commande) session.getAttribute("commande");

        if (c != null) {

            ProduitCommande pc = null;

            for (ProduitCommande produitCommande : c.getProduitCommande()) {

                if (produitCommande.getProduit().getId() == Long.parseLong(request.getParameter("p"))) {

                    pc = produitCommande;
                    break;
                }

            }

            if (pc != null) {
                ServiceMetier.removeProduitCommande(c, pc);
                
                session.setAttribute("commande", c);
                
                result = true;
            }

        }

    }

    public boolean getResult() {
        return result;
    }

}
