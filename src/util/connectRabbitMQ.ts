import amqplib, { Channel, Connection } from 'amqplib';
import configuration from '../config';
export enum channelsTypes {
    USER = "USER"
}
class AmqplibConnect {
    declare channel: Channel
    declare connection: Connection
    declare url: string
    constructor(url: string) {
        this.url = url;
    }
    async connect() {
        this.connection = await amqplib.connect(this.url);
    }
    async createChannel() {
        this.channel = await this.connection.createChannel();
    }
}
export default new AmqplibConnect(configuration.amqpsUrl);
