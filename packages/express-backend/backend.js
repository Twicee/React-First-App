import express from "express";
import cors from "cors";
import userServices from "./user-services";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job

  userServices.getUsers(name, job)
  .then(users => res.send({ users_list: users}))
  .catch(error => res.status(500).send(error));
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  userServices.findUserById(id)
  .then(user => {
    if(!user){
      res.status(404).send("Resource not found.");
    }else{
      res.send(user);
    }
  })
  .catch(error => res.status(500).send(error));
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userServices.addUser(userToAdd)
  .then(newUser => res.status(201).json(newUser))
  .catch(error => res.status(500).send(error));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  userServices.deleteUserById(id)
  .then(deletedUser => {
    if(!deletedUser){
      res.status(404).send("User not found.");
    }else{
      res.status(204).send();
    }
  })
  .catch(error => res.status(500).send(error));
});

