const fs = require('fs');
const data = require('../data/data.json');

class Ticket {
  constructor(numero, escritorio) {
    this.numero = numero;
    this.escritorio = escritorio;
  }
}
class TicketControl {
  constructor() {
    this.ultimo = 0;
    this.hoy = new Date().getDate();
    this.tickets = [];
    this.ultimos4 = [];
    this.data = data;

    if (this.data.hoy === this.hoy) {
      this.ultimo = data.ultimo;
      this.tickets = data.tickets;
      this.ultimos4 = data.ultimos4;
    } else {
      this.reiniciarConteo();
    }
  }

  siguienteTicket() {
    this.ultimo += 1;
    const ticket = new Ticket(this.ultimo, null);
    this.tickets.push(ticket);
    this.grabrarArchivo();
    return `Ticket ${this.ultimo}`;
  }

  getUltimoTicket() {
    return `Ticket ${this.ultimo}`;
  }

  getUltimos4() {
    return this.ultimos4;
  }

  atenderTicket(escritorio) {
    if (this.tickets.length === 0) {
      return 'No hay tickets';
    }
    const numeroTicket = this.tickets[0].numero;

    this.tickets.shift();

    const atenderTicket = new Ticket(numeroTicket, escritorio);

    this.ultimos4.unshift(atenderTicket);

    if (this.ultimos4.length > 4) {
      console.log('entro aca')
      this.ultimos4.splice(-1, 1); // borra el ultimo
    }
    console.log('ultimos 4');
    console.log(this.ultimos4);

    this.grabrarArchivo();

    return atenderTicket;
  }

  reiniciarConteo() {
    this.ultimo = 0;
    this.tickets = [];
    this.ultimos4 = [];
    console.log('Se ha inicializado el sistema');
    this.grabrarArchivo();
  }

  grabrarArchivo() {
    const jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4,
    };
    const jsonDataSyting = JSON.stringify(jsonData);
    fs.writeFileSync('./server/data/data.json', jsonDataSyting);
  }
}

module.exports = {
  TicketControl,
};
