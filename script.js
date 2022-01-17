// https://developers.google.com/maps/gmp-get-started in case I get lost
// API key is on credencials page of Google Maps Platform https://console.cloud.google.com/project/_/google/maps-apis/credentials?_ga=2.88271643.1247406595.1642369237-209320089.1642369237

function initGoogle() {
    var location = {
        lat: 40.000,
        lng: -79.000
    }
    var options = {
        center: location,
        zoom: 9
    }
    // If user allows browser to track location, get user location via navigator.geolocation.getCurrentPosition()
    if(navigator.geolocation) {
        console.log('geolocation is here!');
        navigator.geolocation.getCurrentPosition((loc) => {
            location.lat = loc.coords.latitude;
            location.lng = loc.coords.longitude
            map = new google.maps.Map(document.getElementById("map"), options);
        },
        (err) => {
            console.log("User clicked no lol");
            map = new google.maps.Map(document.getElementById("map"), options);
        }
        )

    } else {
        console.log('geolocation is not supported :(');
        map = new google.maps.Map(document.getElementById("map"), options);
    }
    // .autocomplete() takes two arguments, html element and options
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("input"),
        {
            componentRestrictions: {'country': ['us']},
            fields: ['geometry','name'], // google bills you based on the fields; these are free but logo, phone number etc are premium
            types: ['establishment']
        });
    // add event listener to autocomplete
    autocomplete.addListener("place_changed", () =>{
        const place = autocomplete.getPlace();
        // console.log(place);
        new google.maps.Marker({
            position: place.geometry.location,
            title: place.name,
            map: map
        })
    })
}

