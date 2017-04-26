/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insa.gustatif.web;

import com.insa.gustatif.metier.service.ServiceMetier;
import javax.servlet.http.HttpServletRequest;

/**
 *
 * @author Benjamin
 */
public interface Action {
    
    public abstract void execute(HttpServletRequest request);

}
