var classroomsDict = {
    1: "This classroom is a traditional classroom. It has one projector that works through VGA and HDMI connections.",
    2: "This classroom is a Tec21 equiped classroom. It has two projectors that work through wireless technologies.",
    3: "This is an auditorium in the FEMSA building. It has a projector, a high-end sound system and a podium.",
    4.1: "This is the advanced manufacturing lab. It has a semi-automatic and a fully automatic manufacturing machine. Special training is required to operate the machines and to use the classroom."
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
        showClassroomTable("All");
        showDropdown();
    } else {
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
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

function showClassroomTable(value){
    $('#ex-table-sessions').empty();
    $('#ex-table-classrooms').empty();
    document.getElementById("user_text").innerHTML = '';

    if(value=='All')
        document.getElementById("backBTN").style.display = 'none';
    else
        document.getElementById("backBTN").style.display = 'block';

    var header = '';
    header += '<tr id="tr">';
    header += '<th>Classroom</th>';
    header += '<th>Building</th>';
    header += '<th>Floor</th>';
    header += '<th>Maximum Capacity</th>';
    $('#ex-table-classrooms').append(header);
    var database = firebase.database();
    database.ref('classrooms').once('value', function(snapshot){
        if(snapshot.exists()){
            var content = '';
            snapshot.forEach(function(data){
                var val = data.val();
                if(value == "All" || value==val.building){
                content +='<tr>';
                //content += '<td onClick= showClassroomDetail(2202)>' + val.classroom_code + '</td>';
                content += '<td onClick= showClassroomDetail('+ val.classroom_code + ')>' + val.classroom_code + '</td>';
                content += '<td>' + val.building + '</td>';
                content += '<td>' + val.floor + '</td>';
                content += '<td>' + val.quota + '</td>';
                content += '</tr>';
                }
            });
            $('#ex-table-classrooms').append(content);
        }
    });
}

function showClassroomDetail(classroom_id){
    $('#ex-table-classrooms').empty();
    $('#ex-table-sessions').empty();
    document.getElementById("backBTN").style.display = 'block';
    var header = '';
    header += '<tr id="tr">';
    header += '<th>Classroom</th>';
    header += '<th>Date</th>';
    header += '<th>Time</th>';
    header += '<th>Teacher</th>';
    header += '<th>Subject</th>';
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
                    content += '<td>' + val.time_start + ' - ' + val.time_end + '</td>';
                    content += '<td>' + val.name + '</td>';
                    content += '<td>' + val.motive + '</td>';
                    content += '</tr>';
                }
            });
            $('#ex-table-sessions').append(content);
        }
    });

    database.ref('classrooms').once('value', function(snapshot){
        if(snapshot.exists()){
            snapshot.forEach(function(data){
                var val = data.val();
                if(val.classroom_code == classroom_id) {
                    var thisType = val.type;
                    document.getElementById("user_text").innerHTML = classroomsDict[thisType];
                }
            });
        }
    });

}

function showDropdown(){
    $("#classrooms").append("<select class = 'dropbtn' id='classrooms_dropdown'></br>");
    $("#classrooms_dropdown").append("<option value='All'>Building</option>");
    var rootRef = firebase.database().ref().child("classrooms");
    rootRef.on("child_added", snap => {
        var code = snap.child("building").val();
        $("#classrooms_dropdown").append("<option value='"+code+"'>"+code+"</option>");
    });
    $("#classrooms").append(" </select></div><p></p>");
    $("#classrooms").append("<button onclick= 'filterClassrooms()'>Search </button>");


    
}

function filterClassrooms(){
    let filter = document.getElementById("classrooms_dropdown");
    console.log(filter.value);
    showClassroomTable(filter.value);
}
