import * as  express from 'express';
import isAuth  from '../controllers/index.controller'
const router = express.Router();

router.get('/', (req, res) => res.render('welcome'));

router.get('/dashboard', isAuth, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

export = router;
