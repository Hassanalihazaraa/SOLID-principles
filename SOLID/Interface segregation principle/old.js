var User = /** @class */ (function () {
    function User() {
        this._password = 'user';
    }
    User.prototype.checkLogin = function (token) {
        return (token === this._facebookToken ? this._facebookToken : this._googleToken);
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
    Admin.prototype.checkLogin = function (token) {
        if (token === 'secret_token_fb' && token === 'secret_token_google') {
            return;
        }
    };
    Admin.prototype.setToken = function (token) {
        throw new Error('Function not supported for admins');
    };
    return Admin;
}());
var GoogleBot = /** @class */ (function () {
    function GoogleBot() {
        this._password = 'secret_token_google';
    }
    GoogleBot.prototype.checkLogin = function (token) {
        if (token === 'secret_token_google') {
            return true;
        }
    };
    GoogleBot.prototype.checkPassword = function (password) {
        return (password === this._password);
    };
    GoogleBot.prototype.resetPassword = function () {
        this._password = prompt('What is your new password?');
    };
    GoogleBot.prototype.setToken = function (token) {
        return (token === this._password);
    };
    return GoogleBot;
}());
var passwordElement = document.querySelector('#password');
var typePasswordElement = document.querySelector('#typePassword');
var typeGoogleElement = document.querySelector('#typeGoogle');
var typeFacebookElement = document.querySelector('#typeFacebook');
var loginAsAdminElement = document.querySelector('#loginAsAdmin');
var resetPasswordElement = document.querySelector('#resetPassword');
var guest = new User;
var admin = new Admin;
document.querySelector('#login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var user = loginAsAdminElement.checked ? admin : guest;
    if (!loginAsAdminElement.checked) {
        if (typeGoogleElement.checked) {
            user.setToken('secret_token_google');
        }
        else if (typeFacebookElement.checked) {
            user.setToken('secret_token_fb');
        }
    }
    debugger;
    var auth = false;
    switch (true) {
        case typePasswordElement.checked:
            auth = user.checkPassword(passwordElement.value);
            break;
        case typeGoogleElement.checked:
            auth = user.checkLogin('secret_token_google');
            break;
        case typeFacebookElement.checked:
            debugger;
            auth = user.checkLogin('secret_token_fb');
            break;
    }
    if (auth) {
        alert('login success');
    }
    else {
        alert('login failed');
    }
});
resetPasswordElement.addEventListener('click', function (event) {
    event.preventDefault();
    var user = loginAsAdminElement.checked ? admin : guest;
    user.resetPassword();
});
