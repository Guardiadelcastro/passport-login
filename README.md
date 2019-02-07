# User Authentication using NodeJS, Passport and MongoDB
I wanted to learn more about express and I have a project in mind that needs user authentication. With this in mind I have been following a tutorial by [**Fazt**](http://www.faztweb.com) and his video on [Youtube](https://youtu.be/uVltgEcjNww).

I intend to play around with the code and add my spin on things so I will be using branches to organize the development. For example I want to dockerize mongodb and try to refactor the code to Typescript. As such these are the branches:

| Branch | Description |
| ----------- | ----------- |
| master | The latest version of the code |
| develop | Current work |
| tutorial | The code as learned from Fazt's tutorial|



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