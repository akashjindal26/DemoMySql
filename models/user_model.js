const sql = require('../db.js')

// constructor
const User = function (user) {
    this.email = user.email;
    this.name = user.name;
    this.active = user.active;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};


User.getAll = result => {
    sql.query("SELECT * FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    });
};

User.findByName = (username, result) => {
    sql.query("SELECT * FROM user WHERE name = ?", username, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res);
        result(null, res);
    })
};

User.updateUserByName = (userDetail , result)=>{

    sql.query("")
};
module.exports = User;