const socket = io();
const lblTicket1 = $('#lblTicket1');
const lblTicket2 = $('#lblTicket2');
const lblTicket3 = $('#lblTicket3');
const lblTicket4 = $('#lblTicket4');

const lblEscritorio1 = $('#lblEscritorio1');
const lblEscritorio2 = $('#lblEscritorio2');
const lblEscritorio3 = $('#lblEscritorio3');
const lblEscritorio4 = $('#lblEscritorio4');

const lblTickets = [
  lblTicket1,
  lblTicket2,
  lblTicket3,
  lblTicket4,
];
const lblEscritorios = [
  lblEscritorio1,
  lblEscritorio2,
  lblEscritorio3,
  lblEscritorio4,
];

const actualizarHtml = (ultimos4) => {
  for (let i = 0; i <= ultimos4.length - 1; i += 1) {
    lblTickets[i].text(`Ticket ${ultimos4[i].numero}`);
    lblEscritorios[i].text(`Ticket ${ultimos4[i].escritorio}`);
  }
};

socket.on('connect', () => {
  console.log('conexion');
});

socket.on('disconnect', () => {
  console.log('desconectado');
});

socket.on('estadoActual', (data) => {
  // console.log(data);

  actualizarHtml(data.ultimos4);
});

socket.on('ultimos4', (data) => {
  let audio = new Audio('audio/new-ticket.mp3');
  audio.play();
  actualizarHtml(data.ultimos4);
});
