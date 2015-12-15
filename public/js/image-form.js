$(function(){
    simpleForm();
});

var sectionCounter = 0
var simpleForm = function(){
    //var newImageForm = "<form id='uploadImageForm' enctype='multipart/form-data' action='/do/image' method='post'>" +
    var newImageForm = "<form id='uploadImageForm' section_number='" + sectionCounter + "' enctype='multipart/form-data' method='post'>" +
    "<input type='file' name='userPhoto' />" +
    "</form>";
    $("#CreateNewImageForm").append(newImageForm);
};

