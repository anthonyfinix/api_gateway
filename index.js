const api_gateway = require('./dist').default;
let port = 3000
api_gateway({port}).then(app => {
    app.listen(port, () => {
        console.info('listening to port:', port)
    })
});