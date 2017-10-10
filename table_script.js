
var data = [];
var record_counter = 0;
var dysplay_mode = 1;
var name_sortAZ = true;
var surename_sortAZ = true;
var sort_date = true;

function addRecord() {
    var pass = input_verificator();
    if (!pass) {
        return;
    } else {
        document.getElementById('err1').value = "";
        document.getElementById('err2').value = "";
        document.getElementById('err3').value = "";

        
    }
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
    if (!document.getElementById("ve_do").checked) {
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
    document.getElementById('meno').value = "";
    document.getElementById('priezvisko').value = "";
    document.getElementById('datum').value = "";
}

function remove_rov(cell_id) {
    var rov_id = cell_id.parentNode.parentNode.id;
    var parent = cell_id.parentNode.parentNode;
    var t_body = cell_id.parentNode.parentNode.parentNode;
    t_body.removeChild(parent);
    //romove form arr
    for (var i = 0; i < data.length; i++) {
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
    document.getElementById('dob_age').innerHTML = 'age';
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
    document.getElementById('dob_age').innerHTML = 'date of birth';
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
        data[i].id = "row_" + record_counter;

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

function input_verificator() {
    var pass = true;

    var f_name = document.getElementById('meno').value;
    var l_name = document.getElementById('priezvisko').value;
    var dob = document.getElementById('datum').value;

    

    var patern = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    if (patern.test(f_name)) {
        document.getElementById('err1').innerHTML = '';
    }else{
        pass = false;
        document.getElementById('err1').innerHTML = 'Incorrect name';
    }
    if (patern.test(l_name)) {
        document.getElementById('err2').innerHTML = '';
    } else {
        pass = false;
        document.getElementById('err2').innerHTML = 'Incorrect surename';
    }

    if (dob == "") {
        pass == false;
        document.getElementById('err3').innerHTML = 'Date must be selected';
        return pass;
    }

    dob = dob.replace(/ /g, "");
    dob = dob.split(".");
    dob = dob[2] + "-" + dob[1] + "-" + dob[0];
    dob = new Date(dob);
    if (Date.now() < dob.getTime()) {
        pass = false;
        document.getElementById('err3').innerHTML = 'Can\'t be a future time';
    } else {
        document.getElementById('err3').innerHTML = '';
    }
    return pass;
}

function age_dob_switch(argv) {
    if (argv.checked) {
        build_table_by_age();
    } else {
        build_table_by_dob();
    }
}

function sorting_by_name() {
    var table = document.getElementById('telo_tabulky').childNodes;

    if (name_sortAZ) {
        name_sortAZ = false;

        for (var i = 0; i < table.length; i++) {
            for (var j = 0; j < table.length - 1; j++) {

                var val1 = table[j].childNodes;
                val1 = val1[0].innerHTML;

                var val2 = table[j + 1].childNodes;
                val2 = val2[0].innerHTML;

                if (val1 > val2) {
                    table[0].parentNode.insertBefore(table[j + 1], table[j]);
                }
            }
        }
    } else {
        name_sortAZ = true;

        for (var i = 0; i < table.length; i++) {
            for (var j = 0; j < table.length - 1; j++) {

                var val1 = table[j].childNodes;
                val1 = val1[0].innerHTML;

                var val2 = table[j + 1].childNodes;
                val2 = val2[0].innerHTML;

                if (val1 < val2) {
                    table[0].parentNode.insertBefore(table[j + 1], table[j]);
                }
            }
        }
    }
}

function sorting_by_surename() {
    var table = document.getElementById('telo_tabulky').childNodes;

    if (surename_sortAZ) {
        surename_sortAZ = false;

        for (var i = 0; i < table.length; i++) {
            for (var j = 0; j < table.length - 1; j++) {

                var val1 = table[j].childNodes;
                val1 = val1[1].innerHTML;

                var val2 = table[j + 1].childNodes;
                val2 = val2[1].innerHTML;

                if (val1 > val2) {
                    table[0].parentNode.insertBefore(table[j + 1], table[j]);
                }
            }
        }
    } else {
        surename_sortAZ = true;

        for (var i = 0; i < table.length; i++) {
            for (var j = 0; j < table.length - 1; j++) {

                var val1 = table[j].childNodes;
                val1 = val1[1].innerHTML;

                var val2 = table[j + 1].childNodes;
                val2 = val2[1].innerHTML;

                if (val1 < val2) {
                    table[0].parentNode.insertBefore(table[j + 1], table[j]);
                }
            }
        }
    }
}

function sort_by_dob() {
    function get_time(dob) {
        dob = dob.replace(/ /g, "");
        dob = dob.split(".");
        dob = dob[2] + "-" + dob[1] + "-" + dob[0];
        dob = new Date(dob);
        return dob.getTime();
    }
    var table = document.getElementById('telo_tabulky').childNodes;
    
    if (document.getElementById('ve_do').checked) {
        if (sort_date) {
            sort_date = false;

            for (var i = 0; i < table.length; i++) {
                for (var j = 0; j < table.length - 1; j++) {

                    var val1 = table[j].childNodes;
                    val1 = val1[2].innerHTML;

                    var val2 = table[j + 1].childNodes;
                    val2 = val2[2].innerHTML;

                    if (Number(val1) > Number(val2)) {
                        table[0].parentNode.insertBefore(table[j + 1], table[j]);
                    }
                }
            }
        } else {
            sort_date = true;

            for (var i = 0; i < table.length; i++) {
                for (var j = 0; j < table.length - 1; j++) {

                    var val1 = table[j].childNodes;
                    val1 = val1[2].innerHTML;

                    var val2 = table[j + 1].childNodes;
                    val2 = val2[2].innerHTML;

                    if (Number(val1) < Number(val2)) {
                        table[0].parentNode.insertBefore(table[j + 1], table[j]);
                    }
                }
            }
        }
    } else {
        if (sort_date) {
            sort_date = false;

            for (var i = 0; i < table.length; i++) {
                for (var j = 0; j < table.length - 1; j++) {

                    var val1 = table[j].childNodes;
                    val1 = val1[2].innerHTML;
                    val1 = get_time(val1);

                    var val2 = table[j + 1].childNodes;
                    val2 = val2[2].innerHTML;
                    val2 = get_time(val2);

                    if (val1 > val2) {
                        
                        table[0].parentNode.insertBefore(table[j + 1], table[j]);
                    }
                }
            }
        } else {
            sort_date = true;

            for (var i = 0; i < table.length; i++) {
                for (var j = 0; j < table.length - 1; j++) {

                    var val1 = table[j].childNodes;
                    val1 = val1[2].innerHTML;
                    val1 = get_time(val1);

                    var val2 = table[j + 1].childNodes;
                    val2 = val2[2].innerHTML;
                    val2 = get_time(val2);

                    if (val1 < val2) {
                        table[0].parentNode.insertBefore(table[j + 1], table[j]);
                    }
                }
            }
        }
    }
}
