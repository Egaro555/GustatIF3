/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insa.gustatif.web;

import com.insa.gustatif.metier.modele.Commande;
import com.insa.gustatif.metier.service.ServiceMetier;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Benjamin
 */
class getCommandesEnCoursAction implements Action {

    List<Commande> commandesEnCours;

    @Override
    public void execute(HttpServletRequest request) {
        commandesEnCours = ServiceMetier.getCommandesEnCours();
        
        if(commandesEnCours == null) {
            commandesEnCours = new ArrayList();
        }
    }

    public List<Commande> getCommandesEnCours() {
        return commandesEnCours;
    }

}
