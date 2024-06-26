import express from 'express';
import docController from '../controllers/docController.js';

const router = express.Router();

router.get('/hello',docController.hello);

router.get('/list',docController.listDocument);

router.post('/add',docController.addDocument);

router.delete('/delete',docController.deleteDocumentById);

export default router;