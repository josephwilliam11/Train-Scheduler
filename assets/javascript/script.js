$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCsW-tk-B9HX0PCebVPpMNXdnixPnFTuwM",
    authDomain: "homework-93ec3.firebaseapp.com",
    databaseURL: "https://homework-93ec3.firebaseio.com",
    projectId: "homework-93ec3",
    storageBucket: "",
    messagingSenderId: "483942323351"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTime = 0;
  var frequency = moment().format("HH:mm");
  var arrival = moment().format("HH:mm");
  currentTime = moment().format("h:mm A");
  console.log(currentTime);

$("#submit").on("click", function(event) {
  // console.log(newDestination);

  event.preventDefault();

  var newName = $("#name-input").val().trim();
  var newDestination = $("#destination-input").val().trim();
  var newStartTime = $("#start-time-input").val();
  var newFrequency = parseInt($("#frequency-input").val());

  var nextArrival = moment(newStartTime, "h:mm A").add(newFrequency , 'm').format("h:mm A");
  var away = moment(currentTime, "h:mm A").subtract(nextArrival , 'h:mm A').format('m');
  console.log(away);

  // var firstTimeConverted = moment(newStartTime, "hh:mm").subtract(1, "years");
  // console.log(firstTimeConverted);

  // var currentTime = moment();
  // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  // console.log("DIFFERENCE IN TIME: " + diffTime);

  // var tRemainder = diffTime % tFrequency;
  // console.log(tRemainder);



  database.ref().push({
    name: newName,
    destination: newDestination,
    startDate: newStartTime,
    frequency: newFrequency,
    arrival: nextArrival
    //dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  $("#name-input").val("");
  $("#destination-input").val("");
  $("#start-time-input-input").val("");
  $("#frequency-input").val("");

})



database.ref().on("child_added", function(childSnapshot) {

  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().firstTime);
  console.log(childSnapshot.val().frequency);

  var newRow = $("<tr>");
  var nameCell = $("<td>").text(childSnapshot.val().name);
  var destinationCell = $("<td>").text(childSnapshot.val().destination);
  var frequencyCell = $("<td>").text(childSnapshot.val().frequency);
  var nextArrivalCell = $("<td>").text(childSnapshot.val().arrival);
  // var minutesAwayCell = $("<td>").text(childSnapshot.val().frequency);
  // var totalBilledCell = $("<td>").text("");

  newRow.append(nameCell, destinationCell, frequencyCell, nextArrivalCell);

  $("#table-body").append(newRow);

// Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


/*database.ref().on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {
    // Set the variables for highBidder/highPrice equal to the stored values.
    highBidder = snapshot.val().highBidder;
    highPrice = parseInt(snapshot.val().highPrice);

    // Change the text inside the HTML element to reflect the initial value
    $("#highest-bidder").text(snapshot.val().highBidder);
    $("#highest-price").text("$" + snapshot.val().highPrice);

    // Print the data to the console.
    console.log(snapshot.val().highBidder);
    console.log(snapshot.val().highPrice);
  }

  // Keep the variables for highBidder/highPrice equal to the initial values
  else {

    // Change the HTML to reflect the initial value
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text("$" + highPrice);

    // Print the initial data to the console.
    console.log("Current High Price");
    console.log(highBidder);
    console.log(highPrice);
  }*/




});
