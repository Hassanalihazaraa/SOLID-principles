var User = /** @class */ (function () {
    function User() {
        this._password = 'user';
    }
    User.prototype.checkLogin = function (token) {
        return (token === this._facebookToken || token === this._googleToken);
    };
    User.prototype.setToken = function (token) {
        if (token === this._facebookToken) {
            this._facebookToken = token;
        }
        this._googleToken = token;
    };
    User.prototype.checkPassword = function (password) {
        return (password === this._password);
    };
    User.prototype.resetPassword = function () {
        this._password = prompt('What is your new password?');
    };
    return User;
}());
//admin cannot use google or facebook token
var Admin = /** @class */ (function () {
    function Admin() {
        this._password = 'admin';
    }
    Admin.prototype.checkPassword = function (password) {
        return (password === this._password);
    };
    Admin.prototype.resetPassword = function () {
        this._password = prompt('What is your new password?');
    };
    return Admin;
}());
/*
class GoogleBot implements Auth {
    private _password: string;

    checkLogin(token: string) {
        if (token === 'secret_token_google') {
            return token;
        }
    }

    checkPassword(password: string): boolean {
        return (password === this._password);
    }

    resetPassword() {
        this._password = prompt('What is your new password?');
    }

    setToken(token: string) {
        this._password = token;
    }
}
*/
var passwordElement = document.querySelector('#password');
var typePasswordElement = document.querySelector('#typePassword');
var typeGoogleElement = document.querySelector('#typeGoogle');
var typeFacebookElement = document.querySelector('#typeFacebook');
var loginAsAdminElement = document.querySelector('#loginAsAdmin');
var resetPasswordElement = document.querySelector('#resetPassword');
var user = new User;
var admin = new Admin;
//let googleBot = new GoogleBot;
document.querySelector('#login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    //let bot = typeGoogleElement.checked ? googleBot : googleBot;
    if (!loginAsAdminElement.checked) {
        if (typeGoogleElement.checked && passwordElement.value !== 'admin') {
            user.setToken('secret_token_google');
            /* if (bot) {
                 bot.setToken('secret_token_google');
             }*/
        }
        else if (typeFacebookElement.checked && passwordElement.value !== 'admin') {
            user.setToken('secret_token_fb');
        }
    }
    var userAuth = false;
    var adminAuth = false;
    switch (true) {
        case typePasswordElement.checked && !loginAsAdminElement.checked:
            userAuth = user.checkPassword(passwordElement.value);
            break;
        case typePasswordElement.checked && loginAsAdminElement.checked:
            adminAuth = admin.checkPassword(passwordElement.value);
            break;
        case typeGoogleElement.checked && !loginAsAdminElement.checked && passwordElement.value === 'user':
            userAuth = user.checkLogin('secret_token_google'); //: bot ? bot.checkLogin('secret_token_google') : false);
            break;
        case typeFacebookElement.checked && !loginAsAdminElement.checked && passwordElement.value === 'user':
            userAuth = user.checkLogin('secret_token_fb');
            break;
    }
    if (userAuth || adminAuth) {
        alert('login success');
    }
    else if (adminAuth) {
        alert('login success');
    }
    else {
        alert('login failed');
    }
});
resetPasswordElement.addEventListener('click', function (event) {
    event.preventDefault();
    var userReset = loginAsAdminElement.checked ? admin : user;
    userReset.resetPassword();
});
