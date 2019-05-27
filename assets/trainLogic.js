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
  
  firebase.initializeApp(firebaseConfig);
  
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
    var fbName = childSnapshot.val().name;
    var fbDest = childSnapshot.val().destination;
    var fbFirst = childSnapshot.val().first;
    var fbFrequency = childSnapshot.val().frequency;
    
  
    // Employee Info
    console.log(fbName);
    console.log(fbDest);
    console.log(fbFirst);
    console.log(fbFrequency);
  
    // Convert First Train Time
    //var trnFirstPretty = moment.unix(trnFirst).format("HH:mm");
    var trnFirstConverted = moment(fbFirst, "hh:mm").subtract(1, "years");

    //Retrieve the current time
    //var current = moment();

    //Calculate difference between times, in minues
    var diffTime = moment().diff(moment(trnFirstConverted), "minutes");

    //Calculate the time apart
    var timeRemainder = diffTime % fbFrequency;

    //Calculate minutes until next train
    var timeMinutesToTrain = fbFrequency - timeRemainder;

    //Calculate the next train time
    var nextTrain = moment().add(timeMinutesToTrain, "minutes");
    var catchTrain = moment(nextTrain).format("HH:mm");

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(fbName),
      $("<td>").text(fbDest),
      $("<td>").text(fbFrequency),
      $("<td>").text(catchTrain),
      $("<td>").text(timeMinutesToTrain)
    );
  
    console.log(newRow);
    // Append the new row to the table
    $("#train-table tbody").append(newRow);
  });
  