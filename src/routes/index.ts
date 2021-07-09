import express, { Router } from 'express';
// utility routes
import error from './error_handler';
import login from './auth/login';
import not_found from './not_found';
import user from './user/index.';
import expressJson from '../middleware/expressJson';
import urlEncoded from '../middleware/urlEncoded';
import addUser from './user/addUser';
import multer from '../middleware/multer';
// entities

const router: Router = express.Router();
router.get('/', (req, res) => { res.send('api_gateway') })
router.post('/login', expressJson(), urlEncoded(), login);
router.post('/register', expressJson(), multer().single('profile'), urlEncoded(), addUser)
router.use('/user', user)
router.use(not_found);
router.use(error);

export default router;