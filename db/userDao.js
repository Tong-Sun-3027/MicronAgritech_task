var db = require('./db')

// query user information
queryInfo = (email) => {
    var sql = 'SELECT * FROM users WHERE email = ?';
    return new Promise((resolve, reject) => db.query(sql, [email], (err, rows) =>{
        if (err) {
            reject(err);
        } else {
            resolve(rows);
        }
    }))
}


// regist new user
addNewUser = (user) => {

    var sql = 'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => db.query(sql, [user.firstname, user.lastname, user.email, user.password], (err, rows) =>{
        if (err) {
            reject(err);
        } else {
            resolve(rows);
        }
    }))
    

}

// Update user account information
updateInfo = (email, password) => {
    var sql = 'UPDATE users SET password = ? WHERE email = ?';  
    return new Promise((resolve, reject) => db.query(sql, [password, email], (err, rows) =>{
        if (err) {
            reject(err);
        } else {
            resolve(rows);
        }
    }))
}


module.exports = {
    queryInfo: queryInfo,
    addNewUser: addNewUser,
    updateInfo, updateInfo
}


