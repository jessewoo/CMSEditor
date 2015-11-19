$(function(){
  //  console.log("one-view.js running");
   var pathArray = window.location.pathname.split( '/' );
   //  console.log(pathArray[2]);
   var momID = pathArray[2];

  //  console.log("one-view.js runs for " + momID);

   oneDisplay(momID);
});

var oneDisplay = function(momID) {
    console.log("MomID passed into function onDisplay: " + momID);
    // Pull data via ajax
    $.ajax({
        type: "get",
        url: "/do/one/" + momID,
        // url: "/do/one/2",
        dataType: "json",
        contentType: "application/json",
        success: function(data){
            console.log(data);
        }
    })
}
