const { v4: uuidv4 } = require('uuid');

const setHeaders = (params) => (req, res, next) => {
  req.headers = {
    ...req.headers,
    ...params,
    nombreaplicacion: 'App-Compraqui',
    canal: 'Presencial',
    xtrackid: uuidv4(),
  };
  next();
};

module.exports = {
  setHeaders,
};
