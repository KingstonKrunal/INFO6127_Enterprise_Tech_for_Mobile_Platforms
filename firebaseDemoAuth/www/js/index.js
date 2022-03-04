/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.See the License for the
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

        // this will simulate the deviceready callback for us since we are testing without any plugins in the browser
        app.receivedEvent('deviceReady');
        appAuth.watchUserLogin();

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
        console.log('receivedEvent ' + id);

    },

    loginUser: function () {
        // clear previous user if any
        appAuth.displayUser('', '');

        // get email and password from inputs
        var email = getValue('email');
        var password = getValue('password');

        appAuth.loginUser(email, password);
    },

    logoutUser: function () {
        appAuth.logoutUser();
    },

    addJoke: function () {
        var jokeText = getValue('joke');
        var punchline = getValue('punchline');
        var category = parseInt(getValue('select-category'));

        var joke = new Joke(null, jokeText, punchline, category, null, null);
        jokeManager.addJoke(joke);
    }

};

function getValue(elementId) {
    return document.getElementById(elementId).value;
}

function setValue(elementId, value) {
    document.getElementById(elementId).value = value;
}

const baseRef = 'week07/';

/**
 * Functions related to authentication are separated out here
 * Note: This is not a recommended architecture, and is simply placed here to separate and demonstrate different features
 */
var appAuth = {
    /**
     * Logs a user into Firebase with an email and password.
     *
     * @param email
     *- the email of the user trying to log in
     * @param password
     *- the password of the user trying to log in
     */
    loginUser: function (email, password) {

        appAuth.displayAuthError('');

        // make sure user had entered an email and password
        if (!email || !password) {
            appAuth.displayAuthError('Invalid email/password');
        } else {
            // TODO call firebase auth library and prompt to login
            firebase.auth().signInWithEmailAndPassword(email, password)
                .catch(function (error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    console.error('Error Received: ' + errorCode);
                    appAuth.displayAuthError(errorMessage);
                }).then((res) => {
                console.log(res);

                const user = res.user;
                const userDetails = new User(null, user.email, 'Kartik', 'Pancholi');

                firebase.database().ref(baseRef)
                    .child('users').child(user.uid)
                    .update(userDetails, (err) => {
                        if (err) {
                            console.log(err);
                        } else {
                            var uid = this.getCurrentUserId();
                            firebase.database().ref('lab05/users/' + uid + '/answer')
                                .on('value', (snapshot) => {
                                    console.log(snapshot.val());
                                    console.log(uid);
                                });
                        }
                    });
            });

        }
    },

    logoutUser: function () {
        // TODO
    },

    watchUserLogin: function () {
        firebase.auth().onAuthStateChanged((user) => {

        });
        // TODO
    },

    /**
     * Displays a user on the screen.
     *
     * @param id
     *- user id of the user
     * @param email
     *- email address of the user
     */
    displayUser: function (id, email) {
        setValue('authUserId', id);
        setValue('authEmail', email);
    },

    /**
     * Gets the current logged in user.
     *
     * @return user id
     */
    getCurrentUserId: function () {
        return firebase.auth().currentUser.uid;
        // TODO: Get current logged in user id
    },

    /**
     * Gets the current logged in user email
     */
    getCurrentUserEmail: function () {
        return firebase.auth().currentUser.email;
        // TODO: Get current logged in user email
    },

    /**
     * Displays an authentication error on the screen.
     *
     * @param error
     *- error message to display
     */
    displayAuthError: function (error) {
        console.error(error);
        setValue('authError', error);
    }
};

const jokeManager = {

    addJoke: function (joke) {
        joke.author = {
            id: appAuth.getCurrentUserId(),
            display: appAuth.getCurrentUserEmail()
        };

        const jokeRef = baseRef + '/jokes';
        const jokeKey = firebase.database().ref(jokeRef).push().key;

        const userJokesRef = baseRef + '/userJokes/' + joke.author.id;
        const voteRef = baseRef + '/jokeVotes/' + jokeKey;

        var updateData = {};
        updateData[jokeRef + '/' + jokeKey] = joke;
        updateData[userJokesRef + '/' + jokeKey] = true;
        updateData[voteRef] = 0;

        firebase.database().ref()
            .update(updateData, (err) => {
                if (err) {
                    console.error(err);
                }
            });
    },

    watchMyJokes: function (userId) {
        // TODO: Write function that gets list of all of my jokes
    },

    watchLeaderboard: function () {

        $('#allJokes').on('click', 'li', function (event) {
            console.log(event.currentTarget.id);
            jokeManager.vote(event.currentTarget.id, appAuth.getCurrentUserId());
        });

        // TODO: Get list of jokes

    },

    vote: function (jokeId, userId) {
        // TODO: Write function that records vote for joke
    },

    cleanup: function () {

    }
};

function displayItemInList(joke, listId) {

    var newNode = false;
    var itemNode = document.getElementById(joke.id);
    if (!itemNode) {
        newNode = true;
        itemNode = document.createElement('li');
    }

    itemNode.id = joke.id;

    if (newNode) {
        var title = document.createElement('div');
        title.appendChild(document.createTextNode(joke.joke));
        title.className = 'jokeTitle';
        itemNode.appendChild(title);

        var subtitle = document.createElement('div');
        subtitle.appendChild(document.createTextNode(joke.punchline));
        subtitle.className = 'jokeSubtitle';
        itemNode.appendChild(subtitle);

        var author = document.createElement('div');
        author.appendChild(document.createTextNode(joke.author.display));
        author.className = 'jokeAuthor';
        itemNode.appendChild(author);
    }

    var voteValue = joke.numVotes ? joke.numVotes : "";

    if (newNode) {
        var votes = document.createElement('div');
        votes.className = 'votes';
        votes.appendChild(document.createTextNode(voteValue));
        itemNode.appendChild(votes);
    } else {
        var element = $('#' + joke.id + " .votes").first();
        element.text(voteValue);
    }

    document.getElementById(listId).appendChild(itemNode);
}

function Joke(id, joke, punchline, category, author, numVotes) {
    this.id = id;
    this.joke = joke;
    this.punchline = punchline;
    this.category = category;
    this.author = author;
    this.numVotes = numVotes;
}

Joke.fromSnapshot = function (snapshot) {
    return new Joke(
        snapshot.key,
        snapshot.val().joke,
        snapshot.val().punchline,
        snapshot.val().category,
        snapshot.val().author,
        snapshot.val().numVotes
    );
};

function formatList(listId) {
    $('#' + listId).listview().listview('refresh');
}

function User(id, email, firstName, lastName) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
}

User.fromSnapshot = function (snapshot) {
    return new User(
        snapshot.key,
        snapshot.val().firstName,
        snapshot.val().lastName
    );
};