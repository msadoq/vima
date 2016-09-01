const debug = require('../../io/debug')('documents:workspaces');
const { Router } = require('express');
const validatePathOrOId = require('../../middlewares/validatePathOrOId');
const validFs = require('../../middlewares/validFs');

const { validateWsJson } = require('../../schemaManager/schemaManager');
const validateWorkspaceToPage = require('../../middlewares/validateWorkspaceToPage');

const router = new Router();

router.post('/workspaces', [
  validatePathOrOId,
  validFs,
  validateWsJson,
  validateWorkspaceToPage,
],

  (req, res) => {
    debug.debug('received', req.body, 'send', req.validated);
    const data = (req.validated.path)
      ? { path: req.validated.path }
      : { oId: req.validated.oId };

    const content = req.validated.reqValidatedPath;
    return res.json({ data }, { content });
  });
module.exports = router;
