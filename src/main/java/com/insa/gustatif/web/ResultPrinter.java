/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.insa.gustatif.web;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.insa.gustatif.metier.modele.Client;
import com.insa.gustatif.metier.modele.Commande;
import com.insa.gustatif.metier.modele.Livreur;
import com.insa.gustatif.metier.modele.LivreurDrone;
import com.insa.gustatif.metier.modele.LivreurVelo;
import com.insa.gustatif.metier.modele.Produit;
import com.insa.gustatif.metier.modele.ProduitCommande;
import com.insa.gustatif.metier.modele.Restaurant;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 *
 * @author Benjamin
 */
class ResultPrinter {

    private PrintWriter out;

    ResultPrinter(PrintWriter writer) {
        out = writer;
    }

    void printRestaurantListAsJSON(List<Restaurant> restaurants) {

        JsonArray jsonListe = new JsonArray();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        for (Restaurant r : restaurants) {
            JsonObject jsonRestaurant = new JsonObject();

            jsonRestaurant.addProperty("id", r.getId());
            jsonRestaurant.addProperty("denomination", r.getDenomination());
            jsonRestaurant.addProperty("description", r.getDescription());
            jsonRestaurant.addProperty("adresse", r.getAdresse());
            jsonRestaurant.addProperty("latitude", r.getLatitude());
            jsonRestaurant.addProperty("longitude", r.getLongitude());

            jsonListe.add(jsonRestaurant);
        }

        JsonObject container = new JsonObject();
        container.add("restaurants", jsonListe);
        String json = gson.toJson(container);
        out.println(json);
    }

    void printServiceInconnu() {

        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();

        JsonObject container = new JsonObject();
        container.addProperty("error", "unknownService");
        String json = gson.toJson(container);
        out.println(json);

    }

    void printServiceRequirement(Auth auth, Auth requireAuth, Map<String, String> mandatoryArgs, HashMap<String, String> optionalArgs) {

        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();

        JsonObject requirementObject = new JsonObject();
        requirementObject.addProperty("needAuth", requireAuth.toString());

        JsonObject mandatoryArgsObject = new JsonObject();

        Iterator entries = mandatoryArgs.entrySet().iterator();
        while (entries.hasNext()) {
            Map.Entry entry = (Map.Entry) entries.next();
            mandatoryArgsObject.addProperty((String) entry.getKey(), (String) entry.getValue());
        }

        JsonObject optionalArgsObject = new JsonObject();

        entries = optionalArgs.entrySet().iterator();
        while (entries.hasNext()) {
            Map.Entry entry = (Map.Entry) entries.next();
            optionalArgsObject.addProperty((String) entry.getKey(), (String) entry.getValue());
        }

        requirementObject.add("requiredArgs", mandatoryArgsObject);
        requirementObject.add("optionalArgs", optionalArgsObject);

        JsonObject container = new JsonObject();
        container.addProperty("error", "serviceRequirement");
        container.add("requirement", requirementObject);
        container.addProperty("Are you auth ?", auth.toString());

        String json = gson.toJson(container);
        out.println(json);

    }

    void close() {

        out.close();

    }

    void printLivreurListAsJSON(List<Livreur> livreurs) {

        JsonArray jsonListe = new JsonArray();
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();

        for (Livreur l : livreurs) {

            jsonListe.add(encodeLivreurToJSON(l));
        }

        JsonObject container = new JsonObject();
        container.add("livreurs", jsonListe);
        String json = gson.toJson(container);
        out.println(json);

    }

    void printClientListAsJSON(List<Client> clients) {

        JsonArray jsonListe = new JsonArray();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        for (Client c : clients) {

            jsonListe.add(encodeClientToJSON(c));

        }

        JsonObject container = new JsonObject();
        container.add("clients", jsonListe);
        String json = gson.toJson(container);
        out.println(json);

    }

    void printProduitsListAsJSON(List<Produit> produits) {

        JsonArray jsonListe = new JsonArray();
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        for (Produit p : produits) {
            JsonObject jsonProduit = new JsonObject();

            jsonProduit.addProperty("id", p.getId());
            jsonProduit.addProperty("denomination", p.getDenomination());
            jsonProduit.addProperty("poids", p.getPoids());
            jsonProduit.addProperty("prix", p.getPrix());
            jsonProduit.addProperty("description", p.getDescription());

            jsonListe.add(jsonProduit);
        }

        JsonObject container = new JsonObject();
        container.add("produits", jsonListe);
        String json = gson.toJson(container);
        out.println(json);

    }

    void printBooleanResultAsJSON(boolean result) {

        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        JsonObject container = new JsonObject();
        container.addProperty("result", result);

        String json = gson.toJson(container);
        out.println(json);
    }

    void printCommandeListAsJSON(List<Commande> commandes) {

        JsonArray jsonListe = new JsonArray();
        Gson gson = new GsonBuilder().setPrettyPrinting().serializeNulls().create();

        for (Commande c : commandes) {

            JsonObject jsonCommande = encodeCommandeToJSON(c);

            jsonListe.add(jsonCommande);
        }

        JsonObject container = new JsonObject();
        container.add("commandes", jsonListe);
        String json = gson.toJson(container);
        out.println(json);
    }

