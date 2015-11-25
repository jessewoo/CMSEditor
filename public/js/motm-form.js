// Build New Motm Molecule - Form
$(function(){
  var pathArray = window.location.pathname.split( '/' );
  var momID = pathArray[2];

  console.log("Sortable Function NOT FUNCTIONING");
  // $("#sortable" ).sortable();
  // $("#sortable" ).disableSelection();

  // Build out all of the page
  buildNewMOTM();

  addSortableSection();
  addNewVariableSection();

  // addNewButton();
  addNewExplorationSection();
  addNewJmolSection();
  addNewReferenceSection();

  // If we are editing something that already exists, populate with prior data
  if (momID) {
    populate_with_data(momID);
  }
});

// COMMON ACTIONS FOR EACH SECTIONS
// +++++++ CRUD Actions for Each Section +++++++++++++
var sectionActions = "<div class='btn-group pull-right sectionActions'>";
sectionActions += "<button type='button' class='btn btn-default btn-sm moveSection' aria-label='Move'><span class='glyphicon glyphicon-move' aria-hidden='true'></span></button>";
sectionActions += "<button type='button' class='btn btn-default btn-sm deleteSection' aria-label='Delete'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span></button>";
sectionActions += "</div>";

var myDate = new Date();
var theMonth = myDate.getMonth();
var monthsDropdown = "<select id='month' name='month' class='form-group'>";
var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
for (var i = 0; i < 12; i++){
  monthsDropdown += "<option value='" + i + "'>" + monthArray[i] + "</option>";
}
monthsDropdown += "</select>";

var yearDropdown = "<select id='year' name='year' class='form-group'>";
var year = myDate.getFullYear();
for (var i = 2000; i <= year + 2; i++) {
  yearDropdown += "<option value='" + i + "'>" + i + "</option>";
}
yearDropdown += "</select>";

// BUILD OUT OF ADDITIONAL SECTIONS
var buildNewMOTM = function() {
  var newForm = "<div id='EssentialsSection' class='form-group'>";
  newForm += "<h4>Essential Information</h4><hr>";
  newForm += "<h5>Motm ID</h5><input class='form-control' id='legacyMotMID' value='' disabled>";
  newForm += "<h5>Molecule Name / Title</h5><input class='form-control' id='articleTitle' placeholder='Molecule Name'>";
  newForm += "<h5>Teaser Description</h5><textarea class='form-control' id='articleTeaser' rows='2' placeholder='Teaser'></textarea>";
  newForm += "<h5>Author's Name</h5><input class='form-control' id='articleAuthor' placeholder='Author's Name'>";
  //TODO Need to rethink date editor
  newForm += "<h5>Date</h5>" + monthsDropdown + " " + yearDropdown;
  newForm += "<h5>Keywords <small>Separate with commas</small></h5><input class='form-control' id='articleKeywords' placeholder='Keywords - separate with comma'><br>";
  newForm += "</div>";

  $("#CreateNewForm").append(newForm);
}

// BUILD OUT OF ADDITIONAL SECTIONS
var addSortableSection = function() {
  var newSortableSection = "<div class='lastVariableSection'></div>";
  $("#AddVariableSections").append(newSortableSection);
}

var addNewVariableSection = function() {
  var newVariableSectionButton = "<br><div class='center-block text-center'>";
  newVariableSectionButton += "<button type='button' id='addNewVariableSection' class='btn btn-default btn-lg'>Add New Variable Section</button>";
  newVariableSectionButton += "</div>";

  $("#AddVariableSections").append(newVariableSectionButton);
}

// ADD IMAGE AND PARAGRAPH BUTTON IN A NEW SECTION
var addNewButton = function() {
  var newButton = "<ul class='section-block list-unstyled'>";
  newButton += "<button type='button' class='addNewImage btn btn-success btn-sm'>Add Image Section</button>";
  newButton += " <button type='button' class='addNewParagraph btn btn-primary btn-sm'>Add Paragraph Section</button>";
  newButton += " <button type='button' class='deleteThisSection btn btn-danger btn-sm pull-right'>Delete This Section</button>";
  newButton += "</ul>";
  $("#AddVariableSections .lastVariableSection").append(newButton);
}

