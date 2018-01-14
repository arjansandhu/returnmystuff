var qrcode = new QRCode(document.getElementById("qrcode"));

function makeCode (itemId, userId) {    
    var elText = document.getElementById("item-name");  
    
    if (!elText.value) {
        alert("Input a text");
        elText.focus();
        return;
    }
    
    qrcode.makeCode("found.html" + "?id=" + userId + "?itemid=" + itemId);
}

$("#text").
    on("blur", function () {
        makeCode();
    }).
    on("keydown", function (e) {
        if (e.keyCode == 13) {
            makeCode();
        }
    });

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


function writeItemData() {
  var ref = firebase.database().ref();
  var itemName = document.getElementById('item-name').value;
  var userId = getParameterByName('id');
  var itemToken = randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  var usersRef = ref.child("users").child(userId).child("Items").child(itemName);
  usersRef.set({
    itemId: itemToken
  });

  makeCode(itemToken, userId);
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
