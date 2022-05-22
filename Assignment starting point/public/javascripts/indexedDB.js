/**
 * operate for database.js
 */
/**
 * Store data in the chat database
 */
function chatSubmitForm() {
    let data = serialiseForm();
    console.log(data)
    storeSumData({
        name: data.name,
        roomNo: data.roomNo,
        // image_url: data.image_url,
        chat_input: data.chat_input
    })
        .then(response => console.log('storeChat inserting worked!!'))
        .catch(error => console.log("error  inserting: " + JSON.stringify(error)))
}

/**
 * Store data in the story database
 */
function storySubmitForm() {
    let data = serialiseForm();
    console.log(data)
    //Get the current time
    let currentTime = getFormatDate();

    axios.post('/list/add',
        {
            creat_name: data.creat_name,
            creat_title: data.creat_title,
            time: currentTime,
            creat_Details: data.creat_Details,
            creat_image_url: data.creat_image_url
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    storeStoryData({
        creat_name: data.creat_name,
        creat_title: data.creat_title,
        time: currentTime,
        creat_Details: data.creat_Details,
        creat_image_url: data.creat_image_url
    })
        .then(response => console.log('storeStoryData inserting worked!!'))
        .catch(error => console.log("error  inserting: " + JSON.stringify(error)))
}

/**
 * Fetch data from a chatDatabase
 */
function get_history() {
    let data = serialiseForm();
    getChatData(data.name)
        .then(response => console.log('getting sum worked!!'))
        .catch(error => console.log("error  getting: " + +JSON.stringify(error)))
}

/**
 * Fetch data from the Canvas database
 */
function get_canvas_history() {
    let data = serialiseForm();
    console.log(data)
    getCanvasData(data.name)
        .then(response => console.log('getCanvasData(),getting sum worked!!'))
        .catch(error => console.log("error  getting: " + +JSON.stringify(error)))

}

/**
 * Fetch data from the knowledgeGraph database
 */
function get_know_history() {
    getKnowData()
        .then(response => console.log('getCanvasData(),getting sum worked!!'))
        .catch(error => console.log("error  getting: " + +JSON.stringify(error)))

}

/**
 * Fetch data from the story database
 */
function get_story_history() {
    let data = serialiseForm();
    console.log(data)
    getStoryData(data.creat_name)
        .then(response => console.log('getting sum worked!!'))
        .catch(error => console.log("error  getting: " + +JSON.stringify(error)))
}

/**
 *  Process all form data
 */
function serialiseForm() {
    let formArray = $("form").serializeArray();
    //Print out all the values in the form
    console.log(formArray)
    let data = {};
    for (let index in formArray) {
        data[formArray[index].name] = formArray[index].value;
    }
    return data;
}


/**
 *  Get chat logs, show them
 */
function addChatView(dataR) {
    let history = document.getElementById('history');
    let paragraph = document.createElement('p');
    if (dataR.chat_input != '') { //Make a judgement call to remove null values
        paragraph.innerHTML = "Me:" + dataR.chat_input;
    }

    history.appendChild(paragraph);
    document.getElementById('chat_input').value = '';
}

/**
 * 显示取的canvas数据 Get chat logs, show them
 */
function addToCanvas(dataR) {
    console.log("show")
    drawOnCanvas(document.getElementById('canvas').getContext('2d'), dataR.canvas_width, dataR.canvas_height, dataR.prevX, dataR.prevY, dataR.currX, dataR.currY, dataR.color, dataR.thickness);
}

function addToKnowledge(dataR) {
    console.log(dataR.data)
    showKGTag(dataR.data);
}

/**
 * Display the fetched story data
 */
function addToStory(dataR) {
    console.log("1")
    // let show_story = document.getElementById('render_story');
    // let paragraph = document.createElement('p');
    //     paragraph.innerHTML = "Me:"+dataR.creat_Details;
    //      show_story.appendChild(paragraph);
    /*$('#show_story').append(_generateGridContent(dataR.time, dataR.creat_title, dataR.creat_Details, dataR.creat_name,
        dataR.creat_image_url));*/
}

/**
 * Fetch data from MongoDB to render the home page
 */
const _generateGridContent = (time, title, details, name, url) => {
    return `<div  class="card m-5 col-3" style="width: 18rem;">
        <img id="render_story_img"  src="${url}"
             class=" card-img-top ">
        <div class="card-body">
            <h3 class="card-title">${title}</h3>
            <p class="card-text">${details}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item text-danger">by ${name}</li>
            <li class="list-group-item">on ${time}</li>
        </ul>
        <div class="card-body">
            <a id="url_image" href="/index?imgurl=${url}" class="btn btn-primary">Enter the Story</a>
        </div>`;
}

/**
 *  Called when getting the current time for storing data
 */
function getFormatDate() {
    let nowDate = new Date();
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    let date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    let hour = nowDate.getHours() < 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    let minute = nowDate.getMinutes() < 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    let second = nowDate.getSeconds() < 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
}

function get_story_history1() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then(function () {
                console.log('Service Worker Registered');
            });
    }
    getStoryData()
        .then(response => console.log('getting sum worked!!'))
        .catch(error => console.log("error  getting: " + +JSON.stringify(error)))
}