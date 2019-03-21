# CouchPotato
<strong>A website for movies and series. In the app you can add a watchlist and more!</strong>


To build and deploy website:
npm run build
firebase deploy

<strong>This file contains following titles and information:</strong>

* Short description of our project

* What we have done

* What we plan to do

* Our project file structure (short description/purpose of each file)

#
<h3> Our project file structure (short description/purpose of each file)</h3>

<strong>favicon.ico</strong>
	#This is an image of a potato, which is our logo. The purpose is that favicon is used as the logo that is shown as image icon, where the title text in the header is shown.

<strong>film-roll.png</strong>
This is an image of a filmroll that is shown when no picture was found from the API call(though it doesn’t work at the moment).

<strong>soffpotatis.png</strong>
#This is an image of our potato logo and the purpose is to show this in the header and more.
   
<strong>index.html</strong>
#This our html file that contains our root tag which we later fill with tags from our js files.

<strong>Fire.js</strong>
#This file contains our setup with our firebase project. The purpose of this file is that in all our js files where we need to have a connection with firebase we can import this file instead of repeating code.

<strong>apikey.js</strong>
	#Here we have our API key which is gitignored and later used in our models.

<strong>GalleryModel.js</strong>
	#Here we have all our functions that make api calls and changes to our database in firebase.

<strong>ObservableModel.js</strong>
	#Here we have our observer functions. Our GalleryModel is later extended with this file. We never notify our observers so this file may be completely useless? If you have any comments about whether we should use this or not, please tell us :)

<strong>DetailView.css</strong>
	#Detail view stylesheet.
	
<strong>DetailView.js</strong>
	#is the detailed view that shows up when clicking a moviecard. Contains extensive info about the movie. Title, desc, cover, ratings etc..

<strong>Header.js</strong>
	#Contains navigation menu and search view. Aim is to keep the same header for most of the application.

<strong>Login.js</strong>
	#Login view. Handles logins and signup to our database in firebase. This file checks if a user has correctly logged in, or correctly signed up through connection with firebase. It also shows the login screen.

<strong>MovieCard.js</strong>
	#Preview card of a movie that shows as search results. Has a cover image and title.

<strong>Rated_list.js</strong>
	#Currently empty. Planned to be a list where the user can add movies that are then sorted/ordered based on a rating system.

<strong>SearchResultView.js</strong>
	#Shows the search results.

<strong>SearchView.js</strong>
	#Main search page. Contains the search form.

<strong>Settings.js</strong>
	#Settings page. Currently does not have any content. Plan is to have account management here.

<strong>Welcome.css</strong>
	#Stylesheet for homepage.

<strong>Welcome.js</strong>
	#Homepage. Currently does not contain any content.


<strong>Wish_list.js</strong>
	#Creates a user specific wish list/list of favorites. User can save movies to this list by clicking the star icon when viewing movie details.

<strong>Index.js</strong>
	#renders app in root

<strong>Index.css</strong>
	#Index stylesheet

<strong>App.js</strong>
	#Runs the main application. Contains login authentication and account creation.
    
<strong>App.css</strong>
	#Main application css file. Idea is to keep most of the custom css here.


