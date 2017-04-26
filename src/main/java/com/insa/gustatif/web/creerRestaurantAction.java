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
class creerRestaurantAction implements Action {

    @Override
    public void execute(HttpServletRequest request) {
        
        Restaurant r = new Restaurant(request.getParameter("denomination"), request.getParameter("description"), request.getParameter("adresse"));
        
        ServiceMetier.creerRestaurant(r);
    }
    
}
