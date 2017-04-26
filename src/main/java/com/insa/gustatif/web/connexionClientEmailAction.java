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
class connexionClientEmailAction implements Action {

    Client client;
    
    @Override
    public void execute(HttpServletRequest request) {
        client = ServiceMetier.connexionClientEmail(request.getParameter("email"), Long.parseLong(request.getParameter("idClient")));
    }

    public Client getClient() {
        return client;
    }
    
 
    
}
