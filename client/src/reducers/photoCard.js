import { ADD_COMMENT, ADD_PHOTOCARD, UPDATE_PHOTOCARD, DELETE_PHOTOCARD, FETCH_PHOTOCARDS } from "../constants/actionTypes";
import update from "immutability-helper";

const initialState = {
  photoCard: [
    {
      id: 0,
      authorName: "Andreas Sjölund",
      authorAvatar:
        "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
      photoPath:
        "http://static.tvtropes.org/pmwiki/pub/images/ghost_meliora_promopic.jpg",
      likes: 15234,
      comments: [
        {
          username: "Victor Ciavarella",
          avatar:
            "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
          content: "I havn't seen this picture before! Cool one dude!"
        },
        {
          username: "Axel Olsson",
          avatar:
            "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
          content: "I also like this band! Cool picture!"
        },
        {
          username: "Tom Ekander",
          avatar:
            "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
          content: "Not a fan of this band, cool pic tho..."
        },
        {
          username: "Robert Jarske",
          avatar:
            "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
          content:
            "I attended to the last show! Spectacualar performance, this costumes and the atmosphere was totally awesome. I need to come up with more stuff to write so this comment will be longer than all the others so I can see if the styling works properly!!! I don't wanna use Lorem Ipsum for this shit!!!!!"
        }
      ]
    },
    {
      id: 1,
      authorName: "Tom Ekander",
      authorAvatar:
        "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
      photoPath:
        "http://imuscomputercollege.net.ph/wp-content/uploads/2014/09/programming.jpg",
      likes: 32,
      comments: [
        {
          username: "Someguy123",
          avatar:
            "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
          content: "Hi everyone!"
        },
        {
          username: "Satan666",
          avatar:
            "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
          content: "Hello Someguy123!"
        },
        {
          username: "Programmer1337",
          avatar:
            "https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/user_male2-512.png",
          content: "Hello you all, I am a programmer! :)"
        }
      ]
    }
  ]
}

const photoCard = (state = initialState, action) => {
    switch (action.type) {
      case ADD_PHOTOCARD:
        return [
          ...state,
          {
            userId: action.userId,
            photoURL: action.photoURL,
            likes: action.likes,
            created_at: action.created_at,
            updated_at: action.updated_at
          }
        ]
      // case ADD_COMMENT:
      //   const index = state.photoCard.findIndex(photoCard => photoCard.id === action.payload.photoId)
      //   const nextState = update(state, {
      //     photoCard: {
      //       [index]: { 
      //         comments: {
      //           $push: [action.payload]
      //         }
      //       }
      //     }
      //   });

      //   return nextState; 

      case FETCH_PHOTOCARDS:
        return [
          ...state,
          {
            photoCards: action
          }
        ]
      default:
        return state
    }
  }
   
  export default photoCard