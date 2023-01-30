import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";


let newMessage = async (req, res) =>{

                try
                {
                    console.log(req.body);
                    let newMessageDetails = new Message(req.body);
                    await newMessageDetails.save();
                    await Conversation.findByIdAndUpdate(req.body.conversationId, { message: req.body.text});

                    console.log("new message saved successfully.");
                    return res.status(200).json(newMessageDetails);
                }catch (e)
                 {
                   console.log(e);
                   return res.status(500).json(e);
                 }
            }



let  getMessage = async (req, res) => {
                try
                {
                    const messages = await Message.find({ conversationId: req.params.id });
                    res.status(200).json(messages);
                } catch (error)
                 {
                    res.status(500).json(error);
                 }
            }


export {newMessage, getMessage};
