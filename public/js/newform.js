// Build New Motm Molecule - Form
$(function(){
  buildNewMOTM();
  // addNewParagraphSection();
  // addNewImageSection();
  addNewButton();
  addNewExplorationSection();
  addNewJmolSection();
  addNewReferenceSection();
});

// COMMON ACTIONS FOR EACH SECTIONS
// +++++++ CRUD Actions for Each Section +++++++++++++
var sectionActions = "<div class='btn-group pull-right sectionActions'>";
sectionActions += "<button type='button' class='btn btn-default btn-sm' aria-label='Move'><span class='glyphicon glyphicon-move' aria-hidden='true'></span></button>";
sectionActions += "<button type='button' class='btn btn-default btn-sm' aria-label='Edit'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button>";
sectionActions += "<button type='button' class='btn btn-default btn-sm' aria-label='Duplicate'><span class='glyphicon glyphicon-duplicate' aria-hidden='true'></span></button>";
sectionActions += "<button type='button' class='btn btn-default btn-sm' aria-label='Delete'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span></button>";
sectionActions += "</div>";

// ++++++++ DONE Button for Each Section +++++++++
var doneButton = "<button class='btn btn-primary btn-sm' type='submit'>Done</button>";

var monthsDropdown = "<select id='month' name='month' class='form-group'><option value='0'>Month</option>";
monthsDropdown +=	"<option value='1'>January</option>"
monthsDropdown +=	"<option value='2'>February</option>"
monthsDropdown +=	"<option value='3'>March</option>"
monthsDropdown +=	"<option value='4'>April</option>"
monthsDropdown +=	"<option value='5'>May</option>"
monthsDropdown +=	"<option value='6'>June</option>"
monthsDropdown +=	"<option value='7'>July</option>"
monthsDropdown +=	"<option value='8'>August</option>"
monthsDropdown +=	"<option value='9'>September</option>"
monthsDropdown +=	"<option value='10'>October</option>"
monthsDropdown +=	"<option value='11'>November</option>"
monthsDropdown +=	"<option value='12'>December</option>"
monthsDropdown += "</select>";

var yearDropdown = "<select id='year' name='year' class='form-group'>";
var myDate = new Date();
var year = myDate.getFullYear();
for (var i = 2000; i < year + 11; i++) {
  yearDropdown += "<option value='" + i + "'>" + i + "</option>";
}
yearDropdown += "</select>";


// BUILD OUT OF ADDITIONAL SECTIONS
var buildNewMOTM = function() {
  var newForm = "<div id='EssentialsSection' class='form-group'>";
  newForm += "<h4>Essential Information</h4><hr>";
  newForm += "<h5>Motm ID</h5><input class='form-control' id='MolecularID' placeholder='187' disabled>";
  newForm += "<h5>Molecule Name / Title</h5><input class='form-control' id='MoleculeName' placeholder='Molecule Name'>";
  newForm += "<h5>Teaser Description</h5><textarea class='form-control' rows='2' placeholder='Molecule Teaser Description'></textarea>";
  newForm += "<h5>Author's Name</h5><input class='form-control' id='AuthorName' placeholder='Author's Name'>";
  newForm += "<h5>Date</h5>" + monthsDropdown + " " + yearDropdown;
  newForm += "<h5>Keywords <small>Separate with commas</small></h5><input class='form-control' id='KeywordsSection' placeholder='Keywords - separate with comma'><br>";
  newForm += "</div>";

  $("#CreateNewForm").append(newForm);
}

var addNewButton = function() {
  var newButton = "<div class='center-block text-center'>";
  newButton += "<button type='button' id='addNewImage' class='btn btn-success btn-lg'>Add Image Section</button>";
  newButton += " <button type='button' id='addNewParagraph' class='btn btn-primary btn-lg'>Add Paragraph Section</button>";
  newButton += "</div>";

  $("#AddNewButton").append(newButton);
}

var addNewParagraphSection = function() {
  var newParagraphSection = "<div class='form-group insertParagraph bg-warning'>";
  newParagraphSection += sectionActions;
  newParagraphSection += "<h4>Paragraph Section</h4><hr><input class='form-control' id='SectionTitle' placeholder='Paragraph Heading'><br>";
  newParagraphSection += "<textarea class='form-control' rows='3' placeholder='Paragraph Content'></textarea><br>";
  newParagraphSection += doneButton;
  newParagraphSection += "</div>";

  $("#AddVariableSections").append(newParagraphSection);
}

var addNewImageSection = function() {
  var newImageSection = "<div class='form-group insertImage bg-warning'>";
  newImageSection += sectionActions;
  newImageSection += "<h4>Image Section</h4><hr>";
  newImageSection += "<h5>Insert Image</h5><input type='file' id='exampleInputFile'>";
  newImageSection += "<select class='form-group'><option>Right Aligned</option><option>Left Aligned</option></select><br>";
  newImageSection += "<select class='form-group'><option>First Image</option><option>Associated Image with Paragraph</option></select><br><br>";
  newImageSection += doneButton;
  newImageSection += "</div>";

  $("#AddVariableSections").append(newImageSection);
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
  newJmolSection += "<h4>Jmol Sections</h4><hr>";
  newJmolSection += "<h5>Drop your PDB Files</h5><form action='/upload-target' class='dropzone'></form>";
  newJmolSection += "<h5>JSmol Instructions</h5>";
  newJmolSection += "<textarea class='form-control' rows='3' placeholder='load FILES 3DGE.pdb model * select all...'></textarea><br>";
  newJmolSection += "<h5>JSmol Script</h5>";
  newJmolSection += "<p>Copy and paste the script</p><textarea class='form-control' rows='3' placeholder='<script> var jmolApplet0; var Info=...'></textarea><br>";
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
