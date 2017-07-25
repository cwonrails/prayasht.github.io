"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = socketIo;
function socketIo() {
  try {
    var socket = window.io();

    socket.on("reload", function () {
      window.location.reload();
    });
  } catch (err) {
    console.error("Could not connect to socket.io on dev server.");
  }
}
//# sourceMappingURL=socketIo.js.map