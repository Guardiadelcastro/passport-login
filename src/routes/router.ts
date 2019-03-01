import * as  express from 'express';
const router = express.Router();
import { isAuth } from '../config/auth'

router.get('/', (req, res) => res.render('welcome'));

router.get('/dashboard', isAuth, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

export = router;
