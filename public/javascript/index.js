// front end Javascript for newsCommenter app

$(document).ready(function () {

    // buttons to create a new note
    $(".js_createNote").click( function(evt) {
      let rowNumber= $(this).attr("data-create-note");
      let articleId = $(this).attr("data-article-id");
      console.log(rowNumber);
      console.log(articleId);
    });

}); // end document ready