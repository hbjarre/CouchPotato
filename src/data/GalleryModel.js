import ObservableModel from "./ObservableModel";
import fire from "../config/Fire";

class GalleryModel extends ObservableModel {

      getMovie(str, page) {
       
        const url = 'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&language=sv-SE&query='+ str + '&page='+page+'&api_key=b02cf99d60b8503f1a184894c4412dbb';
        return fetch(url).then(this.processResponse);
      }

      getMovieById(i) {
        const url = `https://api.themoviedb.org/3/movie/${i}?api_key=b02cf99d60b8503f1a184894c4412dbb`;
        return fetch(url).then(this.processResponse);

      }

      getDiscover() {
        const url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=b02cf99d60b8503f1a184894c4412dbb`;
        return fetch(url).then(this.processResponse);
      }

      getDiscoverGenre(genre) {
        var type = genres[genre];
        const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&with_genres='+ type +'&api_key=b02cf99d60b8503f1a184894c4412dbb';
        console.log(url)
        return fetch(url).then(this.processResponse);
      }

      getGenres() {
        const url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=b02cf99d60b8503f1a184894c4412dbb'
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
          if (query.size === 0) {
            db.collection("user_data").add({
              user_id: fire.auth().currentUser.uid,
              watch_list: [movie.id]
            });
          }
          else {
            query.forEach(function(doc) {
              var watchList = doc.data().watch_list;

              if (!watchList.includes(movie.id)) {
                watchList.push(movie.id);

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

            if (watchList.includes(movie.id)) {
              watchList.splice(watchList.indexOf(movie.id), 1);

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
/*0: {id: 28, name: "Action"}
1: {id: 12, name: "Adventure"}
2: {id: 16, name: "Animation"}
3: {id: 35, name: "Comedy"}
4: {id: 80, name: "Crime"}
5: {id: 99, name: "Documentary"}
6: {id: 18, name: "Drama"}
7: {id: 10751, name: "Family"}
8: {id: 14, name: "Fantasy"}
9: {id: 36, name: "History"}
10: {id: 27, name: "Horror"}
11: {id: 10402, name: "Music"}
12: {id: 9648, name: "Mystery"}
13: {id: 10749, name: "Romance"}
14: {id: 878, name: "Science Fiction"}
15: {id: 10770, name: "TV Movie"}
16: {id: 53, name: "Thriller"}
17: {id: 10752, name: "War"}
18: {id: 37, name: "Western"}*/

const genres = {
  "Action": 28,
  "Adventure": 12,
  "Comedy": 35,
  "Crime": 80,
  "Documentary": 99,
  "Drama": 18,
  "Family": 10751,
  "Fantasy": 14,
  "History": 36,
  "Horror": 27,
  "Music": 10402,
  "Mystery": 9648,
  "Romance": 10749,
  "Science Fiction": 878,
  "TV Movie": 10770,
  "Thriller": 53,
  "War": 10752,
  "Wester": 37
};


// Export an instance of GalleryModel
const modelInstance = new GalleryModel();
export default modelInstance;