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
	PhoneBool = false;
	EmailBool = true;
	FacebookBool = false;

	getInfo();
}

function checkFacebookInfo() {
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
		document.getElementById("owner").innerHTML = "Owner: " + snapshot.val().name;

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
	var db = firebase.database();
	var unparsedId = getParameterByName('id');
	var userId = unparsedId.substr(0, unparsedId.indexOf('?'));
	var itemId = getParameterByName('itemid');
	var usersRef = db.ref("/users/" + userId);
	var itemsRef = db.ref("/users/" + userId + "/Items");
  	usersRef.on("value", function(snapshot) {

	  if (PhoneBool){
	  	document.getElementById("info").innerHTML = "Contact Person via Phone: <br/><a id=\"email\" href=\"tel:" + snapshot.val().phone_number + "\">" + snapshot.val().phone_number + "</a>";
	  }
	  if (EmailBool){
	  	document.getElementById("info").innerHTML = "Contact Person via Email: <br/><a id=\"email\" href=\"mailto:" + snapshot.val().email + "\">" + snapshot.val().email + "</a>";
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


var x = document.getElementById("demo");

function getLocation() {
	  if (navigator.geolocation) {
	      navigator.geolocation.getCurrentPosition(showPosition);
	  } else {
	      alert("Geolocation is not supported by this browser.");
	  }
	}
function showPosition(position) {
	var db = firebase.database();
	var unparsedId = getParameterByName('id');
	var userId = unparsedId.substr(0, unparsedId.indexOf('?'));
	var itemId = getParameterByName('itemid');
	var usersRef = db.ref("/users/" + userId);
	var itemsRef = db.ref("/users/" + userId + "/Items");
	var email; 
  	usersRef.on("value", function(snapshot) {
  		email = snapshot.val().email;
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});

	console.log("1");
	var GoogleMapsURL = "https://www.google.com/maps/?q=" + position.coords.latitude + "," + position.coords.longitude;
	document.getElementById("mapURL").innerHTML = "Contact Person via Email: <br/><a id=\"email\" href=\"mailto:" + email + "\"?subject=subject&body=" + GoogleMapsURL + ">" + Send Location + "</a>";
	// window.location.href = 'mailto:' + email + '?subject=subject&body=' + GoogleMapsURL;
}








