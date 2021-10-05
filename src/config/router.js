const express = require('express');

module.exports = app => {
  app.use('/auth', app.routes.auth);

  //app.use('/payslip', app.routes.payslip);

  const protectedRouter = express.Router();

  protectedRouter.use('/funcionarios', app.routes.funcionarios);

  protectedRouter.use('/pontos', app.routes.pontos);

  protectedRouter.use('/password', app.routes.password);

  protectedRouter.use('/payslip', app.routes.payslip);
  app.use('/v1', app.config.passport.authenticate(), protectedRouter);
};
