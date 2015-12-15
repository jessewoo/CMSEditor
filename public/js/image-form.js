$(function(){
    simpleForm();
});

var simpleForm = function(){
    var newImageForm = "<form id='uploadImageForm' enctype='multipart/form-data' action='/do/image' method='post'>" +
    "<input type='file' name='userPhoto' />" +
    "<input type='submit' value='Upload Image' name='submit'>" +
    "</form>";
    $("#CreateNewImageForm").append(newImageForm);
};

// LISTENERS
$(function(){
    $(document).on('change', '.uploadImageForm')
});