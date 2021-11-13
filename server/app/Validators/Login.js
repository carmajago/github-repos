const BaseValidator = require('./BaseValidator');

class Login extends BaseValidator {

  get rules() {
    return {
      email: 'required|email',
      password: 'required',
    };
  }

}

module.exports = Login;
