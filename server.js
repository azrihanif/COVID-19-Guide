const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const {check, validationResult} = require('express-validator');
const details = require('./routes/details');
const authRoute = require('./routes/auth');
const db = require('./routes/database');
const passport = require('passport');
const local = require('./strategies/local');
const res = require('express/lib/response');

app.use((req, _res, next) => {
  console.log(req.method, ' : ', req.url);
  next();
});

app.use(
  bodyParser.json({
    type: 'application/json',
  }),
);

app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());
app.use(
  session({
    secret: 'TEST',
    resave: false,
    saveUninitialized: false,
  }),
);

var server = app.listen(3005, () => {
  console.log('Listening to port ', server.address().port);
});

app.use(passport.initialize());
app.use(passport.session());
app.use('/details', details);
app.use('/auth', authRoute);

const storage = multer.diskStorage({
  destination: 'images/profilepic',
  filename: (_req, _file, cb) => {
    return cb(null, `profile.jpg`);
  },
});

var upload = multer({storage: storage});

app.post('/uploadFile', upload.single('profilepic'), async (req, result) => {
  const {id} = req.body;
  if (req?.file?.filename && id) {
    const query = await db
      .promise()
      .query(
        `UPDATE profile SET profilepic = '${req.file.filename}' WHERE id = ${id}`,
      );
    if (query) {
      return result
        .status(200)
        .send({msg: 'Successfully upload to database', error: null});
    } else {
      return result.status(400).send({msg: 'Network error', error: '400'});
    }
  } else {
    return result.status(400).send({msg: 'Error'});
  }
});

app.post(
  '/deleteUser',
  check('id').notEmpty().withMessage('Id cannot be empty'),
  async (req, result) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return result.status(400).json(errors);
    }

    const {id} = req.body;
    if (id) {
      const query = await db
        .promise()
        .query(`DELETE FROM user WHERE id = ${id}`);
      if (query) {
        result.status(200).send({msg: 'Successfully deleted', error: null});
      } else {
        result.status(400).send({msg: 'Cannot delete the user', error: '400'});
      }
    } else {
      result.status(400).send({msg: 'Error occured', error: '400'});
    }
  },
);

app.post(
  '/getAdvice',
  check('id').notEmpty().withMessage('Id cannot be empty'),
  async (req, result) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return result.status(400).json(errors);
    }

    const {id} = req.body;
    if (id) {
      const query = await db
        .promise()
        .query(
          `SELECT b.like_id, a.id, a.advice_title, a.advice_picture, a.advice, a.advice_contact, a.advice_date, a.advice_email FROM advice_list a LEFT JOIN expert_advice b ON b.advice_id = a.id ORDER BY a.advice_date DESC`,
        );

      if (query[0]) {
        result.status(200).send({msg: query[0], error: null});
      } else {
        result.status(400).send({msg: 'Error occured', error: '400'});
      }
    } else {
      result.status(400).send({msg: 'Error occured', error: '400'});
    }
  },
);

app.post('/updateLike', async (req, result) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return result.status(400).json(errors);
  }

  const {advice_id, like, user_id} = req.body;

  if (advice_id) {
    const query = await db
      .promise()
      .query(
        `INSERT INTO expert_advice (user_id, advice_id, like_id) VALUES (${user_id}, ${advice_id}, '${like}')ON DUPLICATE KEY UPDATE like_id = '${like}'`,
      );
    if (query) {
      result.status(400).send({msg: 'Successfully update', error: null});
    } else {
      result.status(400).send({msg: 'Error Updating', error: '400'});
    }
  }
});

app.post(
  '/getData',
  check('id').notEmpty().withMessage('Id cannot be empty'),
  async (req, result) => {
    const {id} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return result.status(400).json(errors);
    }

    try {
      const query = await db
        .promise()
        .query(`SELECT profilepic FROM details WHERE id = ${id}`);
      if (query) {
        return result.status(200).send(JSON.stringify(query[0]));
      } else {
        return result.status(400).send({msg: 'An error occured'});
      }
    } catch (error) {
      return result.status(400).send({msg: error});
    }
  },
);

