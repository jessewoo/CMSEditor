$(function(){
    simpleForm();
});

var sectionCounter = 0
var simpleForm = function(){
    var newImageForm = "<form id='uploadImageForm' action='/sendImage' enctype='multipart/form-data' method='post'>" +
    "<input type='file' name='image-upload' />" +
    "<input type='submit' value='Upload Image' name='submit'>" +
    "</form>";
    $("#CreateNewImageForm").append(newImageForm);
};
