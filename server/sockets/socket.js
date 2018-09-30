const { io } = require('../');
const { TicketControl } = require('../classes/ticket-control');

const ticektControl = new TicketControl();

io.on('connection', (client) => {
  console.log('Usuario conectado: ', client.id);

  client.on('disconnect', () => {
    console.log('usuario desconectado');
  });

  client.emit('estadoActual', {
    actual: ticektControl.getUltimoTicket(),
    ultimos4: ticektControl.getUltimos4(),
  });

  client.on('atenderTicket', (data, callback) => {
    if (!data.escritorio) {
      return callback({
        err: true,
        message: 'El escritorio es necesario',
      });
    }
    const atenderTicket = ticektControl.atenderTicket(data.escritorio);
    callback(atenderTicket);
    client.broadcast.emit('ultimos4', {
      ultimos4: ticektControl.getUltimos4(),
    });
    // actualizar / notificar cambios en los ULTIMOS 4


  });
  // Escuchar Cliente
  client.on('siguienteTicket', (data, callback) => {
    const siguiente = ticektControl.siguienteTicket();
    console.log('data: ', siguiente);
    callback(siguiente);
    // mensajes broadcast

    // client.broadcast.emit('siguienteTicket', data);

    /* if (message.user) {
      return callback({
        resp: 'TODO SALIO BIEN',
      });
    }
    return callback({
      resp: 'TODO SALIO MAL',
    }); */

    // para retroalimentacion con la web
    // callback();
  });
});
