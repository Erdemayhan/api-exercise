const express = require("express");
const socialMediaUsers = require("./database/database");
const app = express();

//JSON formatiyla bir islemimiz varsa kullanmamiz gereken middleware express.json()
app.use(express.json());

const port = 3000;

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});

//http methods: get, post, patch, put, delete

// app.get('/', function (req, res) {
//     res.send('GET request to the homepage')
// });

//getAllUsers

app.get("/socialMediaUsers", (req, res) => {
  res.send(socialMediaUsers);
});

//getUserDetails

app.get("/socialMediaUsers/:id", (req, res) => {
  const userId = req.params.id;
  const userFound = socialMediaUsers.find(
    (socialMediaUser) => socialMediaUser.id == userId
  );
  res.send(userFound);
});

// addNewUser

app.post("/socialMediaUser", (req, res) => {
  const newUser = req.body;
  socialMediaUsers.push(newUser);
  res.send(socialMediaUsers);
});

// deleteUser

app.delete("/delete-user/:id", (req, res) => {
  const userId = req.params.id;
  const userIndex = socialMediaUsers.findIndex(
    (socialMediaUser) => socialMediaUser.id == userId
  );
  socialMediaUsers.splice(userIndex, 1);
  res.send(`${userId} this user has been deleted.`);

  // if (!isNaN(userIndex)) {
  //   socialMediaUsers.splice(userIndex, 1);
  //   res.send(`${userId} this user has been deleted.`);
  // } else {
  //   res.status(404).send("User not found");
  // }

  //if(userIndex !== -1)
});

// updateUserInfo

app.patch("/update-user/:id", (req, res) => {
  const { id } = req.params;

  const userIndex = socialMediaUsers.findIndex(
    (socialMediaUser) => socialMediaUser.id == id
  );

  //user'in updatelenecek fieldinin datasini gondermem lazim api'ya
  const { location } = req.body;

  socialMediaUsers[userIndex].location = location;
  res.send(`User ${userId} location has been changed.`);
});
