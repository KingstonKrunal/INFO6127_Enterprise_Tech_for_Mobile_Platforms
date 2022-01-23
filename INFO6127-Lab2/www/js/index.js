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
const app = {
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
    },
    // deviceready Event Handler

    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        console.log('receivedEvent ' + id);
    },
};

function loadJoke() {
    firebase.database().ref('lab02').child('sample')
        .on('value', (snapshot) => {
            if (snapshot.exists()) {
                console.log("Key : " + snapshot.key);
                console.log("VAL :" + JSON.stringify(snapshot.val()));
                displayJokeInfo('On', snapshot.val());
            }
        });
}

loadJoke();

function displayJokeInfo(fieldIdPostfix, {joke, punchline}) {
    // console.log('Displaying joke info ');
    document.getElementById('joke' + fieldIdPostfix).value = joke;
    document.getElementById('punchLine' + fieldIdPostfix).value = punchline;
}

function saveJoke() {
    const joke = document.getElementById('jokeText').value;
    const punchline = document.getElementById('punchLineText').value;

    firebase.database().ref('lab02/myJoke')
        .set({joke: joke, punchline: punchline}, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Joke added successfully.');
            }
        });
}

const deleteExamples = {
    remove: function () {
        // TODO: Add Firebase code to delete 'withFunction' node using remove function
        firebase.database().ref('week02').child('deleteMe')
            .remove((err) => {
                if (err) {
                    console.error(err);
                    this.displayStatusMessage("Error deleting");
                } else {
                    console.log('Deleted successfully using remove function');
                }
            });
    },
    setNull: function () {
        // TODO: Add Firebase code to delete 'setNull' node by setting data to null
        firebase.database().ref('week02').child('deleteMe')
            .update({setNull: null}, (err) => {
                if (err) {
                    console.error(err);
                    this.displayStatusMessage("Error deleting");
                } else {
                    console.log('Deleted successfully by setting null');
                }
            });
    }
};
