class BaseValidator {

  async fails(errorMessages) {
    return this.ctx.response.status(400).send(errorMessages[0]);
  }

  get messages() {

    return {
      'email.required': 'Email is required',
      'first_name.required': 'First name is required',
      'last_name.required': 'Last name is required',
      'password.required': 'Password is required',
      'password.min': 'The password must be at least 8 characters long',
      email: 'Invalid email format',
      max: 'Character limit exceeded',
      unique: 'The field is already registered',
    };
  }

}

module.exports = BaseValidator;
