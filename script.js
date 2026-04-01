var map = L.map('map').setView([-34.6037, -58.3816], 13);
boton = document.getElementById("borrar");
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

map.on('click', function(e) {
   puntos.push([e.latlng.lat, e.latlng.lng]);

   if (puntos.length === 3) {
       L.polyline(puntos, { color: 'red' }, {fillColor: '#f03'}).addTo(map_puntos);
       
   }
   
});


boton.onclick = function() {
     puntos = [];
   map_puntos.clearLayers();

}