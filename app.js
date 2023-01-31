import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectionDB from "./utils/connectionDB.js";
import routes from "./routes/routes.js";
import { Server }  from 'socket.io';


dotenv.config();
mongoose.set('strictQuery', true);




const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true } ));
app.use(routes);
connectionDB();

const client_url = process.env.CLIENT_URL;


app.get("/", (req, res)=>{
                            res.json(`Welcome to WhatsApp Web clone app`);
                          }
        );



let PORT = process.env.PORT||5001;
const server = app.listen(PORT , () =>{
                          console.log(`WhatsApp Web clone app server is running on http://localhost:${PORT}`);
                       }
          );



const io = new Server(server, {
              cors: {
                  origin: "https://whatsapp-web-app-clone.netlify.app",
              },
          });



let users = [];

const addUser = (userData, socketId) => {
              !users.some(user => user.sub === userData.sub) && users.push({ ...userData, socketId });
          }

const removeUser = (socketId) => {
              users = users.filter(user => user.socketId !== socketId);
          }

const getUser = (userId) => {
              return users.find(user => user.sub === userId);
          }


io.on('connection',  (socket) => {
              console.log('user connected');

            try
            {
              //connect
              socket.on("addUsers", userData => {
                  addUser(userData, socket.id);
                  io.emit("getUsers", users);
              })

              //send message
              socket.on('sendMessage', (data) => {
                  const user = getUser(data.receiverId);
                  if(user)
                  {
                    io.to(user.socketId).emit('getMessage', data);
                  }
              })

              //disconnect
              socket.on('disconnect', () => {
                  console.log('user disconnected');
                  removeUser(socket.id);
                  io.emit('getUsers', users);
                })

              } catch (e)
                {
                    console.log(e);
                }

          })
