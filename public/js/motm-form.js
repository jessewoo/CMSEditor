// Build New Motm Molecule - Form
$(function () {
    var pathArray = window.location.pathname.split('/');
    var momID = pathArray[2];

    // Build out all of the page
    fillCategories();
    buildNewMOTM();

    addSortableSection();
    addNewVariableSection();

    addNewExplorationSection();
    addNewJmolSection();
    addNewReferenceSection();

    // If we are editing something that already exists, populate with prior data
    if (momID) {
        populate_with_data(momID);
    }
});

//LETS DO SOME GLOBAL VARIABLES - L2 k0d n00b
var categories = "";
var subcat = "";

// COMMON ACTIONS FOR EACH SECTIONS

// +++++++ CRUD ACTIONS FOR VARIABLE SECTION li +++++++++++++
var sectionActions = "<div class='btn-group pull-right sectionActions'>" +
    "<button type='button' class='btn btn-default btn-sm deleteSection' aria-label='Delete'>" +
    "<span class='glyphicon glyphicon-trash' aria-hidden='true'></span>" +
    "</button>" +
    "</div>";

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
var newParagraphSection = "<li>" +
    "<div class='form-group insertParagraph variableSection bg-warning'>";
newParagraphSection += sectionActions;
newParagraphSection += "<h5>Paragraph Section</h5><hr>" +
    "<input class='form-control' id='SectionTitle' placeholder='Paragraph Heading'><br>" +
    "<textarea class='form-control' rows='3' placeholder='Paragraph Content'></textarea><br>" +
    "</div></li>";

// ++++++++ CREATION OF A SECTION SEPARATOR +++++++++++++
var newSeparator = "<li>" +
    "<div class='form-group insertSeparator variableSection bg-warning'>";
newSeparator += sectionActions;
newSeparator += "<hr /></div></li>";

// ++++++++ CREATION OF CATEGORY DROPDOWN +++++++++++++
var newCategory = "<li>"
// BUILD OUT OF ADDITIONAL SECTIONS
var buildNewMOTM = function () {
    // TODO populate the legacyMotmID with the next avaliable id.
    var newForm = "<form class='form-horizontal' role='form'>" +
        "<div id='EssentialsSection' class='form-group'>" +
        "<h4>Essential Information</h4><hr>" +
        "<label for='legacyMotmID'>Molecule of the Month ID</label><input class='form-control' id='legacyMotMID' value='' disabled>" +
        "<label for='articleTitle'>Molecule Name / Title</label><input class='form-control' id='articleTitle' placeholder='Molecule Name'>" +
        "<label for='articleTeaser'>Article Teaser</label><textarea auto='yes' class='form-control' id='articleTeaser' rows='1' placeholder='Teaser'></textarea>" +
        "<label for='articleAuthor'>Author's Name</label><input class='form-control' id='articleAuthor' placeholder='Author'>";
    var theDate = new Date();
    var year = theDate.getFullYear();
    var nextMonth = theDate.getMonth();
    if (nextMonth == 11) {
        nextMonth = 0;
        year++;
    } else {
        nextMonth++;
    }
    var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    newForm += "<label for='releaseMonth'>Release Month</label><select class='form-control' id='releaseMonth'>"
    for (var i = 0; i < 12; i++) {
        if (i == nextMonth) {
            newForm += "<option value='" + i + "' selected>" + monthArray[i] + "</option>";
        } else {
            newForm += "<option value='" + i + "'>" + monthArray[i] + "</option>";
        }
    }
    newForm += "</select>";
    newForm += "<label for='releaseYear'>Release Year</label><select class='form-control' id='releaseYear'>"
    for (var i = 2000; i < year + 2; i++) {
        if (i == year) {
            newForm += "<option value='" + i + "' selected>" + i + "</option>";
        } else {
            newForm += "<option value='" + i + "'>" + i + "</option>";
        }
    }
    newForm += "</select>";
    newForm += "<label for='articleCategory'>Category</label><select class='form-control' id='articleCategory'></select>";
    newForm += "<label for='articleKeywords'>Keywords - <small>Separate with commas</small></label><input class='form-control' id='articleKeywords' placeholder='Keywords - separate with comma'>";
    newForm += "</div></form>";

    $("#CreateNewForm").append(newForm);
};

