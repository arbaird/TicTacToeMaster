var userRef; //The firebase reference to the specific user
var unlockedRef; //The firebase reference to the unlocked section of each user
var userUnlocked; //The object that stores each item's unlock status
//The string that contains unlocked status consists of 0's(locked) and 1's(unlocked)
var unlockedBoard; //String repsensentation of the unlocked status of board design
var unlockedPiece; //String repsensentation of the unlocked status of piece design
var unlockedBackground; //String repsensentation of the unlocked status of background design
var selectedList; //String representation of what is slected for each customization category
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

    console.log("In customization");

    var argumentVals = window.location.hash.split('&&');
    console.log(argumentVals);
    
    var keyValue = argumentVals[1]; 
    console.log(keyValue);
    var nameOfUser = argumentVals[2];
    console.log(nameOfUser);
    var battleText = argumentVals[3];
    console.log(battleText);
    var cashMoney = argumentVals[4];
    console.log(cashMoney);
    var url = argumentVals[5];
    console.log(url);
		
		userRef = firebase.database().ref('/users/' + keyValue);
		//gets reference for the user's unlocked items
		unlockedRef=userRef.child('unlocked');
		initializeLocked();
		initializeSelected();
    
    $( window ).on( "load", function() { 

        console.log("Poooooooop!!");

        document.getElementById('username').innerHTML = nameOfUser;
        document.getElementById('battleText').innerHTML = battleText;
        document.getElementById('cash').innerHTML = '$' + cashMoney;
        $('.image').attr('src', url);
    
        //Home Page
        $('#homePage').on('click', function (e) {
            e.preventDefault();

            console.log("going to achievements");
            console.log("name: ", nameOfUser);
            console.log("battleText: ", battleText);
            console.log("cashMoney: ", cashMoney);
            console.log("url: ", url);

            // var argumentData = [keyValue, nameOfUser, battleText, cashMoney, urlVar];
            // console.log("arguments: ", argumentData);

            window.location.href = "mainMenu.html" + '#&&' + keyValue + '&&' + nameOfUser + '&&' + battleText + '&&' + cashMoney + '&&' + url + '&&null';
            //window.location.href = "achievements.html?key="+keyValue+"&username="+nameOfUser+"&battleText="+battleText+"&cashMoney="+cashMoney+"&url="+url;
            
        });

        //Edit Profile
        $('#editProfile').on('click', function (e) {
            e.preventDefault();

            console.log("going to achievements");
            console.log("name: ", nameOfUser);
            console.log("battleText: ", battleText);
            console.log("cashMoney: ", cashMoney);
            console.log("url: ", url);

            // var argumentData = [keyValue, nameOfUser, battleText, cashMoney, urlVar];
            // console.log("arguments: ", argumentData);

            window.location.href = "editProfile.html" + '#&&' + keyValue + '&&' + nameOfUser + '&&' + battleText + '&&' + cashMoney + '&&' + url + '&&null';
            //window.location.href = "achievements.html?key="+keyValue+"&username="+nameOfUser+"&battleText="+battleText+"&cashMoney="+cashMoney+"&url="+url;
            
        });


        //Achievements
        $('#achievements').on('click', function (e) {
            e.preventDefault();

            console.log("going to customization");
            console.log("name: ", nameOfUser);
            console.log("battleText: ", battleText);
            console.log("cashMoney: ", cashMoney);
            console.log("url: ", url);

            window.location.href = "achievements.html" + '#&&' + keyValue + '&&' + nameOfUser + '&&' + battleText + '&&' + cashMoney + '&&' + url + '&&null';
        });

        //Leaderboard
        $('#leaderboard').on('click', function (e) {
            e.preventDefault();

            console.log("going to leaderboards");
            console.log("name: ", nameOfUser);
            console.log("battleText: ", battleText);
            console.log("cashMoney: ", cashMoney);
            console.log("url: ", url);

            window.location.href = "leaderboard.html" + '#&&' + keyValue + '&&' + nameOfUser + '&&' + battleText + '&&' + cashMoney + '&&' + url + '&&null';
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

/*function checkAlreadySelected(buttonId){
	var itemIndex=buttonId.charAt(buttonId.length-1);
	userRef.once('value', function(snapshot) {
		selectedList= snapshot.val().selected;
		if (buttonId.startsWith("board")){
			console.log("compared "+selectedList.charAt(0)+" with "+itemIndex);
			console.log("so the result is: ",selectedList.charAt(0)==itemIndex)
			return selectedList.charAt(0)==itemIndex;
		}else if(buttonId.startsWith("piece")){
			return selectedList.charAt(1)==itemIndex;
		}else if(buttonId.startsWith("backgorund")){
			return selectedList.charAt(2)==itemIndex;
		}else{
			console.log("buttonId error: incorrectId");
		}
	});
}*/
function changeSelection(buttonId){
	var itemIndex=buttonId.charAt(buttonId.length-1);
	var selectedRef=userRef.child('selected');
	if (buttonId.startsWith("board")){
		var currentSelected= selectedList.charAt(0);
		remove("boardSelectedTag"+currentSelected);
		selectedList=replaceAtIndex(selectedList,0,itemIndex);
		appear("boardSelectedTag"+itemIndex);
	}else if(buttonId.startsWith("piece")){
		var currentSelected= selectedList.charAt(1);
		remove("pieceSelectedTag"+currentSelected);
		selectedList=replaceAtIndex(selectedList,1,itemIndex);
		appear("pieceSelectedTag"+itemIndex);
	}else if(buttonId.startsWith("background")){
		var currentSelected= selectedList.charAt(2);
		remove("backgroundSelectedTag"+currentSelected);
		selectedList=replaceAtIndex(selectedList,2,itemIndex);
		appear("backgroundSelectedTag"+itemIndex);
	}else{
		console.log("buttonId error: incorrectId");
	}
	selectedRef.set(
  	selectedList
  );
}
//makes elecment specified by id appear
function appear(id) {
	var targetElement = document.getElementById(id);
	targetElement.style.display = "block";
}

//makes element specified by id disappear
function remove(id) {
	var removeTarget = document.getElementById(id);
	removeTarget.style.display = "none";
}

//removes w3-grayscale class from images
function removeGrayScale(id) {
	var element = document.getElementById(id);
	element.classList.remove("w3-grayscale-max");
}

// removes the locktag, button, and grayscale class to show specified item is unlocked
function unlock(buttonId, tagId, imageId){
	remove(tagId);
	remove(buttonId);
	removeGrayScale(imageId);
	document.getElementById(imageId).addEventListener("click", function(){
    console.log("selected: ",imageId);
		changeSelection(buttonId);
	});
}

/* 
Gets the string represntation of what's unlocked(1) and what's locked(0) from firbase and unlocks the corresponding item for each category (board design, piece design, and background design)
*/
function initializeLocked(){
	unlockedRef.once('value', function(snapshot) {
		//gets the reference for each data to read
			userUnlocked = snapshot.val();
			unlockedBoard = userUnlocked.board;
			unlockedPiece = userUnlocked.piece;
			unlockedBackground = userUnlocked.background;
		//unlock unlocked items for board design
			for (var boardIndex=0; boardIndex<unlockedBoard.length;boardIndex++){
				if(unlockedBoard.charAt(boardIndex)=="1"){									
				unlock("boardButton"+boardIndex,"boardLockTag"+boardIndex,"boardImage"+boardIndex);
				}
			}
		//unlock unlocked items for piece design
			for (var pieceIndex=0; pieceIndex<unlockedPiece.length;pieceIndex++){
				if(unlockedPiece.charAt(pieceIndex)=="1"){									
					unlock("pieceButton"+pieceIndex,"pieceLockTag"+pieceIndex,"pieceImage"+pieceIndex);
				}
			}
		//unlock unlocked items for background design
			for (var backgroundIndex=0; backgroundIndex<unlockedBackground.length;backgroundIndex++){
				if(unlockedBackground.charAt(backgroundIndex)=="1"){									
					unlock("backgroundButton"+backgroundIndex,"backgroundLockTag"+backgroundIndex,"backgroundImage"+backgroundIndex);
				}
			}
		});
}
function initializeSelected(){
	userRef.once('value', function(snapshot) {
		selectedList= snapshot.val().selected;
		appear("boardSelectedTag"+selectedList.charAt(0));
		appear("pieceSelectedTag"+selectedList.charAt(1));
		appear("backgroundSelectedTag"+selectedList.charAt(2));
	});
}

//takes in a string and change a character specified by the index
function replaceAtIndex(string,index,char){
	var newString ="";
	//loops through the string, replacing the character at index by 1 while keeping the rest
	for(var i=0;i<string.length;i++){
		if(i==index) newString+=char;
		else newString+=string.charAt(i);
	}
	return newString;
}

//when an item is purchased
function updateAndUnlock(buttonId, tagId, imageId){
	//gets item's index number for swapping out character
	var itemIndex=buttonId.charAt(buttonId.length-1);
	//console.log("swap index: ",itemIndex);
	if(buttonId.startsWith("board")){
		//console.log("initial board unlocked status: ",unlockedBoard);
		unlockedBoard=replaceAtIndex(unlockedBoard,itemIndex,"1");
		//gets the reference to the child node storing the string that repsents board unlock status
		var boardRef=unlockedRef.child('board'); 
		//replaces the onld string with the new one
		boardRef.set(
      unlockedBoard
    );
		//console.log("new board unlock status: ",unlockedBoard);
	}else if (buttonId.startsWith("piece")){
		//console.log("initial piece unlocked status: ",unlockedPiece);
		unlockedPiece=replaceAtIndex(unlockedPiece,itemIndex,"1");
		var pieceRef=unlockedRef.child('piece');
		pieceRef.set(
      unlockedPiece
    );
		//console.log("new piece unlock status: ",unlockedPiece);
	}else if (buttonId.startsWith("background")){
		//console.log("initial background unlocked status: ",unlockedBackground);
		unlockedBackground=replaceAtIndex(unlockedBackground,itemIndex,"1");
		var backgroundRef=unlockedRef.child('background');
		backgroundRef.set(
      unlockedBackground
    );
		//console.log("new background unlock status: ",unlockedBackground);
	}else{
		console.log("buttonId error: incorrectId");
	}
	unlock(buttonId,tagId,imageId);
}
