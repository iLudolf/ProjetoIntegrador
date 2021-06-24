let router = require('express').Router();

const countriesController = require('../controllers/countries-controller');

// router.post('/', globalController.adicionarAgendamento);

router.get('/', countriesController.listarRegistros);

router.get('/:id', countriesController.listarRegistrosPorID);

router.put('/:id', countriesController.atualizarRegistros);

router.delete('/:id', countriesController.removerRegistros);

module.exports = router;