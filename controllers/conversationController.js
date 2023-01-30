import Conversation from "../models/Conversation.js";

let newConversations = async (req, res) =>{
                                try
                                {
                                  console.log(req.body);

                                  let {senderId, receiverId} = req.body;
                                  let exist = await Conversation.findOne({ members: { $all: [receiverId, senderId]  }});

                                  if(exist)
                                  {
                                    return res.status(200).json("Conversation already exist");
                                  }

                                  const newConversation = new Conversation({members: [senderId, receiverId]});
                                  await newConversation.save();

                                  console.log("newConversation saved successfully");
                                  return res.status(200).json(newConversation);

                                }catch (e)
                                  {
                                    console.log(e);
                                    return res.status(500).json(e);
                                  }
                            }


    let getConversation = async (req, res) =>{
                      try
                      {
                          let {senderId, receiverId} = req.body;
                          let conversation = await Conversation.findOne({members:{ $all: [senderId, receiverId] }});
                          return res.status(200).json(conversation);

                      }catch (e)
                       {
                         console.log(e);
                         return res.status(500).json(conversation);                         
                       }
            }





export {newConversations, getConversation};
