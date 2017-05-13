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
class updateRestaurantAction implements Action {

    boolean result;

    @Override
    public void execute(HttpServletRequest request) {

        result = false;

        Restaurant r = ServiceMetier.getRestaurantById(Long.parseLong(request.getParameter("r")));

        if (r != null) {

            ServiceMetier.updateRestaurant(r);
            result = true;
        }
    }

    public boolean getResult() {
        return result;
    }

}
