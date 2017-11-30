var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
		lat: -34.397,
		lng: 150.644
		},
		zoom: 8
	});
	// console.log(map);
}

$(document).ready(function(){
// Initialize Firebase
	var config = {
	apiKey: "AIzaSyBgGvt1vc5tzjpc3Lu3ixrpjEBLTGE9D6c",
	authDomain: "find-a-meal.firebaseapp.com",
	databaseURL: "https://find-a-meal.firebaseio.com",
	projectId: "find-a-meal",
	storageBucket: "find-a-meal.appspot.com",
	messagingSenderId: "918558991344"
	};

	firebase.initializeApp(config);
    // Create a variable to reference the database
    var database = firebase.database();
    //create initial Values variables
    var name = "";
    var email = "";
    var password = "";
    var addressZipcode = "";
	var latitude;
	var longitude;
	// Track the UID of the current user.  
	var currentUid = null;
	var currentUser = null;

	// Search Recipes api function
	$("#searchForm").on("submit", function(event){
		event.preventDefault();
		var recipeSearch = $("#recipeSearch").val().trim();
	// Edamam api query url
	var queryURL = "https://api.edamam.com/search?q="+recipeSearch+"&app_id=3ad77a90&app_key=dd79bd4febb48cc39a652e6c9e29c603"
		console.log(recipeSearch);
		console.log(queryURL);
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){
			console.log(response);
			console.log(response.q);
			console.log(response.hits[0].recipe.image);
			console.log(response.hits[0].recipe.ingredientLines);
			$("#results").append("<img src="+response.hits[0].recipe.image+" alt='' />");
			$("#results").append("<p>"+response.hits[0].recipe.ingredientLines+"</p>");
		});

		return false;
	});// end Search Recipes api function

    //Sign up Sign in Form 
    //capture sign up button click
    $("#signUp").on("click", function(){
    	//prevent refreshing page
    	event.preventDefault();
    	//retrieve user input for sign up
    	name = $("#nameInput").val().trim();
    	email = $("#emailInput").val().trim();
    	password = $("#passwordInput").val().trim();
    	addressZipcode = $("#addressZipcode").val();
    	//validate email and password length
		if (email.length < 4) {
		alert('Please enter an email address.');
		return;
		}
		if (password.length < 4) {
		alert('Please enter a password.');
		return;
		}

    	//push the retrieved values to firebase to test the function
    	database.ref().push({
    		name: name,
    		email: email,
    		password: password,
    		addressZipcode: addressZipcode
    	});

    	//print the data to the console
	    // console.log(name, email, password, addressZipcode);

	    //create wth emial
	    firebase.auth().createUserWithEmailAndPassword(email, password )
	    //then do the following
	 //    .then(function(){
		// 	// //print current user to the console 
		// 	// console.log(currentUser);
		// 	//store the current user and its ID to the variables
		// 	currentUser = firebase.auth().currentUser;
		// 	currentUid = firebase.auth().currentUser.uid;
		// 	console.log(currentUser, currentUid);

		// 	// //update user profile 
		// 	// currentUser.updateProfile({
		// 	// 	displayName: name
		// 	// });

			
		// })
	    //catch errors after
		.catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			if (errorCode == 'auth/weak-password') {
			alert('The password is too weak.');
			} else {
			// alert(errorMessage);
			}
			//print the error to the console 
			console.log(error);

		});




	});//end of sign up function

    //capture sign in button click
    $("#signIn").on("click",function(){
		email = $("#emailInput").val().trim();
		password = $("#passwordInput").val().trim();

		firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		});
    });//end of Sign in function

 //    //an authentication state observer to get user data sign in
	// firebase.auth().onAuthStateChanged(function(user) {
	// 	if (user) {
	// 		// User is signed in.
	// 		var displayName = user.displayName;
	// 		var email = user.email;
	// 		var emailVerified = user.emailVerified;
	// 		var photoURL = user.photoURL;
	// 		var isAnonymous = user.isAnonymous;
	// 		var uid = user.uid;
	// 		var providerData = user.providerData;
	// 		// console.log(user);
	// 		console.log(displayName, email, uid);
		
	// 	} else {
	// 		// User is signed out.
	// 	}
	// });


	//google maps and geo
	// if (navigator.geolocation) {
	// 	navigator.geolocation.getCurrentPosition(function(position) {
	// 	console.log("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);
	// 	});
	// };


	//ajax call to get long and lat
	// $.ajax({
	// 	url : "http://maps.googleapis.com/maps/api/geocode/json?address=santa+cruz&components=postal_code:"+addressZipcode+"&sensor=false",
	// 	method: "POST",
	// 	success:function(data){
	// 	latitude = data.results[0].geometry.location.lat;
	// 	longitude= data.results[0].geometry.location.lng;
	// 	console.log("Lat = "+latitude+"- Long = "+longitude);
	// 	}
	// });//end of ajaxcall

    

});//end of Javascript code
