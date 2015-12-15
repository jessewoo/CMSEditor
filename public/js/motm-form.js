// Build New Motm Molecule - Form
$(function () {
    var pathArray = window.location.pathname.split('/');
    var momID = pathArray[2];

    // Creates the Category dropdown for the Essential Information section
    fillCategories();
    // Populate legacyMotMID with a new value in the Essential Information section
    newMotmID();
    // Create the Essential Information section
    buildNewMOTM();

    addSortableSection();
    addVariableSection();

    addNewExplorationSection();

    // If we are editing something that already exists, populate with prior data from mongodb
    if (momID) {
        populate_with_data(momID);
    }
});

/*
The delete button, top right, one per section
 */
// TODO if this button is clicked be sure to re-adjust appropriate variable image/paragraph counters if necessary
var sectionActions = "<button type='button' class='pull-right btn btn-danger btn-sm deleteSection' aria-label='Delete'><span class='glyphicon glyphicon-trash' aria-hidden='true'></span></button>";


// BUILD OUT OF ADDITIONAL SECTIONS
var buildNewMOTM = function () {
    var newForm = "<form class='form-horizontal' role='form'>" +
        "<div id='EssentialsSection' class='form-group'>" +
        "<h4>Essential Information</h4><hr>" +
        "<label for='legacyMotmID'>Molecule of the Month ID</label><input class='form-control' id='legacyMotMID' disabled>" +
        "<label for='articleTitle'>Molecule Name / Title</label><input class='form-control' id='articleTitle' placeholder='Molecule Name'>" +
        "<label for='articleTeaser'>Article Teaser</label><textarea auto='yes' class='form-control' id='articleTeaser' rows='1' placeholder='Teaser'></textarea>" +
        "<label for='articleAuthor'>Author's Name</label><input class='form-control' id='articleAuthor' placeholder='Author'>";

    // Month & Year dropdown - Start
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
    // Month & Year dropdown - End

    newForm += "<label for='articleCategory'>Category</label><select class='form-control' id='articleCategory'></select>";
    newForm += "<label for='articleKeywords'>Keywords - <small>Separate with commas</small></label><input class='form-control' id='articleKeywords' placeholder='Keywords - separate with comma'>";
    newForm += "</div></form>";

    $("#CreateNewForm").append(newForm);
};


//TODO Does this still accomplish something for us.
// Add the Sortable section
var addSortableSection = function () {
    var newSortableSection = "<div class='lastVariableSection'></div>";
    $("#AddVariableSections").append(newSortableSection);
};

var addVariableSection = function () {
    var variableSection = "<form class='form-group variableSection'>" +
        "<ul id='DynamicSection' class='section-block list-unstyled'></ul>" +
        "<div class='btn-toolbar'>" +
            "<button type='button' class='addNewImage btn btn-info btn-md'>Add Image</button>" +
            "<button type='button' class='addNewParagraph btn btn-info btn-md'>Add Paragraph</button>" +
            "<button type='button' class='addNewSeparator btn btn-info btn-md'>Add Separator</button>" +
        "</div>";
    "</form>";
    $("#AddVariableSections").prepend(variableSection);
};

var addNewExplorationSection = function () {
    var newExplorationSection = "<div class='form-group fixedSection'>" +
        "<h4>Jmol Tab</h4><label for='JmolHeader'>Jmol Heading</label><input class='form-control' id='jmolHeader' placeholder='Jmol Heading'>" +
        "<label for='jmolContent'>Jmol Content</label><input class='form-control' id='jmolContent' rows='5' placeholder='Content (for Humans)'></textarea>" +
        "<label for='jmolScript'>Jmol Script</label><textarea class='form-control' id='jmolScript' placeholder='Script (for Computers)'></textarea>" +
        "<hr>" +
        "<label for='explorationTopics'>Topics for Further Exploration<small> - new line separated</small></label><textarea class='form-control' id='explorationTopics' rows='5' placeholder='List of topics - new line separated'></textarea>" +
        "<hr>" +
        "<label for='references'>References <small> - new line separated</small></label><textarea class='form-control' id='articleReferences' rows='10' placeholder='3jad: J. Du, W. Lu, S. Wu, Y. Cheng & E. Gouaux (2015) Glycine receptor mechanism...'></textarea><br>" +
        "</div>";

    $("#AddFixedSections").append(newExplorationSection);
};

