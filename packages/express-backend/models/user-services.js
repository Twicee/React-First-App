import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

function getUsers(name, job) {
    if(name && job){
        return userModel.find({ name: name, job: job});
    }else if(name){
        return findUserByName(name);
    }else if(job){
        return findUserByJob(job);
    }else{
        return userModel.find();
    }
}

function findUserById(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function deleteUserById(id){
    return userModel.findUserByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUserById,
};