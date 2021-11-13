const Route = use('Route');
const controller = 'GitHubAuthController';


Route.post('github/auth', `${controller}.getAccessToken`).middleware('auth');
