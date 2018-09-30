const socket = io();
const label = $('small');

let searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
  window.location = 'index.html';
  throw new Error('El escritorio es necesario');
}

let escritorio = searchParams.get('escritorio');

console.log(escritorio);
$('h1').text(`Escritorio ${escritorio}`);

$('button').on('click', () => {
  socket.emit('atenderTicket', { escritorio }, (sgt) => {
    if (sgt === 'No hay tickets') {
      return label.text(sgt);
    }
    label.text(`Ticket ${sgt.numero}`);
  });
});


