/*
What is the product price the product called "old lime Elvera"?
What is the name of the product that has the most amount of stock?
How many products have a product price between $20,000.00 and $30,000.00
What is the name of the last product in the list?
 */

const databaseRef = firebase.database().ref('products');

databaseRef
    .orderByChild('productName')
    .equalTo('old lime Elvera')
    .on('value', (snapshot) => {
        snapshot.forEach(child => {
            console.log("Price of " + child.val().productName + " is " + child.val().productPrice);
        });
    });

databaseRef
    .orderByChild('productStock')
    .limitToLast(1)
    .on('value', (snapshot) => {
        // console.log(snapshot.val());

        snapshot.forEach(child => {
            console.log("Highest stock product is " + child.val().productName);
        });
    });

let count = 0

databaseRef
    .orderByChild('productPrice')
    .startAt(30000.00)
    .endAt(40000.00)
    .on('value', (snapshot) => {
        // console.log(snapshot.val());

        snapshot.forEach(child => {
            count++;
            // console.log(child.val().productPrice);
        });

        console.log("Product count is " + count);
    });

databaseRef
    .orderByKey()
    .limitToLast(1)
    .on('child_added', (snapshot) => {
        console.log("Last product is " + snapshot.val().productName);
    });