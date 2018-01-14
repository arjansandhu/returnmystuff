function getItems() {
  var db = firebase.database();
  var userId = getParameterByName('id');
  var itemToken = randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  var usersRef = db.ref("/users/" + userId + "/Items");
  usersRef.on("value", function(snapshot) {
  	  var items = document.getElementById("output");
  	  items.innerHTML = "";

	  snapshot.forEach(function(childSnapshot) {
	        var item = childSnapshot.val();
	        item.key = childSnapshot.key;

	        var output = document.createElement("li");
	        output.innerHTML = childSnapshot.key;
	        items.appendChild(output);
	    });
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});

}

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};


var myitems_button = document.getElementById('myitems'); // Assumes element with id='button'
var qrcode_button = document.getElementById('addqrcode'); // Assumes element with id='button'

qrcode_button.onclick = function() {
    var div = document.getElementById('item-name');
    if (div.style.display !== 'none') {
        div.style.display = 'block';
    }
    else {
        div.style.display = 'block';
    }
    var div = document.getElementById('qrcode');
    if (div.style.display !== 'none') {
        div.style.display = 'block';
    }
    else {
        div.style.display = 'block';
    }
    var div = document.getElementById('createqr');
    if (div.style.display !== 'none') {
        div.style.display = 'block';
    }
    else {
        div.style.display = 'block';
    }
    var div = document.getElementById('items');
    if (div.style.display !== 'block') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'none';
    }

    getItems();
};

myitems_button.onclick = function() {
    var div = document.getElementById('item-name');
    if (div.style.display !== 'block') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'none';
    }
    var div = document.getElementById('qrcode');
    if (div.style.display !== 'block') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'none';
    }
    var div = document.getElementById('createqr');
    if (div.style.display !== 'block') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'none';
    }
    var div = document.getElementById('items');
    if (div.style.display !== 'none') {
        div.style.display = 'block';
    }
    else {
        div.style.display = 'block';
    }

    getItems();
};