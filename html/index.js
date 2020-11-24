firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
        showClassroomTable();
    } else {
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
   }

    var user = firebase.auth().currentUser;
    if(user != null){
        var student_id = user.email.substr(0, user.email.indexOf('@'));
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

function showClassroomTable(){
    $('#ex-table-sessions').empty();
    var header = '';
    header += '<tr id="tr">';
    header += '<th>Classroom</th>';
    header += '<th>Maximum Capacity</th>';
    header += '<th>Building</th>';
    header += '<th>Floor</th>';
    $('#ex-table-classrooms').append(header);
    var database = firebase.database();
    database.ref('classrooms').once('value', function(snapshot){
        if(snapshot.exists()){
            var content = '';
            snapshot.forEach(function(data){
                var val = data.val();
                content +='<tr>';
                //content += '<td onClick= showClassroomDetail(2202)>' + val.classroom_code + '</td>';
                content += '<td onClick= showClassroomDetail('+ val.classroom_code + ')>' + val.classroom_code + '</td>';
                content += '<td>' + val.quota + '</td>';
                content += '<td>' + val.building + '</td>';
                content += '<td>' + val.floor + '</td>';
                content += '</tr>';
            });
            $('#ex-table-classrooms').append(content);
        }
    });
}

function showClassroomDetail(classroom_id){
    $('#ex-table-classrooms').empty();
    var header = '';
    header += '<tr id="tr">';
    header += '<th>Classroom</th>';
    header += '<th>Date</th>';
    header += '<th>Motive</th>';
    header += '<th>Teacher</th>';
    header += '<th>Time end</th>';
    header += '<th>Time start</th>';
    $('#ex-table-sessions').append(header);
    var database = firebase.database();
    database.ref('sessions').once('value', function(snapshot){
        if(snapshot.exists()){
            var content = '';
            snapshot.forEach(function(data){
                var val = data.val();
                if(val.classroom_code==classroom_id){
                    content +='<tr>';
                    content += '<td>' + val.classroom_code + '</td>';
                    content += '<td>' + val.date + '</td>';
                    content += '<td>' + val.motive + '</td>';
                    content += '<td>' + val.name + '</td>';
                    content += '<td>' + val.time_end + '</td>';
                    content += '<td>' + val.time_start + '</td>';
                    content += '</tr>';
                }
            });
            $('#ex-table-sessions').append(content);
        }
    });
}
