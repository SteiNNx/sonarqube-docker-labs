const getPagoBodyNotificacionSchema = async () => ({
    title: 'PagoNotificacion',
    description: 'Pago Notificacion almacena schema',
    type: 'object',
    properties: {
        funcionalidad: {
            type: 'string',
            description: 'funcionalidad',
        },
        codigoRespuesta: {
            type: 'number',
            description: 'codigoRespuesta',
        },
        idAlianza: {
            type: 'string',
            description: 'idAlianza',
        },
        resultado: {
            type: 'string',
            description: 'resultado',
        },
        fecha: {
            type: 'string',
            description: 'fecha',
        },
        monto: {
            type: 'number',
            description: 'monto',
        },
        montoPropina: {
            type: 'number',
            description: 'montoPropina',
        },
        medioDePago: {
            type: 'number',
            description: 'medioDePago',
        },
        oc: {
            type: 'string',
            description: 'oc',
        },
        transactionId: {
            type: 'string',
            description: 'transactionId',
        },
        marca: {
            type: 'string',
            description: 'marca',
        },
        ultimosDigitosTarjeta: {
            type: 'number',
            description: 'ultimosDigitosTarjeta',
        },
        tipoTarjeta: {
            type: 'string',
            description: 'tipoTarjeta',
        },
        cuotas: {
            type: 'number',
            description: 'cuotas',
        },
        nSerie: {
            type: 'string',
            description: 'nSerie',
        },
        ocAlianza: {
            type: 'string',
            description: 'ocAlianza',
        },
        rrn: {
            type: 'string',
            description: 'rrn',
        },
        firma: {
            type: 'string',
            description: 'firma',
        },
        url: {
            type: 'string',
            description: 'url',
        },
    },

    required: [
        'funcionalidad',
        'codigoRespuesta',
        'idAlianza',
        'resultado',
        'fecha',
        'monto',
        'medioDePago',
        'nSerie',
        'ocAlianza',
        'rrn',
        'firma',
        'url',
    ],
});

const getUltimoPagoBodyNotificacionSchema = async () => ({
    title: 'UltimoPagoNotificacion',
    description: 'Ultimo Pago Notificacion almacena schema',
    type: 'object',
    properties: {
        funcionalidad: {
            type: 'string',
            description: 'funcionalidad',
        },
        codigoRespuesta: {
            type: 'number',
            description: 'codigoRespuesta',
        },
        idAlianza: {
            type: 'string',
            description: 'idAlianza',
        },
        resultado: {
            type: 'string',
            description: 'resultado',
        },
        fecha: {
            type: 'string',
            description: 'fecha',
        },
        monto: {
            type: 'number',
            description: 'monto',
        },
        montoPropina: {
            type: 'number',
            description: 'montoPropina',
        },
        medioDePago: {
            type: 'number',
            description: 'medioDePago',
        },
        oc: {
            type: 'string',
            description: 'oc',
        },
        transactionId: {
            type: 'string',
            description: 'transactionId',
        },
        marca: {
            type: 'string',
            description: 'marca',
        },
        ultimosDigitosTarjeta: {
            type: 'number',
            description: 'ultimosDigitosTarjeta',
        },
        tipoTarjeta: {
            type: 'string',
            description: 'tipoTarjeta',
        },
        cuotas: {
            type: 'number',
            description: 'cuotas',
        },
        nSerie: {
            type: 'string',
            description: 'nSerie',
        },
        ocAlianza: {
            type: 'string',
            description: 'ocAlianza',
        },
        rrn: {
            type: 'string',
            description: 'rrn',
        },
        firma: {
            type: 'string',
            description: 'firma',
        },
        url: {
            type: 'string',
            description: 'url',
        },
    },

    required: [
        'funcionalidad',
        'codigoRespuesta',
        'idAlianza',
        'resultado',
        'fecha',
        'monto',
        'medioDePago',
        'nSerie',
        'ocAlianza',
        'rrn',
        'firma',
        'url',
    ],
});

const getAnulacionBodyNotificacionSchema = async () => ({
    title: 'AnulacionNotificacion',
    description: 'Ultimo Pago Notificacion almacena schema',
    type: 'object',
    properties: {
        funcionalidad: {
            type: 'string',
            description: 'funcionalidad',
        },
        transactionId: {
            type: 'string',
            description: 'transactionId',
        },
        idAlianza: {
            type: 'string',
            description: 'idAlianza',
        },
        fecha: {
            type: 'string',
            description: 'fecha',
        },
        ocAlianza: {
            type: 'string',
            description: 'ocAlianza',
        },
        rrn: {
            type: 'string',
            description: 'rrn',
        },
        firma: {
            type: 'string',
            description: 'firma',
        },
        url: {
            type: 'string',
            description: 'url',
        },
    },

    required: [
        'funcionalidad',
        'idAlianza',
        'fecha',
        'ocAlianza',
        'rrn',
        'firma',
        'url',
    ],
});


module.exports = {
    getPagoBodyNotificacionSchema,
    getUltimoPagoBodyNotificacionSchema,
    getAnulacionBodyNotificacionSchema,
};