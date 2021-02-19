madLibURL = 'http://localhost:3000/mad_libs'
textEntryURL = 'http://localhost:3000/text_entries/'
userURL = 'http://localhost:3000/users'

// renderMadLibs().then(renderAMadlib)
let userId 
const sideBar = document.querySelector("#sidebar")
const storyContainer = document.querySelector('#mad-libs-story')
const inputForm = document.querySelector('#input-form')
const saveForm = document.querySelector('#save-your-mad-lib')
const cardsContainer = document.querySelector('.cards-container')
const ssUL = document.querySelector('#ssUL')
const deleteBtn = document.querySelector('#delete-story-btn')
const loginModal = document.querySelector(".login")
const loginForm = document.querySelector(".login-form")
const splashScreen = document.querySelector("#splashscreen")
// const mainScreen = document.querySelector("#main-page")
const deleteUserBtn = document.querySelector(".delete")
const logoutBtn = document.querySelector(".logout")
const osUL = document.querySelector(".other-user-stories-list")
const osOL = document.querySelector(".top-five-list")
const osContainer = document.querySelector("other-user-story-container")


//--------------------EVENT LISTENERS--------------------//

inputForm.addEventListener('submit', updateStory)
cardsContainer.addEventListener('click', fetchAMadlib)
saveForm.addEventListener('submit', saveStory)
deleteBtn.addEventListener('click', deleteSavedStory)
loginForm.addEventListener('submit', loginPrompt)
deleteUserBtn.addEventListener('click', deleteUser)
logoutBtn.addEventListener('click', logoutUser)

//--------------------FUNCTIONS--------------------//


function fetchOtherTextEntries(){
    return fetch(textEntryURL + `${userId}/user`)
    .then(response => response.json())
}

function fetchTopFive(){
    return fetch(textEntryURL + `fav`)
    .then(response => response.json())
}

function showOtherUserStories(res){
    res.forEach(res => {
        li = document.createElement("li")
        li.innerText = res.title
        li.dataset.input = res.id
        li.dataset.id = res.user_id
        osUL.append(li)
        li.addEventListener('click', showOthersSavedStory)
    })
}

function showTopFive(res){
    res.forEach(res => {
        li = document.createElement("li")
        li.innerText = res.title
        li.dataset.input = res.id
        li.dataset.id = res.user_id
        osOL.append(li)
        li.addEventListener('click', showOthersSavedStory)
    })
}

function showOthersSavedStory(e){
    const liUser = parseInt(e.target.dataset.id)
    inputForm.className= "hide"
    deleteBtn.className = "hide"
    const otherID = e.target.dataset.input
    fetch(userURL + `/${e.target.dataset.id}`+`/${otherID}`)
    .then(response => response.json())
    .then(response => {
    let responses = response.inputs.split(",")
    let story = response.mad_story
    storyContainer.innerHTML = ""
    let div = document.createElement("div")
    div.className = "current-story"
    div.innerHTML = story
    let likeDiv = document.createElement("div")
    div.append(likeDiv)
    let p = document.createElement("p")
    p.className = "react-count"
    p.innerText = `${response.likes} likes`
    if (parseInt(liUser) !== userId){
        let button = document.createElement("button")
        button.className = "like-button"
        button.dataset.id = otherID
        button.innerText = "♥️ Like"
        button.addEventListener('click', increaseLike)
        p.append(button)
        
    }
    likeDiv.append(p)
    storyContainer.append(div)
    let num = 0
    let inputs = document.querySelectorAll('#input')
    inputs.forEach(input => {
        let response = responses[`${num}`]
        input.innerHTML = response
        num += 1
    });
    storyContainer.className = "not-hidden"
 
    })
}

