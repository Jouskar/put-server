const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

var userId = 1;
const users = [];

app.get('/', (req, res)=> {
    res.send(`
        <html>
            <head><title>Add a new user</title></head>
            <body>
                <form action="/users" method="POST">
                    <div>
                        <label for="userName">Name</label>
                        <div>
                            <input type="text" id="userName" name="userName"/>
                        </div>
                    </div>

                    <div>
                        <label for="userAge">Age</label>
                        <div>
                            <input type="text" id="userAge" name="userAge"/>
                        </div>
                    </div>

                    <div>
                        <label for="userGender">Gender</label>
                        <div>
                            <input type="text" id="userGender" name="userGender"/>
                        </div>
                    </div>

                    <div>
                        <div>
                            <input type="submit" value="Create User"/>
                        </div>
                    </div>
                </form>
            </body>
        </html>    
    `);
});

app.get('/users', (req, res)=> {
    res.send(users);
});

app.post('/users', (req, res)=> {
    users.push({id: userId, name: req.body.userName, age: req.body.userAge, gender: req.body.userGender})
    userId++;
    res.redirect('/');
});

app.put('/users', (req, res)=> {
    const userId = req.body.userId;

    users[userId-1] = {id: userId, name: req.body.userName, age: req.body.userAge, gender: req.body.userGender};
    res.redirect('/');
});

app.get('/users/:userId', (req, res)=> {
    const userId = req.params.userId;
    var user = users[userId-1];

    res.send(`
        <html>
            <head><title>Add a new user</title></head>
            <body>                
                <form action="/users" method="PUT">
                    <input type="hidden" name="userId" value="${userId}"/>
                    <div>
                        <label for="userName">Name</label>
                        <div>
                            <input type="text" id="userName" name="userName" placeholder="${user.name}"/>
                        </div>
                    </div>

                    <div>
                        <label for="userAge">Age</label>
                        <div>
                            <input type="text" id="userAge" name="userAge" placeholder="${user.age}"/>
                        </div>
                    </div>

                    <div>
                        <label for="userGender">Gender</label>
                        <div>
                            <input type="text" id="userGender" name="userGender" placeholder="${user.gender}"/>
                        </div>
                    </div>

                    <div>
                        <div>
                            <input type="submit" value="Update User"/>
                        </div>
                    </div>
                </form>
            </body>
        </html>    
    `);
});

app.listen(3000);