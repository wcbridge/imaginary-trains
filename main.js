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
var firstTime ='';
var freq = 0;
var now = moment().format('HH:mm');

//console.log(moment(firstTime).add(freq,'m').format("hh:mm"));
console.log(now);   
console.log(firstTime);

//moment().format('hh:mm');

$("#add-train").on("click", function () {
    // Don't refresh the page!
    event.preventDefault();

    
    name = $("#name-input").val().trim();
    des = $("#destination-input").val().trim();
    firstTime = $("#firstTrain-input").val().trim();
    freq = $("#freq-input").val().trim();
   
   var firstCon = moment(firstTime, 'HH:mm');
    var diff = moment().diff(firstCon, 'm');
    var remain = diff % freq;
    var minLeft = freq - remain;
   
   var next = moment().add(minLeft,'m').format('hh:mm A');
   
   
    database.ref().push({
        name: name,
        des: des,
        firstCon: firstCon,
        diff : diff,
        minLeft : minLeft,
        freq: freq,
        next: next
    });

});


//database.ref().on("value", function (snapshot) {
    database.ref().on("child_added", function (childSnapshot) {
    // Log everything that's coming out of snapshot
   // console.log(snapshot.val());
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().des);
    console.log(childSnapshot.val().firstCon);
    console.log(childSnapshot.val().freq);
    console.log(childSnapshot.val().next);

        $("#row").append("<div id='well'><span class='nameDis'> " + childSnapshot.val().name+
        "</span><span class='desDis'> " + childSnapshot.val().des+
        "</span><span class='freq'> " + childSnapshot.val().freq + " </span></div>")
        
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });
    