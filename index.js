madLibURL = 'http://localhost:3000/mad_libs'
textEntryURL = 'http://localhost:3000/text_entries/'
userURL = 'http://localhost:3000/users'

// renderMadLibs().then(renderAMadlib)
let userId = 1
const storyContainer = document.querySelector('#mad-libs-story')
const inputForm = document.querySelector('#input-form')
const saveForm = document.querySelector('#save-your-mad-lib')
const cardsContainer = document.querySelector('#cards-container')
const ssUL = document.querySelector('#ssUL')

fetchUserTextEntries().then(populateSavedStories)

changeFormIDs(userId)
function changeFormIDs(userId){
    inputForm.number.value = userId
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
    console.log(e.target.dataset);
    const madlibID = parseInt(e.target.dataset.id)
    const otherID = e.target.dataset.input
    fetch(userURL + `/${userId}`+`/${otherID}`)
    .then(response => response.json())
    .then(response => {
        let responses = response.inputs.split(",")
        let response1 = responses[0]
        let response2 = responses[1]
        let response3 = responses[2]
        let response4 = responses[3]
        let story = response.mad_story
    storyContainer.innerHTML = ""
    let div = document.createElement("div")
    div.className = "current-story"
    div.innerHTML = story
    storyContainer.append(div)
    const input1 = document.querySelector('#input1')
    const input2 = document.querySelector('#input2')
    const input3 = document.querySelector('#input3')
    const input4 = document.querySelector('#input4')
    let target1 = response1
    let target2 = response2
    let target3  = response3
    let target4 = response4
    input1.innerHTML = target1
    input2.innerHTML = target2
    input3.innerHTML = target3
    input4.innerHTML = target4
    storyContainer.className = "not-hidden"
    })
}

// ********** Event Listeners **********
inputForm.addEventListener('submit', updateStory)
cardsContainer.addEventListener('click', fetchAMadlib)
saveForm.addEventListener('submit', saveStory)

// ********** Functions **********

function fetchUserTextEntries() {
    return fetch(userURL + `/${userId}/text`)
    .then(response => response.json())
}

function renderMadLibs() {
    return fetch(madLibURL)
    .then(response => response.json())
}

function fetchAMadlib(e) {
    if (e.target.className === "story-picture"){
    // cardsContainer.className = "hide"
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
    
    const input1 = document.querySelector('#input1')
    const input2 = document.querySelector('#input2')
    const input3 = document.querySelector('#input3')
    const input4 = document.querySelector('#input4')
    let target1 = e.target[1].value
    let target2 = e.target[2].value
    let target3  = e.target[3].value
    let target4 = e.target[4].value
    input1.innerHTML = target1
    input2.innerHTML = target2
    input3.innerHTML = target3
    input4.innerHTML = target4
    inputForm.reset()
    storyContainer.className = "not-hidden"
    inputForm.className = "hide"
    saveForm.className = "not-hidden"
}

function saveStory(e) {
    e.preventDefault()
    const mad_lib_id = parseInt(document.querySelector('.current-story').dataset.id)
    const title = e.target[0].value
    
    const input1 = document.querySelector('#input1')
    const input2 = document.querySelector('#input2')
    const input3 = document.querySelector('#input3')
    const input4 = document.querySelector('#input4')
    let user_id = parseInt(inputForm.number.value)
    let target1 = input1.innerHTML
    let target2 = input2.innerHTML
    let target3 = input3.innerHTML
    let target4 = input4.innerHTML
    const postObj = { 
        user_inputs: `${target1},${target2},${target3},${target4}`,
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
}

try {
    Typekit.load({
        async: true
	});
} catch (e) {}
