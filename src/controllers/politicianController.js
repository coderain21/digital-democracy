const Politician = require('../models/Politician');

const getAllPoliticians = async (req, res) => {
    try {
        const politicians = await Politician.find().exec();
        res.json(politicians);
    } catch(err) {
        console.error(err);
    } 
}

// Get one politician
const getPolitician = async (req, res) => {
    //grab our name from the request parameters
    const name = req.params['name'];
    //We need to split our name into two variables so we can use them for the mongodb search...
    array = name.split(" ");
    ourfirst = array[0];
    ourlast = array[1];

    try {
        const politician = await Politician.findOne(
            {last_name: ourlast, first_name: ourfirst},
            {_id:0}
            ).exec();
        res.json(politician);
    } catch(err) {
        console.error(err);
    }
}

module.exports = {getAllPoliticians, getPolitician};