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

        // TODO: Remove this when running on device - testing only to support running in browser
        // this will simulate the deviceready callback for us since we are testing without any plugins in the browser
        app.receivedEvent('deviceReady');

        // listen for changes to the radio button colors
        $('input[type=radio][name=radio-choice-color]').change(function () {
            listExamples.equalToDemo(this.value);
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
        // TODO: Run demos from here that need to be automatically executed

    },

    addUser: function () {
        // const userId = document.getElementById('userId').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const age = parseInt(document.getElementById('age').value);
        const favouriteColour = document.getElementById('favouriteColour').value;

        var user = new User(null, firstName, lastName, age, favouriteColour);

        listExamples.setUser(user);
    }
};

var listExamples = {

    /**
     * Adds a user to Firebase using a manual ID
     *
     * @param user
     */
    setUser: function (user) {
        // TODO: Add a user to Firebase using set
    },

    /**
     * Adds a user to Firebase using a unique auto-generated ID
     * @param user
     */
    pushUser: function (user) {
        // TODO: Push a user to Firebase
    },

    valueEventDemo: function () {
        // TODO: Get a list of users
    },

    childAddedEventDemo: function () {
        // TODO: Compare value and add events
    },

    childEventsDemo: function () {
        // TODO: Make a logger for child events
    },

    orderByKeyDemo: function () {
        // TODO: Test out orderByKey
    },

    orderByChildDemo: function () {
        // TODO: Order list of users by first name
    },

    orderByValueDemo: function () {
        // TODO: Test out orderByValue
    },

    equalToDemo: function (colour) {
        // TODO: Query Firebase for users with a favourite colour
    },

    rangeDemo: function () {
        // TODO: Query Firebase for users between ages <<x>> and <<y>>
    },

};

var lab = {

    addJoke: function () {

    },

};

// region Helper Functions
function addUserSnapshotToList(snapshot, listId) {
    var user = User.fromSnapshot(snapshot);
    var textToDisplay = user.userId + ": " + user.firstName + " " + user.lastName;
    displayItemInList(textToDisplay, listId);
}

function displayItemInList(displayText, listId) {
    var itemNode = document.createElement('li');

    var nameNode = document.createElement('div');
    nameNode.appendChild(document.createTextNode(displayText));
    itemNode.appendChild(nameNode);
    document.getElementById(listId).appendChild(itemNode);
}

function formatList(listId) {
    // Note: you need to use the '#' as a prefix so jquery knows you are looking for an ID (as opposed to an element, class etc)
    $('#' + listId).listview().listview('refresh');
}

function clearListItems(listId) {
    var listElement = document.getElementById(listId);
    while (listElement.firstChild) {
        listElement.removeChild(listElement.firstChild);
    }
}

function User(userId, firstName, lastName, age, favouriteColour) {
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.favouriteColour = favouriteColour;
}

User.fromSnapshot = function (snapshot) {
    return new User(
        snapshot.key,
        snapshot.val().firstName,
        snapshot.val().lastName,
        snapshot.val().age,
        snapshot.val().favouriteColour
    );
};
// endregion
