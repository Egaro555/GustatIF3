/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insa.gustatif.web;

import com.insa.gustatif.metier.modele.Livreur;
import com.insa.gustatif.metier.modele.LivreurVelo;
import com.insa.gustatif.metier.service.ServiceMetier;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Benjamin
 */
class creerLivreurVeloAction implements Action {

    @Override
    public void execute(HttpServletRequest request) {
        
        Livreur l = new LivreurVelo(Double.parseDouble(request.getParameter("chargeMaxi")), request.getParameter("adr"), request.getParameter("mail"), request.getParameter("nom"), request.getParameter("prenom"));
        
        ServiceMetier.creerLivreur(l);
    }
    
}