app.get('/login', async (req, result) => {
  if (req.user) {
    const query = await db.promise().query('SELECT * FROM details');
    result.status(200).send(query[0]);
  } else {
    result.status(403).send({msg: 'Forbidden'});
  }
});

app.post(
  '/login',
  check('username').notEmpty().withMessage('Username cannot be empty'),
  check('password').notEmpty().withMessage('Password cannot be empty'),
  async (req, result) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return result.status(400).json(errors);
    }
    const {username, password} = req.body;
    if (username && password) {
      try {
        const query = await db
          .promise()
          .query(
            `SELECT a.id, a.name, b.dark_mode, b.language FROM user a INNER JOIN miscellaneous b ON a.id = b.user_id WHERE username = '${username}' AND password = '${password}'`,
          );

        if (query[0][0]) {
          result.status(200).send({msg: query[0][0], error: null});
        } else {
          result
            .status(400)
            .send({msg: 'Could not find the specified user', error: '400'});
        }
      } catch (err) {
        result.status(400).send(err);
      }
    }
  },
);

app.post(
  '/getProfile',
  check('id').notEmpty().withMessage('Id cannot be empty'),
  async (req, result) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return result.status(400).json(errors);
    }

    const {id} = req.body;

    if (id) {
      const query = await db
        .promise()
        .query(
          `SELECT a.name, a.username, b.email, b.address, b.phone_no, b.profilepic FROM user a INNER JOIN profile b ON a.id = b.user_id WHERE a.id = '${id}' AND b.user_id = '${id}'`,
        );

      if (query[0][0]) {
        result.status(200).send({msg: query[0][0], error: null});
      } else {
        result.status(400).send({msg: 'Invalid user', error: '400'});
      }
    } else {
      result.status(400).send({msg: 'Error Occured', error: '400'});
    }
  },
);

app.post(
  '/updateProfile',
  check('id').notEmpty().withMessage('Id cannot be empty'),
  async (req, result) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return result.status(400).json(errors);
    }
    const {email, name, password, phone_no, address, id} = req.body;

    if (email && name && password && phone_no && address) {
      const query = await db
        .promise()
        .query(
          `UPDATE user a, profile b SET a.name = '${name}', b.email = '${email}', a.password = '${password}', b.address = '${address}', phone_no = '${phone_no}' WHERE a.id = '${id}' AND b.user_id = '${id}' `,
        );
      if (query) {
        result.status(200).send({msg: 'Successfully updated', error: null});
      } else {
        result
          .status(400)
          .send({msg: 'Error occured while updating', error: '400'});
      }
    } else {
      result.status(400).send({msg: 'Error Occured', error: '400'});
    }
  },
);

app.post(
  '/getCOVIDInfo',
  check('id').notEmpty().withMessage('Id cannot be empty'),
  async (req, result) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return result.status(400).json(errors);
    }

    const {id} = req.body;
    if (id) {
      const query = await db
        .promise()
        .query(
          'SELECT `covid19_info`, `picture`, `links`, `title`, `date` FROM `covid19_info` ORDER BY `date` DESC',
        );

      if (query[0]) {
        result.status(200).send({msg: query[0], error: null});
      } else {
        result.status(400).send({msg: 'Internal Error', error: '400'});
      }
    } else {
      result.status(400).send({msg: 'Error Occured', error: '400'});
    }
  },
);

app.post(
  '/getActivity',
  check('id').notEmpty().withMessage('Id cannot be empty'),
  async (req, result) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return result.status(400).json(errors);
    }
    const {id} = req.body;
    const query = await db
      .promise()
      .query(
        `SELECT activity, picture, video_name, video_data FROM indoor_activity WHERE user_id = ${id}`,
      );

    if (query[0][0]) {
      result.status(200).send({msg: query[0], error: null});
    } else if (!query[0][0]) {
      result.status(200).send({msg: 'No available task', error: null});
    } else {
      result.status(400).send({msg: 'Error Occured', error: '400'});
    }
  },
);

