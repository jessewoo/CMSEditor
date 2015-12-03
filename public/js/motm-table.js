$(function(){
    motmTable();
});

// Called at full page load
var motmTable = function() {
    // Pull data via ajax, update DOM, apply sort handles
    $.ajax({
        type: "get",
        url: "/do/get/motm_articles",
        dataType: "json",
        contentType: "application/json",
        success: function(data){
            var rowCount = 0;
            $.each(data, function(index, object) {
                // Loop over all objects
                tableWorker(object, rowCount);
                rowCount++;
            });
        },
        failure: function(errMsg) {
            console.log(errMsg);
        }
    });
}

// Called only from "data add" event listener
// Gets arround tablesorter.js update bug which prevents jquery .empty from clearing previous contents of that database
var addToTable = function(object) {
    // Data to add (to the table) is passed via function call
    tableWorker(object);

    // Update the sort to include the new data
    $("#mainTable").trigger("update");

    // Update charts
    make_charts();
}

// Append to table function
var tableWorker = function(object, rowCount, maxRows) {
    var specialCSS = "";
    // Logic to show only 10 rows
    //if (rowCount > 9) {
    //  specialCSS = "style=\"display:none;\" class=\"specialCSS\"";
    //}
    var newRow = "<tr " + specialCSS + " pID='" + object._id + "'>";
    newRow += "<td pType='id'>" + object.id + "</td>";
    newRow += "<td><img class='img-thumbnail' src=" + "http://pdb101-dev.rcsb.org/pdb101/motm/images/" + object.first_image + "></td>";
    newRow += "<td pType='month'>" + object.month_name + "</td>";
    newRow += "<td pType='year'>" + object.year + "</td>";
    newRow += "<td pType='title'>" + object.title + "</td>";
    newRow += "<td pType='pdbid'>" + object.pdb_id + "</td>";
    newRow += "<td pType='teaser' pID='" + object._id + "'>" + object.teaser + "</td>";
    newRow += "<td><a href=\"/motm/" + object._id + "\"><span style='margin-right: 1em;' class='canEdit glyphicon glyphicon-pencil linkItem' aria-hidden='true' pType='link'></a></span></td>";
    newRow += "</tr>";

    // Prepend the new row (may not factor forward.)
    //$("#mainTable > tbody:last-child").prepend(newRow);
    // Append the new row
    $("#mainTable > tbody:last-child").append(newRow);
}
