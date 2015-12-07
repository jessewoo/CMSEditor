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

    // If we are editing something that already exists, populate with prior data
    if (momID) {
        populate_with_data(momID);
    }
});

//LETS DO SOME GLOBAL VARIABLES - L2 k0d n00b
var categories = "";
var subcat = "";

// COMMON ACTIONS FOR EACH SECTIONS

/*
The delete button, top right, one per section
 */
var sectionActions = "<button type='button' class='pull-right btn btn-danger btn-sm deleteSection' aria-label='Delete'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span></button>";


// Helper var for factory_imageSection
var factory_imageSection_count = 0;
/*
Returns the code used to build an image section DOM
Passed (optional) previous -
image file name
image alignmet
 */
function factory_imageSection(filename, alignment){
    newImageSection = "<li><div class='form-group insertImage variableSection bg-imageSection'>";
    newImageSection += sectionActions;
    newImageSection += "<h5>Image</h5><hr>";
    newImageSection += "<h5>Insert Image</h5><input type='file' id='exampleInputFile' section_number='" + factory_imageSection_count + "'>";

    // Alignment section - start
    var displayAlignment = "pull-left";
    newImageSection += "<div class=\"radio\">";
    if ( typeof alignment !== 'undefined' ) {
        if ( alignment == "right") {
            newImageSection += "<label class='radio-inline'><input type='radio' name='inlineRadioOptions-" + factory_imageSection_count + "' value='left' class='image_alignment_choices' section_number='" + factory_imageSection_count + "'>Left</label><label class='radio-inline'><input type='radio' name='inlineRadioOptions-" + factory_imageSection_count + "' value='right' class='image_alignment_choices' section_number='" + factory_imageSection_count + "'checked=''>Right</label>";
            displayAlignment = "pull-right";
        } else {
            newImageSection += "<label class='radio-inline'><input type='radio' name='inlineRadioOptions-" + factory_imageSection_count + "' value='left' class='image_alignment_choices' section_number='" + factory_imageSection_count + "' checked=''>Left</label><label class='radio-inline'><input type='radio' name='inlineRadioOptions-" + factory_imageSection_count + "' value='right' class='image_alignment_choices' section_number='" + factory_imageSection_count + "'>Right</label>";
        }
    } else {
        newImageSection += "<label class='radio-inline'><input type='radio' name='inlineRadioOptions-" + factory_imageSection_count + "' value='left' class='image_alignment_choices' section_number='" + factory_imageSection_count + "' checked=''>Left</label><label class='radio-inline'><input type='radio' name='inlineRadioOptions-" + factory_imageSection_count + "' value='right' class='image_alignment_choices' section_number='" + factory_imageSection_count + "' class='image_alignment_choices' section_number='" + factory_imageSection_count + "'>Right</label>"
    }
    newImageSection += "</div>";
    // Alignment section - end

    // Image example - start
    newImageSection += "<div id='image-example-" + factory_imageSection_count + "' class='image-box'>";
    if ( typeof filename !== 'undefined' ) {
        newImageSection += "<img class='img-thumbnail " + displayAlignment + "' src='http://cdn.rcsb.org/pdb101/motm/images/" + filename + "' style='height: 300px;'>"
    }  else {
        newImageSection += "<img class='img-thumbnail " + displayAlignment + "' src='http://cdn.rcsb.org/pdb101/geis/images/carboxypeptidase-a.png' style='height: 300px;'>"
    }
    newImageSection += "</div>";
    // Image example - end

    //TODO Add 'caption' text area capture
    // Image Caption - start
    newImageSection += "<button type='button' class='addImageCaption btn btn-info btn-md'>Add Caption</button>";
    // Image Caption - end
    //TODO add 'would you like to add a TIFF of this image as well' thing
    newImageSection += "</div></li>";
    factory_imageSection_count += 1;
    return newImageSection;
}


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
    var newExplorationSection = "<div class='form-group fixedSection'>" +
        "<h4>Exploring the Structure</h4><hr>" +
        "<h4>Image Tab</h4><label for='jmolStaticImage'>Jmol Image</label><input type='file' id='jmolStaticImage'><br>" +
        "<label for='exploreStructure'>Exploring the Image Content</label><textarea class='form-control' id='exploreStructure' rows='3' placeholder='Image Structure Content'></textarea>" +
        "<hr>" +
        "<h4>Jmol Tab</h4><label for='JmolHeader'>Jmol Heading</label><input class='form-control' id='jmolHeader' placeholder='Jmol Heading'>" +
        "<label for='jmolContent'>Jmol Content</label><input class='form-control' id='jmolContent' rows='5' placeholder='Content (for Humans)'></textarea>" +
        "<label for='jmolScript'>Jmol Script</label><textarea class='form-control' id='jmolScript' placeholder='Script (for Computers)'></textarea>" +
        "<hr>" +
        "<label for='explorationTopics'>Topics for Further Exploration<small> - new line separated</small></label><textarea class='form-control' id='explorationTopics' rows='3' placeholder='List of topics - new line separated'></textarea>" +
        "<hr>" +
        "<label for='references'>References</label><textarea class='form-control' rows='2' placeholder='3jad: J. Du, W. Lu, S. Wu, Y. Cheng & E. Gouaux (2015) Glycine receptor mechanism...'></textarea><br>" +
        "</div>";

    $("#AddFixedSections").append(newExplorationSection);
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

            // Remove whatever is inside
            $('#AddVariableSections').empty();

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

            // Auto select first (primary) image radio button when building.
            var firstImage = 0;

            // FOR LOOP NESTED, BUILDING SECTIONS, PLUS PARAGRAPH SECTIONS
            var divSection = "<form class='form-group variableSection'><ul id='DynamicSection' class='section-block list-unstyled'>";
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

                    //console.log("OUTSIDE This is the image data we will use [" + JSON.stringify(part.images) + "]");
                    if (part.images.length > 0) {
                        for (at = 0; at < part.images.length; at++) {
                            console.log("INSIDE This is the image data we will use [" + JSON.stringify(part.images[at]) + "]");
                            console.log("Loading image file [" + part.images[at].file_name + "] with alignment [" + part.images[at].align + "]");
                            var imageSection = factory_imageSection(part.images[at].file_name, part.images[at].align);
                            paragraphSection += imageSection;
                        }
                    }
                    if(data.sections.length == section.id ) {
                        divSection += paragraphSection;
                    } else {
                        divSection += paragraphSection + newSeparator;
                    }
                });
            });
            divSection += "</ul>";
            divSection += "<ul id='DynamicSection' class='section-block list-unstyled'></ul>" +
                "<div class='btn-toolbar'>" +
                "<button type='button' class='addNewImage btn btn-info btn-md'>Add Image</button>" +
                "<button type='button' class='addNewParagraph btn btn-info btn-md'>Add Paragraph</button>" +
                "<button type='button' class='addNewSeparator btn btn-info btn-md'>Add Separator</button>" +
                "</div></ul></form>";

            //$('#AddVariableSections .lastVariableSection').prepend(divSection);
            $('#AddVariableSections').append(divSection);
            $( document ).ready(function() {
                $("#DynamicSection").sortable();
                $("#DynamicSection").disableSelection();
            });

            // JSmol elements
            //$('#jmol-content').val(data.jmols[0].content);
            //$('#jmol-script').val(data.jmols[0].script);
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

