# CouchPotato
**A website for movies and series. In the app you can add a watchlist and more!**
>You can see a demo of our website [here](https://couchpotato-ca085.firebaseapp.com/).

## Short description of our project
With our website you can look up information about different movies and series! Features include:
* Search around for titles of movies
* Discovery mode, where you can click on different genres to discover popular movies in that genre
* Wish list, where you can add movies or series(by clicking :star:) that you want to watch later

The app uses React as framework and :fire:[firebase](https://firebase.google.com/) for our backend. The API that we've used is [OMDb API](http://www.omdbapi.com/).

### To start and try the app

> - Go to the projects [website](https://couchpotato-ca085.firebaseapp.com/) or run the code on your computer.
> - Start by creating a user by clicking "signup". You can use a fake email adress if you want.
> - From here on you can use this user whenever you are logged out or from any computer you want.

## What we have done
* Model connected to the OMDb API
* Login with Firebase
* Header with a searchbar and menu
* Start page with popular movies
* Search function with a filter for showing movies
* Detail view for individual movies
* Wish list function that saves a users wish list in a Firebase database



## Our project file structure (short description/purpose of each file)

- **favicon.ico**
    #An image of a potato, which is our logo. The purpose is that favicon is used as the logo that is shown as image icon, where the title text in the header is shown.

- **film-roll.png**
    #An image of a filmroll that is shown when no picture was found from the API call(though it doesn’t work at the moment).

- **soffpotatis.png**
    #An image of our potato logo and the purpose is to show this in the header and more.
   
- **index.html**
    #This our html file that contains our root tag which we later fill with tags from our js files.

- **Fire.js**
    #Connection to firebase. This file contains our setup with our firebase project. The purpose of this file is that in all our js files where we need to have a connection with firebase we can import this file instead of repeating code.

- **apikey.js**
	#Here we have our API key which is gitignored and later used in our models.

- **GalleryModel.js**
	#Here we have all our functions that make api calls and changes to our database in firebase.

- **ObservableModel.js**
	#Here we have our observer functions. Our GalleryModel is later extended with this file.

- **DetailView.css**
	#Detail view stylesheet.
	
- **DetailView.js**
	#is the detailed view that shows up when clicking a moviecard. Contains extensive info about the movie. Title, desc, cover, ratings etc..

- **Header.js**
	#Contains navigation menu and search view. Aim is to keep the same header for most of the application.

- **Login.js**
	#Login view. Handles logins and signup to our database in firebase. This file checks if a user has correctly logged in, or correctly signed up through connection with firebase. It also shows the login screen.

- **BigBoyMovieCard.js**
	#

- **MovieCard.js**
	#Preview card of a movie that shows as search results. Has a cover image and title.

- **SearchResultView.js**
	#Shows the search results.

- **SearchView.js**
	#Main search page. Contains the search form.

- **Welcome.css**
	#Stylesheet for homepage.

- **Welcome.js**
	#Homepage. Currently does not contain any content.

- **Wish_list.js**
	#Creates a user specific wish list/list of favorites. User can save movies to this list by clicking the star icon when viewing movie details.

- **Index.js**
	#renders app in root

- **Index.css**
	#Index stylesheet

- **App.js**
	#Runs the main application. Contains login authentication and account creation.

- **App.css**
	#Main application css file. Idea is to keep most of the custom css here.

- **star.js**
	#
