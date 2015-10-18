class Terminal {

  constructor() {
  
    try {
      this.connection = new WebSocket("ws://localhost:16000/");
	
      this.connection.onmessage = msg => {
        $(".output-console").text(msg.data);
      };

      this.connection.onopen = function() {
        this.send("test");
      };
    } catch(e) {
      console.log("Failed to connect!" + e);
    }

  }

  send(msg) {

    try {
      this.connection.send(msg);
    } catch(e) {
      console.log(e);
    }

  }

}

$(document).ready(function() {

  var terminal = new Terminal;

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