// Add the Sortable section
var addSortableSection = function () {
    var newSortableSection = "<div class='lastVariableSection'></div>";
    $("#AddVariableSections").append(newSortableSection);
};

var addNewVariableSection = function () {
    var addVariableSection = "<form class='form-group variableSection'>" +
        "<ul id='DynamicSection' class='section-block list-unstyled'></ul>" +
        "<div class='btn-toolbar'>" +
            "<button type='button' class='addNewImage btn btn-info btn-md'>Add Image</button>" +
            "<button type='button' class='addNewParagraph btn btn-info btn-md'>Add Paragraph</button>" +
            "<button type='button' class='addNewSeparator btn btn-info btn-md'>Add Separator</button>" +
        "</div>";
    "</form>";
    $("#AddVariableSections").prepend(addVariableSection);
};

var addNewExplorationSection = function () {
    var newExplorationSection = "<div class='form-group insertExploration'>";
    newExplorationSection += "<h4>Exploring the Structure</h4><hr>";
    newExplorationSection += "<h5>Insert Static Jmol Image</h5><input type='file' id='jmolStaticInputFile'><br>";
    newExplorationSection += "<textarea class='form-control' rows='3' placeholder='Exploring the Structure Content'></textarea><hr>";
    newExplorationSection += "<h5>Topics for Further Exploration</h5>";
    newExplorationSection += "<p>Begin each line item with &lt;li&gt;</p><textarea class='form-control' id='explorationTopics' rows='3' placeholder='List (of Topics)'></textarea><br>";
    newExplorationSection += "</div>";

    $("#AddFixedSections").append(newExplorationSection);
};

var addNewJmolSection = function () {
    var newJmolSection = "<div class='form-group insertJmol'>";
    newJmolSection += "<h4>Jmol</h4><hr>";
    newJmolSection += "<label for='JmolHeader'>Jmol Heading</label><input class='form-control' id='jsmolHeader' placeholder='JSmol Heading'>";
    newJmolSection += "<label for='jmolContent'>Jmol Content</label><input class='form-control' id='jmolContent' rows='5' placeholder='Content (for Humans)'></textarea><br>";
    newJmolSection += "<h5>JSmol Script</h5>";
    newJmolSection += "<p>Copy and paste the script</p><textarea id='jmol-script' class='form-control' rows='5' placeholder='Script (for Computers)'></textarea><br>";
    newJmolSection += "</div>";

    $("#AddFixedSections").append(newJmolSection);
};

var addNewReferenceSection = function () {
    var newReferenceSection = "<div class='form-group insertReferences'>";
    newReferenceSection += "<h4>References</h4><hr>";
    newReferenceSection += "<p>Begin each line item with &lt;li&gt;</p><textarea class='form-control' rows='3' placeholder='3jad: J. Du, W. Lu, S. Wu, Y. Cheng & E. Gouaux (2015) Glycine receptor mechanism...'></textarea><br>";
    newReferenceSection += "</div>";

    $("#AddFixedSections").append(newReferenceSection);
};

