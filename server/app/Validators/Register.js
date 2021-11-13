const BaseValidator = require('./BaseValidator');

class Register extends BaseValidator {
  get rules() {
    return {
      email: 'required|email|unique:users',
      password: 'required|min:6',
      first_name: 'required|min:2|max:30',
      last_name: 'required|min:2|max:30',
    }
  }
}

module.exports = Register