app.post('/changeUsername', async (req, res) => {
  const {oldUsername, newUsername} = req.body;

  if (!oldUsername || !newUsername)
    res.status(400).send({msg: 'Error Occured', error: '400'});
  const query = await db
    .promise()
    .query(
      `UPDATE user SET username= '${newUsername}' WHERE username = '${oldUsername}'`,
    );

  if (!!query[0]?.changedRows) {
    res.status(200).send({msg: 'Successfully updated', error: null});
  } else {
    res.status(400).send({msg: 'Error Occured', error: '400'});
  }
});

app.post('/changePhone', async (req, res) => {
  const {oldPhone, newPhone} = req.body;

  if (!oldPhone || !newPhone) {
    res.status(400).send({msg: 'Error Occured', error: '400'});
    return;
  }
  const query = await db
    .promise()
    .query(
      `UPDATE profile SET phone_no = '${newPhone}' WHERE phone_no = '${oldPhone}'`,
    );

  if (!!query[0]?.changedRows) {
    res.status(200).send({msg: 'Successfully updated', error: null});
  } else {
    res.status(400).send({msg: 'Error Occured', error: '400'});
  }
});

app.post('/changeEmail', async (req, res) => {
  const {oldEmail, newEmail} = req.body;

  if (!oldEmail || !newEmail)
    res.status(400).send({msg: 'Error Occured', error: '400'});
  const query = await db
    .promise()
    .query(
      `UPDATE profile SET email = '${newEmail}' WHERE email = '${oldEmail}'`,
    );

  if (!!query[0]?.changedRows) {
    res.status(200).send({msg: 'Successfully updated', error: null});
  } else {
    res.status(400).send({msg: 'Error Occured', error: '400'});
  }
});

app.post('/changePass', async (req, res) => {
  const {currentPass, confirmPass, newPass} = req.body;

  if (!currentPass || !confirmPass || !newPass)
    res.status(400).send({msg: 'Error Occured', error: '400'});

  if (confirmPass !== newPass) {
    res.status(400).send({
      msg: 'New Password and Confirm Password did not match',
      error: '400',
    });
    return;
  }

  const passQuery = await db
    .promise()
    .query(`SELECT password FROM user WHERE password = '${currentPass}'`);

  if (!passQuery[0]?.length) {
    res.status(400).send({msg: 'Wrong current password!', error: '400'});
    return;
  }

  const query = await db
    .promise()
    .query(
      `UPDATE user SET password = '${newPass}' WHERE password = '${currentPass}'`,
    );

  if (!!query[0]?.changedRows) {
    res.status(200).send({msg: 'Successfully updated', error: null});
  } else {
    res.status(400).send({msg: 'Error Occured', error: '400'});
  }
});

app.post('/changeLanguage', async (req, res) => {
  const {id, language} = req.body;

  if (!id || !language) {
    res.status(400).send({msg: 'Error Occured', error: '400'});
    return;
  }

  const query = await db
    .promise()
    .query(
      `UPDATE miscellaneous SET language='${language}' WHERE user_id = ${id}`,
    );

  if (!!query[0]?.changedRows) {
    res.status(200).send({msg: 'Successfully updated', error: null});
  } else {
    res.status(400).send({msg: 'Error Occured', error: '400'});
  }
});

app.post('/changeDarkMode', async (req, res) => {
  const {id, darkMode} = req.body;

  if (!id || !darkMode) {
    res.status(400).send({msg: 'Error Occured', error: '400'});
    return;
  }

  const query = await db
    .promise()
    .query(
      `UPDATE miscellaneous SET dark_mode='${darkMode}' WHERE user_id = ${id}`,
    );

  if (!!query[0]?.changedRows) {
    res.status(200).send({msg: 'Successfully updated', error: null});
  } else {
    res.status(400).send({msg: 'Error Occured', error: '400'});
  }
});

app.get('/cart', (req, _res) => {
  const {cart} = req.session;
  if (!cart) {
    res.send('You have no cart');
  } else {
    res.send(cart);
  }
});

app.post('/cart/item', (req, _res) => {
  const {item, quantity} = req.body;
  const cartItem = {item, quantity};
  const {cart} = req.session;
  if (cart) {
    req.session.cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }
  res.send(201);
});
