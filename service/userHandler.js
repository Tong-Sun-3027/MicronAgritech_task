const {createToken} = require('../util/jwtUtil');
const cryptoUtil = require('../util/cryptoUtil');
const blacklist = require('../util/blackListUtil');
var userDao = require('../db/userDao')

const login_link = 'http://localhost:3000/api/users/login';
const regis_link = 'http://localhost:3000/api/users/register';


// Fetch user account information
queryTnfoByEmail = (req, res) =>{
    var email = req.params.email;
    var email = email.slice(1);
    userDao.queryInfo(email).then((result) => {
        if(result && result.length > 0){
            res.send({result});
        }else{
            console.log('user not found!');
            res.send({status:204, msg:'This account is not exist!'});
        }
    })
}


// login 
login = (req, res) => {
    if(!req.body.email || !req.body.password) {
        res.send({'status': 400, "msg": "either email or password field is empty" });
    }
    
    userDao.queryInfo(req.body.email).then(rows => {
        if(rows && rows.length > 0){
            const user = rows[0];
            const userPassword = user.password;
            const hashPass = cryptoUtil.hashPassword(req.body.password);
            if(userPassword === hashPass){
                // if the use Login successfully, then create the token
                const token = createToken(user.email)
                res.send({status:200, msg:'Login successfully!', token: token});

            }else{
                res.send({status:201, msg:'Email or password is not correct!'});
            }
        }else{
            console.log('This account is not exist!');
            res.send({status:201, msg:'This account is not exist, please register: ' + regis_link});
        }
    }).catch((err) => {
        console.log('err: ', err);
        res.send({msg:'login fail!'});
    });
};

register = (req, res) =>{
    const user = req.body;
    if(!user){
        res.send({status:1, msg:'You must fill all the inforamtion'});
    }else{
        userDao.queryInfo(user.email).then(rows => {
            if(rows && rows.length > 0){
                res.send({status:1, msg:'This email has exists!'});
            }else{
                user.password = cryptoUtil.hashPassword(user.password);
                userDao.addNewUser(user).then(result => {
                    if(result.affectedRows > 0){
                        res.send({status:200, msg:'Register success, please login: ' + login_link});
                    }else{
                        res.send({status:500, msg:'Register fail!'});
                    }
                }).catch(err => {
                    console.log('err: ', err);
                    res.send({status:500, msg:'Register fail!'});
                });
            }
        }).catch((err) => {
            console.log('register error: ', err);
            res.send({status:500, msg:'Database connect error!'});
        });
    }
};


updateInfo = (req, res)=>{
    const email = req.body.email
    const password = req.body.password
    if(!email && !password){
        res.send({msg:'email or password is empty!'});
    }else{
        const hashPass = cryptoUtil.hashPassword(password);
        userDao.updateInfo(email, hashPass).then(result => {
            if(result.affectedRows > 0){
                blacklist.addToBlacklist(req.headers.authorization)
                res.send({status:200, msg: 'password updated, please login: '+ login_link});
            }else{
                res.send({status:204, msg: 'Email Address not found!'});
            }
        }).catch((err) => {
            console.log('Error update data: ', err);
            res.send({status:1, msg:'database connect error!'});
        });
    }
}

// logout
logout = (req, res) =>{
    blacklist.addToBlacklist(req.headers.authorization)
    console.log('User logged out!')
    res.send({msg: 'Logout successfully'});
};

module.exports = {
    login: login,
    register: register,
    query: queryTnfoByEmail,
    update: updateInfo,
    logout: logout
}