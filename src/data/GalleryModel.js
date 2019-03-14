import ObservableModel from "./ObservableModel";
import API_KEY from "../data/apikey"


const BASE_URL = "http://www.omdbapi.com/?apikey="+API_KEY+"&";


class GalleryModel extends ObservableModel {

    constructor() {
        super();
        
      }

      getMovie(search_string, i, type) {
        //http://www.omdbapi.com/?apikey=bad7ef2d&t=Captain+Marvel
        //http://www.omdbapi.com/?t=Captain+Marvel
        if (type != "all"){
        const url = `${BASE_URL}s=${search_string}&type=${type}&r=json&i=${i}`;
        return fetch(url).then(this.processResponse)}
        else {
        const url = `${BASE_URL}s=${search_string}&r=json&i=${i}`;
        return fetch(url).then(this.processResponse)}
      }

      getTest() {

        const url = `${BASE_URL}t=Avatar`;
        var movie = fetch(url).then(this.processResponse);
        return movie

      }
      
      processResponse(response) {
        if (response.ok) {
          return response.json();
        }
        throw response;
      }
}

// Export an instance of DinnerModel
const modelInstance = new GalleryModel();
export default modelInstance;