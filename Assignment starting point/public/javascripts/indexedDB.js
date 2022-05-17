//存储数据到chat数据库 Storing data in the chat database
function chatSubmitForm(){
    let data= serialiseForm();
     console.log(data)
    // let sum= parseInt(data.name)+parseInt(data.roomNo);
    //执行
    storeSumData({name: data.name, roomNo: data.roomNo,image_url:data.image_url,chat_input:data.chat_input})
        .then(response => console.log('inserting worked!!'))
        .catch(error => console.log("error  inserting: "+ JSON.stringify(error)))
//自动加载聊天记录， getSumData(XXX)，XXX特别重要！ // auto-load chat logs, getSumData(XXX), XXX is particularly important!
//     getSumData(data.name)
//         .then(response => console.log('getting sum worked!!'))
//         .catch(error => console.log("error  getting: "+ + JSON.stringify(error)))
}

//存储数据到story数据库 Storing data in the story database
function storySubmitForm(){
    let data= serialiseForm();
    console.log(data)
    //获取当前时间
    let currentTime = getFormatDate();
    console.log(currentTime);
    storeStoryData({creat_name: data.creat_name, creat_title:data.creat_title,time:currentTime,creat_Details:data.creat_Details,creat_image_url:data.creat_image_url})
        .then(response => console.log('inserting worked!!'))
        .catch(error => console.log("error  inserting: "+ JSON.stringify(error)))
//自动加载聊天记录， getSumData(XXX)，XXX特别重要！ // auto-load chat logs, getSumData(XXX), XXX is particularly important!
//     getSumData(data.name)
//         .then(response => console.log('getting sum worked!!'))
//         .catch(error => console.log("error  getting: "+ + JSON.stringify(error)))
}

//取数据chat Loading Chat Records
function get_history(){
    let data= serialiseForm();
    getSumData(data.name)
        .then(response => console.log('getting sum worked!!'))
        .catch(error => console.log("error  getting: "+ + JSON.stringify(error)))
}
//取数据story Fetch data story
function get_story_history(){
    let data= serialiseForm();
    console.log(data)
    getStoryData(data.creat_name)
        .then(response => console.log('getting sum worked!!'))
        .catch(error => console.log("error  getting: "+ + JSON.stringify(error)))
}

//处理所有form表单的数据 Process all form data
function serialiseForm() {
    let formArray = $("form").serializeArray();
    //打印出所有表单里面的值 Print out all the values in the form
    console.log(formArray)
    let data = {};
    for (let index in formArray) {
        data[formArray[index].name] = formArray[index].value;
    }
    return data;
}

//显示取的chat数据 Get chat logs, show them
function addToResults(dataR) {
    let history = document.getElementById('history');
    let paragraph = document.createElement('p');
    if(dataR.chat_input!=''){//做判断，去除空值Make a judgement call to remove null values
        paragraph.innerHTML = "Me:"+dataR.chat_input;
    }

    history.appendChild(paragraph);
    document.getElementById('chat_input').value = '';



}
//显示取的story数据
function addToStory(dataR) {
    console.log(dataR)
    let show_story = document.getElementById('show_story');
    let paragraph = document.createElement('p');
        paragraph.innerHTML = "Me:"+dataR.creat_Details;
    show_story.appendChild(paragraph);
    document.getElementById('chat_input').value = '';



}

// function read(){
//     displayData()
//         .then(response => console.log('chenggong'))
//         .catch(error => console.log("error  getting: "+ + JSON.stringify(error)))
// }
//获取当前时间以供存储数据时调用 Called when getting the current time for storing data
function getFormatDate(){
    let nowDate = new Date();
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
    let date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
    let hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();
    let minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
    let second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
}