import { ADD_COMMENT, ADD_PHOTOCARD, UPDATE_PHOTOCARD, DELETE_PHOTOCARD, FETCH_PHOTOCARDS, LIKE_PHOTO_FAILURE, LIKE_PHOTO_SUCCESS } from "../constants/actionTypes";
import update from "immutability-helper";

const photoCard = (state = [], action) => {
    switch (action.type) {
      case ADD_PHOTOCARD:
        return [...state, action.payload]
      
      case FETCH_PHOTOCARDS:
        return [
            ...state,
            ...action.payload
        ]

      case ADD_COMMENT:
        return state.map(photo => {
          if (photo._id === action.payload.photoId) {
            photo.comments = [...photo.comments, action.payload.comment]
          }
          return photo
        })

      case LIKE_PHOTO_SUCCESS:
        return state.map(photo => {
          if (photo._id === action.payload.photoId) {
            const likeIndex = photo.likes.indexOf(action.payload.userId);
            if (likeIndex !== -1) {
              photo.likes = [
                ...photo.likes.slice(0, likeIndex),
                ...photo.likes.slice(likeIndex + 1)
              ]
            } else {
              photo.likes = [...photo.likes, action.payload.userId]
            }
            console.log(photo.likes)
          }
          return photo
        })
        
      case LIKE_PHOTO_FAILURE:

        return state

      default:
        return state
    }
  }
   
  export default photoCard