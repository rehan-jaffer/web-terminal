"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Terminal = (function () {
  function Terminal() {
    _classCallCheck(this, Terminal);

    try {
      this.connection = new WebSocket("ws://localhost:16000/");

      this.connection.onmessage = function (msg) {
        $(".output-console").text(msg.data);
      };

      this.connection.onopen = function () {
        this.send("test");
      };
    } catch (e) {
      console.log("Failed to connect!" + e);
    }
  }

  _createClass(Terminal, [{
    key: "send",
    value: function send(msg) {

      try {
        this.connection.send(msg);
      } catch (e) {
        console.log(e);
      }
    }
  }]);

  return Terminal;
})();

$(document).ready(function () {

  var terminal = new Terminal();

  $('.secret-input').bind("enterKey", function (e) {
    console.log($(".secret-input").val());
    terminal.send($(".secret-input").val());
    $(".secret-input").val("");
  });
  $('.secret-input').keyup(function (e) {
    if (e.keyCode == 13) {
      $(this).trigger("enterKey");
    }
  });
});