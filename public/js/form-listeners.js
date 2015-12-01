// +++++++ CRUD Actions for Each Section +++++++++++++
var sectionActions = "<div class='btn-group pull-right sectionActions'>";
sectionActions += "<button type='button' class='btn btn-default btn-sm moveSection' aria-label='Move'><span class='glyphicon glyphicon-move' aria-hidden='true'></span></button>";
sectionActions += "<button type='button' class='btn btn-default btn-sm deleteSection' aria-label='Delete'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span></button>";
sectionActions += "</div>";

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


// LISTENERS
$(function() {
  $("#addNewVariableSection").click(function() {
    console.log("Add New Variable Section!");
    addNewButton();
  });

  $(document).on('click', '.addNewImage', function() {
    console.log("Add New Image Button clicked on!");
    var location = $(this).parent();
    $(location).append(newImageSection);
  });

  $(document).on('click', '.deleteThisSection', function() {
    console.log("Delete This Section!");
    $(this).parent().remove();
  });

  $(document).on('click', '.addNewParagraph', function() {
    console.log("Add New Paragraph Button clicked on!");
    var location = $(this).parent();
    $(location).append(newParagraphSection);
  });

  $(document).on('change', '.lastFileInput', function() {
    $(".lastFileInput").after("<input type='file' class='PDBfileUpload lastFileInput'>");
    $(this).removeClass("lastFileInput");
  });

  // Click Event Work on dynamically generated elements
  $(document).on('click', '.sectionActions .moveSection', function() {
    console.log("Move Section Button clicked on!");
  });

  $(document).on('click', '.sectionActions .deleteSection', function() {
    console.log("Delete Section Button clicked on!");
    // Delete .variableSection div
    $(this).parents().eq(2).remove();
  });

});