    void printClientAsJSON(Client client) {

        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        JsonObject container = new JsonObject();
        container.add("client", encodeClientToJSON(client));
        String json = gson.toJson(container);
        out.println(json);

    }

    void printCommandeAsJSON(Commande commande) {

        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        JsonObject container = new JsonObject();
        container.add("commande", encodeCommandeToJSON(commande));
        String json = gson.toJson(container);
        out.println(json);

    }

    void printLivreurAsJSON(Livreur livreur) {
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        JsonObject container = new JsonObject();
        container.add("livreur", encodeLivreurToJSON(livreur));
        String json = gson.toJson(container);
        out.println(json);
    }

    private JsonObject encodeCommandeToJSON(Commande c) {

        JsonObject jsonCommande = new JsonObject();

        jsonCommande.addProperty("numCommande", c.getNumCommande());
        jsonCommande.addProperty("client", (c.getClient() != null) ? c.getClient().getId() : null);
        jsonCommande.addProperty("dateCommande", (c.getDateCommande() != null) ? c.getDateCommande().toString() : null);
        jsonCommande.addProperty("dateReception", (c.getDateReception() != null) ? c.getDateReception().toString() : null);
        jsonCommande.addProperty("livreur", (c.getLivreur() != null) ? c.getLivreur().getIdLivreur() : null);
        jsonCommande.addProperty("poidsTotal", c.getPoidsTotal());
        jsonCommande.addProperty("prixTotal", c.getPrixTotal());

        JsonArray jsonListeProduitCommande = new JsonArray();

        if (c.getProduitCommande() != null) {

            for (ProduitCommande pc : c.getProduitCommande()) {

                JsonObject jsonProduitCommande = new JsonObject();

                JsonObject jsonProduit = new JsonObject();

                jsonProduit.addProperty("id", pc.getProduit().getId());
                jsonProduit.addProperty("denomination", pc.getProduit().getDenomination());
                jsonProduit.addProperty("description", pc.getProduit().getDescription());
                jsonProduit.addProperty("prix", pc.getProduit().getPrix());
                jsonProduit.addProperty("poids", pc.getProduit().getPoids());

                jsonProduitCommande.add("produit", jsonProduit);
                jsonProduitCommande.addProperty("qte", pc.getQte());

                jsonListeProduitCommande.add(jsonProduitCommande);
            }

            jsonCommande.add("produitCommande", jsonListeProduitCommande);

        } else {
            jsonCommande.addProperty("produitCommande", (Number) null);
        }

        jsonCommande.addProperty("restaurant", (c.getRestaurant() != null) ? c.getRestaurant().getId() : null);

        return jsonCommande;

    }

    private JsonObject encodeClientToJSON(Client client) {

        JsonObject jsonClient = new JsonObject();

        jsonClient.addProperty("id", client.getId());
        jsonClient.addProperty("addresse", client.getAdresse());
        jsonClient.addProperty("mail", client.getMail());
        jsonClient.addProperty("nom", client.getNom());
        jsonClient.addProperty("prenom", client.getPrenom());
        jsonClient.addProperty("latitude", client.getLatitude());
        jsonClient.addProperty("longitude", client.getLongitude());

        return jsonClient;
    }

    private JsonObject encodeLivreurToJSON(Livreur livreur) {
        JsonObject jsonLivreur = new JsonObject();

        jsonLivreur.addProperty("id", livreur.getIdLivreur());
        jsonLivreur.addProperty("addresse", livreur.getAdresse());
        jsonLivreur.addProperty("chargeMaxi", livreur.getChargeMaxi());
        jsonLivreur.addProperty("cmdeEnCours", (livreur.getCmdeEnCours() != null) ? livreur.getCmdeEnCours().getNumCommande() : null);
        jsonLivreur.addProperty("latitude", livreur.getLatitude());
        jsonLivreur.addProperty("longitude", livreur.getLongitude());

        if (livreur instanceof LivreurDrone) {
            jsonLivreur.addProperty("type", "Drone");
            jsonLivreur.addProperty("vitesseMoyenne", ((LivreurDrone) livreur).getVitesseMoyenne());
        } else if (livreur instanceof LivreurVelo) {
            jsonLivreur.addProperty("type", "Velo");
            jsonLivreur.addProperty("nom", ((LivreurVelo) livreur).getNom());
            jsonLivreur.addProperty("prnom", ((LivreurVelo) livreur).getPrenom());
            jsonLivreur.addProperty("mail", ((LivreurVelo) livreur).getMail());
        }

        return jsonLivreur;
    }

    void printErrorAsJSON(Exception e) {

        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        e.printStackTrace(pw);
       

        JsonObject container = new JsonObject();
        container.addProperty("error", "uncaughtException");
        container.addProperty("exceptionMessage", e.getMessage());
        container.addProperty("exceptionLocalizedMessage", e.getLocalizedMessage());
        container.addProperty("exceptionStackTrace",  sw.toString());
        String json = gson.toJson(container);
        out.println(json);
    }

}
