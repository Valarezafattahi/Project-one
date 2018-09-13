var keyHotel = "6mr7ugtahpv3scmhygs8qsfb";
var keyFlight = "5232c7b5-7351";
var destination;
var startDate;
var endDate;
var rooms;
var children;
var adults;
var hotelQuery = "http://api.hotwire.com/v1/search/hotel?apikey=" + keyHotel + "&dest=" + destination + "&rooms=" + rooms + "&startdate=" + startDate + "&enddate=" + endDate + "&adults=" + adults + "&children=" + children ;
var bookingData = [];
var data = [];
var destVar = localStorage.getItem("destination");
var destination = destVar.split(",");
var itinRooms;
var itinStar;
var itinTotal;
var itinCheckin;
var itinCheckout;
var itinLink;
var hotelArray = [localStorage.getItem('hotelBooking')];
var hotelInfo;
var itinText;
var itinArray = [localStorage.getItem('itinerary')];
var tod = moment().add('day',1).format('YYYY-MM-DD');
var tom = moment().add('day',2).format('YYYY-MM-DD')
for (var i = 0; i < destination.length; i++) {
  destination[i] = destination[i].trim();
}
console.log(destination);
$('#inputDestination').attr("value", destination[0]);
$('#inputStartDate').attr("value", tod);
$('#inputEndDate').attr("value", tom);




//pulls up the table of results for hotel bookings
$("#submit-button").on("click", function(){

   
   event.preventDefault();  
   //capture user input
   // destination = $("#inputDestination").val().trim();
   startDate = $("#inputStartDate").val().trim();
   endDate = $("#inputEndDate").val();
   endDateParsed = moment(endDate).format('MM/DD/YYYY');
   startDateParsed = moment(startDate).format('MM/DD/YYYY');
   rooms = $("#inputRooms").val().trim();
   adults = $("#inputAdults").val().trim();
   children = $("#inputChildren").val().trim();

   //contruct URL for ajax
   hotelQuery = "https://cors-anywhere.herokuapp.com/http://api.hotwire.com/v1/search/hotel?apikey=" + keyHotel + "&dest=" + destination + "&rooms=" + rooms + "&startdate=" + startDateParsed + "&enddate=" + endDateParsed + "&adults=" + adults + "&children=" + children + "&format=json" + "&limit=10";
   //initialize ajax
    //initialize ajax
   $.ajax({
    url: hotelQuery,
    method: "GET"
  }).then(function(response) {
    //for loop to run through all results
      for( i = 0; i < response.Result.length; i++){
        //contructing URL to link to hotwire website for actual booking based on the result ID
        var resultId = response.Result[i].ResultId;
        var resultId2 = resultId.substr(0, resultId.length-15);
        var bookingLink = "https://www.hotwire.com/hotels/details/" + resultId2 + "--"
        //constructing the table little messy cause i had to add a lot of data attributes to the last cell
        $('#bookingTable').append('<tr><td>'+ response.Result[i].StarRating +'</td><td>' + "$"+response.Result[i].AveragePricePerNight+'</td><td>'+ "$"+ response.Result[i].TotalPrice +'</td><td>'+ response.Result[i].CheckInDate +'</td><td>'+ response.Result[i].CheckOutDate +'</td><td><a href=' + bookingLink + ">Click Here to Book</a></td><td id=itin data-rooms = "+response.Result[i].Rooms+" data-starrating = "+response.Result[i].StarRating+" data-priceavg= "+response.Result[i].AveragePricePerNight+" data-totalprice="+response.Result[i].TotalPrice+" data-checkin="+response.Result[i].CheckInDate+" data-checkout="+response.Result[i].CheckOutDate+" data-link= https://www.hotwire.com/hotels/details/" + resultId2 + "-->Click Here to Add Booking to Itinerary</td></tr>");
      }
//end of for loop
      //click event to move data about booking to itinerary. not linked to actual itinerary yet but the console log works.
      $('#bookingTable').on( 'click', 'td', function () {
      itinRooms = ($(this).attr('data-rooms'));
      itinStar = ($(this).attr('data-starrating'));
      itinTotal = ($(this).attr('data-totalprice'));
      itinCheckin = ($(this).attr('data-checkin'));
      itinCheckout = ($(this).attr('data-checkout'));
      itinLink = ($(this).attr('data-link'));
      //stores the booking info as a string
      hotelInfo = "Rooms: "+itinRooms+"\nStar Rating: "+itinStar+"\nTotal Price: "+itinTotal+"\nCheck-in Date: "+itinCheckin+"\nCheck-out Date: "+itinCheckout+"\nLink to Booking: "+itinLink;
      //pushes string into array so we can do multiple bookings
      hotelArray.push(hotelInfo);
      //stores the booking in local storage
      localStorage.setItem('hotelBooking', hotelArray)
      setBooking();
      console.log(hotelInfo);
    } );
  }) 
})


//flight booking widget
$(document).ready(function() {
  KAYAK.embed({
    container: document.getElementById("kayakSearchWidgetContainer"),
    defaultProduct: "flights",
    enabledProducts: ["flights"],
    startDate: localStorage.getItem('itinCheckin', itinCheckin),
    endDate: localStorage.getItem('itinCheckout', itinCheckout),
    origin: localStorage.getItem("origin"),
    destination: localStorage.getItem("destination"),
    ssl: true,
    affiliateId: "acme_corp",
    isInternalLoad: false,
    lc: "en",
    cc: "us",
    mc: "EUR"
    });
 })
 //puts hotel booking in itinerary
 function setBooking(){
  for (i=0; i < hotelArray.length; i++){
      $('#hotel').append("<p>"+hotelArray)
  };  
 }
 setBooking();
 
 //function to post text box stuff to itin
 function setText(){
  for (i=0; i < itinArray.length; i++){
      $('#itinerary').append("<p>"+itinArray[i])
  };
 }
 setText();
 
 //on click function that posts text box stuff to itin
 $("#post-button").on("click", function(){
  
  event.preventDefault();
 
  //captures text box text puts it into array
  itinText = $("#inputItin").val().trim();
  itinArray.push(itinText +"<br>");
  //resets html so that each time you post it isnt reposting same posts
  $('#itinerary').html("");
  // console.log(text)
  // console.log(array);
  setText();
 });
 //saves itin posts to local storage
 $("#save-button").on("click", function(){
  for (i=0; i < itinArray.length; i++){
  localStorage.setItem('itinerary', itinArray)
  localStorage.setItem('hotelBooking', hotelArray)
  };
 });
 //clears itinerary
 $("#clear-button").on("click", function(){
  localStorage.setItem('itinerary', "");
  $('#itinerary').html("");
  localStorage.setItem('hotelBooking', "");
  $('#hotel').html("");
 });







    
