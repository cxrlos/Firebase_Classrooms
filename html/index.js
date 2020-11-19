firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
    } else {
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
    }

    var user = firebase.auth().currentUser;
    if(user != null){
        var student_id = user.email.substr(0, user.email.indexOf('@'));
        console.log(student_id);
        document.getElementById("user_text").innerHTML = "Welcome to the system " + student_id;
    }

});

function login(){
    var email_account = document.getElementById("email_acc").value;
    var password_account = document.getElementById("pass_acc").value;

    firebase.auth().signInWithEmailAndPassword(email_account, password_account).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("ERROR [" + errorCode + "]: " + errorMessage);
    });
}

function logout() {
    firebase.auth().signOut().then(function() {
        window.alert("Sign-out successful");
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("ERROR [" + errorCode + "]: " + errorMessage);
    });
}
