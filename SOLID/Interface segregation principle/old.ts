interface Auth {
    checkPassword(password: string): boolean;

    resetPassword();

    setToken(token: string);

    checkLogin(token: string);
}


class User implements Auth {
    private _password: string = 'user';
    private _facebookToken: string
    private _googleToken: string

    checkLogin(token) {
        return (token === this._facebookToken ? this._facebookToken : this._googleToken);
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
class Admin implements Auth {
    private _password: string = 'admin';

    checkPassword(password: string): boolean {
        return (password === this._password);
    }

    resetPassword() {
        this._password = prompt('What is your new password?');
    }

    checkLogin(token) {
        if (token === 'secret_token_fb' && token === 'secret_token_google') {
            return;
        }
    }

    setToken(token) {
        throw new Error('Function not supported for admins');
    }
}

class GoogleBot implements Auth {
    private _password: string = 'secret_token_google';

    checkLogin(token: string) {
        if (token === 'secret_token_google') {
            return true;
        }
    }

    checkPassword(password: string): boolean {
        return (password === this._password);
    }

    resetPassword() {
        this._password = prompt('What is your new password?');
    }

    setToken(token: string) {
        return (token === this._password)
    }
}

const passwordElement = <HTMLInputElement>document.querySelector('#password');
const typePasswordElement = <HTMLInputElement>document.querySelector('#typePassword');
const typeGoogleElement = <HTMLInputElement>document.querySelector('#typeGoogle');
const typeFacebookElement = <HTMLInputElement>document.querySelector('#typeFacebook');
const loginAsAdminElement = <HTMLInputElement>document.querySelector('#loginAsAdmin');
const resetPasswordElement = <HTMLAnchorElement>document.querySelector('#resetPassword');

let guest = new User;
let admin = new Admin;

document.querySelector('#login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    let user = loginAsAdminElement.checked ? admin : guest;

    if (!loginAsAdminElement.checked) {
        if (typeGoogleElement.checked) {
            user.setToken('secret_token_google');
        } else if (typeFacebookElement.checked) {
            user.setToken('secret_token_fb');
        }
    }
    debugger;

    let auth = false;
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
    } else {
        alert('login failed');
    }
});

resetPasswordElement.addEventListener('click', (event) => {
    event.preventDefault();

    let user = loginAsAdminElement.checked ? admin : guest;
    user.resetPassword();
});