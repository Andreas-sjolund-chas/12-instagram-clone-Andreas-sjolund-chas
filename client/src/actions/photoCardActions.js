import {
  ADD_COMMENT,
  ADD_PHOTOCARD,
  UPDATE_PHOTOCARD,
  DELETE_PHOTOCARD,
  FETCH_PHOTOCARDS,
  LIKE_PHOTO_ATTEMPT,
  LIKE_PHOTO_SUCCESS,
  LIKE_PHOTO_FAILURE
} from "../constants/actionTypes";

export function fetchPhotoCards() {
  return (dispatch) => {

    return fetch("/photo/all", {
      method: "GET",
      headers: {
        "Accept": "application/json"
      }
    })
    .then(response => response.json())
    .then(response => {
      dispatch(getAllPhotos(response))
      // return response
    })
    .catch(error => {
      return error
    })
  };
};

export const getAllPhotos = photoCards => ({
  type: FETCH_PHOTOCARDS,
  payload: photoCards
});

export function fetchAllPhotosByUserId(token) {

  return (dispatch) => {

    return fetch("/photo/byUserId", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token
      }
    })
    .then(res => res.json())
    .then(res => {
      return res
    })
  }
}

export function createPhotoCard(data) {
  return (dispatch) => {

    return fetch("/photo/create", {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem('token')
      },
      body: data
    })
    .then(response => response.json())
    .then(response => {
      dispatch(addPhotoCard(response))
    })
    .catch(error => {
      return error
    })
  };
};

export const addPhotoCard = photocard => ({
  type: ADD_PHOTOCARD,
  payload: photocard
});

export const updatePhotoCard = photocard => ({
  type: UPDATE_PHOTOCARD,
  payload: photocard
});

export const deletePhotoCard = photocard => ({
  type: DELETE_PHOTOCARD,
  payload: photocard
});

export const addComment = comment => ({
  type: ADD_COMMENT,
  payload: comment
});

export function createComment(comment) {
  return (dispatch) => {
    return fetch('/photo/comment', {
      method: 'PUT',
      headers: {           
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem('token')
      },
      body: JSON.stringify(comment),
  })
  .then(res => res.json())
  .then(res => dispatch(addComment(res)))
  .catch(error => {
    // COMMENT FAILURE
  });    
  }
};

export const likePhotoSuccess = user => ({
  type: LIKE_PHOTO_SUCCESS,
  payload: user
});

export const likePhotoFailure = user => ({
  type: LIKE_PHOTO_FAILURE,
  payload: user
});

export function likePhoto(photoId) {
  return (dispatch) => {
    return fetch(`/photo/${photoId}/like`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token')
      }
    })
    .then(res => res.json())
    .then(res => dispatch(likePhotoSuccess(res)))
    .catch(error => dispatch(likePhotoFailure(error)))
  }


};