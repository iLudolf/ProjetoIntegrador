let router = require('express').Router();

const globalController = require('../controllers/global-controller');

// router.post('/', globalController.adicionarAgendamento);

router.get('/', globalController.listarRegistros);

router.get('/:id', globalController.listarRegistrosPorID);

router.put('/:id', globalController.atualizarRegistros);

router.delete('/:id', globalController.removerRegistros);

module.exports = router;