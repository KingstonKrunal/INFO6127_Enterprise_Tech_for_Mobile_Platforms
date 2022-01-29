/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        // TODO: Remove this - testing only
        // this will simulate the deviceready callback for us since we are testing without any plugins in the browser
        app.receivedEvent('deviceReady');

        // listen for changes to the radio button colors
        $('input[type=radio][name=radio-choice-color]').change(function () {
            listExamples.watchUsersWithFavouriteColor(this.value);
        });

        // TODO: Listen for auth state changes.
        // When a user logs in load the current user (hint: readExamples)
        // When a user logs out, clear the user
        firebase.auth().onAuthStateChanged(function (user) {

            if (user) {
                // user is logged in
                console.log('User is authenticated');
                console.log(JSON.stringify(user));

                appAuth.displayUser(user.uid, user.email);
                listExamples.watchAllUsersFavourites();
            } else {
                // user is logged out
                console.log('user logged out');
                appAuth.displayUser('', '');
            }

        });

    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {

    },

    loginUser: function () {
        // clear previous user if any
        appAuth.displayUser('', '');

        // get email and password from inputs
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        appAuth.loginUser(email, password);
    },

    setUserName: function () {
        // clear previous message if any
        writeExamples.displayStatusMessage('');

        var firstName = document.getElementById('firstNameSet').value;
        var lastName = document.getElementById('lastNameSet').value;

        writeExamples.setUserName(firstName, lastName);
    },

    updateFavouriteColor: function () {
        // clear previous message
        writeExamples.displayStatusMessage('');

        // get entered color
        var color = document.getElementById('favouriteColor').value;

        writeExamples.updateFavouriteColor(color);
    },

    updateFavouriteSong: function () {
        // clear previous message
        writeExamples.displayStatusMessage('');

        var song = document.getElementById('favouriteSong').value;

        writeExamples.updateFavouriteSong(song);
    },

    deleteFavouriteColor: function () {
        writeExamples.deleteFavouriteSong();
    }
};

/**
 * Functions related to authentication are separated out here
 * Note: This is not a recommended architecture, and is simply placed here to separate and demonstrate different features
 */
var appAuth = {

    /**
     * Logs a user into Firebase with an email and password.
     *
     * @param email
     *      - the email of the user trying to log in
     * @param password
     *      - the password of the user trying to log in
     */
    loginUser: function (email, password) {

        // make sure user had entered an email and password
        if (!email || !password) {
            appAuth.displayAuthError('Invalid email/password');
        } else {

            // call firebase auth library and prompt to login
            firebase.auth().signInWithEmailAndPassword(email, password)
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    console.error('Received error: ' + errorCode);
                    appAuth.displayAuthError(errorMessage);
                });
        }
    },

    /**
     * Displays a user on the screen.
     *
     * @param id
     *      - user id of the user
     * @param email
     *      - email address of the user
     */
    displayUser: function (id, email) {
        document.getElementById('authUserId').value = id;
        document.getElementById('authEmail').value = email;
    },

    /**
     * Gets the current logged in user.
     *
     * @return user id
     */
    getCurrentUser: function () {
        return firebase.auth().currentUser.uid;
    },

    /**
     * Displays an authentication error on the screen.
     *
     * @param error
     *      - error message to display
     */
    displayAuthError: function (error) {
        console.error(error);
        document.getElementById('authError').innerText = error;
    }
};

/**
 * Functions related to Firebase reads are separated out here
 * Note: This is not a recommended architecture, and is simply placed here to separate and demonstrate different features
 */