var addNewExplorationSection = function() {
  var newExplorationSection = "<div class='form-group insertExploration'>";
  newExplorationSection += "<h4>Exploring the Structure</h4><hr>";
  newExplorationSection += "<h5>Insert Static Jmol Image</h5><input type='file' id='jmolStaticInputFile'><br>";
  newExplorationSection += "<textarea class='form-control' rows='3' placeholder='Exploring the Structure Content'></textarea><hr>";
  newExplorationSection += "<h5>Topics for Further Exploration</h5>";
  newExplorationSection += "<p>Begin each line item with &lt;li&gt;</p><textarea class='form-control' rows='3' placeholder='List of Topics'></textarea><br>";
  newExplorationSection += "</div>";

  $("#AddFixedSections").append(newExplorationSection);
}

var addNewJmolSection = function() {
  var newJmolSection = "<div class='form-group insertJmol'>";
  newJmolSection += "<h4>JSmol</h4><hr>";
  newJmolSection += "<h5>Select PDB Files</h5><input type='file' class='PDBfileUpload lastFileInput'>";
  newJmolSection += "<h5>Content</h5>";
  newJmolSection += "<textarea id='jmol-content' class='form-control' rows='5' placeholder='Content (for Humans)'></textarea><br>";
  newJmolSection += "<h5>JSmol Script</h5>";
  newJmolSection += "<p>Copy and paste the script</p><textarea id='jmol-script' class='form-control' rows='5' placeholder='Script (for Computers)'></textarea><br>";
  newJmolSection += "</div>";

  $("#AddFixedSections").append(newJmolSection);
}

var addNewReferenceSection = function() {
  var newReferenceSection = "<div class='form-group insertReferences'>";
  newReferenceSection += "<h4>References</h4><hr>";
  newReferenceSection += "<p>Begin each line item with &lt;li&gt;</p><textarea class='form-control' rows='3' placeholder='3jad: J. Du, W. Lu, S. Wu, Y. Cheng & E. Gouaux (2015) Glycine receptor mechanism...'></textarea><br>";
  newReferenceSection += "</div>";

  $("#AddFixedSections").append(newReferenceSection);
}

// Fills in the form with the data we already have
var populate_with_data = function(momID) {
    $.ajax({
        type: "get",
        url: "/do/one/" + momID,
        dataType: "json",
        contentType: "application/json",
        success: function(data){
            console.log(data);

            // Top of the page elements
            $('#legacyMotMID').val(data.id);
            $('#articleTitle').val(data.title);
            $('#articleTeaser').val(data.teaser);
            $('#articleAuthor').val(data.authors);
            $('#month').val(data.month - 1);
            $('#year').val(data.year);
            data.keywords.forEach(function(keyword) {
              var currentVal = $('#articleKeywords').val();
              if (currentVal) {
                  $('#articleKeywords').val(currentVal + ", " + keyword);
              } else {
                $('#articleKeywords').val(keyword);
              }
            });

            // Remove whatever is inside
            // $('#AddVariableSections').empty();

            // FOR LOOP NESTED
            data.sections.forEach(function(section) {
              var divSection = "<ul class='section-block list-unstyled'><button type='button' class='addNewImage btn btn-success btn-sm'>Add Image Section</button> <button type='button' class='addNewParagraph btn btn-primary btn-sm'>Add Paragraph Section</button><button type='button' class='deleteThisSection btn btn-danger btn-sm pull-right'>Delete This Section</button>";
              var paragraphSection = "";
              section.parts.forEach(function(part) {
                console.log(part.heading + " || " + part.content);
                paragraphSection += "<li><div class='form-group insertParagraph variableSection bg-warning'>";
                paragraphSection += sectionActions;
                paragraphSection += "<h5>Paragraph Section</h5><hr>";
                paragraphSection += "<input class='form-control' id='SectionTitle' value='" + part.heading + "'><br>";

                var escapedContent = part.content
                paragraphSection += "<p>" + escapedContent + "</p>";

                // NEED TO ADD IN ESCAPE SLASHES
                // paragraphSection += "<textarea class='form-control' type='text' rows='3' value='" + part.content + "'></textarea><br>";
                paragraphSection += "</div></li>";
                if ( part.images.length > 0 ){
                    //console.log("There is an Image: " + part.images[0].file_name + " in part: " + part.id);
                    var i = 0;
                    //while( i < part.images.length){
                    //    paragraphSection += "<";
                    //}

                } else {
                    console.log("No Image in part: " + part.id);
                }
              });
              divSection += paragraphSection + "</ul>";
              $('#AddVariableSections .lastVariableSection').append(divSection);
            });



            // JSmol elements
            $('#jmol-content').val(data.jmols[0].content);
            $('#jmol-script').val(data.jmols[0].script);


        }
    });
}
