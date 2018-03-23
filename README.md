## Instagram clone

The server goes to sleep after some time and the photos wont be able to be shown after that.
If I want the server to be up and running 24/7 I will have to pay for that.

Everything should work if you register a user and upload a picture locally from your computer.

### Deployed version
<a href="https://instamang.herokuapp.com/">Click here</a>

### Deployment

```
git checkout heroku-deploy
git add <files>
git commit -m "<commit message>"
git push heroku master
```

---
###How to start app

```
cd client
yarn start
cd ../server
nodemon server.js
-- with debugger in server --
nodemon --inspect server.js
```
