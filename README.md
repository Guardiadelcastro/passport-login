# User Authentication using NodeJS, Passport and MongoDB
I wanted to learn more about express and I have a project in mind that needs user authentication. Because of this I have been following a tutorial by [**Fazt**](http://www.faztweb.com) and his video on [Youtube](https://youtu.be/uVltgEcjNww), and a tutorial by [Brad Traversy](http://www.traversymedia.com) in [Youtube](https://youtu.be/6FOq4cUdH8k) 

But I won't leave it at that so I intend to play around with the code and add my spin on things. I will be using branches to organize the development. For example I want to dockerize mongodb and try to refactor the code to Typescript. To keep things organized, here are the branches:

| Branch | Description |
| ----------- | ----------- |
| master | The latest version of the code |
| develop | Current work |
| tutorial | The code as learned from Fazt's tutorial|
| bulma | I changed the style of the components with bulma instead of bootstrap |
| tutorial2 | The code as learned from TraversyMedia |




### Start Project
If you want to clone the project I will leave here some instructions (that will also serve me to rememeber myself)

#### Start nodemon server
```bash 
npm run dev
```
#### Start mongodb
```bash 
mongod --dbpath ../data/db
```