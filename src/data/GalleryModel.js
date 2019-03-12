import ObservableModel from "./ObservableModel";
import API_KEY from "../data/apikey"


const BASE_URL = "http://www.omdbapi.com/?apikey="+API_KEY+"&";


class GalleryModel extends ObservableModel {

    constructor() {
        super();
        
      }

      getMovie(search_string, i) {
        //http://www.omdbapi.com/?apikey=bad7ef2d&t=Captain+Marvel
        //http://www.omdbapi.com/?t=Captain+Marvel
        let params = "&type=movie&r=json&i="
        const url = `${BASE_URL}s=` + search_string + params+i;
        return fetch(url).then(this.processResponse);
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