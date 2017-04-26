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

            if (request.getParameter("adresse") != null) {
                r.setAdresse(request.getParameter("adresse"));
            }

            if (request.getParameter("denomination") != null) {
                r.setDenomination(request.getParameter("denomination"));
            }

            if (request.getParameter("description") != null) {
                r.setDescription(request.getParameter("description"));
            }

            if (request.getParameter("latitude") != null) {
                r.setLatitudeLongitude(Double.parseDouble(request.getParameter("latitude")), r.getLongitude());
            }

            if (request.getParameter("longitude") != null) {
                r.setLatitudeLongitude(r.getLatitude(), Double.parseDouble(request.getParameter("longitude")));

            }

            ServiceMetier.updateRestaurant(r);
            result = true;
        }
    }

    public boolean getResult() {
        return result;
    }

}
