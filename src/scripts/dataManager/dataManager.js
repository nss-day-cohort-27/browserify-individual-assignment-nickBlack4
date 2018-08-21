/**
 * Author:  Nick Black
 * File:  dataManager.js
 * Purpose: create dataManager object to hold necessary functions for DB
 */

const dataManager = Object.create(null, {
    // save guitar to database.json file
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

    // get the guitars from database.json file
    getGuitars: {
        value: () => {
            return fetch("http://localhost:8088/guitars").then(r => r.json());
        }
    },
    
    // delete a guitar from the list based off id
    deleteGuitar: {
        value: (id) => {
            return fetch(`http://localhost:8088/guitars/${id}`, {
                method: "DELETE"
            })
                .then(r => r.json());
        }
    },

    // get all guitars, create a card for each one and display this card to DOM reference passed in
    displayGuitar: {
        value: (containerToPlaceCard) => {
            dataManager.getGuitars().then(r => {
                r.forEach(element => {
                    // need to create card here for each one and store it to an object or array
                    // then put all the cards on DOM
                    const guitarDisplayP = document.createElement("p");
                    // set a class of guitarCard to guitarDisplayP
                    guitarDisplayP.setAttribute("class", "guitarCard");
                    // let's set the background color based on parity of id
                    if (element.id % 2 === 0) {
                        guitarDisplayP.setAttribute("style", "background: rgba(255,255,255,0.9)");
                    }
                    // set the innerHTML of each guitarCard
                    guitarDisplayP.innerHTML += `Manufacturer: ${element.manufacturer}<br/>Model: ${element.model}<br/>
                    Color: ${element.color}<br/>
                    ID: ${element.id}<br/>`;
                    containerToPlaceCard.appendChild(guitarDisplayP);
                    
                });
            });
        }
    }


}); // dataManager object

// you require modules, you export functions
module.exports = dataManager;