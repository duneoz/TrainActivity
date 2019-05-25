// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBDWDELOeFQj2oRSI1e1yjyZ_747vGpGq0",
    authDomain: "trainactivity-66e43.firebaseapp.com",
    databaseURL: "https://trainactivity-66e43.firebaseio.com",
    projectId: "trainactivity-66e43",
    storageBucket: "trainactivity-66e43.appspot.com",
    messagingSenderId: "306601074267",
    appId: "1:306601074267:web:556e4050c3ece868"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trnName = $("#train-name-input").val().trim();
    var trnDest = $("#destination-input").val().trim();
    var trnFirst = moment($("#first-train-input").val().trim(), "HH:mm").format("X");
    var trnFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrn = {
      name: trnName,
      destination: trnDest,
      first: trnFirst,
      frequency: trnFrequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrn);
  
    // Logs everything to console
    console.log(newTrn.name);
    console.log(newTrn.destination);
    console.log(newTrn.first);
    console.log(newTrn.frequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trnName = childSnapshot.val().name;
    var trnDest = childSnapshot.val().destination;
    var trnFirst = childSnapshot.val().first;
    var trnFrequency = childSnapshot.val().frequency;
    
  
    // Employee Info
    console.log(trnName);
    console.log(trnDest);
    console.log(trnFirst);
    console.log(trnFrequency);
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(empStart, "X"), "months");
    console.log(empMonths);
  
    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);
  
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(empName),
      $("<td>").text(empRole),
      $("<td>").text(empStartPretty),
      $("<td>").text(empMonths),
      $("<td>").text(empRate),
      $("<td>").text(empBilled)
    );
  
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case