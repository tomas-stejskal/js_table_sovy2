
var data = [];
var record_counter = 0;

function addRecord() {
    var first_name = document.getElementById("meno").value;
    var last_name = document.getElementById("priezvisko").value;
    var dob = document.getElementById("datum").value;
    var gender = document.getElementById("pohlavie").checked; //true=female ; false=male;

    var struct = {
        first_name: first_name,
        last_name: last_name,
        dob: dob,
        gender: gender,
        id: 'row_' + record_counter,
        is_removed:false
    }
    data[data.length] = struct;

    document.getElementById("tabulka").setAttribute("style", "margin:0 auto;");

    var table = document.getElementById("telo_tabulky");
    var riadok = document.createElement("tr");
    var bunka1 = document.createElement("td");
    var bunka2 = document.createElement("td");
    var bunka3 = document.createElement("td");
    var bunka4 = document.createElement("td");

    bunka1.innerHTML = first_name;
    bunka2.innerHTML = last_name;
    bunka3.innerHTML = dob;
    bunka4.innerHTML = '<button onclick="remove_rov(this)">X</button>';
    riadok.appendChild(bunka1);
    riadok.appendChild(bunka2);
    riadok.appendChild(bunka3);
    riadok.appendChild(bunka4);
    riadok.setAttribute('id', "row_" + record_counter);
    table.appendChild(riadok);
    record_counter++;
}

function remove_rov(cell_id) {
    var rov_id = cell_id.parentNode.parentNode.id;
    var parent = cell_id.parentNode.parentNode;
    var t_body = cell_id.parentNode.parentNode.parentNode;
    t_body.removeChild(parent);
    //romove form arr
    console.log(rov_id);
    for (var i = data.length -1 ; i >= 0; i--) {
        if (data[i].id == rov_id) {
            data[i].is_removed = true;
        }
    }
}