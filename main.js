var config = {
    apiKey: "AIzaSyDgoemom8gQvDSI2VmCdCfZqlbAa367Gk8",
    authDomain: "imaginary-tra.firebaseapp.com",
    databaseURL: "https://imaginary-tra.firebaseio.com",
    projectId: "imaginary-tra",
    storageBucket: "",
    messagingSenderId: "202042540383"
};
firebase.initializeApp(config);

var database = firebase.database();

var name = "";
var destination = "";
var firstTime = 0;
var freq = 0;

$("#add-train").on("click", function () {
    // Don't refresh the page!
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    name = $("#name-input").val().trim();
    des = $("#destination-input").val().trim();
    firstTime = $("#firstTrain-input").val().trim();
    freq = $("#freq-input").val().trim();

    database.ref().push({
        name: name,
        des: des,
        firstTime: firstTime,
        freq: freq
    });

});

database.ref().on("child_added", function (childSnapshot) {

    // Log everything that's coming out of snapshot
    //console.log(snapshot.val());
    console.log(snapshot.val().name);
    console.log(snapshot.val().des);
    console.log(snapshot.val().firstTime);
    console.log(snapshot.val().freq);
   // database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
    // Change the HTML to reflect
    $("#nameDis").text(snapshot.val().name);
    $("#desDis").text(snapshot.val().des);
    $("#freqDis").text(snapshot.val().freq);
    // $("#comment-display").text(snapshot.val().comment);
//    })
    // // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});