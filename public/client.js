const socket =  io();

let uname 
let textarea = document.querySelector('#textarea')
let msg_area = document.querySelector('.message-area')

do{
    uname = prompt('plz enter name')
}while(!uname)

textarea.addEventListener('keyup',(e)=>{
    if(e.key == 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(message){
    let msg ={
        user: uname,
        message : message.trim()
    } 

    //append

    appendMessage(msg ,'outgoing')
    textarea.value =''
    scrolltobottom()

    //send to server

    socket.emit('message',msg)
}

function appendMessage(msg , type){

    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className,'message');


    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
                `
    mainDiv.innerHTML = markup;

    msg_area.appendChild(mainDiv)
}


// recieve msg

socket.on('message',(msg)=>{
    appendMessage(msg , 'incoming')
    scrolltobottom()
})


function scrolltobottom(){
    msg_area.scrollTop = msg_area.scrollHeight
}