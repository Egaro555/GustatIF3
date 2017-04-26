/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insa.gustatif.web;

import com.insa.gustatif.metier.modele.Commande;
import com.insa.gustatif.metier.modele.Produit;
import com.insa.gustatif.metier.modele.Restaurant;
import com.insa.gustatif.metier.service.ServiceMetier;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author Benjamin
 */
class searchProduitsAction implements Action {

    List<Produit> foundProduits;
    HttpSession session;

    public searchProduitsAction(HttpSession _session) {
        session = _session;
    }
    
    

    @Override
    public void execute(HttpServletRequest request) {

        Restaurant r = ServiceMetier.getRestaurantById(Long.parseLong(request.getParameter("r")));

        if (r != null) {
            
            Commande c = (Commande) session.getAttribute("commande");
            
            c.setRestaurant(r);
            
            session.setAttribute("commande", c);
            
            foundProduits = ServiceMetier.searchProduits(request.getParameter("research"), r);
        }
    }

    public List<Produit> getFoundProduits() {
        return (foundProduits != null) ? foundProduits : new ArrayList();
    }

}
