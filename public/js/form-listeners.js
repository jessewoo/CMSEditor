// LISTENERS
$(function () {
    $(document).on('click', '.addNewImage', function () {
        console.log("Add New Image Button clicked on!");
        $("#DynamicSection").append(newImageSection);
        $( document ).ready(function() {
            $("#DynamicSection").sortable();
            $("#DynamicSection").disableSelection();
        });
    });

    $(document).on('click', '.addNewParagraph', function () {
        console.log("Add New Paragraph Button clicked on!");
        $("#DynamicSection").append(newParagraphSection);
        $( document ).ready(function() {
            $("#DynamicSection").sortable();
            $("#DynamicSection").disableSelection();
        });
    });

    $(document).on('click', '.addNewSeparator', function () {
        console.log("Add New Separator Button clicked on!");
        $("#DynamicSection").append(newSeparator);
        $( document ).ready(function() {
            $("#DynamicSection").sortable();
            $("#DynamicSection").disableSelection();
        });
    });

    $(document).on('change', '.lastFileInput', function () {
        $(".lastFileInput").after("<input type='file' class='PDBfileUpload lastFileInput'>");
        $(this).removeClass("lastFileInput");
    });

    // Click Event Work on dynamically generated elements
    $(document).on('click', '.sectionActions .deleteSection', function () {
        console.log("Delete Section Button clicked on!");
        // Delete .variableSection div
        $(this).parents().eq(2).remove();
    });

});