var readExamples = {

    /**
     * Loads a user once and displays the data in the ONCE section, and then stops listening.
     */
    loadCurrentUser: function (userId) {
        // TODO: https://firebase.google.com/docs/database/web/read-and-write#read_data_once
    },

    /**
     * Listens for updates to a user and displays the data in the ON section.
     */
    watchCurrentUser: function (userId) {
        // TODO: https://firebase.google.com/docs/database/web/read-and-write#listen_for_value_events
    },

    /**
     * Displays user details in 'ON' section.
     *
     * @param id
     *      - id of user
     * @param firstName
     *      - first name of user
     * @param lastName
     *      - last name of user
     */
    displayUserOnce: function (id, firstName, lastName) {
        document.getElementById('userIdOnce').value = id;
        document.getElementById('firstNameOnce').value = firstName;
        document.getElementById('lastNameOnce').value = lastName;
        document.getElementById('favouriteColorOnce').value = firstName;
        document.getElementById('favouriteSongOnce').value = lastName;
    },

    /**
     * Displays user details in 'ONCE' section.
     *
     * @param id
     *      - id of user
     * @param firstName
     *      - first name of user
     * @param lastName
     *      - last name of user
     */
    displayUserOn: function (id, firstName, lastName) {
        document.getElementById('userIdOn').value = id;
        document.getElementById('firstNameOn').value = firstName;
        document.getElementById('lastNameOn').value = lastName;
        document.getElementById('favouriteColorOn').value = firstName;
        document.getElementById('favouriteSongOn').value = lastName;
    },

    /**
     * Displays a status message on the Read screen.
     *
     * @param message
     *      - message to display
     */
    displayStatusMessage: function (message) {
        document.getElementById('readStatusMessage').innerText = message;
    }
};

/**
 * Functions related to Firebase wires are separated out here
 * Note: This is not a recommended architecture, and is simply placed here to separate and demonstrate different features
 */
var writeExamples = {

    /**
     * Sets the user's first and last name.
     *
     * @param firstName
     *      - first name of user
     * @param lastName
     *      - last name of user
     */
    setUserName: function (firstName, lastName) {
        // TODO: https://firebase.google.com/docs/database/web/read-and-write#add_a_completion_callback
    },

    /**
     * Updates user's favourite color.
     *
     * @param color
     */
    updateFavouriteColor: function (color) {
        // TODO: https://firebase.google.com/docs/database/web/read-and-write#update_specific_fields
    },

    /**
     * Updates user's favourite song.
     *
     * @param song
     */
    updateFavouriteSong: function (song) {
        // TODO: https://firebase.google.com/docs/database/web/read-and-write#update_specific_fields
    },
    /**
     * Deletes the favourite song from a user.
     */
    deleteFavouriteSong: function () {
        // TODO: https://firebase.google.com/docs/database/web/read-and-write#delete_data
    },

    /**
     * Displays a status message on the Write screen.
     *
     * @param message
     *      - message to display
     */
    displayStatusMessage: function (message) {
        document.getElementById('writeStatusMessage').innerText = message;
    }

};

var listExamples = {

    /**
     * Display a live list of users' favourite colors.
     */
    watchAllUsersFavourites: function () {

        // TODO: watch all users and display favourites

        function addSnapshotToList(snapshot) {
            var user = User.fromSnapshot(snapshot);

            var itemNode = document.createElement('li');
            itemNode.setAttribute("color", user.favouriteColor);

            var nameNode = document.createElement('div');
            nameNode.appendChild(document.createTextNode(user.firstName));
            itemNode.appendChild(nameNode);
            document.getElementById('favouritesValueList').appendChild(itemNode);
        }

        function formatList() {
            $('#favouritesValueList').listview({
                autodividers: true,
                autodividersSelector: function (li) {
                    // separate by color
                    return li.attr('color');
                }
            }).listview('refresh');
        }

        function clearListItems() {
            var listElement = document.getElementById('favouritesValueList');
            while (listElement.firstChild) {
                listElement.removeChild(listElement.firstChild);
            }
        }

    },

    /**
     * Display a list of users with a specified color.
     * Only display when the color is added as a favourite.
     *
     * @param color
     *      - color to watch
     */
    watchUsersWithFavouriteColor: function (color) {
        // TODO: Listen for <<color>> being added as a favourite and display a list of users that have the color favourited
    }
};


function User(userId, firstName, lastName, favourites) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;

    if (favourites) {
        this.favouriteColor = favourites.color;
        this.favouriteSong = favourites.song;
    } else {
        this.favouriteColor = 'Unknown';
        this.favouriteSong = 'Unknown';
    }
}

User.fromSnapshot = function (snapshot) {
    return new User(
        snapshot.key,
        snapshot.val().firstName,
        snapshot.val().lastName,
        snapshot.val().favourites
    );
};