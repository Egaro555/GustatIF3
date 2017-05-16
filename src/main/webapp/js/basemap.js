console.log("basemap.js");
var map;
var libLoaded = false;
var dataWatingLib = [];
var markers=[];
var addMarker = function (data) {
    setTimeout(function(){
        var label = "?";
        var position = {lat : 0, lng: 0};						

        if("drone" in data) {
                label = '✈';
                position = {lat : data.drone.latitude, lng : data.drone.longitude};
                content = "<h3 style='margin-bottom: 5px;'>Drône livreur</h3>Adresse : " + data.drone.addresse;
        }
        else if("livreur" in data) {
                label = '🚲';
                position = {lat : data.livreur.latitude, lng : data.livreur.longitude};
                content = "<h3 style='margin-bottom: 5px;'>Livreur \""+data.livreur.prenom+ " " + data.livreur.nom+"\"</h3>Adresse : " + data.livreur.addresse;
        }
        else if("restaurant" in data) {
                label = '🍴';
                position = {lat : data.restaurant.latitude, lng : data.restaurant.longitude};			
                content = "<h3 style='margin-bottom: 5px;'>Restaurant \""+data.restaurant.denomination+"\"</h3>Adresse : " + data.restaurant.adresse;

        }else{
            console.error("MAP : MARKER IN INKNOW",data);
            return
        }

        if(typeof position.lat != "number" || typeof position.lng != "number"){
            console.warn("MAP : MARKED AS NOT LAT LNG",data,position);
            return;
        }


        var marker = new google.maps.Marker({
        label : label,
        position : position,
        map: map
        });

        var infowindow = new google.maps.InfoWindow({
          content: content
        });

        marker.infowindow = infowindow;
        marker.addListener('mouseover', function() {

                for(var m in markers)  {
                        markers[m].infowindow.close();
                }

                infowindow.open(map, marker);
        });					

        return markers.push(marker);
    },400);

};
var init = function(){
    if(!libLoaded)return;
    setTimeout(function(){
        console.log("Map initaliser");
        markers = [];
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 6,
            center: {lat: 46.7, lng: 2}
        });
    },350);
};
var push = function(data){
    if(libLoaded){
        addMarker(data);
    }else{
        dataWatingLib.push(data);
    }
};
var clean = function(){
    if(libLoaded){
        init();
    }else{
        dataWatingLib = [];
    }
};
mapControler  = {
    push:push,
    clean:clean
};
function onLibMapLoad() {
    libLoaded = true;
    console.log("LibMapLoad");
    if(!document.getElementById('map'))return;
    init();
    for(d in dataWatingLib) {
        addMarker(dataWatingLib[d]);
    }
}