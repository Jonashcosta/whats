import client from './createsession';
import './sender';

export default client;
// import { Client, LocalAuth } from 'whatsapp-web.js';

// import qrcode from 'qrcode-terminal';

// const client = new Client({
//   authStrategy: new LocalAuth({ clientId: 'botchat' }),
//   puppeteer: {
//     headless: true,
//     args: [
//       '--no-sandbox',
//       '--disable-setuid-sandbox',
//       '--disable-dev-shm-usage',
//       '--disable-accelerated-2d-canvas',
//       '--no-first-run',
//       '--no-zygote',
//       '--single-process', // <- this one doesn't works in Windows
//       '--disable-gpu',
//     ],
//   },
// });

// client.on('qr', (qr) => {
//   qrcode.generate(qr, { small: true });
// });

// // client.on('ready', () => {
// //   console.log('Client is ready!');
// // });

// client.initialize();

// client.on('authenticated', () => {
//   console.log('Autenticado');
// });
// client.on('auth_failure', function () {
//   console.error('Falha na autenticação');
// });
// client.on('disconnected', (reason) => {
//   console.log('Cliente desconectado', reason);
//   client.initialize();
// });
// export default client;
