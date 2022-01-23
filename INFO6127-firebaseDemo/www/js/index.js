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

        readExamples.demoStudentInfoOnce();
        readExamples.demoStudentInfoOn();
    },
};

var readExamples = {
    demoStudentInfoOnce: function () {
        console.log('In Once Method');

        // TODO: Add Firebase code to get student info using 'once' function
        // Lecture Demo

        // firebase.database().ref('week02').child('studentInfo')
        //     .once('value', function (snapshot) {
        //         if (snapshot.exists()) {
        //             console.log("Key : " + snapshot.key);
        //             console.log("VAL :" + JSON.stringify(snapshot.val()));
        //             displayStudentInfo('Once', snapshot.val());
        //         }
        //     });

        firebase.database().ref('week02').child('studentInfo')
            .once('value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    console.log("Key : " + snapshot.key);
                    console.log("VAL :" + JSON.stringify(snapshot.val()));
                    displayStudentInfo('Once', snapshot.val());
                }
            });

        // firebase.database().ref('week02').child('studentInfo')
        //     .once('value', (snapshot) => {
        //         if (snapshot.exists()) {
        //             console.log("Key : " + snapshot.key);
        //             console.log("VAL :" + JSON.stringify(snapshot.val()));
        //             displayStudentInfo('Once', snapshot.val());
        //         }
        //     });
    },
    demoStudentInfoOn: function () {
        console.log('In On Method');

        // TODO: Add Firebase code to get student info using 'on' function
        firebase.database().ref('week02').child('studentInfo')
            .on('value', (snapshot) => {
                if (snapshot.exists()) {
                    console.log("Key : " + snapshot.key);
                    console.log("VAL :" + JSON.stringify(snapshot.val()));
                    displayStudentInfo('On', snapshot.val());
                }
            });
    },
};

/**
 * Helper function that displays the student data
 * @param fieldIdPostfix
 *      Pass in 'On' or 'Once' to complete the id of the field
 * @param studentId
 * @param firstName
 * @param lastName
 */
function displayStudentInfo(fieldIdPostfix, {studentId, firstName, lastName}) {
    console.log('Displaying student info ' + studentId);
    document.getElementById('studentId' + fieldIdPostfix).value = studentId;
    document.getElementById('firstName' + fieldIdPostfix).value = firstName;
    document.getElementById('lastName' + fieldIdPostfix).value = lastName;
}

var writeExamples = {
    setFirstName: function () {
        var updatedFirstName = document.getElementById('firstNameSet').value;

        // TODO: Add Firebase code to set user first name
        firebase.database().ref('week02/studentInfo')
            .set({firstName: updatedFirstName}, (err) => {
                if (err) {
                    console.error(err);
                    this.displayStatusMessage("Error setting first name");
                } else {
                    console.log('Successfully set first name');
                }
            });
    },
    updateFavouriteColor: function () {
        var updatedColor = document.getElementById('favouriteColor').value;

        // TODO: Add Firebase code to update favourite color
        firebase.database().ref('week02').child('favourites')
            .update({colour: updatedColor}, (err) => {
                if (err) {
                    console.error(err);
                    this.displayStatusMessage("Error setting first name");
                } else {
                    console.log('Successfully updated color');
                }
            });
    },
    updateFavouriteSong: function () {
        var updatedSong = document.getElementById('favouriteSong').value;

        // TODO: Add Firebase code to update favourite song
        firebase.database().ref('week02').child('favourites')
            .update({song: updatedSong}, (err) => {
                if (err) {
                    console.error(err);
                    this.displayStatusMessage("Error setting song");
                } else {
                    console.log('Successfully updated song');
                }
            });
    },
    displayStatusMessage: function (message) {
        document.getElementById('writeStatusMessage').value = message;
    }

};

var deleteExamples = {
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
