import User from "../models/User.js";



let addUser = async (request, response) =>{

    try
    {
        let exist = await User.findOne({ sub: request.body.sub });

        if(exist)
        {
            console.log("User already exists and login successfully");
            return response.status(200).json({message: 'User already exists'});
        }

        const newUser = new User(request.body);
        await newUser.save();

        console.log("New user login saved successfully");
        return response.status(201).json(newUser);

    } catch (error)
     {
        console.log(error);
        return response.status(500).json(error);
     }
}



let getUser = async (request, response) =>{

    try
    {
        const user = await User.find();
        return response.status(201).json(user);
    } catch (error)
     {
        return response.status(500).json(error);
     }
}


export {addUser, getUser};
