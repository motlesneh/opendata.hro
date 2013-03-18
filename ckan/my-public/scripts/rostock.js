function datumsanzeige(datumsstring) {
    if (datumsstring.length >= 10) {
        return datumsstring.substring(8,10)+"."+datumsstring.substring(5,7)+"."+datumsstring.substring(0,4)
    } else {
        return datumsstring
    }
}

function lizenzanzeige(lizenzstring) {
    switch (lizenzstring) {
        case "odc-by":
            return "ODC-By"
        case "cc-by":
            return "CC BY 3.0"
        default:
            return lizenzstring
    }
}

function sectoranzeige(sectorstring) {
    switch (sectorstring) {
        case "oeffentlich":
            return "öffentlicher Sektor"
        case "privat":
            return "privater Sektor"
        case "andere":
            return "sonstiger"
        default:
            return sectorstring
    }
}

function ressourcentypanzeige(typstring) {
    switch (typstring) {
        case "file":
            return "Datei"
        case "api":
            return "API"
        case "visualization":
            return "Visualisierung"
        case "image":
            return "Bild"
        case "metadata":
            return "Metadaten"
        case "documentation":
            return "Dokumentation"
        case "code":
            return "Code"
        case "example":
            return "Beispiel"
        default:
            return typstring
    }
}

function sprachenanzeige(sprachenstring) {
    switch (sprachenstring) {
        case "de":
            return "Deutsch"
        case "en":
            return "Englisch"
        default:
            return sprachenstring
    }
}

function datastoreanzeige(boolstring) {
    switch (boolstring) {
        case "True":
            return "aktiv"
        case "False":
            return "nicht aktiv"
        default:
            return boolstring
    }
}

function zeitstempelanzeige(zeitstempelstring) {
    if (zeitstempelstring.length >= 19) {
        return zeitstempelstring.substring(8,10)+"."+zeitstempelstring.substring(5,7)+"."+zeitstempelstring.substring(0,4)+", "+zeitstempelstring.substring(11,19)+" Uhr"
    } else {
        return zeitstempelstring
    }
}

function granularitaetsanzeige(granularitaetsstring) {
    switch (granularitaetsstring) {
        case "jahr":
            return "Jahr"
        default:
            return granularitaetsstring
    }
}

function in_array(array, value) {
    for (var i = 0; i < array.length; i++)
        if (array[i] == value)
            return true
    
    return false
}
function formatanzeige(formatarray) {
    unique = [];
    unique_index = 0;
    for (var i = 0; i < formatarray.length; i++) {
        if (!in_array(unique, formatarray[i])) 
        {
            unique[unique_index] = formatarray[i];
            unique_index++;
        }
    }
    
    formatstring = "";
    for (var j = 0; j < unique_index; j++) {
        formatstring += "<li style=\"margin-right:5px\">" + unique[j] + "</li>";
    }
    
    return formatstring;
}