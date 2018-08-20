const dataManager = require("../dataManager/dataManager.js");

const documentBody = document.querySelector("body");

// create a div to hold everything in index.html for guitar module
const guitarDiv = document.createElement("div");
guitarDiv.setAttribute("class", "guitarClass");
documentBody.appendChild(guitarDiv);

// get a reference to guitarDiv 
const guitarDivReference = document.querySelector(".guitarClass");

// get a reference to script element
const scriptTagReference = document.querySelector("script");

// need to insert guitarDiv before script tag on body

documentBody.insertBefore(guitarDivReference, scriptTagReference);

const welcomeMsg = "<h1>Welcome to Guitar Trippy!</h1>";

// create a paragraph for form
const formParagraph = document.createElement("p");

// create a button to add guitar
const addGuitarBtn = document.createElement("button");
const guitarTextNode = document.createTextNode("add guitar");
addGuitarBtn.appendChild(guitarTextNode);

// create button to submit new guitar
const submitGuitarBtn = document.createElement("button");
const submitGuitarTextNode = document.createTextNode("submit guitar");
submitGuitarBtn.appendChild(submitGuitarTextNode);

// guitar form string literal/interpolation
const guitarForm = `<form><fieldset><legend>Add a new guitar</legend>
Manufacturer: <input type="text" name="manufacturer"><br/>
Model: <input type="text" name="model"><br/></fieldset></form>`

// function that is called in main.js to put welcome message on DOM as well as add new guitar button and form
const welcome = function() {
    const welcomeParagraph = document.createElement("p");
    welcomeParagraph.innerHTML += welcomeMsg;
    guitarDivReference.appendChild(welcomeParagraph);
    guitarDivReference.appendChild(addGuitarBtn);

    // if we have guitars go ahead and display them otherwise let the user know we need to add guitars
    dataManager.getGuitars().then(r => {
        if (!(r.length === 0)) {
            // create p for guitar display
            const guitarDisplayP = document.createElement("p");
            guitarDivReference.appendChild(guitarDisplayP);
            // call display guitars function
            dataManager.displayGuitar(guitarDisplayP);
        } else {
            console.log("There are no guitars to display so add one!");
            console.log(r.length);
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

submitGuitarBtn.addEventListener("click", function submitGuitar() {
    let manufacturerGuitar = document.querySelector("input[name=\"manufacturer\"]").value;
    let model = document.querySelector("input[name=\"model\"]").value;
    // check that manufacturer and model are not an empty string
    if (!(manufacturerGuitar === "") && (!(model === ""))) {
        // create a guitar object and pass to createGuitar
        let myGuitar = {
            manufacturer: manufacturerGuitar,
            model: model
        }
        console.log("executing saveGuitar");
        dataManager.saveGuitar(myGuitar);
        
        // clear form inputs
        document.querySelector("input[name=\"manufacturer\"]").value = "";
        document.querySelector("input[name=\"model\"]").value = "";

    }
});

module.exports = welcome;