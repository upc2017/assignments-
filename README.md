# COM6504 Intelligent Web

## Setup

1. Go to the project directory
2. Run `npm install` to install the required packages
3. Make sure your mongoDB service is running on port `27017`
4. Make sure the database `mydocument` is empty
5. Run `npm start` to start up the server
6. Browse [http://localhost:3000](http://localhost:3000)

## Functions

Note: In this system, all chat, draw annotation,knowledge graph will be saved in IndexedDB 
and only chat message will be saved in MongoDB(if online)
### Create a story

1. Go to 'http://localhost:3000/' page
2. Click 'Create a story' button
3. Fill-in informations
4. Select the image you want to upload with Local File/URL link
5. Click `Create` button
6. If succeeded, you will be alert by a message "add success!"
7. Click `Sure` button

### View all the story

1. Return to 'http://localhost:3000/' page
2. You can see all the uploaded images as a story

### Join a chatroom 

1. Go to 'http://localhost:3000/' page
2. Find a story you like
3. Click `Enter the Story` button
4. Input your username and a room number to start a new chatroom or join an existing chatroom.
5. Click `Connect` button

#### Chat with others

You can chat with other users in the chat area of a room.

#### Draw on canvas

In Canvas area, you can annotate on the picture using your mouse together with other users. In the toolbar, you can change the color of the pen.

#### Tag draw annotation with Knowledge Graph

In the Knowledge Graph area, you can use knowledge graph to label the annotations in the canvas with others. In the toolbar, you can change the color of the label.

#### Clear canvas

When you click on `Clear Canvas` button on the top of chatroom, the Canvas and the Knowledge Graph area will be cleared for all users in the room.

## Screenshots directory
  screenshots/XXX.jpeg


## Contact
Here are our contact details and Github links：

- Chaoda  Song: csong13@sheffield.ac.uk
- Jun     Liu : jliu240@sheffield.ac.uk
- Mengyao Piao: mpiao2@sheffield.ac.uk
- Github: [https://github.com/upc2017/assignments-](https://github.com/upc2017/assignments-)









