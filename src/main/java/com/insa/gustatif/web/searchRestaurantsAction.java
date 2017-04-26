/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insa.gustatif.web;

import com.insa.gustatif.metier.modele.Restaurant;
import com.insa.gustatif.metier.service.ServiceMetier;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Benjamin
 */
class searchRestaurantsAction implements Action {

    List<Restaurant> foundRestaurants;
    
    @Override
    public void execute(HttpServletRequest request) {

        foundRestaurants = ServiceMetier.searchRestaurants(request.getParameter("research"));
    }

    public List<Restaurant> getFoundRestaurants() {
        return foundRestaurants;
    }
    
    
    
}
