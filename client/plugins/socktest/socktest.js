(function() {
  window.plugins.socktest = {
    bind: function(div, item) {},
    emit: function(div, item) {
      var form, inp, print, socket;
      div.append("<style>\n  .socktest .box {\n      width: 300px;\n      float: left;\n      margin: 0 20px 0 20px;\n  }\n  .socktest .box div, .socktest .box input {\n      border: 1px solid;\n      -moz-border-radius: 4px;\n      border-radius: 4px;\n      width: 100%;\n      padding: 0px;\n      margin: 5px;\n  }\n  .socktest .box div {\n      border-color: grey;\n      height: 300px;\n      overflow: auto;\n  }\n  .socktest .box input {\n      height: 30px;\n  }\n</style>\n\n<div id=\"first\" class=\"box\">\n  <div></div>\n  <form><input autocomplete=\"off\" value=\"Type here...\"></input></form>\n</div>                  ");
      socket = new WebSocket('ws://' + window.document.location.host + '/system/echo');
      $("#first input").focus();
      div = $("#first div");
      inp = $("#first input");
      form = $("#first form");
      print = function(m, p) {
        p = (p === undefined ? "" : JSON.stringify(p));
        div.append($("<code>").text(m + " " + p));
        div.append($("<br>"));
        return div.scrollTop(div.scrollTop() + 10000);
      };
      socket.onopen = function() {
        return print("WebSocket Connection Opened.");
      };
      socket.onmessage = function(e) {
        return print("Message from Server: ", e.data);
      };
      socket.onclose = function() {
        return print("Socket Connection Closed.");
      };
      return form.submit(function() {
        print("sending: ", inp.val());
        socket.send(inp.val());
        inp.val("");
        return false;
      });
    }
  };

}).call(this);
