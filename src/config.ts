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
    roleServer:{
        host: string,
        protocol: string
        port: number
    }

}
class Configuration implements IConfig {
    env = "development";
    port = 3100;
    default_user_verification_state = false;
    default_user_role = "admin";
    mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
    amqpsUrl = "amqp://localhost"
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
    roleServer = {
        host: "localhost",
        protocol: "http",
        port: 3006
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