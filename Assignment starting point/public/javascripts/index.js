let name = null;
let roomNo = null;
let chat = io.connect('/chat');
let socket = io.connect('/canvas')
let kgSocket = io.connect('/kg')

/**
 * called by <body onload>
 * it initialises the interface and the expected socket messages
 * plus the associated actions
 */
function init() {
    // it sets up the interface so that userId and room are selected
    document.getElementById('initial_form').style.display = 'block';
    document.getElementById('chat_interface').style.display = 'none';

    //@initialise the socket operations
    initChatSocket();
}

/**
 * it initialises the socket for /chat
 */
function initChatSocket() {
    // called when someone joins the room. If it is someone else it notifies the joining of the room
    chat.on('joined', function (room, userId) {
        if (userId === name) {
            // it enters the chat
            hideLoginInterface(room, userId);
        } else {
            // getUserId(userId);
            // notifies that someone has joined the room
            writeOnChatHistory('<b>' + userId + '</b>' + ' joined room ' + room);
        }
    });
    // called when a message is received
    chat.on('chat', function (room, userId, chatText) {
        let who = userId
        if (userId === name) who = 'Me';
        writeOnChatHistory('<b>' + who + ':</b> ' + chatText);
        chatSubmitForm(userId);
    });
}

/**
 * called to generate a random room number
 * This is a simplification. A real world implementation would ask the server to generate a unique room number
 * so to make sure that the room number is not accidentally repeated across uses
 */
function generateRoom() {
    roomNo = Math.round(Math.random() * 10000);
    document.getElementById('roomNo').value = 'R' + roomNo;
}

/**
 * called when the Send button is pressed. It gets the text to send from the interface
 * and sends the message via  socket
 */
function sendChatText() {
    let chatText = document.getElementById('chat_input').value;
    // @send the chat message
    chat.emit('chat', roomNo, name, chatText);
}

/**
 * used to connect to a room. It gets the user name and room number from the
 * interface
 */
function connectToRoom() {
    roomNo = document.getElementById('roomNo').value;
    name = document.getElementById('name').value;
    let imageUrl =document.getElementById('endImg').src
    if (!name) name = 'Unknown-' + Math.random();
    //@join the room
    chat.emit('create or join', roomNo, name);
    initCanvas(socket, imageUrl);
    socket.emit('join', roomNo, name, imageUrl);
    initPenColor();
    hideLoginInterface(roomNo, name);
    initKGSocket(kgSocket);
    kgSocket.emit('join', roomNo, name, imageUrl);
    initKG(kgData);
}

/**
 * callback called when an element in the widget is selected
 * @param event the Google Graph widget event {@link https://developers.google.com/knowledge-graph/how-tos/search-widget}
 */
function kgData(event) {
    let row = event.row;
    data = {color: color, kg: row}
    showKGTag(data)
    storeKnowsData({
        name: name,
        roomNo: roomNo,
        data: data
    })
        .then(response => console.log('storeChat inserting worked!!'))
        .catch(error => console.log("error  inserting: " + JSON.stringify(error)))
    kgSocket.emit('postKG', roomNo, data);
}

/**
 * it appends the given html text to the history div
 * this is to be called when the socket receives the chat message (socket.on ('message'...)
 * @param text: the text to append
 */
function writeOnChatHistory(text) {
    if (text === '') return;
    let history = document.getElementById('history');
    let paragraph = document.createElement('p');
    paragraph.innerHTML = text;
    history.appendChild(paragraph);
    // scroll to the last element
    history.scrollTop = history.scrollHeight;
    document.getElementById('chat_input').value = '';
}

/**
 * it hides the initial form and shows the chat
 * @param room the selected room
 * @param userId the user name
 */
function hideLoginInterface(room, userId) {
    document.getElementById('initial_form').style.display = 'none';
    document.getElementById('chat_interface').style.display = 'block';
    document.getElementById('who_you_are').innerHTML = userId;
    document.getElementById('in_room').innerHTML = ' ' + room;
}

/**
 * Init pen color
 */
function initPenColor() {
    // get initial color
    updatePenColor();
    // color update
    $('#pen-color').on('click', function (e) {
        updatePenColor();
    });
}

/**
 * Get the pencil color when selected
 */
function updatePenColor() {
    if (document.getElementById('color-red').checked == true) {
        c = 'red'
    }
    if (document.getElementById('color-blue').checked == true) {
        c = 'blue'
    }
    if (document.getElementById('color-yellow').checked == true) {
        c = 'yellow'
    }
    if (document.getElementById('color-green').checked == true) {
        c = 'green'
    }
    color = c
}
window.addEventListener('offline', function(e) {
    // Queue up events for server.
    console.log("You are offline");
    showOfflineWarning();
}, false);

/**
 * When the client gets online, it hides the off line warning
 */
window.addEventListener('online', function(e) {
    // Resync data with server.
    console.log("You are online");
    hideOfflineWarning();
    loadData(false);
}, false);


function showOfflineWarning(){
    if (document.getElementById('offline_div')!=null)
        document.getElementById('offline_div').style.display='block';
}

function hideOfflineWarning(){
    if (document.getElementById('offline_div')!=null)
        document.getElementById('offline_div').style.display='none';
}
