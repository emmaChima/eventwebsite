alert(`hi`)

// Event Attendees
let attendees = [];
let nameinputOne = document.getElementById('addattendee');
let nameinputTwo = document.getElementById('searchnames');
let nameinputThree = document.getElementById('removenames');
loadattendees();

function addattendee(names){ 
    names = nameinputOne.value.trim().toUpperCase();
    if(names === ''){
        nameinputOne.style.border = '1px solid red';
        alert('Pls fill name');
    }else if(attendees.includes(names)){
        nameinputOne.style.border = '1px solid yellow';
        alert('name already exists');
        nameinputOne.value = '';
    }else{
        nameinputOne.style.border = '1px solid green';
        alert(`${names} added`);
        attendees.push(names);
        updatestorage();
        nameinputOne.value = '';
    }
}

// update storage
function updatestorage(){
    localStorage.setItem('username', JSON.stringify(attendees));
}
function loadattendees(){
    let localData = localStorage.getItem('username')
    if(localData){
        attendees = JSON.parse(localData)
    }
}

// search attendee
function searchnames(names){
    names = nameinputTwo.value.trim().toUpperCase();
    searchResult = document.getElementById('result')
    if(attendees.includes(names)){
        alert(`found!`)
        nameinputTwo.value = '';
        searchResult.textContent = names;
    }else{
        alert(`null`)
    }
}

// remove attendee
function removenames(names){
    names = nameinputThree.value.trim().toUpperCase();
    if(attendees.includes(names)){
        let confirmed = confirm(`${names} will be deleted`)
        if(confirmed){
            // retrieve from local storage
            let todeletearray = JSON.parse(localStorage.getItem('username'));
            let todeleteindex = todeletearray.indexOf(names) 
            if(todeleteindex !== -1){
                todeletearray.splice(todeleteindex, 1)
                localStorage.setItem('username', JSON.stringify(todeletearray))
            }
            alert(`${names} deleted sucesfully`)
        }else(
            alert(`insert name`)
        )
        nameinputTwo.value = '';
    }else{
        alert(`${names} not found!`)
    }
}


function display(){
    let show = document.getElementById(`displayname`);
    show.textContent = attendees.map(name => name.trim()).join(': ')
}