function increaseLike(e){
    const likesDisplay = document.querySelector('.react-count')
    const likes = parseInt(likesDisplay.textContent)

        fetch(textEntryURL+`${e.target.dataset.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ likes: likes + 1 })
        })
            .then(response => response.json())
            .then(data => {
                likesDisplay.textContent = `${data.likes} likes`
            })
}


// User Functionality

function deleteUser(e){
    fetch(userURL + `/${e.path[1].dataset.id}`, {
        method: "DELETE"
    })
    splashScreen.className = "show"
    gridLayout.style = "display: none"
    // mainScreen.className = "hide"
    sideBar.className = "hide"
    storyContainer.innerHTML = ""
    changeFormIDs(1)
    inputForm.className = "hide"
    osUL.innerHTML = ""
    osOL.innerHTML = ""
    deleteBtn.className = "hide"

}

function logoutUser(e){
    deleteBtn.className = "hide"
    splashScreen.className = "show"
    // mainScreen.className = "hide"
    sideBar.className = "hide"
    storyContainer.innerHTML = ""
    inputForm.className = "hide"
    osUL.innerHTML = ""
    osOL.innerHTML = ""
    changeFormIDs(1)
    gridLayout.style = "display: none"
}


function changeFormIDs(Id){
    userId = Id
    inputForm.number.value = userId
    deleteUserBtn.dataset.id = userId
    logoutBtn.dataset.id = userId

    fetchUserTextEntries().then(populateSavedStories)
}

function populateSavedStories(text_entries){
    ssUL.innerHTML = ""
    text_entries.user.forEach(entry => {
        li = document.createElement("li")
        li.dataset.id = entry.mad_lib_id
        li.dataset.input = entry.id
        li.innerText = `${entry.title}`
        li.addEventListener('click', showSavedStory)
        ssUL.append(li)
    });
}

function showSavedStory(e){
    const madlibID = parseInt(e.target.dataset.id)
    inputForm.className = "hide"
    const otherID = e.target.dataset.input
    fetch(userURL + `/${userId}`+`/${otherID}`)
    .then(response => response.json())
    .then(response => {
    let responses = response.inputs.split(",")
    let story = response.mad_story
    storyContainer.innerHTML = ""
    let div = document.createElement("div")
    div.className = "current-story"
    div.innerHTML = story
    storyContainer.append(div)
    let num = 0
    let inputs = document.querySelectorAll('#input')
    inputs.forEach(input => {
        let response = responses[`${num}`]
        input.innerHTML = response
        num += 1
    });
    storyContainer.className = "not-hidden"
    deleteBtn.className = "not-hidden"
    deleteBtn.dataset.id = otherID
    })
}


function loginPrompt(e){
    e.preventDefault()

    const name = e.target[0].value 
    const age = parseInt(e.target[1].value)
    buttonValue = e.submitter.value
    userObj = {name, age}

    if (buttonValue === "Signup"){
        createAUser(userObj)
    } else if (buttonValue === "Login"){
        fetchAUser(userObj)
        
    }  
}

function createAUser(userObj){
    fetch(userURL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userObj)
    })
    .then(response => response.json())
    .then(decodeResponse)
}

function decodeResponse(res){
    if (!!res.message){
        alert(`${res.message}`);
    } else if (!!res[0]){
        changeFormIDs(res[0].id)
        fetchOtherTextEntries().then(showOtherUserStories)
        fetchTopFive().then(showTopFive)
        splashScreen.className = "hide"
        sideBar.className = "show"
        // mainScreen.className = "show"
        modal.style = "display: none"
        gridLayout.style = "display: grid"
        loginForm.reset()
    } else if (!!res.id){
        changeFormIDs(res.id)
        fetchOtherTextEntries().then(showOtherUserStories)
        fetchTopFive().then(showTopFive)
        splashScreen.className = "hide"
        // mainScreen.className = "show"
        sideBar.className = "show"
        modal.style = "display: none"
        gridLayout.style = "display: grid"
        loginForm.reset()
    } else 
        alert("Username or age is incorrect")
    
}

function fetchAUser(userObj){
    return fetch(userURL + `/${userObj.name}`+ `/${userObj.age}/user`)
    .then(response => response.json())
    .then(decodeResponse)
    
}


function deleteSavedStory(e){
    const textID = e.target.dataset.id
    const deleteLI = document.querySelector(`*[data-input='${textID}']`)
    fetch(textEntryURL + `${textID}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
    })

    storyContainer.innerHTML = ""
    deleteBtn.className = "hide"
    deleteLI.remove()
    
}

