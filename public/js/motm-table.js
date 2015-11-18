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

            // Only do this if there is data to sort/display
            if (rowCount > 0) {
                // Enable the table to be sorted
                $("#mainTable").tablesorter({
                    sortList: [[4,0],[0,0]],
                    textExtraction: function(node) {
                        if (node.className.indexOf('linkItem') > -1 ) {
                            // console.log("Link item with value of " + node.getAttribute("link-value"));
                            // Return link data
                            return node.getAttribute("link-value");
                        } else if (node.className.indexOf('discussItem') > -1 ) {
                            // console.log("Discuss item with value of " + node.getAttribute("discuss-value"));
                            // Return true/flase of flag
                            return node.getAttribute("discuss-value");
                        }
                        else {
                            // Return regular HTML to perform alphabetic sort
                            return node.innerHTML;
                        }
                    }
                });

                // Update sort & bind new content
                $("#mainTable").trigger("update");

                // Update charts
                make_charts();
            }
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
    var newRow = "<tr>";
    //newRow += "<td><button class='btn btn-xs btn-default removeProject hide' value='" + object._id + "'><span style='color: #888; margin-top: 3px' class='glyphicon glyphicon-remove' aria-hidden='true'></span></button><span class='project-area canEdit' pType='area' pID='" + object._id + "'>" + object.area + "</span></td>";
    newRow += "<td pType='id' pID='" + object._id + "'>" + object.id + "</td>";
    newRow += "<td><img class='image-thumbnail' src=" + "http://pdb101-dev.rcsb.org/pdb101/motm/images/" + object.first_image + "></td>";
    //newRow += "<td pType='image' pID='" + object._id + "'>" + object.first_image + "</td>";
    newRow += "<td pType='month' pID='" + object._id + "'>" + object.month_name + "</td>";
    newRow += "<td pType='title' pID='" + object._id + "'>" + object.title + "</td>";
    newRow += "<td pType='teaser' pID='" + object._id + "'>" + object.teaser + "</td>";
    //newRow += "<td class='canEdit' pType='status' pID='" + object._id + "'>" + object.status + "</td>";
    //newRow += "<td class='project-scheduale canEdit' pType='scheduale' pID='" + object._id + "'>" + object.scheduale + "</td>";
    newRow += "</tr>";

    // Append the new row
    $("#mainTable > tbody:last-child").append(newRow);
}