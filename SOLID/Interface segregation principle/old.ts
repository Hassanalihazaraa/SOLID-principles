interface UserAuth {
    checkPassword(password: string): boolean;

    resetPassword();

    setToken(token: string);

    checkLogin(token: string): boolean;
}

interface AdminAuth {
    checkPassword(password: string): boolean;

    resetPassword();
}


class User implements UserAuth {
    private _password: string = 'user';
    private _facebookToken: string
    private _googleToken: string

    checkLogin(token: string): boolean {
        return (token === this._facebookToken || token === this._googleToken);
    }

    setToken(token: string) {
        if (token === this._facebookToken) {
            this._facebookToken = token
        }
        this._googleToken = token;
    }

    checkPassword(password: string): boolean {
        return (password === this._password);
    }

    resetPassword() {
        this._password = prompt('What is your new password?');
    }
}

//admin cannot use google or facebook token
class Admin implements AdminAuth {
    private _password: string = 'admin';

    checkPassword(password: string): boolean {
        return (password === this._password);
    }

    resetPassword() {
        this._password = prompt('What is your new password?');
    }
}

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
const passwordElement = <HTMLInputElement>document.querySelector('#password');
const typePasswordElement = <HTMLInputElement>document.querySelector('#typePassword');
const typeGoogleElement = <HTMLInputElement>document.querySelector('#typeGoogle');
const typeFacebookElement = <HTMLInputElement>document.querySelector('#typeFacebook');
const loginAsAdminElement = <HTMLInputElement>document.querySelector('#loginAsAdmin');
const resetPasswordElement = <HTMLAnchorElement>document.querySelector('#resetPassword');

let user = new User;
let admin = new Admin;
//let googleBot = new GoogleBot;

document.querySelector('#login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    //let bot = typeGoogleElement.checked ? googleBot : googleBot;
    if (!loginAsAdminElement.checked) {
        if (typeGoogleElement.checked && passwordElement.value !== 'admin') {
            user.setToken('secret_token_google');
            /* if (bot) {
                 bot.setToken('secret_token_google');
             }*/
        } else if (typeFacebookElement.checked && passwordElement.value !== 'admin') {
            user.setToken('secret_token_fb');
        }
    }

    let userAuth = false;
    let adminAuth = false;

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
    } else if (adminAuth) {
        alert('login success');
    } else {
        alert('login failed');
    }
});

resetPasswordElement.addEventListener('click', (event) => {
    event.preventDefault();

    let userReset = loginAsAdminElement.checked ? admin : user;
    userReset.resetPassword();
});