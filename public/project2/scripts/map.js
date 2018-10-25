var mymap = L.map('mapid').setView([-6.175427, 106.827153], 13);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoicml6YWxpYm51IiwiYSI6ImNqbWNqY2plaTAybWcza3F2eXlhcXYxaGsifQ.thchVNvkDhqf-QTYOleK7w'
    }).addTo(mymap);
    L.marker([-6.175427, 106.827153]).addTo(mymap)
		.bindPopup("<b>National Monument</b><br />Well-known obelisk built to commemorate Indonesian independence from the Netherlands.").openPopup();

var popup = L.popup();