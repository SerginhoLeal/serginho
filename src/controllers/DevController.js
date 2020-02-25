const axios = require('axios');
const Dev = require('../Models/Dev');

module.exports = {
    async index(req, res){
        const pro = await Dev.find();
        return res.json(pro);
    },
    async store(req, res){
        const { username } = req.body;
        
        const userExists = await Dev.findOne({user: username});
        
        if(userExists){
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);
        
        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar,
        });

        return res.json(dev);
    }
};