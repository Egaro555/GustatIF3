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
class findAllDronesAction implements Action {

        List<Livreur> allDrones;
 
    
    @Override
    public void execute(HttpServletRequest request) {
        allDrones = ServiceMetier.findAllDrones();
    }

    public List<Livreur> getAllDrones() {
        return allDrones;
    }
    
    
}
