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
function storySubmitForm(){
    let data= serialiseForm();
    console.log(data)
    //获取当前时间
    let currentTime = getFormatDate();
    console.log(currentTime);
    //创建数据库的字段
    storeStoryData({creat_name: data.creat_name, time:currentTime,creat_Details:data.creat_Details,creat_image_url:data.creat_image_url})
        .then(response => console.log('inserting worked!!'))
        .catch(error => console.log("error  inserting: "+ JSON.stringify(error)))
//自动加载聊天记录， getSumData(XXX)，XXX特别重要！ // auto-load chat logs, getSumData(XXX), XXX is particularly important!
//     getSumData(data.name)
//         .then(response => console.log('getting sum worked!!'))
//         .catch(error => console.log("error  getting: "+ + JSON.stringify(error)))
}

//获取当前时间
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
//加载聊天记录Loading Chat Records
function get_history(){
    let data= serialiseForm();
    getSumData(data.name)
        .then(response => console.log('getting sum worked!!'))
        .catch(error => console.log("error  getting: "+ + JSON.stringify(error)))
}

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
//获取聊天记录，显示出来Get chat logs, show them
function addToResults(dataR) {
    let history = document.getElementById('history');
    let paragraph = document.createElement('p');
    if(dataR.chat_input!=''){//做判断，去除空值Make a judgement call to remove null values
        paragraph.innerHTML = "Me:"+dataR.chat_input;
    }

    history.appendChild(paragraph);
    document.getElementById('chat_input').value = '';



}
