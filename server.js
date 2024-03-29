const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const axios = require('axios');
const FormData = require('form-data');
const session = require('express-session');
const {check, validationResult} = require('express-validator');
const details = require('./routes/details');
const authRoute = require('./routes/auth');
const db = require('./routes/database');
const passport = require('passport');
const local = require('./strategies/local');
const res = require('express/lib/response');
const http = require('http');

const portNum = ':3005';
const ipAddress = '192.168.0.104' + portNum;

app.use((req, _res, next) => {
  console.log(req.method, ' : ', req.url);
  next();
});

const checkInternet = async () => {
  try {
    const response = await new Promise((resolve, reject) => {
      const req = http.get(`http://${ipAddress}`, res => {
        resolve(res);
      });
      req.on('error', reject);
    });

    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log('Internet is connected');
      return false;
    } else {
      console.log('Internet is not connected');
      return true;
    }
  } catch (error) {
    console.log('Internet is not connected');
    return true;
  }
};

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
  const check = await checkInternet();
  if (check) {
    return result
      .status(500)
      .send({msg: 'Internet is not connected', error: '500'});
  }

  const {id} = req.body;
  if (req?.file?.filename && id) {
    const query = await db
      .promise()
      .query('UPDATE profile SET profilepic = ? WHERE id = ?', [
        req.file.filename,
        id,
      ]);
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

app.post('/getMusic', async (req, res) => {
  if (!!req?.body?.id && !req?.body?.genre) {
    const stmt = `SELECT b.favourite, a.id, a.music_title AS 'title', a.music_link AS 'song', a.music_genre AS 'genre', a.music_artist AS 'name', a.music_picture AS 'picture' FROM music a LEFT JOIN user_music b ON b.music_id = a.id`;

    const query = await db.promise().query(stmt);
    if (query) {
      return res.status(200).send({msg: query[0], error: null});
    } else {
      return res.status(400).send({msg: 'Error', error: '400'});
    }
  } else if (!!req?.body?.genre) {
    const stmt = `SELECT b.favourite, a.id, a.music_title AS 'title', a.music_link AS 'song', a.music_genre AS 'genre', a.music_artist AS 'name', a.music_picture AS 'picture' FROM music a LEFT JOIN user_music b ON b.music_id = a.id WHERE a.music_genre = ?`;
    const value = [req?.body?.genre];
    const query = await db.promise().query(stmt, value);
    if (query) {
      return res.status(200).send({msg: query[0], error: null});
    } else {
      return res.status(400).send({msg: 'Error', error: '400'});
    }
  } else {
    return res.status(400).send({msg: 'Error', error: '400'});
  }
});

app.post('/getFavourite', async (req, res) => {
  if (!!req?.body?.id) {
    const stmt = `SELECT b.favourite, a.id, a.music_title AS 'title', a.music_link AS 'song', a.music_genre AS 'genre', a.music_artist AS 'name', a.music_picture AS 'picture' FROM music a INNER JOIN user_music b ON b.music_id = a.id WHERE b.user_id = ? AND b.favourite = 'T'`;
    const value = [req?.body?.id];
    const query = await db.promise().query(stmt, value);
    if (query) {
      return res.status(200).send({msg: query[0], error: null});
    } else {
      return res.status(400).send({msg: 'Error', error: '400'});
    }
  } else {
    return res.status(400).send({msg: 'Error', error: '400'});
  }
});

app.post('/getGenre', async (req, res) => {
  if (!!req?.body?.id) {
    const stmt = `SELECT genre AS title, COUNT(*) AS noOfSongs FROM (SELECT music_title, music_link, music_genre AS genre, music_artist, music_picture FROM music) as t GROUP BY genre`;
    const value = [req?.body?.id];
    const query = await db.promise().query(stmt, value);
    if (query) {
      return res.status(200).send({msg: query[0], error: null});
    } else {
      return res.status(400).send({msg: 'Error', error: '400'});
    }
  } else {
    return res.status(400).send({msg: 'Error', error: '400'});
  }
});

app.post(
  '/deleteUser',
  check('id').notEmpty().withMessage('Id cannot be empty'),
  async (req, result) => {
    const check = await checkInternet();
    if (check) {
      return result
        .status(500)
        .send({msg: 'Internet is not connected', error: '500'});
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return result.status(400).json(errors);
    }

    const {id} = req.body;
    if (id) {
      const query = await db
        .promise()
        .query(`DELETE FROM user WHERE id = ?`, [id]);
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
    const check = await checkInternet();
    if (check) {
      return result
        .status(500)
        .send({msg: 'Internet is not connected', error: '500'});
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return result.status(400).json(errors);
    }

    const {id} = req.body;
    if (id) {
      const query = await db
        .promise()
        .query(
          `SELECT DISTINCT b.like_id, a.id, a.advice_title, a.advice_picture, a.advice, a.advice_contact, a.advice_date, a.advice_email FROM advice_list a LEFT JOIN expert_advice b ON b.advice_id = a.id AND b.user_id = ? AND b.like_id IS NOT NULL ORDER BY a.advice_date DESC`,
          [id],
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
  const check = await checkInternet();
  if (check) {
    return result
      .status(500)
      .send({msg: 'Internet is not connected', error: '500'});
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return result.status(400).json(errors);
  }

  const {advice_id, like, user_id} = req.body;

  if (advice_id) {
    const check = `SELECT id FROM expert_advice WHERE user_id = ? AND advice_id = ?`;
    const checkValue = [user_id, advice_id];
    const checkQuery = await db.promise().query(check, checkValue);

    if (!!checkQuery[0]?.length) {
      const stmt = `UPDATE expert_advice SET like_id = ? WHERE user_id = ? AND advice_id = ?`;
      const values = [like, user_id, advice_id];
      const query = await db.promise().query(stmt, values);
      if (query) {
        result.status(200).send({msg: 'Successfully update', error: null});
      } else {
        result.status(400).send({msg: 'Error Updating', error: '400'});
      }
    } else {
      const stmt = `INSERT INTO expert_advice (user_id, advice_id, like_id) VALUES (?, ?, ?)`;
      const values = [user_id, advice_id, like];
      const query = await db.promise().query(stmt, values);
      if (query) {
        result.status(200).send({msg: 'Successfully update', error: null});
      } else {
        result.status(400).send({msg: 'Error Updating', error: '400'});
      }
    }
  }
});

app.post('/updateFavMusic', async (req, result) => {
  const check = await checkInternet();
  if (check) {
    return result
      .status(500)
      .send({msg: 'Internet is not connected', error: '500'});
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return result.status(400).json(errors);
  }

  const {music_id, user_id, like} = req.body;

  if (music_id) {
    const check = `SELECT id FROM user_music WHERE user_id = ? AND music_id = ?`;
    const checkValue = [user_id, music_id];
    const checkQuery = await db.promise().query(check, checkValue);

    if (!!checkQuery[0]?.length) {
      const stmt = `UPDATE user_music SET favourite = ? WHERE user_id = ? AND music_id = ?`;
      const values = [like, user_id, music_id];
      const query = await db.promise().query(stmt, values);
      if (query) {
        result.status(200).send({msg: 'Successfully update', error: null});
      } else {
        result.status(400).send({msg: 'Error Updating', error: '400'});
      }
    } else {
      const stmt = `INSERT INTO user_music (user_id, music_id, favourite) VALUES (?, ?, ?)`;
      const values = [user_id, music_id, like];
      const query = await db.promise().query(stmt, values);
      if (query) {
        result.status(200).send({msg: 'Successfully update', error: null});
      } else {
        result.status(400).send({msg: 'Error Updating', error: '400'});
      }
    }
  }
});

app.post(
  '/getData',
  check('id').notEmpty().withMessage('Id cannot be empty'),
  async (req, result) => {
    const check = await checkInternet();
    if (check) {
      return result
        .status(500)
        .send({msg: 'Internet is not connected', error: '500'});
    }

    const {id} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return result.status(400).json(errors);
    }

    try {
      const query = await db
        .promise()
        .query(`SELECT profilepic FROM details WHERE id = ?`, [id]);
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

app.post(
  '/login',
  check('username').notEmpty().withMessage('Username cannot be empty'),
  check('password').notEmpty().withMessage('Password cannot be empty'),
  async (req, result) => {
    const check = await checkInternet();
    if (check) {
      return result
        .status(500)
        .send({msg: 'Internet is not connected', error: '500'});
    } else {
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
              `SELECT a.id, a.name, b.dark_mode, b.language FROM user a INNER JOIN miscellaneous b ON a.id = b.user_id WHERE username = ? AND password = ?`,
              [username, password],
            );

          if (query[0][0]) {
            result.status(200).send({msg: query[0][0], error: null});
          } else {
            result
              .status(400)
              .send({msg: 'Invalid username or password', error: '400'});
          }
        } catch (err) {
          result.status(400).send(err);
        }
      }
    }
  },
);

app.post(
  '/getProfile',
  check('id').notEmpty().withMessage('Id cannot be empty'),
  async (req, result) => {
    const check = await checkInternet();
    if (check) {
      return result
        .status(500)
        .send({msg: 'Internet is not connected', error: '500'});
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return result.status(400).json(errors);
    }

    const {id} = req.body;

    if (id) {
      const stmt = `SELECT a.name, a.username, b.email, b.address, b.phone_no, b.profilepic FROM user a INNER JOIN profile b ON a.id = b.user_id WHERE a.id = ? AND b.user_id = ?`;
      const values = [id, id];
      const query = await db.promise().query(stmt, values);

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
    const check = await checkInternet();
    if (check) {
      return result
        .status(500)
        .send({msg: 'Internet is not connected', error: '500'});
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return result.status(400).json(errors);
    }
    const {email, name, password, phone_no, address, id} = req.body;

    if (email && name && password && phone_no && address) {
      const stmt = `UPDATE user a, profile b SET a.name = ?, b.email = ?, a.password = ?, b.address = ?, phone_no = ? WHERE a.id = ? AND b.user_id = ?`;
      const values = [name, email, password, address, phone_no, id, id];
      const query = await db.promise().query(stmt, values);
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
    const check = await checkInternet();
    if (check) {
      return result
        .status(500)
        .send({msg: 'Internet is not connected', error: '500'});
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return result.status(400).json(errors);
    }

    const {id} = req.body;
    if (id) {
      const query = await db
        .promise()
        .query(
          'SELECT `covid19_info`, `picture`, `links`, `title`, `date`, `new_info` FROM `covid19_info` ORDER BY `date` DESC',
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
    const check = await checkInternet();
    if (check) {
      return result
        .status(500)
        .send({msg: 'Internet is not connected', error: '500'});
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return result.status(400).json(errors);
    }
    const {id} = req.body;
    if (!!id) {
      const query = await db
        .promise()
        .query(
          `SELECT activity, picture, video_name, video_data FROM activity_list`,
        );

      const query2 = await db
        .promise()
        .query(
          `SELECT activity, frequency FROM user_activity WHERE user_id = ${id}`,
        );

      if (!!query[0][0]) {
        result.status(200).send({
          msg: {activity: query[0], user_activity: query2[0]},
          error: null,
        });
        return;
      } else if (!query[0][0] && !query2[0][0]) {
        result.status(200).send({msg: 'No available task', error: null});
        return;
      } else if (!query[0][0] && !!query2[0][0]) {
        result.status(200).send({
          msg: {activity: 'No available task', user_activity: query2[0]},
          error: null,
        });
        return;
      } else if (query[0][0] && !query2[0][0]) {
        result.status(200).send({
          msg: {activity: query[0], user_activity: 'No available task'},
          error: null,
        });
        return;
      } else {
        result.status(400).send({msg: 'Error Occured', error: '400'});
        return;
      }
    }
  },
);

app.post('/addActivity', async (req, res) => {
  const check = await checkInternet();
  if (check) {
    return res
      .status(500)
      .send({msg: 'Internet is not connected', error: '500'});
  }

  const {id, activity, frequency} = req.body;

  if (id && activity && frequency) {
    const stmt = `INSERT INTO user_activity(user_id, activity, frequency) VALUES (?,?,?)`;
    const values = [id, activity, frequency];
    const query = await db.promise().query(stmt, values);

    if (!!query[0]?.affectedRows) {
      res.status(200).send({msg: 'Successfully added', error: null});
    } else {
      res.status(400).send({msg: 'Error Occured', error: '400'});
    }
  }
});

app.post('/changeUsername', async (req, res) => {
  const check = await checkInternet();
  if (check) {
    return res
      .status(500)
      .send({msg: 'Internet is not connected', error: '500'});
  }

  const {oldUsername, newUsername} = req.body;

  if (!oldUsername || !newUsername)
    res.status(400).send({msg: 'Error Occured', error: '400'});
  const stmt = `UPDATE user SET username= ? WHERE username = ?`;
  const values = [newUsername, oldUsername];
  const query = await db.promise().query(stmt, values);

  if (!!query[0]?.changedRows) {
    res.status(200).send({msg: 'Successfully updated', error: null});
  } else {
    res.status(400).send({msg: 'Error Occured', error: '400'});
  }
});

app.post('/changePhone', async (req, res) => {
  const check = await checkInternet();
  if (check) {
    return res
      .status(500)
      .send({msg: 'Internet is not connected', error: '500'});
  }

  const {oldPhone, newPhone} = req.body;

  if (!oldPhone || !newPhone) {
    res.status(400).send({msg: 'Error Occured', error: '400'});
    return;
  }
  const stmt = `UPDATE profile SET phone_no = ? WHERE phone_no = ?`;
  const values = [newPhone, oldPhone];
  const query = await db.promise().query(stmt, values);

  if (!!query[0]?.changedRows) {
    res.status(200).send({msg: 'Successfully updated', error: null});
  } else {
    res.status(400).send({msg: 'Error Occured', error: '400'});
  }
});

app.post('/changeEmail', async (req, res) => {
  const check = await checkInternet();
  if (check) {
    return res
      .status(500)
      .send({msg: 'Internet is not connected', error: '500'});
  }

  const {oldEmail, newEmail} = req.body;

  if (!oldEmail || !newEmail)
    res.status(400).send({msg: 'Error Occured', error: '400'});

  const stmt = `UPDATE profile SET email = ? WHERE email = ?`;
  const values = [newEmail, oldEmail];
  const query = await db.promise().query(stmt, values);

  if (!!query[0]?.changedRows) {
    res.status(200).send({msg: 'Successfully updated', error: null});
  } else {
    res.status(400).send({msg: 'Error Occured', error: '400'});
  }
});

app.post('/changePass', async (req, res) => {
  const check = await checkInternet();
  if (check) {
    return res
      .status(500)
      .send({msg: 'Internet is not connected', error: '500'});
  }

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
    .query(`SELECT password FROM user WHERE password = ?`, [currentPass]);

  if (!passQuery[0]?.length) {
    res.status(400).send({msg: 'Wrong current password!', error: '400'});
    return;
  }

  const query = await db
    .promise()
    .query(`UPDATE user SET password = ? WHERE password = ?`, [
      newPass,
      currentPass,
    ]);

  if (!!query[0]?.changedRows) {
    res.status(200).send({msg: 'Successfully updated', error: null});
  } else {
    res.status(400).send({msg: 'Error Occured', error: '400'});
  }
});

app.post('/changeLanguage', async (req, res) => {
  const check = await checkInternet();
  if (check) {
    return res
      .status(500)
      .send({msg: 'Internet is not connected', error: '500'});
  }

  const {id, language} = req.body;

  if (!id || !language) {
    res.status(400).send({msg: 'Error Occured', error: '400'});
    return;
  }

  const query = await db
    .promise()
    .query(`UPDATE miscellaneous SET language = ? WHERE user_id = ?`, [
      language,
      id,
    ]);

  if (!!query[0]?.changedRows) {
    res.status(200).send({msg: 'Successfully updated', error: null});
  } else {
    res.status(400).send({msg: 'Error Occured', error: '400'});
  }
});

app.post('/changeDarkMode', async (req, res) => {
  const check = await checkInternet();
  if (check) {
    return res
      .status(500)
      .send({msg: 'Internet is not connected', error: '500'});
  }

  const {id, darkMode} = req.body;

  if (!id || !darkMode) {
    res.status(400).send({msg: 'Error Occured', error: '400'});
    return;
  }

  const query = await db
    .promise()
    .query(`UPDATE miscellaneous SET dark_mode = ? WHERE user_id = ?`, [
      darkMode,
      id,
    ]);

  if (!!query[0]?.changedRows) {
    res.status(200).send({msg: 'Successfully updated', error: null});
  } else {
    res.status(400).send({msg: 'Error Occured', error: '400'});
  }
});

app.post('/checkUsername', async (req, res) => {
  const check = await checkInternet();
  if (check) {
    return res
      .status(500)
      .send({msg: 'Internet is not connected', error: '500'});
  }

  const {username} = req.body;
  if (username) {
    const query = await db
      .promise()
      .query('SELECT username FROM user WHERE username LIKE ?', [username]);

    if (!!query[0]?.length) {
      res.status(200).send({
        msg: 'Username is taken. Please choose another username',
        error: '400',
      });
    } else {
      res.status(200).send({msg: '', error: null});
    }
  }
});

app.post('/signUp', async (req, res) => {
  const check = await checkInternet();
  if (check) {
    return res
      .status(500)
      .send({msg: 'Internet is not connected', error: '500'});
  }

  const {username, password} = req.body;

  if (!username || !password) {
    res.status(400).send({msg: 'Error Occured', error: '400'});
    return;
  }

  const query1 = await db
    .promise()
    .query(`INSERT INTO user(name, username, password) VALUES (?,?,?);`, [
      username,
      username,
      password,
    ]);

  const query2 = await db
    .promise()
    .query(
      `INSERT INTO profile(user_id,phone_no, email) VALUES ((SELECT id FROM user WHERE name = ? AND username = ?),?,?);`,
      [username, username, req?.body?.phoneNo, req?.body?.email],
    );

  const query3 = await db
    .promise()
    .query(
      `INSERT INTO miscellaneous(user_id, dark_mode, language) VALUES ((SELECT id FROM user WHERE name = ? AND username = ?),'F','english');`,
      [username, username],
    );

  if (
    !!query1[0]?.affectedRows &&
    !!query2[0]?.affectedRows &&
    !!query3[0]?.affectedRows
  ) {
    res.status(200).send({msg: 'Successfully sign up', error: null});
  } else {
    res.status(400).send({msg: 'Error Occured', error: '400'});
  }
});

app.post('/sendEmail', async (req, res) => {
  const check = await checkInternet();
  if (check) {
    return res
      .status(500)
      .send({msg: 'Internet is not connected', error: '500'});
  }

  if (!req?.body?.email) {
    res.status(400).send({
      msg: 'Please enter your email address to receive OTP',
      error: '400',
    });
    return;
  }

  const query = await db
    .promise()
    .query(`SELECT username FROM user WHERE username = ?`, [
      req?.body?.username,
    ]);

  if (!query[0][0]) {
    res
      .status(400)
      .send({msg: 'No user was found with the username', error: '400'});
    return;
  }

  const otp_code = Math.floor(100000 + Math.random() * 900000);
  const query2 = await db
    .promise()
    .query(`UPDATE user SET otp_code = ? WHERE username = ?`, [
      otp_code,
      req?.body?.username,
    ]);

  if (!query2[0]?.affectedRows) {
    res.status(400).send({msg: 'Error Occured', error: '400'});
    return;
  }

  const output = `
  <p>You requested for a One-Time PIN (OTP) for changing your password account</p>
  <p>Enter your 6-digit OTP shown below to proceed</p>
  <h3>${otp_code}</h3>
  <p>This OTP is valid for 2 minutes and usable only once.</p>
  <p><strong>Thank you</strong></p>
  `;

  let transporter = nodemailer.createTransport({
    host: '#', //user email protocol
    auth: {
      user: '#', //user email address
      pass: '#', //password for your company email address
    },
  });

  let info = await transporter.sendMail({
    from: '"COVID-19 Guide" <#>', //specify the sender email address
    to: `${req?.body?.email}`,
    subject: 'Reset Password Request',
    html: output,
  });

  res.status(200).send({
    msg: 'We have send the OTP code to your email address',
    error: null,
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
});

app.post('/sendSMS', async (req, res) => {
  const check = await checkInternet();
  if (check) {
    return res
      .status(500)
      .send({msg: 'Internet is not connected', error: '500'});
  }

  try {
    const data = new FormData();
    data.append('mobile', `+6${req?.body?.phoneNo}`);
    data.append('sender_id', 'D7VERIFY');
    data.append('message', 'Your OTP code is {code}');
    data.append('expiry', '900');

    const response = await axios({
      method: 'POST',
      url: 'https://d7networks.com/api/verifier/send',
      headers: {
        Authorization: 'Token #', //specify the token 
        ...data.getHeaders(),
      },
      data: data,
    });

    const query = await db
      .promise()
      .query(`UPDATE user SET otp_id = ? WHERE username = ?`, [
        response?.data?.otp_id,
        req?.body?.username,
      ]);

    if (!!query[0]?.affectedRows) {
      res.status(200).send({
        msg: `We have send the OTP code to your phone number`,
        error: null,
      });
    } else {
      res.status(400).send({msg: 'Error Occured', error: '400'});
    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/verifyOTPSMS', async (req, res) => {
  const check = await checkInternet();
  if (check) {
    return res
      .status(500)
      .send({msg: 'Internet is not connected', error: '500'});
  }

  const query = await db
    .promise()
    .query(`SELECT otp_id FROM user WHERE username = ?`, [req?.body?.username]);

  try {
    const data = new FormData();
    data.append('otp_id', query[0][0]?.otp_id);
    data.append('otp_code', req?.body?.OTPCode);

    const response = await axios({
      method: 'POST',
      url: 'https://d7networks.com/api/verifier/verify',
      headers: {
        Authorization: 'Token #', //specify the token
        ...data.getHeaders(),
      },
      data: data,
    });
    console.log('data=> ', response?.data);
    if (response?.data?.status === 'success') {
      res.status(200).send({msg: 'success', error: null});
    } else {
      res.status(400).send({msg: 'Invalid OTP', error: '400'});
    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/verifyOTPEmail', async (req, res) => {
  const check = await checkInternet();
  if (check) {
    return res
      .status(500)
      .send({msg: 'Internet is not connected', error: '500'});
  }

  const query = await db
    .promise()
    .query(`SELECT otp_code FROM user WHERE username = ?`, [
      req?.body?.username,
    ]);
  if (req?.body?.OTPCode !== query[0][0]?.otp_code) {
    res.status(400).send({msg: 'Invalid OTP Code', error: '400'});
    return;
  }

  res.status(200).send({msg: 'Success', error: null});
});

app.post('/forgotPass', async (req, res) => {
  const check = await checkInternet();
  if (check) {
    return res
      .status(500)
      .send({msg: 'Internet is not connected', error: '500'});
  }

  if (!req?.body?.password || !req?.body?.confPass) {
    res.status(400).send({msg: 'Please enter your new password', error: '400'});
    return;
  }

  if (req?.body?.password !== req?.body?.confPass) {
    res
      .status(400)
      .send({msg: 'Password and Confirm Password did not match', error: '400'});
    return;
  }

  const query = await db
    .promise()
    .query(`UPDATE user SET password = ? WHERE username = ?`, [
      req?.body?.password,
      req?.body?.username,
    ]);

  if (!!query[0]?.affectedRows) {
    res.status(200).send({msg: 'Successfully changed password', error: null});
  } else {
    res.status(400).send({msg: 'Error occured', error: '400'});
  }
});

app.get('/checkInternet', async (_req, res) => {
  try {
    const response = await new Promise((resolve, reject) => {
      const req = http.get(`http://${ipAddress}`, res => {
        resolve(res);
      });
      req.on('error', reject);
    });

    if (response.statusCode >= 200 && response.statusCode < 300) {
      console.log('Internet is connected');
      res.status(200).send('Internet is connected');
    } else {
      console.log('Internet is not connected');
      res.status(500).send('Internet is not connected');
    }
  } catch (error) {
    console.log('Internet is not connected');
    res.status(500).send('Internet is not connected');
  }
});

app.get('/', async (_req, res) => {
  res.status(200).send();
});
