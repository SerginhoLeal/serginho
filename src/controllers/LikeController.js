const Dev = require('../Models/Dev');

module.exports = {
    async store(req, res){
        const { user } = req.headers;
        const { devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev){
            return res.status(400).json({error: 'Dev morto'});
        }

        if(targetDev.likes.includes(loggedDev._id)){
            console.log('Conseguiu');
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
};