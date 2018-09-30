const socket = io();
let label = $('#lblNuevoTicket');

socket.on('connect', () => {
  console.log('conexion');
});

socket.on('disconnect', () => {
  console.log('desconectado');
});
socket.on('estadoActual', (data) => {
  label.text(data.actual);
});

$('button').on('click', () => {
  console.log('click');
  socket.emit('siguienteTicket', null, (sgt) => {
    label.text(sgt);
  });
});


