$(function () {
  $(document).on('click', '#save', function () {

      // console.log($('#legacyMotMID').val());

      var content = new Object();

      // Find the _id in the URL path
      var pathArray = window.location.pathname.split('/');
      var objectID = pathArray[2];

      // Building the output JSON object
      content._id = objectID;
      var keywordArray = $('#articleKeywords').val().split(', ');
      content.keywords = keywordArray;

      content.pdf = "Unavailable";
      content.tn_image = "TBD";
      content.subcategory_ids = $('#articleCategory option:selected').val();

      content.month_name = $('#releaseMonth option:selected').text();

      content.tfes = "TBD";

      content.id = $('#legacyMotMID').val();
      content.authors = $('#articleAuthor').val();

      content.sections = "NEXT STEP";

      content.references = "TBD";

      content.title = $('#articleTitle').val();
      content.pdb_id = "TBD";
      content.first_image = "TBD";

      content.teaser = $('#articleTeaser').val();
      content.title_lowercase = $('#articleTitle').val().toLowerCase();
      content.month = $('#releaseMonth option:selected').val();
      content.year = $('#releaseYear').val();

      console.log("Parsed JSON:" + JSON.stringify(content));


      // Global Array
      var sectionArray = new Array();
      var partsArray = new Array();

      $("#DynamicSection li .variableSection").each( function(index, element){
          // console.log(this);

          var sectionParagraph = $(this).hasClass("insertParagraph");
          if (sectionParagraph) {
            var part = new Object();
            part.heading = $(this).find('.paraHeading').eq(0).val();
            part.content = $(this).find('.paraContent').eq(0).val()
            console.log("Paragragh Heading:", part.heading);
            console.log("Paragragh Content:", part.content);
            partsArray.push(part);
          }

          var sectionImage = $(this).hasClass("insertImage");
          if (sectionImage) {
            var part = new Object();
            part.imageURL = $(this).find('.image-box img').attr('src');
            part.imageCaption = $(this).find('.imageCaption').val()
            console.log("Image URL:", part.imageURL);
            console.log("Image Caption:", part.imageCaption);
            partsArray.push(part);
          }

          var sectionSeparator = $(this).hasClass("insertSeparator");
          if (sectionSeparator) {
            sectionArray.push(partsArray);
            partsArray = [];
          }
      });

      if (partsArray.length > 0) {
        sectionArray.push(partsArray);
        partsArray = [];
      }
      console.log("All I HAVE ->", sectionArray);
  });


});
