import grid from 'gridfs-stream';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const base_url = process.env.BASE_URL;

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});


let uploadFile = (request, response) =>{
                if(!request.file)
                        return response.status(404).json("File not found");

                    const imageUrl = `${base_url}/file/${request.file.filename}`;

                    response.status(200).json(imageUrl);
                }


const getImage = async (request, response) => {
                    try {
                        const file = await gfs.files.findOne({ filename: request.params.filename });

                        const readStream = gridfsBucket.openDownloadStream(file._id);
                        readStream.pipe(response);
                    } catch (error) {
                        response.status(500).json({ msg: error.message });
                    }
                }


export {uploadFile, getImage};
