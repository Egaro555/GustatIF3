/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insa.gustatif.web;

import com.insa.gustatif.metier.modele.Livreur;
import com.insa.gustatif.metier.service.ServiceMetier;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Benjamin
 */
class connexionLivreurAction implements Action {

    Livreur livreur;
    
    @Override
    public void execute(HttpServletRequest request) {
        livreur = ServiceMetier.connexionLivreur(Long.parseLong(request.getParameter("idLivreur")));
    }

    public Livreur getLivreur() {
        return livreur;
    }
    
    
    
}
