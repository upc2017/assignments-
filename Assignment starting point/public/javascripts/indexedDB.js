function submitForm(){
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
//加载聊天记录Loading Chat Records
function get_history(){
    let data= serialiseForm();
    getSumData(data.name)
        .then(response => console.log('getting sum worked!!'))
        .catch(error => console.log("error  getting: "+ + JSON.stringify(error)))
}

function serialiseForm() {
    let formArray = $("form").serializeArray();
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
