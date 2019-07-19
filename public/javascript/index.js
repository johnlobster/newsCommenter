// front end Javascript for newsCommenter app

$(document).ready(function () {

  // set up all modals
  // $('.modal').modal({ inDuration: 500, outDuration: 500 });
  let noteRowNumber = 0;
  let noteArticleId = 0;

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

  // submit note (from modal)
  $("#noteSubmitButton").click( function(evt) {
    evt.preventDefault(); // stop from posting and reloading page
    let noteContent = $("#noteContent").val().trim();
    $.ajax({
      url: `/api/login`,
      method: "POST",
      data: JSON.stringify({content:noteContent}),
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    })
      .done(function (body, textStatus, xhdr) {
        if (textStatus === "success") {
          // hide modal
          $("#addNoteModal").modal("hide");
          // clear textarea
          $("#noteContent").val("");
          // add existing notes
          $("#notesRow_" + noteRowNumber).removeClass("d-none");
          // add the note to the row without refreshing page
          let newCol = $("<div class=\"col-12\">");
          let newNote = $("<div class= \"notesBox\">");
          newNote.text(noteContent);
          newCol.append(newNote);
          $("#notesRow_" + noteRowNumber).prepend(newCol);
          // $("#notesRow_" + noteRowNumber).prepend(newNote);

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