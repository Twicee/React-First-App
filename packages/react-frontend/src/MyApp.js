import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  function removeOneCharacter(id) {
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          // If successful delete (HTTP 204), update the state
          setCharacters((prevCharacters) =>
            prevCharacters.filter((character) => character.id !== id)
          );
        } else if (response.status === 404) {
          // Resource not found, handle accordingly
          console.log("Resource not found");
        } else {
          // Handle other error cases
          console.log(`Failed to delete user. Status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateList(person) { 
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else {
          throw new Error(`Failed to add user. Status: ${response.status}`);
        }
      })
      .then((newUser) => {
        setCharacters((prevCharacters) => [...prevCharacters, newUser]);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }
  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }
}

export default MyApp;