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

function showStory(){
    axios.get(
        '/list'
    )
        .then(response => {
            let data=response.data
            console.log(data)
            if(data.code == 1){
                if(data.data && data.data.length > 0){
                    console.log("add from mongodb")
                    data.data.forEach((d,i)=>{
                        var date = new Date(d.time);
                        var dateStr = date.getFullYear()+"-" +(1+date.getMonth())+
                            "-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
                        $('#show_story').append(_generateGridContent(d._id,dateStr, d.creat_title, d.creat_Details, d.creat_name,
                            d.creat_image_url));
                        console.log("start")
                        storyIndexedDB(d._id,dateStr, d.creat_title, d.creat_Details, d.creat_name,
                            d.creat_image_url);
                    })
                }

            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });;
}

function storyIndexedDB(id,dataStr,title,details,name,imgUrl){
    storeStoryData({
        story_id:id,
        creat_name: name,
        creat_title: title,
        time: dataStr,
        creat_Details: details,
        creat_image_url: imgUrl
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
    getCanvasData(data.name,data.roomNo)
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
 * Fetch data from MongoDB to render the home page
 */
const _generateGridContent = (id,time, title, details, name, url) => {
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
            <a id="url_image" href="/index?imgurl=${id}" class="btn btn-primary">Enter the Story</a>
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
/**
 *  Called when getting the current time for storing data
 */
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

function getUrl(){
    var url = document.location.toString();//Get current URL
    var arrUrl = url.split("?");//Splitting?
    var para = arrUrl[1];//Get Parameters section
    var arr = para.split("=");//Splitting =
    var res = arr[1];//Get the value of the parameter
    // getImgInfo(res);
    getStoryImgData(res)
        .then(response => console.log('getting sum worked!!'))
        .catch(error => console.log("error  getting: " + +JSON.stringify(error)))
    // return res;
}