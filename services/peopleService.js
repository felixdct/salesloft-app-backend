const axios = require('axios');
const {getEmailsDuplicates, getEmailsUniqueCharactersFrequency} = require('../utils/peopleUtils')

const SALESLOFT_URL = "https://api.salesloft.com/v2/people.json";

const getPeopleInfoFromSalesLoftAPI = async () => {
    return await axios.get(SALESLOFT_URL, {
        headers: {
            'Authorization': process.env.API_KEY,
            'Content-Type': 'application/json'
        }
    })
}

const getUniqueCharactersFrequencyCountEmails = async () => {
    const peopleInfo = await getPeopleInfoFromSalesLoftAPI();
    const {data} = peopleInfo;
    return getEmailsUniqueCharactersFrequency(data.data);
}

const getPossibleEmailsDuplicate = async () => {
    const peopleInfo = await getPeopleInfoFromSalesLoftAPI();
    const {data} = peopleInfo;
    return getEmailsDuplicates(data.data);
}

module.exports = {
    getPeopleInfoFromSalesLoftAPI,
    getPossibleEmailsDuplicate,
    getUniqueCharactersFrequencyCountEmails
}