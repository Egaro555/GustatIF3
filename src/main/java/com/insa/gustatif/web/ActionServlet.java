/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insa.gustatif.web;

import com.insa.gustatif.dao.JpaUtil;
import com.insa.gustatif.metier.modele.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author hugue
 */
public class ActionServlet extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    public ActionServlet() {
        JpaUtil.init();
    }

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");

        String[] uri = request.getRequestURI().split("/");

        ResultPrinter resultPrinter = new ResultPrinter(response.getWriter());

        HttpSession session = request.getSession(true);

        Auth auth = Auth.NONE;

        if ((Client) session.getAttribute("client") != null) {
            auth = Auth.CLIENT;
        } else if ((Livreur) session.getAttribute("livreur") != null) {
            auth = Auth.LIVREUR;
        }

        if (uri.length == 3 && uri[1].equals("service")) {

            String serviceName = uri[2];

            if (serviceName.equals("connexionClientEmail")) {

                Auth requireAuth = Auth.NONE;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                requiredArgs.put("email", "String : 'email' of a client");
                requiredArgs.put("idClient", "Long : 'id' of the client");

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {

                    try {

                        connexionClientEmailAction action = new connexionClientEmailAction();
                        action.execute(request);

                        Client client = action.getClient();

                        if (client != null) {

                            session.removeAttribute("livreur");
                            session.setAttribute("client", client);

                            session.setAttribute("commande", new Commande(client, new ArrayList(), null, null));

                            resultPrinter.printClientAsJSON(client);
                        } else {
                            resultPrinter.printBooleanResultAsJSON(false);
                        }

                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }

                }

            } else if (serviceName.equals("connexionLivreur")) {

                Auth requireAuth = Auth.NONE;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                requiredArgs.put("idLivreur", "Long : 'id' of a Livreur");

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {

                    try {

                        connexionLivreurAction action = new connexionLivreurAction();
                        action.execute(request);

                        Livreur livreur = action.getLivreur();

                        if (livreur != null) {
                            session.removeAttribute("client");
                            session.setAttribute("livreur", livreur);

                            resultPrinter.printLivreurAsJSON(livreur);

                        } else {

                            resultPrinter.printBooleanResultAsJSON(false);

                        }

                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }

                }
            } else if (serviceName.equals("deconnexionClient")) {

                session.removeAttribute("livreur");

                session.removeAttribute("client");
                session.removeAttribute("commande");
                
               resultPrinter.printBooleanResultAsJSON(true);

            } else if (serviceName.equals("creerClient")) {

                Auth requireAuth = Auth.NONE;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                requiredArgs.put("nom", "String : 'nom' of the futur client");
                requiredArgs.put("prenom", "String : 'prenom' of the futur client");
                requiredArgs.put("mail", "String : 'mail' of the futur client");
                requiredArgs.put("adresse", "String : 'adresse' of the futur client");

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {

                    try {

                        creerClientAction action = new creerClientAction();
                        action.execute(request);

                        boolean result = action.getResult();

                        resultPrinter.printBooleanResultAsJSON(result);

                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }

                }

            } else if (serviceName.equals("searchRestaurants")) {

                Auth requireAuth = Auth.CLIENT;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                requiredArgs.put("research", "String : substring of a restaurant name");

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {

                    try {
                        searchRestaurantsAction action = new searchRestaurantsAction();
                        action.execute(request);

                        List<Restaurant> foundRestaurants = action.getFoundRestaurants();

                        resultPrinter.printRestaurantListAsJSON(foundRestaurants);

                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }
                }

            } else if (serviceName.equals("searchProduits")) {

                Auth requireAuth = Auth.CLIENT;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                requiredArgs.put("research", "String : substring of a product name");
                requiredArgs.put("r", "Long : 'id' of restaurant");

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {

                    try {
                        searchProduitsAction action = new searchProduitsAction(session);
                        action.execute(request);

                        List<Produit> foundProduits = action.getFoundProduits();

                        resultPrinter.printProduitsListAsJSON(foundProduits);

                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }
                }

            } else if (serviceName.equals("setProduitCommande")) {

                Auth requireAuth = Auth.CLIENT;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                requiredArgs.put("p", "String");
                requiredArgs.put("qte", "Long : 'id' of restaurant");

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {

                    try {
                        setProduitCommandeAction action = new setProduitCommandeAction(session);
                        action.execute(request);

                        resultPrinter.printCommandeAsJSON((Commande) session.getAttribute("commande"));

                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }

                }
            } else if (serviceName.equals("removeProduitCommande")) {

                Auth requireAuth = Auth.CLIENT;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                requiredArgs.put("p", "Long : 'id' of product");

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {

                    try {
                        removeProduitCommandeAction action = new removeProduitCommandeAction(session);
                        action.execute(request);

                        resultPrinter.printCommandeAsJSON((Commande) session.getAttribute("commande"));

                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }
                }

            } else if (serviceName.equals("traiterCommande")) {

                Auth requireAuth = Auth.CLIENT;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {

                    try {
                        traiterCommandeAction action = new traiterCommandeAction(session);
                        action.execute(request);

                        resultPrinter.printBooleanResultAsJSON(action.getResult());

                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }

                }

            } else if (serviceName.equals("cloturerCommandeLivreur")) {

                Auth requireAuth = Auth.LIVREUR;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                requiredArgs.put("l", "Long : 'id' of livreur");

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {

                    try {

                        cloturerCommandeLivreurAction action = new cloturerCommandeLivreurAction();
                        action.execute(request);

                        resultPrinter.printBooleanResultAsJSON(true);
                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }
                }

            } else if (serviceName.equals("findAllLivreurs")) {

                Auth requireAuth = Auth.LIVREUR;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {

                    try {
                        findAllLivreursAction action = new findAllLivreursAction();
                        action.execute(request);

                        List<Livreur> allLivreurs = action.getAllLivreurs();

                        if (allLivreurs == null) {
                            allLivreurs = new ArrayList();
                        }

                        resultPrinter.printLivreurListAsJSON(allLivreurs);

                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }
                }

            } else if (serviceName.equals("findAllVelos")) {

                Auth requireAuth = Auth.LIVREUR;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {

                    try {
                        findAllVelosAction action = new findAllVelosAction();
                        action.execute(request);

                        List<Livreur> allVelos = action.getAllVelos();

                        resultPrinter.printLivreurListAsJSON(allVelos);

                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }
                }

            } else if (serviceName.equals("findAllDrones")) {

                Auth requireAuth = Auth.LIVREUR;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {

                    try {

                        findAllDronesAction action = new findAllDronesAction();
                        action.execute(request);

                        List<Livreur> allDrones = action.getAllDrones();

                        resultPrinter.printLivreurListAsJSON(allDrones);

                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }

                }

            } else if (serviceName.equals("findAllClients")) {

                Auth requireAuth = Auth.LIVREUR;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {

                    try {
                        findAllClientsAction action = new findAllClientsAction();
                        action.execute(request);

                        List<Client> allClients = action.getAllClients();

                        resultPrinter.printClientListAsJSON(allClients);

                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }
                }

            } else if (serviceName.equals("findAllRestaurants")) {

                Auth requireAuth = Auth.CLIENT;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {

                    try {
                        findAllRestaurantsAction action = new findAllRestaurantsAction();
                        action.execute(request);

                        List<Restaurant> allRestaurants = action.getAllRestaurants();

                        resultPrinter.printRestaurantListAsJSON(allRestaurants);
                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }

                }

            } else if (serviceName.equals("getCommandesEnCours")) {

                Auth requireAuth = Auth.LIVREUR;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {
                    try {
                        getCommandesEnCoursAction action = new getCommandesEnCoursAction();
                        action.execute(request);

                        List<Commande> commandesEnCours = action.getCommandesEnCours();

                        resultPrinter.printCommandeListAsJSON(commandesEnCours);
                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }
                }

            } else if (serviceName.equals("creerLivreurDrone")) {

                Auth requireAuth = Auth.LIVREUR;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                requiredArgs.put("adr", "String");
                requiredArgs.put("chargeMaxi", "Double");
                requiredArgs.put("vitesseMoy", "Double");

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {
                    try {
                        creerLivreurDroneAction action = new creerLivreurDroneAction();
                        action.execute(request);

                        boolean result = true;

                        resultPrinter.printBooleanResultAsJSON(result);
                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }
                }

            } else if (serviceName.equals("creerLivreurVelo")) {

                Auth requireAuth = Auth.LIVREUR;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                requiredArgs.put("adr", "String");
                requiredArgs.put("chargeMaxi", "Double");
                requiredArgs.put("vitesseMoy", "Double");
                requiredArgs.put("nom", "String");
                requiredArgs.put("prenom", "String");
                requiredArgs.put("mail", "String");

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {
                    try {
                        creerLivreurVeloAction action = new creerLivreurVeloAction();
                        action.execute(request);

                        boolean result = true;

                        resultPrinter.printBooleanResultAsJSON(result);
                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }

                }
            } else if (serviceName.equals("creerRestaurant")) {

                Auth requireAuth = Auth.LIVREUR;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                requiredArgs.put("denomination", "String");
                requiredArgs.put("description", "String");
                requiredArgs.put("adresse", "String");

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {

                    try {
                        creerRestaurantAction action = new creerRestaurantAction();
                        action.execute(request);

                        boolean result = true;

                        resultPrinter.printBooleanResultAsJSON(result);

                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }
                }

            } else if (serviceName.equals("updateRestaurant")) {

                Auth requireAuth = Auth.LIVREUR;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                requiredArgs.put("r", "Double : 'id' of restaurant");

                optionnalArgs.put("denomination", "String");
                optionnalArgs.put("description", "String");
                optionnalArgs.put("adresse", "String");
                optionnalArgs.put("latitude", "Double");
                optionnalArgs.put("longitude", "Double");

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {

                    try {
                        updateRestaurantAction action = new updateRestaurantAction();
                        action.execute(request);

                        boolean result = action.getResult();

                        resultPrinter.printBooleanResultAsJSON(result);

                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }
                }

            } else if (serviceName.equals("deleteRestaurant")) {

                Auth requireAuth = Auth.LIVREUR;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                requiredArgs.put("r", "Long : 'id' of restaurant");

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {

                    try {
                        deleteRestaurantAction action = new deleteRestaurantAction(); //NOTE: bug ?
                        action.execute(request);

                        boolean result = action.getResult();

                        resultPrinter.printBooleanResultAsJSON(result);
                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }
                }

            } else if (serviceName.equals("creerProduit")) {

                Auth requireAuth = Auth.LIVREUR;
                HashMap<String, String> requiredArgs = new HashMap();
                HashMap<String, String> optionnalArgs = new HashMap();

                requiredArgs.put("denomination", "String");
                requiredArgs.put("description", "String");
                requiredArgs.put("poids", "Double");
                requiredArgs.put("prix", "Double");

                if (serviceMissingRequirement(request, session, requireAuth, requiredArgs)) {
                    resultPrinter.printServiceRequirement(auth, requireAuth, requiredArgs, optionnalArgs);
                } else {

                    try {
                        creerProduitAction action = new creerProduitAction();
                        action.execute(request);

                        boolean result = true;

                        resultPrinter.printBooleanResultAsJSON(result);

                    } catch (Exception e) {

                        resultPrinter.printErrorAsJSON(e);

                    }

                }

            } else {

                resultPrinter.printServiceInconnu();

            }

        } else {

            resultPrinter.printServiceInconnu();

        }

        resultPrinter.close();

    }

// <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    private boolean serviceMissingRequirement(HttpServletRequest request, HttpSession session, Auth auth, HashMap<String, String> requiredArgs) {

        if (auth == Auth.CLIENT && session.getAttribute("client") == null) {
            return true;
        }

        if (auth == Auth.LIVREUR && session.getAttribute("livreur") == null) {
            return true;
        }

        if (auth == Auth.CLIENT_OR_LIVREUR && !(session.getAttribute("client") != null || session.getAttribute("livreur") != null)) {
            return true;
        }

        for (String arg : requiredArgs.keySet()) {

            if (request.getParameter(arg) == null) {
                return true;
            }

        }

        return false;

    }

}
