import express, { Router } from 'express';
const router: Router = express.Router();

import getUser from './getUser';
import addUser from './addUser';
import updateUser from './updateUser';
import deleteUser from './deleteUser';
import expressJson from '../../middleware/expressJson';
import urlEncoded from '../../middleware/urlEncoded';


router.get('/', getUser);
router.post('/', expressJson(), urlEncoded(), addUser);
router.put('/', updateUser);
router.delete('/', deleteUser);

export default router;