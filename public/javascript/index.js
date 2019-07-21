// front end Javascript for newsCommenter app

$(document).ready(function () {

  // set up all modals
  // $('.modal').modal({ inDuration: 500, outDuration: 500 });
  let noteRowNumber = 0;
  let noteArticleId = 0;

  // button to scrape more articles
  $("#scrapeButton").click( function (evt) {
    // make api request to scrape
    $.ajax({
      url: `/api/scrape`,
      method: "GET",
      data: JSON.stringify({
        content: noteContent,
        articleId: noteArticleId
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    })
    .done(function (body, textStatus, xhdr) {
      if (textStatus === "success") {
        // clean return from scraper so redirect to "/"
        // console.log("scraped ok");
        window.location = "/";
      }
      else {
        console.log("AJAX /api/scrape GET did not succeed (" + textStatus + ")");
      }
    })
    .fail((xhr) => {
      console.log("AJAX /api/scrape GET failed with error code " + xhr.status);
    });
  });
  
  // buttons to create a new note
  $(".js_createNote").click( function(evt) {
    noteRowNumber= $(this).attr("data-create-note");
    noteArticleId = $(this).attr("data-article-id");
    let noteArticleTitle = $(this).attr("data-title");
    let notePictureUrl = $(this).attr("data-image-url");
    $("#modalImage").attr("src", notePictureUrl);
    $("#modalNewsTitle").text(noteArticleTitle);
    $("#addNoteModal").modal("show");
  });

  // buttons to show previously written notes. If clicked, button toggles to "hide notes"
  $(".js_showNote").click( function(event) {
    let rowNumber = $(this).attr("data-show-note");
    if ($(this).attr("data-visibility-toggle") === "1") {
      $("#notesRow_" + rowNumber).removeClass("d-none");
      $(this).text("Hide notes");
      $(this).attr("data-visibility-toggle", "0");
    }
    else {
      $("#notesRow_" + rowNumber).addClass("d-none");
      $(this).text("Show notes");
      $(this).attr("data-visibility-toggle", "1");
    }
    
  });

  // submit note (from modal)
  $("#noteSubmitButton").click( function(evt) {
    evt.preventDefault(); // stop from posting and reloading page
    let noteContent = $("#noteContent").val().trim();
    $.ajax({
      url: `/api/newNote`,
      method: "POST",
      data: JSON.stringify({
        content:noteContent,
        articleId:noteArticleId
      }),
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    })
      .done(function (body, textStatus, xhdr) {
        if (textStatus === "success") {
          // hide modal
          $("#addNoteModal").modal("hide");
          // clear textarea in modal
          $("#noteContent").val("");
          // show existing notes. Change data-visibility-toggle on button so show notes -> hide notes
          $("#notesRow_" + noteRowNumber).removeClass("d-none");
          $("#row_" + noteRowNumber + " button.js_showNote").text("Hide notes");
          $("#row_" + noteRowNumber + " button.js_showNote").attr("data-visibility-toggle", "0");
          // add the note to the row without refreshing page
          let newCol = $("<div class=\"col-12\">");
          let newNote = $("<div class= \"notesBox mt-1\">");
          newNote.text(noteContent);
          newCol.append(newNote);
          $("#notesRow_" + noteRowNumber).prepend(newCol);
        }
        else {
          console.log("create note AJAX POST did not succeed (" + textStatus +")");
        }
      })
      .fail((xhr) => {
        console.log("create note AJAX POST failed with error code " + xhr.status);
      });
  });

}); // end document ready