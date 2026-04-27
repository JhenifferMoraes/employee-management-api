import express from 'express';
import{
    listarFuncionarios,
    inserirFuncionario
} from '../controllers/funcionarioController.js';

const router = express.Router();


// Realizando as rotas para os funcionários

router.get('/', listarFuncionarios);
router.post('/', inserirFuncionario);

export default router;