/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insa.gustatif.web;

import com.insa.gustatif.metier.modele.Produit;
import com.insa.gustatif.metier.service.ServiceMetier;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Benjamin
 */
class creerProduitAction implements Action {

    @Override
    public void execute(HttpServletRequest request) {
        Produit p = new Produit(request.getParameter("denomination"), request.getParameter("description"), Double.parseDouble(request.getParameter("poids")), Double.parseDouble(request.getParameter("prix")));
        
        ServiceMetier.creerProduit(p);
    }

}
