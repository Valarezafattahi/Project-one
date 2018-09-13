//User Geolocation --> find how to track inside div, for use in price calculation of flight/transportation
var autocomplete;
var locationChosen;
var input = document.getElementById('search-input');

$(document).ready(function () {
    hideBar();
});
function hideBar(){
    if (localStorage.getItem("destination")){
        $("#nav_container").show();
        $("#quote_container").hide();
    } else {
        $("#nav_container").hide();
        $("#quote_container").show();
        getLocation();
    }
}
function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical cities
    //When a user selects a city, populate the search bar with that result
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(input),
        {types: ['(cities)']}
    );
    // When the user presses the submit button, pull the chosen location into some Div/form
    // Link this submission to booking div in booking tab/code and to info div in info tab/code
    $("#buttonSubmit").on("click", function(){
        locationChosen = document.getElementById("search-input").value;
        $(".sample-div").text(locationChosen);
        location.href = "information.html"
        localStorage.setItem("destination", locationChosen);
        console.log(locationChosen);
    });
}
    // Allow user to submit when pressing enter
    input.addEventListener("keyup", function(event) {
        console.log(autocomplete);
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("buttonSubmit").click();
        }
    });
    // Do not allow user to enter anything but a letter in the text-field
    $(document).ready(function() {
        $(input).keypress(function(key) {
            if(key.charCode > 65 || key.charCode < 90 && key.charCode > 97 || key.charCode < 122 && key.charCode == 32){ return true;
            } else {return false;
            }
        });
    });
function getLocation(){
    if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
    
    } else {userLocation.innerHTML="Geolocation is not supported by this browser.";}
}
function showPosition(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var latlng = new google.maps.LatLng(lat, lng); 
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[5]) {
                localStorage.setItem("origin" , results[5].formatted_address);
            }
        }
    });
}
