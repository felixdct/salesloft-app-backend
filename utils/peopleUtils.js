const getPeopleListCustom = (list) => {
    return list.map((person) => ({
        fullName: person.display_name,
        email: person.email_address,
        jobTitle: person.title
    }));
}

const isValidCharacter = (charCode) => {
    return charCode > 64 && charCode < 91 || charCode > 96 && charCode < 123;
}

const getEmailUniqueCharactersFrequency = (email, uniqueCharactersCount) =>{
    let ch;

    for (let i = 0; i < email.length; i+=1) {
        ch = email.charAt(i);
        if (!isValidCharacter(email.charCodeAt(i)))
            continue;
        
        if (uniqueCharactersCount[ch]) {
            uniqueCharactersCount[ch] = uniqueCharactersCount[ch] + 1;
        } else {
            uniqueCharactersCount[ch] = 1;
        }
    }
}

const getEmailsUniqueCharactersFrequency = (peopleList) => {
    const uniqueCharactersCount = {};

    for (const person of peopleList) {
        const email = person.email_address;
        getEmailUniqueCharactersFrequency(email, uniqueCharactersCount);
    }

    return Object.entries(uniqueCharactersCount).sort(([,a],[,b]) => b-a);
}

const transformEmailList = (data) => {
    return data.map(({ email_address }) => ({
        isPossibleDuplicate: false,
        email: email_address,
        emailUser: email_address.substring(0, email_address.indexOf("@")),
        emailProvider: email_address.substring(email_address.indexOf("@") + 1, email_address.length)
    }));
}

const isPossibleDuplicate = (email1, email2) => {

    if(Math.abs(email1.length - email2.length) > 2) {
        return false;
    }

    const strLength = email1.length < email2.length ? email1.length : email2.length;
    
    let c = 0;
    let i = 0;
    let j = 0;
    
    while (i < strLength) {
        (email1.charAt(j) !== email2.charAt(i)) ? c+=1 : j+=1;

        if (c > 1) {
            return false;
        }

        i++;
    }

    return true;
}

/**
 * The idea is get the list of emails with relevant information for us
 * That information are: the full email, isPossibleDuplicate flag, the emailUser and the email provider
 * The isPossibleDuplicate flag is being use to mark the emails that we already considered as duplicates.
 * The emailUser is being use to compare the users, the rule is that the length should be equals or 1 character more at most
 * And the characters should be the same or with 1 character more at most
 * The email provider is being use to check if the emails has the same email provider, if it's true, worth search duplicates.
 * The full email is what we are returning when is a duplicate
 */
const getEmailsDuplicates = (data) => {
    const duplicates = [];
    const emails = transformEmailList(data);
    const emailsLength = emails.length;

    for (let i = 0; i < emailsLength; i+=1) {
        if (!emails[i].isPossibleDuplicate) {
            for (let j = i+1; j < emailsLength; j+=1) {
                if (!emails[j].isPossibleDuplicate && emails[j].emailProvider === emails[i].emailProvider) {
                    if (isPossibleDuplicate(emails[i].emailUser, emails[j].emailUser)) {
                        emails[i].isPossibleDuplicate = true;
                        emails[j].isPossibleDuplicate = true;
                        duplicates.push([emails[i].email, emails[j].email]);
                        break;
                    }
                }
            }
        }
    }

    return duplicates;
}

module.exports = {
    getEmailsDuplicates,
    getPeopleListCustom,
    getEmailsUniqueCharactersFrequency
}