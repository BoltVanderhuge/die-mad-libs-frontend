madLibURL = 'http://localhost:3000/mad_libs'
textEntryURL = 'http://localhost:3000/text_entries/'

renderMadLibs().then(renderAMadlib)
const storyContainer = document.querySelector('#mad-libs-story')
const inputForm = document.querySelector('#input-form')
const saveForm = document.querySelector('#save-your-mad-lib')

// ********** Event Listeners **********
inputForm.addEventListener('submit', updateStory)

saveForm.addEventListener('submit', saveStory)

// ********** Functions **********
function renderMadLibs() {
    return fetch(madLibURL)
    .then(response => response.json())

}

function renderAMadlib(madLibs){
    madLibs.forEach(madLib => {
        let div = document.createElement("div")
        div.className = "current-story"
        div.dataset.id = madLib.id
        div.innerHTML = madLib.story
        storyContainer.append(div)
    });
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
    inputForm.className = "hidden"
    saveForm.className = "not-hidden"
}

function saveStory(e) {
    e.preventDefault()
    console.log(e);
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
    console.log(postObj)
    fetch(textEntryURL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(postObj)
})
saveForm.className = "hidden"
}

const userid = 1
changeFormIDs(userid)
function changeFormIDs(userId){
    inputForm.number.value = userId
}
