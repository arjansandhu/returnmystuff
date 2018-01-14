/**
 * Handles the sign in button press.
 */
function toggleSignIn() {
  if (firebase.auth().currentUser) {
    // [START signout]
    firebase.auth().signOut();
    // [END signout]
  } else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }
    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    // Sign in with email and pass.
    // [START authwithemail]
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END authwithemail]
  }
  window.location = "http://www.findmyshit.tech/userHome/index.html" + "?id=" + firebase.auth().currentUser.uid;
}

function writeUserData(userId, name, email, phone_number) {
  var ref = firebase.database().ref();
  var usersRef = ref.child("users").child(userId);
  usersRef.set({
    name: name,
    email: email,
    phone_number: phone_number
  });
}


function phonenumber(phonenumber) { 

  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  if(String(phonenumber).match(phoneno))  {
    return true;  
  }
  else {  
    alert("message");  
    return false;  
  }  
}  

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  var email = document.getElementById('emailSignUp').value;
  var password = document.getElementById('passwordSignUp').value;
  var phone_number = document.getElementById("phonenumber").value;
  var confirm_password = document.getElementById("confirm-password").value;
  var name = document.getElementById("name").value;
  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }
  if (password != confirm_password) {
    alert('Passwords do not match.');
    return;
  }
  if (name.length < 0){
    alert('Please enter a name.')
    return;
  }

  //checking if valid phone number
  if (!phonenumber(phone_number)){
    return;
  }

  // Sign in with email and pass.
  // [START createwithemail]
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  writeUserData(firebase.auth().currentUser.uid, name, email, phone_number);
  // [END createwithemail]
  // alert('user added');
  // $("#login-form").delay(100).fadeIn(100);
  //   $("#register-form").fadeOut(100);
  //   $('#register-form-link').removeClass('active');
  //   $(this).addClass('active');
  //   e.preventDefault();

  //   var form = document.getElementById("login-form");
  //   form.reset();
}

/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
  // [START sendemailverification]
  firebase.auth().currentUser.sendEmailVerification().then(function() {
    // Email Verification sent!
    // [START_EXCLUDE]
    alert('Email Verification Sent!');
    // [END_EXCLUDE]
  });
  // [END sendemailverification]
}

function sendPasswordReset() {
  var email = document.getElementById('email').value;
  // [START sendpasswordemail]
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    alert('Password Reset Email Sent!');
    // [END_EXCLUDE]
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    console.log(error);
    // [END_EXCLUDE]
  });
  // [END sendpasswordemail];
}

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
// function initApp() {
//   // Listening for auth state changes.
//   // [START authstatelistener]
//   firebase.auth().onAuthStateChanged(function(user) {
//     // [START_EXCLUDE silent]
//     document.getElementById('quickstart-verify-email').disabled = true;
//     // [END_EXCLUDE]
//     if (user) {
//       // User is signed in.
//       var displayName = user.displayName;
//       var email = user.email;
//       var emailVerified = user.emailVerified;
//       var photoURL = user.photoURL;
//       var isAnonymous = user.isAnonymous;
//       var uid = user.uid;
//       var providerData = user.providerData;
//       // [START_EXCLUDE]
//       document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
//       document.getElementById('quickstart-sign-in').textContent = 'Sign out';
//       document.getElementById('quickstart-account-details').textContent = JSON.stringify(user, null, '  ');
//       if (!emailVerified) {
//         document.getElementById('quickstart-verify-email').disabled = false;
//       }
//       // [END_EXCLUDE]
//     } else {
//       // User is signed out.
//       // [START_EXCLUDE]
//       document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
//       document.getElementById('quickstart-sign-in').textContent = 'Sign in';
//       document.getElementById('quickstart-account-details').textContent = 'null';
//       // [END_EXCLUDE]
//     }
//     // [START_EXCLUDE silent]
//     document.getElementById('quickstart-sign-in').disabled = false;
//     // [END_EXCLUDE]
//   });
//   // [END authstatelistener]

//   document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
//   document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
//   document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
//   document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
// }

// window.onload = function() {
//   initApp();
// };