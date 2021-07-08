import express, { Router } from 'express';
const router: Router = express.Router();

import getUser from './getUser';
import addUser from './addUser';
import updateUser from './updateUser';
import deleteUser from './deleteUser';
import urlEncoded from '../../middleware/urlEncoded';
import error_handler from '../error_handler';
import multer from '../../middleware/multer';

router.get('/', getUser);
router.post('/', urlEncoded(), error_handler, multer().single('profile'), addUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

export default router;