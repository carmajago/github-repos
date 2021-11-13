const Route = use('Route');
const controller = 'FavoriteRepoController';


Route.get('favorites', `${controller}.index`).middleware('auth');
Route.post('favorites', `${controller}.store`).middleware('auth');
