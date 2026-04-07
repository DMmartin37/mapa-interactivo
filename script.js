var map = L.map('map').setView([-34.6037, -58.3816], 13);
boton = document.getElementById("borrar");
medir = document.getElementById("medir")
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: 'OpenStreetMap'
}).addTo(map);
var map_puntos = L.featureGroup().addTo(map);

var icono = L.icon({
    iconUrl: 'icono.png',

    iconSize:     [40, 55], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.marker([-34.6037, -58.3816], {icon: icono})
   .addTo(map_puntos)
   .bindPopup("Ubicación inicial")
   .openPopup();

   map.on('click', function(e) {
   alert("Lat: " + e.latlng.lat + " Lng: " + e.latlng.lng);
});



let puntos = [];
let modo_medicion = false;
let distancia = [];

medir.onclick = function(){
modo_medicion = !modo_medicion;
puntos_medicion = [];

}

map.on('click', function(e) {

    if (modo_medicion) {
        puntos_medicion.push(e.latlng);

        L.marker(e.latlng).addTo(map_puntos);

        if (puntos_medicion.length === 2) {
            let linea = L.polyline(puntos_medicion, { color: 'blue' }).addTo(map_puntos);

            let distancia = map.distance(puntos_medicion[0], puntos_medicion[1]);
            let km = (distancia / 1000).toFixed(2);

            let medio = linea.getBounds().getCenter();

            L.popup()
                .setLatLng(medio)
                .setContent("Distancia: " + km + " km")
                .openOn(map);

            puntos_medicion = []; 
            
        }

        return; 
        
    }
        puntos.push([e.latlng.lat, e.latlng.lng]);

    if (puntos.length === 3) {
        L.polyline(puntos, { color: 'red' }).addTo(map_puntos);
    }
});


boton.onclick = function() {
     puntos = [];
   map_puntos.clearLayers();

}

var Normal = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

var Negro = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20
});

var layerControl = L.control.layers({
    "normal": Normal,
    "Negro": Negro
}).addTo(map);