function fetchUserTextEntries() {
    return fetch(userURL + `/${userId}/text`)
    .then(response => response.json())
}

function renderMadLibs() {
    return fetch(madLibURL)
    .then(response => response.json())
}

renderMadLibs().then(renderMadLibsCards)

function renderMadLibsCards(res){
    res.forEach(res => {
        card = document.createElement("div")
        card.className = "card"
        card.dataset.id = res.id

        card.innerHTML= `
        <img class = "story-picture" data-id="${res.id}" src=${res.picture} alt="Avatar" >
        <div class="container">
            <h4><b>${res.description}</b></h4>
            <p>${res.title}</p>
        </div>    
`
cardsContainer.append(card)
    }) 
}

function fetchAMadlib(e) {
    if (e.target.className === "story-picture"){
    // cardsContainer.className = "hide"
    deleteBtn.className = "hide"
    const hTMLID = e.target.dataset.id
    return fetch(madLibURL + `/${hTMLID}`)
    .then(response => response.json())
    .then(renderAMadlib)
}
} 

function renderAMadlib(madLib){
    storyContainer.className = 'hide'
    inputForm.innerHTML = ""
    storyContainer.innerHTML = ""
    let div = document.createElement("div")
    div.className = "current-story"
    div.dataset.id = madLib.id
    div.innerHTML = madLib.story
    storyContainer.append(div)
    const mad_lib_id = parseInt(document.querySelector('.current-story').dataset.id)
    inputForm.innerHTML += madLib.form
    inputForm.className = "not-hidden"
    saveForm.className = "hide"
    changeFormIDs(userId)
}

function updateStory(e){
    e.preventDefault()
    let inputs = document.querySelectorAll('#input')
    let num = 1
    inputs.forEach(node => {
        let target = e.target[`${num}`].value
        node.innerHTML = target
        num += 1
    })

    inputForm.reset()
    storyContainer.className = "not-hidden"
    inputForm.className = "hide"
    saveForm.className = "not-hidden"
}

function saveStory(e) {
    e.preventDefault()
    const mad_lib_id = parseInt(document.querySelector('.current-story').dataset.id)
    const title = e.target[0].value
    let user_id = parseInt(inputForm.number.value)

    let inputs = document.querySelectorAll('#input')
    let inputsArr = []
    let num = 0
    inputs.forEach(node => {
        inputsArr[num] = node.innerHTML
        num += 1
    })
    const postObj = { 
        user_inputs: `${inputsArr}`,
        mad_lib_id, user_id, title
    }
    fetch(textEntryURL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(postObj)
    })
    .then(response => response.json())
    .then(response => {
        li = document.createElement("li")
        li.dataset.id = mad_lib_id
        li.dataset.input = response.id
        li.innerText = `${title}`
        li.addEventListener('click', showSavedStory)
        ssUL.append(li)
    })
    saveForm.className = "hide"
    saveForm.reset()
}

try {
    Typekit.load({
        async: true
	});
} catch (e) {}


// Splashscreen Animation
"use strict";

const grid = document.querySelector('.m-grid');
const tl = new TimelineMax();
TweenLite.set(grid, {
    transformPerspective: 400,
    transformOrigin: '50% 50%'
});
const anim2Props = {
    rotationX: 75,
    y: '0%',
    ease: Power2.easeIn,
    transformPerspective: 300,
    onComplete: () => grid.classList.add('is-animating')
};
tl.to(grid, 1, {
    scaleY: 1.5,
    ease: Power3.easeIn
    }).to(grid, 1, anim2Props, '+=0.3').to('.m-logo__wrap', 1, {
    scale: 1
});


// Get the modal
var modal = document.getElementById("myModal");
var gridLayout = document.getElementById("grid-layout");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
loginModal.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}





