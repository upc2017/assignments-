//存储数据到chat数据库 Storing data in the chat database
function chatSubmitForm() {
	let data = serialiseForm();
	console.log(data)
	// let sum= parseInt(data.name)+parseInt(data.roomNo);
	//执行
	storeSumData({
			name: data.name,
			roomNo: data.roomNo,
			image_url: data.image_url,
			chat_input: data.chat_input
		})
		.then(response => console.log('storeChat inserting worked!!'))
		.catch(error => console.log("error  inserting: " + JSON.stringify(error)))
	//自动加载聊天记录， getSumData(XXX)，XXX特别重要！ // auto-load chat logs, getSumData(XXX), XXX is particularly important!
	//     getSumData(data.name)
	//         .then(response => console.log('getting sum worked!!'))
	//         .catch(error => console.log("error  getting: "+ + JSON.stringify(error)))
}

//存储数据到story数据库 Storing data in the story database
function storySubmitForm() {
	let data = serialiseForm();
	console.log(data)
	//获取当前时间
	let currentTime = getFormatDate();
	fetch('/list/add', {
			method: 'POST', // or 'PUT'
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				creat_name: data.creat_name,
				creat_title: data.creat_title,
				time: currentTime,
				creat_Details: data.creat_Details,
				creat_image_url: data.creat_image_url
			}),
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
	//自动加载聊天记录， getSumData(XXX)，XXX特别重要！ // auto-load chat logs, getSumData(XXX), XXX is particularly important!
	//     getSumData(data.name)
	//         .then(response => console.log('getting sum worked!!'))
	//         .catch(error => console.log("error  getting: "+ + JSON.stringify(error)))
}

//取数据chat Loading Chat Records
function get_history() {
	let data = serialiseForm();
	getSumData(data.name)
		.then(response => console.log('getting sum worked!!'))
		.catch(error => console.log("error  getting: " + +JSON.stringify(error)))
}
//取数据story Fetch data story
function get_story_history() {
	let data = serialiseForm();
	console.log(data)
	getStoryData(data.creat_name)
		.then(response => console.log('getting sum worked!!'))
		.catch(error => console.log("error  getting: " + +JSON.stringify(error)))
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
	if (dataR.chat_input != '') { //做判断，去除空值Make a judgement call to remove null values
		paragraph.innerHTML = "Me:" + dataR.chat_input;
	}

	history.appendChild(paragraph);
	document.getElementById('chat_input').value = '';



}
//显示取的story数据
function addToStory(dataR) {
	console.log("1")
	// let show_story = document.getElementById('render_story');
	// let paragraph = document.createElement('p');
	//     paragraph.innerHTML = "Me:"+dataR.creat_Details;
	//      show_story.appendChild(paragraph);
	$('#show_story').append(_generateGridContent(dataR.time, dataR.creat_title, dataR.creat_Details, dataR.creat_name,
		dataR.creat_image_url));
}
const _generateGridContent = (time, title, details, name, url) => {
	return `<div  class="card m-5 col-3" style="width: 18rem;">
        <img id="render_story_img"  src="${url}"
             class=" card-img-top ">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${details}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${name}</li>
            <li class="list-group-item">${time}</li>
        </ul>
        <div class="card-body">
            <a href="/" class="btn btn-primary">Enter the Story</a>
        </div>`;
}
//获取当前时间以供存储数据时调用 Called when getting the current time for storing data
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

function test() {
	console.log("1")
}

function get_story_history1() {
	getStoryData()
		.then(response => console.log('getting sum worked!!'))
		.catch(error => console.log("error  getting: " + +JSON.stringify(error)))
}
