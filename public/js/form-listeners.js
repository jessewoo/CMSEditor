
// ++++++++ CREATION OF THE IMAGE SECTION +++++++++++++
var newImageSection = "<li>";
newImageSection += "<div class='form-group insertImage variableSection bg-warning'>";
newImageSection += sectionActions;
newImageSection += "<h5>Image</h5><hr>";
newImageSection += "<h5>Insert Image</h5><input type='file' id='exampleInputFile'>";
newImageSection += "<select class='form-group'><option>Right Aligned</option><option>Left Aligned</option></select><br>";
newImageSection += "<select class='form-group'><option>First Image</option><option>Associated Image with Paragraph</option></select><br><br>";
newImageSection += "</div></li>";

// ++++++++ CREATION OF THE PARAGRAPH SECTION +++++++++++++
var newParagraphSection = "<li>";
newParagraphSection += "<div class='form-group insertParagraph variableSection bg-warning'>";
newParagraphSection += sectionActions;
newParagraphSection += "<h5>Paragraph Section</h5><hr><input class='form-control' id='SectionTitle' placeholder='Paragraph Heading'><br>";
newParagraphSection += "<textarea class='form-control' rows='3' placeholder='Paragraph Content'></textarea><br>";
newParagraphSection += "</div></li>";

// ++++++++ CREATION OF A SECTION SEPARATOR +++++++++++++
var newSeparator = "<li>";
newSeparator += "<div class='form-group insertSeparator variableSection bg-warning'>";
newSeparator += sectionActions;
newSeparator += "<hr />";
newSeparator += "</div></li>";


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
