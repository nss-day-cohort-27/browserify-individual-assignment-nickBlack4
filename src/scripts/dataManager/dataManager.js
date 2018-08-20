/**
 * Purpose: to encapsulate functions necessary to work on data for guitars
 */

const dataManager = Object.create(null, {
    // saveUser to database.json file
    saveGuitar: {
        value: (guitar) => {
            return fetch("http://localhost:8088/guitars", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(guitar)
            })
                .then(response => response.json());
        }
    },

    // get the users from database.json file
    getGuitars: {
        value: () => {
            return fetch("http://localhost:8088/guitars").then(r => r.json())
        }
    },

    displayGuitar: {
        value: (containerToDisplayWithin) => {
            dataManager.getGuitars().then(r => {
                r.forEach(element => {
                    // console.log(element);
                    containerToDisplayWithin.innerHTML += element + "<br/>";
                });
            });
        }
    }

    /**
     * Purpose:  Checks to see if user passed in matches user in database.json file.
     * If there is not a match, we know the user is unique and so we create the user and add to session storage
     */
    // validateGuitar: {
    //     // pass in guitar object and validate based on iterating through the object
    //     value: (guitar) => {

    //         // get users first in order to search through them for user passed in
    //         dataManager.getGuitars().then(response => {
    //             // response now is a reference to the users
    //             response.forEach(element => {
    //                 guitarName = element.name;

    //                 // using toUpperCase so that email and usernames are not case sensitive
    //                 if ((guitar.toUpperCase() === userEmail.toUpperCase()) || (name.toUpperCase() === userName.toUpperCase())) {
    //                     // change userExists to true and break or return
    //                     userExists = true;
    //                     console.log("username or email already exists; logging you in as, " + element.username);
    //                     // if user does exist we need to log them in and take them to the dashboard
    //                     // log user in
    //                     // add user to session storage to preserve them
    //                     sessionStorage.setItem("session", JSON.stringify(myMatchedUser));
    //                     // instead of returning and calling dashboard on welcome just reload page and let main.js work
    //                     location.reload();
    //                 }
    //             }); // forEach
    //         });
    //     }
    // },
});

// you require modules, you export functions
module.exports = dataManager;