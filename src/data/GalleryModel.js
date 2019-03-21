import ObservableModel from "./ObservableModel";
import API_KEY from "../data/apikey"
import fire from "../config/Fire"
import { watch } from "fs";

const BASE_URL = "https://www.omdbapi.com/?apikey="+API_KEY+"&";


class GalleryModel extends ObservableModel {

    constructor() {
        super();
        
      }

      getMovie(search_string, i, type, page) {
        //http://www.omdbapi.com/?apikey=bad7ef2d&t=Captain+Marvel
        //http://www.omdbapi.com/?t=Captain+Marvel
        if (type != "all"){
        const url = `${BASE_URL}s=${search_string}&type=${type}&r=json&i=${i}&page=${page}`;
        return fetch(url).then(this.processResponse)}
        else {
        const url = `${BASE_URL}s=${search_string}&r=json&i=${i}`;
        return fetch(url).then(this.processResponse)}
      }

      getMovieById(i) {
        let params = "&r=json&i="
        const url = `${BASE_URL}` + params+i;
        console.log(url);
        return fetch(url).then(this.processResponse);
      }

      getTest() {

        const url = `${BASE_URL}t=Avatar`;
        var movie = fetch(url).then(this.processResponse);
        return movie

      }

      addToWatch(movie) {
        var db = fire.firestore();
        
        var user = db.collection("user_data").where("user_id", "==", fire.auth().currentUser.uid);

        return user.get().then(function(query) {
          if (query.size == 0) {
            db.collection("user_data").add({
              user_id: fire.auth().currentUser.uid,
              watch_list: [movie.imdbID]
            });
          }
          else {
            query.forEach(function(doc) {
              var watchList = doc.data().watch_list;

              if (!watchList.includes(movie.imdbID)) {
                watchList.push(movie.imdbID);

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

            if (watchList.includes(movie.imdbID)) {
              watchList.splice(watchList.indexOf(movie.imdbID), 1);

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