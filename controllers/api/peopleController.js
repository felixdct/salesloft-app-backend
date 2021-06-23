const { Router } = require('express');
const {
    getPeopleInfoFromSalesLoftAPI,
    getPossibleEmailsDuplicate,
    getUniqueCharactersFrequencyCountEmails
} = require('../../services/peopleService');
const {getPeopleListCustom} = require('../../utils/peopleUtils');

const router = Router();

router.get('/', (req, res) => {
    getPeopleInfoFromSalesLoftAPI()
        .then((peopleInfo) => res.send(getPeopleListCustom(peopleInfo.data.data)))
        .catch((error) => res.status(500).send(error.message));
});

router.get('/charactersCount', (req, res) => {
    getUniqueCharactersFrequencyCountEmails()
        .then((uniqueCharactersFrequencyList) => res.send(uniqueCharactersFrequencyList))
        .catch((error) => res.status(500).send(error.message));
});

router.get('/possibleDuplicates', (req, res) => {
    getPossibleEmailsDuplicate()
        .then((duplicates) => res.send(duplicates))
        .catch((error) => res.status(500).send(error.message));
});

module.exports = router;