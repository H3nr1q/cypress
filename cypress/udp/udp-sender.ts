import dgram from 'dgram';

export class udpSender{
  private client: dgram.Socket;
  private host: string;
  private port: number;

  constructor(host: string, port: number) {
    this.client = dgram.createSocket('udp4'); // Cria o cliente UDP
    this.host = host;
    this.port = port;
  }

  public sendMessage(message: string): void {
    const messageBuffer = Buffer.from(message); // Converte a mensagem para Buffer

    this.client.send(messageBuffer, this.port, this.host, (error) => {
      if (error) {
        console.error('Erro ao enviar a mensagem:', error);
      } else {
        console.log(`Mensagem enviada para ${this.host}:${this.port}`);
      }
      this.client.close(); // Fecha o cliente após o envio
    });
  }

  public closeSocket(): void {
    this.client.close(() => {
      console.log('Socket fechado.');
    });
  }
}