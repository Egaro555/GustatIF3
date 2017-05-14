var map;
var libLoaded = false;
var dataWatingLib = [];
var markers=[];
var addMarker = function (data) {
    var label = "?";
    var position = {lat : 0, lng: 0};						

    if("drone" in data) {
            label = '✈';
            position = {lat : data.drone.latitude, lng : data.drone.longitude};
            content = "<h3 style='margin-bottom: 5px;'>Drône livreur</h3>Adresse : " + data.drone.adresse;
    }
    else if("livreur" in data) {
            label = '🚲';
            position = {lat : data.livreur.latitude, lng : data.livreur.longitude};
            content = "<h3 style='margin-bottom: 5px;'>Livreur \""+data.livreur.prenom+ " " + data.livreur.nom+"\"</h3>Adresse : " + data.livreur.adresse;
    }
    else if("restaurant" in data) {
            label = '🍴';
            position = {lat : data.restaurant.latitude, lng : data.restaurant.longitude};			
            content = "<h3 style='margin-bottom: 5px;'>Restaurant \""+data.restaurant.denomination+"\"</h3>Adresse : " + data.restaurant.adresse;

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

};
var init = function(){
    if(!libLoaded)return;
    markers = [];
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 0,
        center: {lat: 25.363, lng: 25}
    });
};
var push = function(data){
    if(libLoaded){
        addMarkers(map,data);
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
    init();
    for(d in dataWatingLib) {
        mapControler.addMarker(dataWatingLib[d]);
    }
}