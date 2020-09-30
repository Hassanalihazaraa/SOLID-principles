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
    Object.defineProperty(User.prototype, "password", {
        get: function () {
            return this._password;
        },
        enumerable: false,
        configurable: true
    });
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
    Object.defineProperty(Admin.prototype, "password", {
        get: function () {
            return this._password;
        },
        enumerable: false,
        configurable: true
    });
    return Admin;
}());
var GoogleBot = /** @class */ (function () {
    function GoogleBot() {
        this._password = '';
    }
    GoogleBot.prototype.checkLogin = function (token) {
        return (token === 'secret_token_google');
    };
    GoogleBot.prototype.checkPassword = function (password) {
        return (password === this._password);
    };
    GoogleBot.prototype.resetPassword = function () {
        this._password = prompt('What is your new password?');
    };
    GoogleBot.prototype.setToken = function (token) {
        this._password = token;
    };
    Object.defineProperty(GoogleBot.prototype, "password", {
        get: function () {
            return this._password;
        },
        enumerable: false,
        configurable: true
    });
    return GoogleBot;
}());
var passwordElement = document.querySelector('#password');
var typePasswordElement = document.querySelector('#typePassword');
var typeGoogleElement = document.querySelector('#typeGoogle');
var typeFacebookElement = document.querySelector('#typeFacebook');
var loginAsAdminElement = document.querySelector('#loginAsAdmin');
var resetPasswordElement = document.querySelector('#resetPassword');
var user = new User;
var admin = new Admin;
var googleBot = new GoogleBot;
document.querySelector('#login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    //let bot = typeGoogleElement.checked ? googleBot : googleBot;
    if (!loginAsAdminElement.checked) {
        if (typeGoogleElement.checked && passwordElement.value !== admin.password) {
            user.setToken('secret_token_google');
        }
        else if (typeFacebookElement.checked && passwordElement.value !== admin.password) {
            user.setToken('secret_token_fb');
        }
        else if (typeGoogleElement.checked && passwordElement.value === googleBot.password) {
            googleBot.setToken('secret_token_google');
        }
    }
    var userAuth = false;
    var adminAuth = false;
    var botAuth = false;
    switch (true) {
        case typePasswordElement.checked && !loginAsAdminElement.checked:
            userAuth = user.checkPassword(passwordElement.value);
            break;
        case typePasswordElement.checked && loginAsAdminElement.checked:
            adminAuth = admin.checkPassword(passwordElement.value);
            break;
        case typeGoogleElement.checked && !loginAsAdminElement.checked && passwordElement.value === user.password:
            userAuth = user.checkLogin('secret_token_google');
            break;
        case typeGoogleElement.checked && !loginAsAdminElement.checked && passwordElement.value === googleBot.password:
            botAuth = googleBot.checkLogin('secret_token_google');
            break;
        case typeFacebookElement.checked && !loginAsAdminElement.checked && passwordElement.value === user.password:
            userAuth = user.checkLogin('secret_token_fb');
            break;
    }
    if (userAuth) {
        alert('login success');
    }
    else if (adminAuth) {
        alert('login success');
    }
    else if (botAuth) {
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
