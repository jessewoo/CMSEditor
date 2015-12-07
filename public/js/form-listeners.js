// LISTENERS
$(function () {
    // Variable section [Add Image] button click handler
    $(document).on('click', '.addNewImage', function () {
        console.log("Add New Image Button clicked on!");
        $("#DynamicSection").append(factory_imageSection());
        $( document ).ready(function() {
            $("#DynamicSection").sortable();
            $("#DynamicSection").disableSelection();
        });
    });

    // Variable section [Add Paragraph] button click handler
    $(document).on('click', '.addNewParagraph', function () {
        console.log("Add New Paragraph Button clicked on!");
        $("#DynamicSection").append(newParagraphSection);
        $( document ).ready(function() {
            $("#DynamicSection").sortable();
            $("#DynamicSection").disableSelection();
        });
    });

    // Variable section [Add Separator] button click handler
    $(document).on('click', '.addNewSeparator', function () {
        console.log("Add New Separator Button clicked on!");
        $("#DynamicSection").append(newSeparator);
        $( document ).ready(function() {
            $("#DynamicSection").sortable();
            $("#DynamicSection").disableSelection();
        });
    });

    //// NOT SURE
    //$(document).on('change', '.lastFileInput', function () {
    //    $(".lastFileInput").after("<input type='file' class='PDBfileUpload lastFileInput'>");
    //    $(this).removeClass("lastFileInput");
    //});

    // Click Event Work on dynamically generated elements
    //$(document).on('click', '.sectionActions .deleteSection', function () {
    $(document).on('click', '.deleteSection', function () {
        console.log("Delete Section Button clicked on!");
        // Delete .variableSection div
        $(this).parents().eq(1).remove();
    });

    // Variable Setions -> Image [Add Caption] click handler
    $(document).on('click', '.addImageCaption', function () {
        console.log("Add Image Caption Button clicked on!");
        $(this).val()
    });

    $(document).on('click', '.image_alignment_choices', function () {
        var myNumber = $(this).attr('section_number');
        console.log($(this).val(), myNumber);
        console.log($('#image-example-' + myNumber).find('img'));
        var newClass = "pull-left";
        if ($(this).val() == "right") {
            newClass = "pull-right";
        }
        $('#image-example-' + myNumber).find('img').removeClass('pull-right').removeClass('pull-left').addClass(newClass);
    });
});
