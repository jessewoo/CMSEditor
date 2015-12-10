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
  });


});
