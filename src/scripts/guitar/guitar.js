/**
 * Author:  Nick Black
 * File:  Guitar.js
 * Purpose:  Controls flow of guitar collection application
 */

const dataManager = require("../dataManager/dataManager.js");

const documentBody = document.querySelector("body");

// create a div to hold everything in index.html for guitar module
const containerDiv = document.createElement("div");
containerDiv.setAttribute("class", "containerClass");
documentBody.appendChild(containerDiv);

const guitarDiv = document.createElement("div");
guitarDiv.setAttribute("class", "guitarClass");

// get a reference to guitarDiv 
const containerDivReference = document.querySelector(".containerClass");
containerDivReference.appendChild(guitarDiv);

const guitarDivReference = document.querySelector(".guitarClass");

// get a reference to script element
const scriptTagReference = document.querySelector("script");

// need to insert guitarDiv before script tag on body

documentBody.insertBefore(containerDivReference, scriptTagReference);

// initial message to display to the page
const welcomeMsg = "<h1>Welcome to Guitar Trippy!</h1>";

// create a paragraph for form
const formParagraph = document.createElement("p");

// create a button to add guitar
const addGuitarBtn = document.createElement("button");
const guitarTextNode = document.createTextNode("add guitar");
addGuitarBtn.appendChild(guitarTextNode);

// create a button to submit new guitar
const submitGuitarBtn = document.createElement("button");
const submitGuitarTextNode = document.createTextNode("submit guitar");
submitGuitarBtn.appendChild(submitGuitarTextNode);

// create a button to delete a guitar
const deleteGuitarBtn = document.createElement("button");
const deleteGuitarBtnTextNode = document.createTextNode("delete guitar");
deleteGuitarBtn.appendChild(deleteGuitarBtnTextNode);

// guitar form string literal/interpolation -- what the form should contain
const guitarForm = `<form><legend>Add a new guitar</legend>
Manufacturer: <input type="text" name="manufacturer"><br/>
Model: <input type="text" name="model"><br/>
Color: <input type="text" name="color"><br/></form>`

// function that is called in main.js to put welcome message on DOM as well as add new guitar button and form
const welcome = function() {
    const welcomeParagraph = document.createElement("p");
    welcomeParagraph.innerHTML += welcomeMsg;
    guitarDivReference.appendChild(welcomeParagraph);
    // add guitar button
    guitarDivReference.appendChild(addGuitarBtn);
    // delete guitar button
    guitarDivReference.appendChild(deleteGuitarBtn);

    // if we have guitars go ahead and display them otherwise let the user know we need to add guitars
    dataManager.getGuitars().then(r => {
        if (!(r.length === 0)) {
            // call displayGuitar and pass the area on DOM you want to display invocation
            dataManager.displayGuitar(guitarDiv);
        } else {
            // we don't have any guitars let the user know!
            alert("There are no guitars to display so add one!");
        }
    });
}

// event listener for addGuitarBtn
addGuitarBtn.addEventListener("click", function displayForm() {
    formParagraph.innerHTML = guitarForm;
    // append formParagraph to DOM
    guitarDivReference.appendChild(formParagraph);
    // append button to submit new guitar addition here
    formParagraph.appendChild(submitGuitarBtn);
});

// event listener for submit guitar button
submitGuitarBtn.addEventListener("click", function submitGuitar() {
    let manufacturer = document.querySelector("input[name=\"manufacturer\"]").value;
    let model = document.querySelector("input[name=\"model\"]").value;
    console.log("not broken");
    // debugger
    let color = document.querySelector("input[name=\"color\"]").value;
   
    console.log("broken");
    // check that manufacturer, model, and color are not empty strings
    if (!(manufacturer === "") && (!(model === "")) && (!(color === ""))) {
        // create a guitar object and pass to createGuitar
        let newGuitar = {
            manufacturer: manufacturer,
            model: model,
            color: color
        }
        dataManager.saveGuitar(newGuitar);
        // reloading page after new guitar is added to display it
        location.reload();
    }
});

// pass the guitar object into dataManager.deleteGuitar() function
deleteGuitarBtn.addEventListener("click", function deleteGuitar() {

    // before being allowed to delete a guitar, make sure there is at least one in list
    dataManager.getGuitars().then(r => {
        if (!(r.length === 0)) {
            let id = prompt("type in id name exactly matching ID in list");
            // let id = dataManager.getGuitarID(model);
            dataManager.deleteGuitar(id);
            // reload webpage
            location.reload();
        } else {
            console.log("There are no guitars to delete so add one!");
        }
    });
});

module.exports = welcome;