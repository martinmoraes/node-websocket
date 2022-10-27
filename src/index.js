import express from "express";
import http from "http";
import socketio from "socket.io";

const app = express();
const server = http.Server(app);
const io = socketio(server);

app.use(express.static(__dirname + "/public"));

io.on("connect", (socket) => {
  io.to(socket.id).emit({
    status: true,
    message: "Conexão estabelecida com o servidor.",
  });

  socket.on("teste", (res) => {
    console.log(res);
    // io.to(socket.id).emit(res);
    socket.broadcast.emit("teste", res);
  });
});

app.get("/", (req, res) => {
  res.render("index.html");
});

server.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
