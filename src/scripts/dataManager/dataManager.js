/**
 * Author:  Nick Black
 * File:  dataManager.js
 * Purpose: create dataManager object to hold necessary functions for DB
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
            return fetch("http://localhost:8088/guitars").then(r => r.json());
        }
    },

    getGuitarID: {
      value: (model) => {
          return fetch(`http://localhost:8088/guitars/${model}`, {
              method: "GET"
          })
            .then (r => {
                let redman = r.json();
                console.log("did code ever get here");
                console.log("redman.id ", redman.id);
                return redman.id;
            });
      }  
    },
    
    deleteGuitar: {
        // pass in a guitar object and then get the id to delete specific one from DB
        value: (id) => {
            return fetch(`http://localhost:8088/guitars/${id}`, {
                method: "DELETE"
            })
                .then(r => r.json());
        }
    },

    displayGuitar: {
        value: (containerToPlaceCard) => {
            dataManager.getGuitars().then(r => {
                r.forEach(element => {
                    // need to create card here for each one and store it to an object or array
                    // then put all the cards on DOM
                    const guitarDisplayP = document.createElement("p");
                    // set a class of guitarCard to guitarDisplayP
                    guitarDisplayP.setAttribute("class", "guitarCard");
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