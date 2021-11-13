const FavoriteRepo = use('App/Models/FavoriteRepo');

class FavoriteRepoController {


  async index({ request, response, auth }) {

    const user = await auth.getUser();

    const favorites = await FavoriteRepo
      .query()
      .where({user_id:user._id})
      .fetch();

    return response.ok(favorites)
  }


  async store({ request, response, auth }) {

    const input = request.only(['id', 'name']);
    const user = await auth.getUser();
    
    input.user_id = user._id;

    const favorite = await FavoriteRepo.findBy('id', input.id);

    console.log(input.id,favorite);

    if (favorite) {
      await favorite.delete();
      return response.ok({
        message: 'Unselected favorite!'
      })
    }
    const newFavorite = await FavoriteRepo.create(input);

    return response.ok(newFavorite);

  }


}

module.exports = FavoriteRepoController
