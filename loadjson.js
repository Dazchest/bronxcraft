

function loadJson(filename, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            jsonData = JSON.parse(this.responseText);
            callback(jsonData);
            return;
        }
    };
    xhttp.open("GET", filename, true);
    xhttp.send();
}