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
        database.ref().push({
            name: name,
            des: des,
            firstTime: firstTime,
            diff: diff,
            minLeft: minLeft,
            freq: freq,
        });
    }
});

database.ref().on("child_added", function (childSnapshot) {

    var next = moment().add(childSnapshot.val().minLeft, 'm').format('hh:mm A');
    $("#nameDis").append("<div id='row'>" + childSnapshot.val().name)
    $("#desDis").append("<div id='row'>" + childSnapshot.val().des)
    $("#freqDis").append("<div id='row'>" + childSnapshot.val().freq)
    $("#nextDis").append("<div id='row'>" + next)
    $("#minAwayDis").append("<div id='row'>" + childSnapshot.val().minLeft)
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
