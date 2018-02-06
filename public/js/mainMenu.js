$(document).ready(function() {

// Initialize Firebase
var config = {
    apiKey: "AIzaSyARQqkwmw-yDfR4Fl7eyDSs464kPyDTWpo",
    authDomain: "tictactoemaster-b46ab.firebaseapp.com",
    databaseURL: "https://tictactoemaster-b46ab.firebaseio.com",
    projectId: "tictactoemaster-b46ab",
    storageBucket: "tictactoemaster-b46ab.appspot.com",
    messagingSenderId: "1050901435462"
};
firebase.initializeApp(config);

console.log("In Home Page");

var keyValue;
var nameOfUser;
var battleText;
var cashMoney;
var url;

var argumentVals = window.location.hash.split('&&');
console.log(argumentVals);

keyValue = argumentVals[1]; 
console.log(keyValue);
nameOfUser = argumentVals[2];
console.log(nameOfUser);
battleText = argumentVals[3];
console.log(battleText);
cashMoney = argumentVals[4];
console.log(cashMoney);
url = argumentVals[5];
console.log(url);

$( window ).on( "load", function() { 

    console.log("Poooooooop!!");

    document.getElementById('username').innerHTML = nameOfUser;
    document.getElementById('battleText').innerHTML = battleText;
    document.getElementById('cash').innerHTML = '$' + cashMoney;
    $('.image').attr('src', url);

    //Achievements
    $('#achievements').on('click', function (e) {
        e.preventDefault();

        console.log("going to achievements");
        console.log("name: ", nameOfUser);
        console.log("battleText: ", battleText);
        console.log("cashMoney: ", cashMoney);
        console.log("url: ", url);

        // var argumentData = [keyValue, nameOfUser, battleText, cashMoney, urlVar];
        // console.log("arguments: ", argumentData);

        window.location.href = "achievements.html" + '#&&' + keyValue + '&&' + nameOfUser + '&&' + battleText + '&&' + cashMoney + '&&' + url;
        //window.location.href = "achievements.html?key="+keyValue+"&username="+nameOfUser+"&battleText="+battleText+"&cashMoney="+cashMoney+"&url="+url;
            
    });

    //Customization
    $('#customization').on('click', function (e) {
        e.preventDefault();

        console.log("going to customization");
        console.log("name: ", nameOfUser);
        console.log("battleText: ", battleText);
        console.log("cashMoney: ", cashMoney);
        console.log("url: ", url);

        window.location.href = "customization.html" + '#&&' + keyValue + '&&' + nameOfUser + '&&' + battleText + '&&' + cashMoney + '&&' + url;
    });

    //Leaderboard
    $('#leaderboard').on('click', function (e) {
        e.preventDefault();

        console.log("going to leaderboards");
        console.log("name: ", nameOfUser);
        console.log("battleText: ", battleText);
        console.log("cashMoney: ", cashMoney);
        console.log("url: ", url);

        window.location.href = "leaderboard.html" + '#&&' + keyValue + '&&' + nameOfUser + '&&' + battleText + '&&' + cashMoney + '&&' + url;
    });
})

 //create firebase references
 var Auth = firebase.auth();
 var dbRef = firebase.database();
 var auth = null;

//  console.log("name: ", nameOfUser);
//  console.log("battleText: ", battleText);
//  console.log("cashMoney: ", cashMoney);
//  console.log("url: ", url);
 
// //Achievements
// $('#achievements').on('click', function (e) {
//     e.preventDefault();

//     console.log("going to achievements");
//     console.log("name: ", nameOfUser);
//     console.log("battleText: ", battleText);
//     console.log("cashMoney: ", cashMoney);
//     console.log("url: ", url);

//     window.location.href = "achievements.html" + '#' + keyValue + '#' + nameOfUser + '#' + battleText + '#' + cashMoney + '#' + url;
// });

 //Logout
 $('#logout').on('click', function (e) {
     e.preventDefault();

     console.log("loggin out");

     firebase.auth().signOut()
                   .then(function(authData) {
                       console.log("Logged out successfully");
                       window.location.href = "index.html";
                       auth = authData;
                       //$('#messageModalLabel').html(spanText('Success!', ['center', 'success']))
                         
                   })
                   .catch(function(error) {
                       console.log("Logout Failed!", error);
                       //$('#messageModalLabel').html(spanText('ERROR: '+error.code, ['danger']))
                   });
 });

})