// ++++++++ CREATION OF THE IMAGE SECTION +++++++++++++
/*
 Returns the code used to build an image section DOM
 Passed (optional) - mongo section.part.image element
 */
 function factory_imageSection(image){
     // Validate TIF File
     var tiff_file_name = "";
     if ( typeof image !== 'undefined' ) {
       if (typeof image.tiff_file_name !== 'undefined') {
         tiff_file_name = image.tiff_file_name;
       }
     }

     // Validate File Name
     var file_name = "";
     if ( typeof image !== 'undefined' ) {
       if (typeof image.file_name !== 'undefined') {
         file_name = image.file_name;
       }
     }

     // Validate Caption
     var caption = "";
     if ( typeof image !== 'undefined' ) {
       if (typeof image.caption !== 'undefined') {
         caption = image.caption;
         caption = caption.replace("'","&apos;");
       }
     }

     // Validate Alignment
     var alignment = "";
     var optionLeft = ""; var optionRight = "";
     if ( typeof image !== 'undefined' ) {
       if (typeof image.align !== 'undefined') {
         alignment = image.align;
         if (alignment == "right") {
           optionRight = "selected";
         }
         else {
           optionLeft = "selected";
         }
       }
     }

     // Build Image Content
     var newImageSection = "<li><div class='form-group insertImage variableSection bg-variableSection'>";
     newImageSection += sectionActions;
     newImageSection += "<h5>Image Section</h5><hr>";
     newImageSection += "<h5>Insert Image</h5><input type='file' title='" + file_name + "'/><br><br>";
     newImageSection += "<h5>TIFF:</h5> <input class='form-control tiff_file_name' disabled value='" + tiff_file_name + "'><br>";
     newImageSection += "<h5>JPEG:</h5> <input class='form-control jpeg_file_name' disabled value='" + file_name + " '><br>";
     newImageSection += "<h5>Image Alignment</h5>";
     newImageSection += "<select class='form-control alignmentImage'><option " + optionLeft + ">Left</option><option " + optionRight + ">Right</option></select><br>";
     newImageSection += "<img class='img-thumbnail imageURL' alt=\"" + caption + "\" src=\"http://cdn.rcsb.org/pdb101/motm/images/" + file_name + "\"/ width='300'><br><br>"
     newImageSection += "<h5>Insert Caption</h5><input class='form-control imageCaption' value='" + caption + "'>";

     newImageSection += "</div></li>";
     return newImageSection;
 }

// ++++++++ CREATION OF THE PARAGRAPH SECTION +++++++++++++
//TODO need handler that will look for JMOL paragraphs. (mongodb flag)
function factory_paragraphSection(paragraph) {
    // Validate content
    var heading = "";
    if ( typeof paragraph !== 'undefined' ) {
      if (typeof paragraph.heading !== 'undefined') {
        heading = paragraph.heading;
      }
    }
    var content = "";
    if ( typeof paragraph !== 'undefined' ) {
      if (typeof paragraph.content !== 'undefined') {
        content = paragraph.content;
      }
    }

    // Build content
    var newParagraphSection = "<li><div class='form-group insertParagraph variableSection bg-variableSection'>";
    newParagraphSection += sectionActions;
    newParagraphSection += "<h5>Paragraph Section</h5><hr>";
    newParagraphSection += "<input class='form-control paraHeading' placeholder='Paragraph Title' value='" + heading + "'>";
    newParagraphSection += "<br>";
    newParagraphSection += "<textarea class='form-control paraContent' rows='5' placeholder='Paragraph Content'>" + content + "</textarea><br>";
    newParagraphSection += "</div></li>";
    return newParagraphSection;
}

// ++++++++ CREATION OF A SECTION SEPARATOR +++++++++++++
// TODO figure out how to bold and color the separation line in these <hr>'s
var newSeparator = "<li><div class='form-group insertSeparator variableSection bg-variableSection'>";
newSeparator += sectionActions;
newSeparator += "<hr /></div></li>";

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
            data.references.forEach(function (reference) {
                var currentVal = $('#articleReferences').val();
                if (currentVal) {
                    $('#articleReferences').text(currentVal + ";\n" + reference);
                } else {
                    $('#articleReferences').text(reference);
                }
            });
            data.tfes.forEach(function (tfe) {
                var currentVal = $('#explorationTopics').val();
                if (currentVal) {
                    $('#explorationTopics').text(currentVal + ";\n" + tfe);
                } else {
                    $('#explorationTopics').text(tfe);
                }
            });



            // Auto select first (primary) image radio button when building.
            var firstImage = 0;

            // FOR LOOP NESTED, BUILDING SECTIONS, PLUS PARAGRAPH SECTIONS
            var divSection = "<form class='form-group variableSection'><ul id='DynamicSection' class='section-block list-unstyled'>";
            data.sections.forEach(function (section) {
                section.parts.forEach(function (part) {
                    var paragraphSection = factory_paragraphSection(part);
                    divSection += paragraphSection;

                    if (part.images.length > 0) {
                        for (at = 0; at < part.images.length; at++) {
                            // console.log("INSIDE This is the image data we will use [" + JSON.stringify(part.images[at]) + "]");
                            // console.log("Loading image file [" + part.images[at].file_name + "] with alignment [" + part.images[at].align + "]");
                            //var imageSection = factory_imageSection(part.images[at].file_name, part.images[at].align);
                            var imageSection = factory_imageSection(part.images[at]);
                            divSection += imageSection;
                        }
                    }
                });
                if(data.sections.length == section.id ) {
                    divSection;
                } else {
                    divSection += newSeparator;
                }
            });
            divSection += "</ul>";
            // TODO might be worth making this a function?
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
        }
    });
};

var newMotmID = function(){
    $.ajax({
        type: "get",
        url: "/do/recent",
        dataType: "json",
        contentType: "application/json",
        success: function(data){
            $('#legacyMotMID').val(data.id + 1);
        }
    });
};

//// TODO Create get jmol function db.jmol
//var loadJmol = function(){
//
//};
