import ObservableModel from "./ObservableModel";
import "./apikey"


const APIKEY = API_KEY
const BASE_URL = "http://www.omdbapi.com/?apikey="+APIKEY+"&";


class GalleryModel extends ObservableModel {

    constructor() {
        super();
        
      }

      getMovie(search_string) {
        //http://www.omdbapi.com/?apikey=bad7ef2d&t=Captain+Marvel
        //http://www.omdbapi.com/?t=Captain+Marvel
        const url = `${BASE_URL}t=` + search_string;
        return fetch(url).then(this.processResponse);
      }

      getTest() {

        const url = `${BASE_URL}t=Avatar`;
        console.log(url)
        var movie = fetch(url).then(this.processResponse);
        console.log(movie.results)
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