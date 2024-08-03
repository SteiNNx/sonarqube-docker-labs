const express = require('express');
const helmet = require('helmet');
const trace = require('@bech/trace');
const httpContext = require('@bech/express-http-context');
const { configurarMonitoreo } = require('@bech/monitoreo');
const { setHeaders } = require('../utils/requestHeaders');

const generaNotificacion = require('../handlers/notificacion');
//const guardarNotificacion = require('../handlers/notificacion');

const app = express();
app.use(helmet());
app.use(express.json());
app.use(httpContext.middleware);

// Configura HSTS 
app.use(helmet.hsts({
    // Se define el tiempo en un año
    maxAge: 60 * 60 * 24 * 365,
    // Se incluye subdominios en la política. 
    includeSubDomains: true,
    // Se añade la política a Chrome's preload list. 
    preload: true
})
);

// Se remueve la cabecera X-Powered-By 
app.disable('x-powered-by');

const pathbase = '/api/v1/be-ca-notificacion-api'
const arrayConfiguracionMonitoreo = ['API', 'BE-CA-NOTIFICACION-API'];

const infoHeaders = {
    funcionalidad: 'Notificacion',
    etapa: 'Notificacion',
    operacion: 'Notificacion',
};

const tracer = trace.getTraceMiddleware({
    autoLogging: {
        // Ignorando healthcheck
        ignore: (req) => req.path.endsWith('/healthcheck') || req.path === '/',
    },
});

//healthcheck
const healthcheckEndpoint = function (req, res) {
    const response = { status: '00', message: 'Service OK' };
    res.status(200).json(response);
};

// Genera Notificacion
const generaNotificacionEndpoint = async function (req, res) {
    let body = req.body;
    const result = await generaNotificacion.generaNotificacion(body);
    res.status(result.statusCode).json(result.body);
    if (result.body.code === '00') {
        if (req.body.funcionalidad == 'SERVANULACION'||req.body.funcionalidad == 'SERVULTIMOPAGO') {
            body = {
                ...req.body,
                monto: result.notificacion.monto,
                montoPropina: result.notificacion.montoPropina,
            };
        }
        let notificacion = await generaNotificacion.guardarNotificacion(body);
        await generaNotificacion.envioNotificacion(body, notificacion);
    }
};

app.post(
    `${pathbase}/notificacion`,
    tracer,
    setHeaders({
        funcionalidad: infoHeaders.funcionalidad,
        etapa: infoHeaders.etapa,
        operacion: infoHeaders.operacion,
    }),
    configurarMonitoreo(...arrayConfiguracionMonitoreo),
    generaNotificacionEndpoint
);


app.get(`${pathbase}/healthcheck`, healthcheckEndpoint);

const main = () => {
    app.listen(8000, '0.0.0.0');
};

module.exports = {
    main,
    healthcheckEndpoint,
    generaNotificacionEndpoint,
};