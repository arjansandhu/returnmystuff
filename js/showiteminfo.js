var Phone = document.getElementById('Phone');
var Email = document.getElementById('Email');
var Facebook = document.getElementById('Facebook');
var PhoneBool;
var EmailBool;
var FacebookBool;

window.onload = function() {
  details();
};

function checkPhoneInfo() {
	PhoneBool = true;
	EmailBool = false;
	FacebookBool = false;

	getInfo();
}

function checkEmailInfo() {
	document.getElementById("info").innerHTML = "Contact Person via Email.";
	PhoneBool = false;
	EmailBool = true;
	FacebookBool = false;

	getInfo();
}

function checkFacebookInfo() {
	document.getElementById("info").innerHTML = "Contact Person via Facebook.";
	PhoneBool = false;
	EmailBool = false;
	FacebookBool = true;

	getInfo();
}

function details() {
	var db = firebase.database();
	var unparsedId = getParameterByName('id');
	var userId = unparsedId.substr(0, unparsedId.indexOf('?'));
	var itemId = getParameterByName('itemid');
	var usersRef = db.ref("/users/" + userId);
	var itemsRef = db.ref("/users/" + userId + "/Items");
	var output;

	usersRef.on("value", function(snapshot) {
		document.getElementById("owner").innerHTML = snapshot.val().name;

	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
	itemsRef.on("value", function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
	        if (!String(childSnapshot.val().itemId).localeCompare(String(itemId))){
	        	output = "Item: " + String(childSnapshot.key);
	        	document.getElementById("itemdetails").innerHTML = output;
	        	console.log(document.getElementById("itemdetails").innerHTML);
	        }
	    });
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
	
}

function getInfo() {
  usersRef.on("value", function(snapshot) {

	  if (PhoneBool){
	  	document.getElementById("info").innerHTML = "Contact Person via Phone: <br/>" + snapshot.val().phone_number;
	  }
	  if (EmailBool){
	  	document.getElementById("info").innerHTML = "Contact Person via Email: <br/>" + snapshot.val().email;
	  }
	  if (FacebookBool){
	  	document.getElementById("info").innerHTML = "Contact Person via Facebook: <br/>";
	  }

	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});

}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}