import { defineConfig } from 'cypress';
import * as dotenv from 'dotenv';
import dgram from 'dgram';
import iconv from "iconv-lite";

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Adicionando a task para enviar mensagens UDP
      on('task', {
        sendUdpMessage({ host, port, message }) {
          const client = dgram.createSocket('udp4');
          return new Promise((resolve, reject) => {
            const messageBuffer = Buffer.from(iconv.encode(message, "win1252"));

            client.send(messageBuffer, port, host, (error) => {
              if (error) {
                reject(error);
              } else {
                console.log(`Message sent to ${host}:${port}:${messageBuffer}`)
                resolve(`Message sent to ${host}:${port}`);
              }
              client.close();
            });
          });
        }
      });

      // Configuração de variáveis de ambiente
      config.env = {
        USERNAME: process.env.CYPRESS_USERNAME,
        PASSWORD: process.env.CYPRESS_PASSWORD,
      };

      return config;
    },
    baseUrl: process.env.URL_BASE,
    //não limpa o estado da tela a cada it
    // testIsolation: false
    video: true,  // Ativa a geração de vídeos
    screenshotOnRunFailure: true,  // Captura screenshots em caso de falha
  },
});
