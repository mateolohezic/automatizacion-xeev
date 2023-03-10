const axios = require('axios');

const postData = async (req, res) => {

    const {codigo} = req.body
    const data = {
        action: 'add_appcode',
        type: 'line',
        id: '792431',
        code: codigo
    };
    const headers = {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Origin: 'https://xeev.net',
        Referer: 'https://xeev.net/en/app/lines/edit/792431',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        Cookie: 'privacy_readed=true; PHPSESSID=jarqj2mrdthqni8ds2tl1tp4bk'
    };
    const options = {
        headers: headers,
    };
    try {
        const response = await axios.post('https://xeev.net/en/user/api', data, options);
        console.log(response.data);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { postData };