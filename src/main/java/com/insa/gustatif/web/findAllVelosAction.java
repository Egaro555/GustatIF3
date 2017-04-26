/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insa.gustatif.web;

import com.insa.gustatif.metier.modele.Livreur;
import com.insa.gustatif.metier.service.ServiceMetier;
import com.insa.gustatif.web.Action;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Benjamin
 */
class findAllVelosAction implements Action {

    List<Livreur> allVelos;

    @Override
    public void execute(HttpServletRequest request) {
        allVelos = ServiceMetier.findAllVelos();
    }

    public List<Livreur> getAllVelos() {
        return allVelos;
    }

    
    
}
