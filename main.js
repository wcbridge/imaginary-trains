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

console.log(moment(firstTime).add(freq,'m').format("hh:mm"));
   

//moment().format('hh:mm');

$("#add-train").on("click", function () {
    // Don't refresh the page!
    event.preventDefault();

    
    name = $("#name-input").val().trim();
    des = $("#destination-input").val().trim();
    firstTime = $("#firstTrain-input").val().trim();
    freq = $("#freq-input").val().trim();
   // next=next;

    console.log((firstTime +moment(15,'m')));
   // console.log(moment(firstTime).add(moment(freq,'m'), "hh:mm"))
   // console.log(moment(firstTime).add(freq, 'm').format("hh:mm"));
//console.log(freq);
    database.ref().push({
        name: name,
        des: des,
        firstTime: firstTime,
        freq: freq,
      //  next: next
    });

});


//database.ref().on("value", function (snapshot) {
    database.ref().on("child_added", function (childSnapshot) {
    // Log everything that's coming out of snapshot
   // console.log(snapshot.val());
    // console.log(childSnapshot.val().name);
    // console.log(childSnapshot.val().des);
    // console.log(childSnapshot.val().firstTime);
    // console.log(childSnapshot.val().freq);
    // console.log(childSnapshot.val().next);

        $("#nameDis").append("<div id='row'><span class='nameDis'> " + childSnapshot.val().name)
        $("#desDis").append("<div id='row'><span class='desDis'> " + childSnapshot.val().des)
        $("#freqDis").append("<div id='row'><span class='freq'> " + childSnapshot.val().freq)
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
//       database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
 
//     $("#nameDis").text(childSnapshot.val().name);
//     $("#desDis").text(childSnapshot.val().des);
//     $("#freqDis").text(childSnapshot.val().freq);
//     $("#comment-display").text(childSnapshot.val().comment);

// // }, function (errorObject) {
// //     console.log("Errors handled: " + errorObject.code);
// // });
//    })