/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insa.gustatif.web;

import com.insa.gustatif.metier.modele.Client;
import com.insa.gustatif.metier.service.ServiceMetier;
import com.insa.gustatif.web.Action;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Benjamin
 */
class findAllClientsAction implements Action {

    List<Client> allClients;

    @Override
    public void execute(HttpServletRequest request) {
        allClients = ServiceMetier.findAllClients();
    }

    public List<Client> getAllClients() {
        return allClients;
    }

}
