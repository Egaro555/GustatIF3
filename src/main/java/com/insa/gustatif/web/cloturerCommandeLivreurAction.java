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
class cloturerCommandeLivreurAction implements Action {

    boolean result = false;

    @Override
    public void execute(HttpServletRequest request) {

        Livreur l = ServiceMetier.findLivreurById(Long.parseLong(request.getParameter("l")));

        if (Long.parseLong(request.getParameter("c")) == l.getCmdeEnCours().getNumCommande()) {
            ServiceMetier.cloturerCommandeLivreur(l);
            result = true;
        }

    }

    boolean getResult() {
        return result;
    }

}
