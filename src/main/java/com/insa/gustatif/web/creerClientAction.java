/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insa.gustatif.web;

import com.insa.gustatif.metier.modele.Client;
import com.insa.gustatif.metier.service.ServiceMetier;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Benjamin
 */
class creerClientAction implements Action {

    boolean result;
    
    @Override
    public void execute(HttpServletRequest request) {
        
        Client c = new Client(request.getParameter("nom"), request.getParameter("prenom"), request.getParameter("mail"), request.getParameter("adresse"));
        
        result = ServiceMetier.creerClient(c);
    }

    public boolean getResult() {
        return result;
    }


    
}
