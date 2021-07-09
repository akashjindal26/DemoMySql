const sql = require('../../db.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken"); // to generate signed token


exports.signup = async (req, res) => {

  await sql.query("CALL sp_search_email(?)", req.body.USER_EMAIL, (err, result) => {

    if (err) {
      res.send({ ERROR: "ERROR" });
    }
    else {
      if (result[0] == "") {

        bcrypt.hash(req.body.PASSWORD, 10, function (err, hash) {

          if (err) {
            res.send({ error: err })
          }
          else {

            const createdon = new Date();
            const modifiedon = new Date();

            sql.query("CALL sp_createuser(?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
              [req.body.LEVEL_ID, req.body.USER_NAME, req.body.USER_EMAIL, req.body.USER_CONTACT_NO,
              req.body.USER_MOBILE_NO, req.body.USER_ADDRESS, req.body.USER_CITY,
              req.body.USER_STATE, req.body.USER_COUTRY,
                createdon, req.body.CREATED_BY, modifiedon,
              req.body.MODIFIED_BY, hash], (err, result) => {
                if (err) {
                  res.send({ ERROR_MSG: err });
                }
                else {
                  res.send({ USERS_DETAILS: result });
                }
              })
          }

        });

      }
      else {
        res.send({ MSG: "USER ALREADY EXICTED" })

      }
    }
  })

}

exports.signin = async (req, res) => {

  var USER_EMAIL = req.body.USER_EMAIL;

  await sql.query("CALL sp_search_email(?)", req.body.USER_EMAIL, (err, response) => {
    if (err) {
      res.send({ ERROR: "ERROR" });
    }
    else {

      if (response[0][0].USER_EMAIL == req.body.USER_EMAIL) {

        bcrypt.compare(req.body.PASSWORD, response[0][0].PASSWORD, function (err, result) {
          if (result == true) {

            sql.query("CALL sp_get_particular_user_details(?)", USER_EMAIL, (err, resp) => {
              if (err) {
                res.send({ ERROR_MSG: err });
              } else {
                var token = jwt.sign({ id: resp[0][0].USER_ID }, process.env.JWT_SECRET);
                res.cookie("t", token, { expire: new Date() + 9999 });
                res.send({ token: token, User_id: resp[0][0].USER_ID })
              }
            })
          }

        });


      }
    }
  });

}

exports.verifyUserLogin = (req, res, next) => {
  var Token = req.headers["authorization"];
  const bearer = Token.split(" ");
  const bearerToken = bearer[1];
  if (typeof bearerToken !== "undefined") {
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, authData) => {
      console.log(authData, req.params.USER_ID);
      if (err) {
        res.sendStatus(403);
      } else {
        if (authData.id == req.params.USER_ID) {
          next();
        } else {
          res.sendStatus(403);
        }
      }
    });
  } else {
    res.sendStatus(403);
  }
};

exports.placeOrder = async (req, res) => {
  await sql.query("CALL sp_place_order(?,?,?,?,?,?,?,?,?,?,?,?)",
    [req.body.ORDER_DATE, req.body.ORDER_DELIVERY_DATE, req.body.ORDER_DELIVERY_STATUS,
    req.body.PRODUCT_ID, req.body.PRODUCT_QUANTITY, req.body.PRODUCT_DISCOUNT_PERCENT,
    req.body.PRODUCT_PRICE, req.body.USER_ID, req.body.CREATED_ON,
    req.body.CREATED_BY, req.body.MODIFIED_ON, req.body.MODIFIED_BY],
    (err, result) => {
      if (err) {
        res.send({ ERROR_MSG: err });
      }
      else {
        res.send({ DETAILS: result });
      }
    })
}

exports.getOrderDetails = async (req, res) => {
  await sql.query("CALL sp_get_order_details(?)", [req.body.USER_ID], (err, result) => {
    if (err) {
      res.send({ ERROR_MSG: err });
    }
    else {
      res.send({ DETAILS: result });
    }
  })
}