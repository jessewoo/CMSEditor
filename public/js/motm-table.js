$(function(){
    motmTable();
});

// Called at full page load
var motmTable = function() {
    // Pull data via ajax, update DOM, apply sort handles
    $.ajax({
        type: "get",
        url: "/do/get",
        dataType: "json",
        contentType: "application/json",
        success: function(data){
            var rowCount = 0;
            $.each(data, function(index, object) {
                // Loop over all objects
                tableWorker(object);
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
var tableWorker = function(object) {
    var newRow = "<tr pID='" + object._id + "'>";
    newRow += "<td pType='id' pID='" + object._id + "'>" + object.id + "</td>";
    newRow += "<td><img class='img-thumbnail' src=" + "http://pdb101-dev.rcsb.org/pdb101/motm/images/" + object.first_image + "></td>";
    newRow += "<td pType='month' pID='" + object._id + "'>" + object.month_name + "</td>";
    newRow += "<td pType='title' pID='" + object._id + "'>" + object.title + "</td>";
    newRow += "<td pType='teaser' pID='" + object._id + "'>" + object.teaser + "</td>";
    newRow += "</tr>";

    // Append the new row
    $("#mainTable > tbody:last-child").append(newRow);
}