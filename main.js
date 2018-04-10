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
var now = moment().format('HH:mm');

//console.log(moment(firstTime).add(freq,'m').format("hh:mm"));
console.log(now);


$("#add-train").on("click", function () {
    var name = $("#name-input").val().trim();
    var des = $("#destination-input").val().trim();
    console.log(`${name} ${des}`);
    var firstTime = $("#firstTrain-input").val().trim();
    var freq = $("#freq-input").val().trim();
    event.preventDefault();
    if (name == "" || des == "" || freq == 0 || firstTime == 0 ) {
        alert("Validate all inputs");
    } else {
        var firstCon = moment(firstTime, 'HH:mm').subtract(1, 'years');
        console.log(firstCon);
        var diff = moment().diff(firstCon, 'm');
        var remain = diff % freq;
        var minLeft = freq - remain;
        var next = moment().add(minLeft, 'm').format('hh:mm A');
        database.ref().push({
            name: name,
            des: des,
            firstTime: firstTime,
            diff: diff,
            minLeft: minLeft,
            freq: freq,
            next: next
        });
    }




});


//database.ref().on("value", function (snapshot) {
database.ref().on("child_added", function (childSnapshot) {
    // Log everything that's coming out of snapshot
    // console.log(snapshot.val());
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().des);
    console.log(childSnapshot.val().firstTime);
    console.log(childSnapshot.val().freq);
    console.log(childSnapshot.val().next);

    $("#nameDis").append("<div id='row'><span class='nameDis'> " + childSnapshot.val().name)
        - $("#desDis").append("<div id='row'><span class='desDis'> " + childSnapshot.val().des)
        - $("#freqDis").append("<div id='row'><span class='freq'> " + childSnapshot.val().freq)

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
