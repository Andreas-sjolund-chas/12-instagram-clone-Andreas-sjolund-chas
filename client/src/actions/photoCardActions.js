import {
  ADD_COMMENT,
  ADD_PHOTOCARD,
  UPDATE_PHOTOCARD,
  DELETE_PHOTOCARD,
  FETCH_PHOTOCARDS
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
      return response
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

// export const addComment = comment => ({
//   type: ADD_COMMENT,
//   payload: comment
// });

export function addComment(comment) {
  return (dispatch) => {
    return fetch('/photo/comment', {
      method: 'PUT',
      headers: {           
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment),
  })
  .then(res => res.json())
  .then(res => {
    // COMMENT SUCCESS
  })
  .catch(error => {
    // COMMENT FAILURE
  });    
  }
};