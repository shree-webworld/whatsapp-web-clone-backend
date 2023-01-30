import mongoose from 'mongoose';



const connectionDB = async () => {

    const DB = process.env.DATABASE;

    try {
        await mongoose.connect(DB, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Database Connected Succesfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }

};


export default connectionDB;
