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
class getClientAction implements Action {

    Client client = null;
    
    @Override
    public void execute(HttpServletRequest request) {

        for(Client c : ServiceMetier.findAllClients()) {
            
            if(Long.parseLong(request.getParameter("id")) == c.getId()) {
                client = c;
                break;
            }
            
        }
       
    }
    
    Client getResult() {
        return client;
    }
    
    
}
