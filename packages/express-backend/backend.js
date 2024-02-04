import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

app.use(cors());
app.use(express.json());

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

const deleteUserById = (id) => {
  const index = users["users_list"].findIndex(
    (user) => user["id"] === id
  );

  if(index !== -1){
    users["users_list"].splice(index, 1);
    return true;
  }
  return false;
}

const findUserById = (id) =>{
  users["users_list"].find((user) => user["id"] === id);
}

const generateRandomId = () => {
  return Math.random().toString(36).substr(2, 10);
}

const addUser = (user) => {
  const newUser = { ...user, id: generateRandomId() };
  users["users_list"].push(newUser);
  return newUser;
};

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
  if (name != undefined) {
    let result = findUserByNameAndJob(name, job);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const newUser = addUser(userToAdd);
  res.status(201).json(newUser);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const success = deleteUserById(id);

  if(success){
    res.status(204).send();
  }else{
    res.status(404).send("User not found.");
  }
});