const axios = require('axios');
const Env = use('Env');

class GitHubAuthController {

  async getAccessToken({ request, response, auth }) {

    const { code } = request.post();

    const user = await auth.getUser();


    const req = await axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${Env.get('GIT_HUB_CLIENT_ID')}&client_secret=${Env.get('GIT_HUB_SECRET')}&code=${code}`,
      headers: {
        'Accept': 'application/json',
      }
    }).catch(function (error) {
      return error;
    });


    if (req.data.access_token) {
      user.access_token_git = req.data.access_token;
      await user.save();
    } else {
      return response.badRequest({
        message: req.data.error_description,
      })
    }

    return response.ok(user);
  }
}

module.exports = GitHubAuthController
