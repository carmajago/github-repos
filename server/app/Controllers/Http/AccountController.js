const User = use('App/Models/User');

class AccountController {


  async register({ request, response }) {
    const input = request.only(['email', 'password', 'first_name', 'last_name']);

    const user = await User.create(input);

    return response.ok(user);
  }


  async login({
    request,
    response,
    auth,
  }) {

    const {
      email,
      password,
    } = request.post();

    const user = await User.query()
      .where({ email })
      .first();

    if (!user) {
      return response.notFound({ message: 'The email is not registered' });
    }


    const token = await auth.attempt(email, password)
      .then(res => res.token)
      .catch(() => null);

    if (!token) {
      return response.status(401).json({
        message: 'Incorrect password',
      });
    }

    user.token = token;

    return response.ok(user);
  }

  async profile({ response, auth }) {
    const user = await auth.getUser();
    return response.ok(user);
  }

  
}

module.exports = AccountController
