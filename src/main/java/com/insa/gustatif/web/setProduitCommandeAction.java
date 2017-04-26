/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insa.gustatif.web;

import com.insa.gustatif.metier.modele.Commande;
import com.insa.gustatif.metier.modele.Produit;
import com.insa.gustatif.metier.modele.ProduitCommande;
import com.insa.gustatif.metier.modele.Restaurant;
import com.insa.gustatif.metier.service.ServiceMetier;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Benjamin
 */
class setProduitCommandeAction implements Action {

    boolean result;
    HttpSession session;

    setProduitCommandeAction(HttpSession _session) {
        session = _session;
    }

    @Override
    public void execute(HttpServletRequest request) {

        result = false;

        Commande c = (Commande) session.getAttribute("commande");

        Produit p = ServiceMetier.getProduitById(Long.parseLong(request.getParameter("p")));

        if (p != null && c != null) {

            ProduitCommande pc = null;

            for (ProduitCommande produitCommande : c.getProduitCommande()) {

                if (produitCommande.getProduit().getId() == p.getId()) {
                    pc = produitCommande;
                    break;
                }

            }

            if (pc != null) {

                ServiceMetier.modifierQuantiteProduit(c, pc, Integer.parseInt(request.getParameter("qte")));

            } else {
                
                pc = new ProduitCommande(p, Integer.parseInt(request.getParameter("qte")));
                ServiceMetier.addProduitCommande(c, pc);
                
            }
            
            session.setAttribute("commande", c);

            result = true;
        }

    }

    public boolean getResult() {
        return result;
    }

}
