"use strict";

$(document).ready(function () {

  $('.secret-input').bind("enterKey", function (e) {
    console.log($(".secret-input").val());
    $(".secret-input").val("");
  });
  $('.secret-input').keyup(function (e) {
    if (e.keyCode == 13) {
      $(this).trigger("enterKey");
    }
  });
});