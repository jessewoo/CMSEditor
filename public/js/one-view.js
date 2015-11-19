$(function(){
    oneDisplay(id);
});

var oneDisplay = function(id) {
    console.log("Mom id passed: " + id);
    // Pull data via ajax
    $.ajax({
        type: "get",
        url: "/do/one/1",
        dataType: "json"
        contentType: "application/json",
        success: function(data){

        }
    })
}

