/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insa.gustatif.web;

import com.insa.gustatif.metier.modele.Restaurant;
import com.insa.gustatif.metier.service.ServiceMetier;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Benjamin
 */
class getRestaurantAction implements Action {
    
    
    Restaurant result;

    @Override
    public void execute(HttpServletRequest request) {

        result = ServiceMetier.getRestaurantById(Long.parseLong(request.getParameter("id")));
    }

    public Restaurant getResult() {
        return result;
    }

}
