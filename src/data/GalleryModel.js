import ObservableModel from "./ObservableModel";
//import API_KEY from "../data/apikey"
import fire from "../config/Fire"
import { watch } from "fs";

//const BASE_URL = "https://www.omdbapi.com/?apikey="+API_KEY+"&";


class GalleryModel extends ObservableModel {

    constructor() {
        super();
        
      }

      getMovie(str) {

        const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&language=sv-SE&query='+ str + '&page=1&api_key=b02cf99d60b8503f1a184894c4412dbb';
        
        return fetch(url).then(this.processResponse);
      }

      discoverPopularMovies() {

        const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b02cf99d60b8503f1a184894c4412dbb';
        return fetch(url).then(this.processResponse);

      }

      getMovieById(i) {
        const url = `https://api.themoviedb.org/3/movie/${i}?api_key=b02cf99d60b8503f1a184894c4412dbb`;
        return fetch(url).then(this.processResponse);
      }

      getTest(string="Avatar") {
        const url = 'https://api.themoviedb.org/3/search/movie?include_adult=true&query='+ string + '&page=1&api_key=b02cf99d60b8503f1a184894c4412dbb';
        return fetch(url).then(this.processResponse);
      }

      addToWatch(movie) {
        var db = fire.firestore();
        
        var user = db.collection("user_data").where("user_id", "==", fire.auth().currentUser.uid);

        return user.get().then(function(query) {
          if (query.size == 0) {
            db.collection("user_data").add({
              user_id: fire.auth().currentUser.uid,
              watch_list: [movie.imdb_id]
            });
          }
          else {
            query.forEach(function(doc) {
              var watchList = doc.data().watch_list;

              if (!watchList.includes(movie.imdb_id)) {
                watchList.push(movie.imdb_id);

                db.collection("user_data").doc(doc.id).update({
                  watch_list: watchList
                });
              }
            });
          }
        });
      }

      removeFromWatch(movie) {
        var db = fire.firestore();
        
        var user = db.collection("user_data").where("user_id", "==", fire.auth().currentUser.uid);

        return user.get().then(function(query) {
          query.forEach(function(doc) {
            var watchList = doc.data().watch_list;

            if (watchList.includes(movie.imdb_id)) {
              watchList.splice(watchList.indexOf(movie.imdb_id), 1);

              db.collection("user_data").doc(doc.id).update({
                watch_list: watchList
              });
            }
          });
        });
      }
      
      processResponse(response) {
        if (response.ok) {
          return response.json();
        }
        throw response;
      }
}

// Export an instance of GalleryModel
const modelInstance = new GalleryModel();
export default modelInstance;