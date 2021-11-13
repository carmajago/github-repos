const Route = use('Route');
const controller = 'AccountController';


Route.post('account/login', `${controller}.login`).validator('Login');
Route.post('account/register', `${controller}.register`).validator('Register');
Route.get('account/profile', `${controller}.profile`).middleware('auth');


