
var data = [];
var record_counter = 0;
var dysplay_mode = 1;

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
    if (document.getElementById("ve_do").checked) {
        bunka3.innerHTML = dob;
    } else {
        bunka3.innerHTML = get_age(dob);
    }
    
    bunka4.innerHTML = '<button onclick="remove_rov(this)" class="btn btn-danger">X</button>';
    riadok.appendChild(bunka1);
    riadok.appendChild(bunka2);
    riadok.appendChild(bunka3);
    riadok.appendChild(bunka4);
    riadok.setAttribute('id', "row_" + record_counter);
    if (gender) {
        riadok.setAttribute('gender', 'female');
    } else {
        riadok.setAttribute('gender', 'male');
    }
    table.appendChild(riadok);
    record_counter++;
    /*******************/
    if (dysplay_mode === 2) {
        show_woman();
    } else if (dysplay_mode === 3) {
        show_men();
    }
}

function remove_rov(cell_id) {
    var rov_id = cell_id.parentNode.parentNode.id;
    var parent = cell_id.parentNode.parentNode;
    var t_body = cell_id.parentNode.parentNode.parentNode;
    t_body.removeChild(parent);
    //romove form arr
    for (var i = data.length -1 ; i >= 0; i--) {
        if (data[i].id == rov_id) {
            data[i].is_removed = true;
        }
    }
    
    if (t_body.childNodes.length == 0) {
        document.getElementById('tabulka').style.display = 'none';
    }
}

function show_woman() {
    dysplay_mode = 2;
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].getAttribute('gender') === 'male') {
            rows[i].style.display = 'none';
        } else {
            rows[i].style.display = '';
        }
    }
}

function show_men() {
    dysplay_mode = 3;
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        if (rows[i].getAttribute('gender') === 'female') {
            rows[i].style.display = 'none';
        } else {
            rows[i].style.display = '';
        }
    }
}

function show_all() {
    dysplay_mode = 1;
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        rows[i].style.display = '';
    }
}

function get_age(dob) {
    dob = dob.replace(/ /g, "");
    dob = dob.split(".");
    dob = dob[2] + "-" + dob[1] + "-" + dob[0];

    dob = new Date(dob);
    var age = Date.now() - dob.getTime();
    age = new Date(age);
    return (age.getFullYear() - 1970);
}

function build_table_by_age() {
    document.getElementById('dob_age').innerHTML = 'vek';
    var tabl = document.getElementById("telo_tabulky");
    for (var i = 0; i < tabl.childNodes.length; i++) {
        var dat = get_date(tabl.childNodes[i]);
        var age = get_age(dat);
        tabl.childNodes[i].childNodes[2].innerHTML = age;
    }

    function get_date(node) {
        for (var j = 0; j < data.length; j++) {
            if (node.id === data[j].id)
                return data[j].dob;
        }
    }
}

function build_table_by_dob() {
    document.getElementById('dob_age').innerHTML = 'datum narodenia';
    var tabl = document.getElementById("telo_tabulky");
    for (var i = 0; i < tabl.childNodes.length; i++) {
        tabl.childNodes[i].childNodes[2].innerHTML = get_date(tabl.childNodes[i]);
    }

    function get_date(node) {
        for (var j = 0; j < data.length; j++) {
            if (node.id === data[j].id)
                return data[j].dob;
        }
    }
}

function save_data_to_storage() {
    var to_sav = [];
    for (var i = 0 ; i < data.length; i++) {
        if (!data[i].is_removed) {
            to_sav[to_sav.length] = data[i];
        }
    }
    localStorage.removeItem('_tabulka_');
    if (to_sav.length > 0) {
        localStorage.setItem('_tabulka_', JSON.stringify(to_sav));
    }
}

function load_data_from_storage() {
    var s_data = localStorage.getItem('_tabulka_');
    if (s_data === null)
        return;
    s_data = JSON.parse(s_data);
    for (var i = 0; i < s_data.length; i++) {
        data[data.length] = s_data[i];

        var table = document.getElementById("telo_tabulky");
        var riadok = document.createElement("tr");
        var bunka1 = document.createElement("td");
        var bunka2 = document.createElement("td");
        var bunka3 = document.createElement("td");
        var bunka4 = document.createElement("td");


        bunka1.innerHTML = s_data[i].first_name;
        bunka2.innerHTML = s_data[i].last_name;
        bunka3.innerHTML = s_data[i].dob;
        bunka4.innerHTML = '<button onclick="remove_rov(this)" class="btn btn-danger">X</button>';
        riadok.appendChild(bunka1);
        riadok.appendChild(bunka2);
        riadok.appendChild(bunka3);
        riadok.appendChild(bunka4);
        riadok.setAttribute('id', "row_" + record_counter);
        if (s_data[i].gender) {
            riadok.setAttribute('gender', 'female');
        } else {
            riadok.setAttribute('gender', 'male');
        }
        table.appendChild(riadok);

        document.getElementById("tabulka").setAttribute("style", "margin:0 auto;");
        record_counter++;
    }

}