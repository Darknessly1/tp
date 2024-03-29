export const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';

export const addToWishlist = (movie) => ({
  type: ADD_TO_WISHLIST,
  payload: movie,
});

export const removeFromWishlist = (movieId) => ({
  type: REMOVE_FROM_WISHLIST,
  payload: movieId,
});
