$(function() {
    // The click(): "direct" binding, will only attach the handler to elements that ALREADY exist.
    $("#addNewImage").click(function() {
    console.log("Add New Image Button clicked on!");
    addNewImageSection();
  });

  $("#addNewParagraph").click(function() {
    console.log("Add New Paragraph Button clicked on!");
    addNewParagraphSection();
  });

  $(document).on('change', '.lastFileInput', function() {
    $(".lastFileInput").after("<input type='file' class='PDBfileUpload lastFileInput'>");
    $(this).removeClass("lastFileInput");
  });

  // Click Event Work on dynamically generated elements
  $(document).on('click', '.sectionActions .moveSection', function() {
    console.log("Move Section Button clicked on!");
  });

  $(document).on('click', '.sectionActions .editSection', function() {
    console.log("Edit Section Button clicked on!");
  });

  $(document).on('click', '.sectionActions .deleteSection', function() {
    console.log("Delete Section Button clicked on!");
    // Delete .variableSection div
    $(this).parents().eq(1).remove();
  });

});
