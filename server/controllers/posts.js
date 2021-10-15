import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async(req, res) => {
    try{
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (error){
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async(req, res) => {
    const { id } = req.params;
    try{
        const postMessage = await PostMessage.findById(id);
        res.status(200).json(postMessage);
    } catch (error){
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async(req, res) => {
    const {name, phone, mail, course, details } = req.body;
    const newPost = new PostMessage({name, phone, mail, course, details})
    try{
       await newPost.save();
       res.status(201).json(newPost)
    } catch (error){
       res.status(409).json({ message: error.message });
    }
}

export const updatePost = async(req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No post with id: ${id}`)
    
    const updatedPost = await PostMessage.findByIdAndUpdate( _id, post, { new: true });
    res.status(200).json(updatedPost) 
}

export const deletePost = async(req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`)

    await PostMessage.findByIdAndRemove( id );
    res.status(200).json({message: "Post deleted successfully"}) 
}