export interface IConfig {
    env: string
    port: number,
    default_user_verification_state: boolean,
    default_user_role: string,
    mongooseOptions: {
        useNewUrlParser: boolean,
        useUnifiedTopology: boolean,
        useFindAndModify: boolean
    },
    amqpsUrl: string,
    express: {
        default_url_encoding_extended: boolean
    },
    passwordHashRound: number,
    authServer: {
        host: string,
        protocol: string
        port: number
    },
    userServer:{
        host: string,
        protocol: string
        port: number
    }

}
class Configuration implements IConfig {
    env: string = "development";
    port: number = 3100;
    default_user_verification_state: boolean = false;
    default_user_role: string = "admin";
    mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
    amqpsUrl: string = "amqp://localhost"
    express = {
        default_url_encoding_extended: true
    }
    authServer = {
        host: "localhost",
        protocol: "http",
        port: 3001
    }
    userServer = {
        host: "localhost",
        protocol: "http",
        port: 3002
    }
    setConfiguration(options: IConfig) {
        if (options.port) this.port = options.port;
        if (options.env) this.env = options.env;
        if (options.authServer) {
            if (options.authServer.host) this.authServer.host = options.authServer.host
            if (options.authServer.protocol) this.authServer.protocol = options.authServer.protocol
            if (options.authServer.port) this.authServer.port = options.authServer.port
        }
    }
    passwordHashRound: number = 5

}

let configuration = new Configuration();
export default configuration;