// Fills in the form with the data we already have
var populate_with_data = function (momID) {
    $.ajax({
        type: "get",
        url: "/do/one/" + momID,
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            console.log(data);

            // Top of the page elements
            $('#legacyMotMID').val(data.id);
            $('#articleTitle').val(data.title);
            $('#articleTeaser').val(data.teaser);
            $('#articleAuthor').val(data.authors);
            $('#month').val(data.month - 1);
            $('#year').val(data.year);
            data.keywords.forEach(function (keyword) {
                var currentVal = $('#articleKeywords').val();
                if (currentVal) {
                    $('#articleKeywords').val(currentVal + ", " + keyword);
                } else {
                    $('#articleKeywords').val(keyword);
                }
            });

            // Remove whatever is inside
            // $('#AddVariableSections').empty();

            // FOR LOOP NESTED, BUILDING SECTIONS, PLUS PARAGRAPH SECTIONS
            var divSection = "<ul id='DynamicSection' class='section-block list-unstyled'>";
            var i = 0;
            data.sections.forEach(function (section) {
                section.parts.forEach(function (part) {
                    var paragraphSection = "";
                    //console.log(part.heading + " || " + part.content);
                    paragraphSection += "<li id='Section_" + section.id + "_Part_" + part.id + "'>";
                    paragraphSection += "<div class='form-group insertParagraph variableSection bg-warning'>";
                    paragraphSection += sectionActions;
                    paragraphSection += "<h5>Paragraph</h5><hr>";
                    paragraphSection += "<input class='form-control' id='SectionTitle' value='" + part.heading + "'><br>";

                    //var escapedContent = part.content
                    //paragraphSection += "<p>" + escapedContent + "</p>";

                    // NEED TO ADD IN ESCAPE SLASHES
                    // paragraphSection += "<textarea class='form-control' type='text' rows='3' value='" + part.content + "'></textarea><br>";
                    paragraphSection += "<textarea id='Section_" + section.id + "_Part_" + part.id + "' class='form-control' type='text' rows='3'>" + part.content + "</textarea><br>";
                    paragraphSection += "</div></li>";


                    //TODO change if to a while to handle multiple images
                    if (part.images.length > 0) {
                        for( var i = 0; i < part.images.length; i++) {
                            var imageSection = "";
                            var aImage = part.images[i];
                            imageSection += "<li id='Image_Section_" + section.id + "_Part_" + part.id + "'>";
                            imageSection += "<div class='form-group insertImage variableSection bg-warning'>";
                            imageSection += sectionActions;
                            imageSection += "<h5>Image</h5><hr>";
                            imageSection += "<h5>Insert Image</h5><input type='file' id='exampleInputFile'>";

                            if (aImage.align == "right") {
                                imageSection += "<select class='form-group'><option>Right Aligned</option><option>Left Aligned</option></select>";
                            } else {
                                imageSection += "<select class='form-group'><option>Left Aligned</option><option>Right Aligned</option></select>";
                            }
                            if (aImage.file_name) {
                                //TODO check for and implement height and width fix url
                                //Check for hight and width of an image.
                                if (aImage.h > 0 && aImage.w > 0) {
                                    imageSection += "<img style='max-width: 150px; height: auto;' src='" + "http://cdn.rcsb.org/pdb101/motm/images/" + aImage.file_name + "'>";
                                }
                            }

                            imageSection += "<br><select class='form-group'><option>First Image</option><option>Associated Image with Paragraph</option></select>";
                            imageSection += "</div></li>";
                            paragraphSection += imageSection;
                        }
                    } else {
                        console.log("No Image in part: " + part.id);
                    }
                    if(data.sections.length == section.id ) {
                        divSection += paragraphSection;
                    } else {
                        divSection += paragraphSection + newSeparator;
                    }
                });
            });
            divSection += "<div class='btn-toolbar'>";
            divSection += "<button type='button' class='addNewImage btn btn-info btn-md'>Add Image</button>";
            divSection += "<button type='button' class='addNewParagraph btn btn-info btn-md'>Add Paragraph</button>";
            divSection += "<button type='button' class='addNewSeparator btn btn-info btn-md'>Add Separator</button>";
            divSection += "</div>";
            //divSection += "<button type='button' class='deleteThisSection btn btn-danger btn-sm pull-right'>Delete This Section</button>";
            divSection += "</ul>";
            //$('#AddVariableSections .lastVariableSection').prepend(divSection);
            $('#AddVariableSections .lastVariableSection').append(divSection);
            $( document ).ready(function() {
                $("#DynamicSection").sortable();
                $("#DynamicSection").disableSelection();
            });

            // JSmol elements
            $('#jmol-content').val(data.jmols[0].content);
            $('#jmol-script').val(data.jmols[0].script);
            //TODO fill further exploration topics mongodb motm_articles.tfes (topics further exploration)
            //$('#explorationTopics').val(data.tfes.list);


        }
    });
};


var fillCategories = function(){
    //categories = "<label for='articleCategory'>Category</label><select=class'form-control' id='articleCategory'>";
    //subcat = "<label for='articleSubcategory'>Subcategory</label><select=class'form-control' id='articleSubcategory'>";
    $.ajax({
        type: "get",
        url: "/do/get/categories",
        dataType: "json",
        contentType: "application/json",
        success: function (data) {
            for(var j = 0; j < data.length; j++) {
                console.log("Inside Category loop: " + data[j].name);
                for(var k = 0; k < data[j].subcategories.length; k++ ) {
                    $('#articleCategory').append('<option value=' + data[j].id + ':' + data[j].subcategories[k].id + '>' + data[j].name + ' -> ' + data[j].subcategories[k].name + '</option>');
                }
            }
            //subcat += "</select>";
            //categories += "</select>";
        }
    });
};

