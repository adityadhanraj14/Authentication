import express from 'express';
import {getSignup,postSignup} from '../Controller/authController.js';


const router = express.Router();

router.get('/signup', getSignup);
router.post('/signup',postSignup);

export default router;