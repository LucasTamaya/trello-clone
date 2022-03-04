# Codedamn Projects - Trello Clone

![header image](https://raw.githubusercontent.com/codedamn-projects/trello-clone/master/designs/Moving%20Cards.gif)
## Hello developer!

Welcome to Trello Clone Project on Codedamn. This is one of the many projects available on [codedamn](https://codedamn.com/projects) to reinforce your learning by building. If you want to become a full stack developer and learn by practicing, feel free to attempt this challenge. Feel free to check out the codedamn [Full Stack Web Development Learning Path](https://codedamn.com/learning-paths/fullstack) to learn more about how to become an awesome full stack developer.

## **Project** Overview

You have to build a functional Kanban board system where the user can Drag and Drop Cards between lists. 

## Instructions

Your challenge is to build out this project and get it looking as close to the design as possible.

You can use **any tools or technologies** you like to help you complete the challenge. So if you've got something you'd like to practice, feel free to give it a go.

Your project should:

-   Be responsive for desktop and mobile phones
-   Have minimum functionalities and effects working

Want some support on the challenge? [Join our discord community](https://cdm.sh/discord) and ask questions in the **#general** channel.

There is no limit you can go beyond the mentioned criteria and create additional functionalities

### Landing Page

At `/` route.

![landing page](https://raw.githubusercontent.com/codedamn-projects/trello-clone/master/designs/Home.png)

### Login

The login functionality should be implemented in the `/login` route.

![login image](https://raw.githubusercontent.com/codedamn-projects/trello-clone/master/designs/Login%20%5BDesktop%7D.png)

When the user clicks on the Log In button the a POST request should be sent to `/api/login` to validate the user credentials. If the user exists and has entered the correct username and password combination, you should redirect to `/boards` page. 

### Signup

At `/signup` route.

![Sign UP page](https://raw.githubusercontent.com/codedamn-projects/trello-clone/master/designs/Sign%20Up%20%20%5BDesktop%5D.png)

On clicking on Continue send a POST request to `/api/signup` and create a document in MongoDB in the users Collection. On Successful creation of the document redirect the user to `/boards` 
### Boards
At `/boards` route

![/boards](https://raw.githubusercontent.com/codedamn-projects/trello-clone/master/designs/Boards%20%5BDesktop%5D.png)

At `/boards` all the boards created by the user should be shown along with the option to create a new board. 

#### Create new Board
![Create new board](https://raw.githubusercontent.com/codedamn-projects/trello-clone/master/designs/Create%20Board%20Modal.png)

On Clicking on create new board a modal with an input field for the name of the board should exist and on clicking on **create** a POST request should be made to `/api/createboard`. Make sure to generate an ID for the board and store in the document as well.

### Board

![/board/id](https://raw.githubusercontent.com/codedamn-projects/trello-clone/master/designs/Board%20%5BDesktop%5D.png)

This is the core part of the project. The user should be able to create new cards and lists and should be able to conveniently drag and drop cards between 

For creating the Drag and Drop functionality of Cards you can use the [react-dnd](https://www.npmjs.com/package/react-dnd) or [react-beautiful-dnd](https://www.npmjs.com/package/react-beautiful-dnd). Getting yourself familiar with anyone of the package is crucial to build the drag and drop functionality between cards. 

### Create New List 

![new list](https://raw.githubusercontent.com/codedamn-projects/trello-clone/master/designs/New%20List%20%5BDesktop%5D.png)

On clicking on the new `Add List` button, you have make a POST  request to `/api/newlist` with userId, boardId and the List name. 
### Add Card

![new card for list](https://raw.githubusercontent.com/codedamn-projects/trello-clone/master/designs/New%20Card%20%5BDesktop%5D.png)
## API Routes 

### `/api/login`

To verify the user credentials on Sign In, taking the parameters as the roll number and the password 

### `/api/signup` 

To register a new student and add the document to the database

### `/api/getboards` 
params: `userId`

This request should return the name of the boards that the user has created 

### `/api/createboard`

params: `userId, boardName`

This request should create a new document in the Boards collection with `userId, boardName, boardId` fields
### `/api/board` 

params: `userId, boardId`

This request should return the JSON data of the lists and the cards in the board having the id mentioned.

### `/api/createList` 

params: `userId`
### `/api/createcard`

params: `userId, boardId`

The request should add the card details to the MongoDB 

### `/api/movecard`

params: `userId, boardId, cardId, previousListId, currentListId`

This request should move the card location in the 



### MongoDB User document (Users collection)
```
{ 
    "username" : string,
    "email" : string,
    "password" : string
    "userId" : string
}
```

### MongoDB Board Document (Boards Collection)
```
{
    "boardId" : string,
    "UserId" : string,
    "boardName" : string, 
    "lists" : [
                {
                    "listId" : string,
                    "listName" : string,
                    "cards" : [
                                {   "cardId" : string, 
                                    "cardTitle" : string, 
                                    "cardDescription": string
                                }
                              ]
                }
              ]
}
```


### Ports 
The Codedamn Playgrounds exposes only `1337` and `1338` ports on the internet. So you'll be using `localhost` for connecting to the mongodb instance as they are hosted on the same docker container. You can specify it as `localhost:27017` or simple write `localhost`. 

You have to use the `1338` port for the web socket connection. 

For Connecting to the MongoDb you have to use  `localhost:27017` as the local instance of the mongoDB is present.

## Extras
1. You can create the functionality to edit an delete boards,lists and cards
1. Functionality to move lists among them 
1. Adding of more fields to the cards like images, links, priority, tags etc. 
1. Creating a Profile Page 
## Recommended Technologies 
1. Mongoose for mongodb object modelling and effective type system 
1. Tailwind CSS for User Interface

## Where to find everything

Your task is to build out the project as per the provided screenshots.

The designs are in image formats can be found in `/designs`.



## Send feedback!

We love receiving feedback! We're always looking to improve our challenges and our platform. So if you have anything you'd like to mention, please visit [codedamn feedback page](https://codedamn.com/contact)