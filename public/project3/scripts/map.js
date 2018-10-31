// Init map
const mymap = L.map('mapid').setView([-7.280747, 109.183718], 11);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox.streets',
  accessToken: 'pk.eyJ1Ijoicml6YWxpYm51IiwiYSI6ImNqbWNqY2plaTAybWcza3F2eXlhcXYxaGsifQ.thchVNvkDhqf-QTYOleK7w'
}).addTo(mymap);

const findLocation = (x, y) => {
  for (let i = 0; i < places.length; i++) {
    if (places[i].location[0] === x &&
      places[i].location[1] === y) {
      return i;
    }
  }
  return -1;
}

const showLocation = (e) => {
  const ix = findLocation(e.latlng.lat, e.latlng.lng);
  if (ix >= 0) {
    img.src = places[ix].image;
    img.alt = places[ix].title;
    title.innerHTML = places[ix].title;
    review.innerHTML = places[ix].review;
  }
}

(async function () {
  const URL = '/project3/data/data.json';
  try {
    const res = await (fetch(URL));
    const data = await res.json();
    localStorage.setItem('places', JSON.stringify(data.places));
  } catch (err) {
    console.log(err);
  }
})();

const img = document.getElementById('image');
const title = document.getElementById('title');
const review = document.getElementById('review');

const places = JSON.parse(localStorage.getItem('places'));
if (places) {
  places.map((p, index) => {
    var marker = L.marker(p.location).addTo(mymap).bindPopup(p.title);
    marker.on('click', showLocation);
    if (index === 0) {
      marker.openPopup();
    }
  })
  // Init data
  img.src = places[0].image;
  img.alt = places[0].title;
  title.innerHTML = places[0].title;
  review.innerHTML = places[0].review;
}