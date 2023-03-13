const Prueba = require('../model/prueba');
const axios = require('axios');
const FormData = require('form-data');

const getPruebas = async (req, res) => {
    try {
        const pruebas = await Prueba.find({})
        res.status(200).send(pruebas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getPruebaEspecifico = async (req, res) => {
    const { id } = req.params;
    const prueba = await Prueba.findById(id)
    res.status(200).send(prueba);
}

const crearPrueba = async ( idXeev, code, name, number, seller ) => {
    const date = new Date();
    const expire = new Date(date.getTime() + (24 * 60 * 60 * 1000));
    const status = 'activo'
    const nuevaPrueba = new Prueba({
        idXeev,
        code,
        name,
        number,
        seller,
        date,
        expire,
        status
    })
    await nuevaPrueba.save()
    console.log('Codigo cargado a la base de datos con exito');
}

const postDataPrueba = async (req, res) => {
    const {codigo, name, number, seller } = req.body
    const code = codigo
    try {
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
      Cookie: 'privacy_readed=true; PHPSESSID=4rb0qkl47k54mnmdpf2l5idn57'
    };
    const options = {
      headers: headers
    };
      const response = await axios.post('https://xeev.net/en/user/api', data, options);
      const idXeev = response.data.data[0].id
      await generarEditData(codigo)
      await crearPrueba(idXeev, code, name, number, seller)
        res.status(200).json(response.data);
    } catch (error) {
    res.status(500).json({ error: error.message });
  };
}

const generarEditData = async (codigo) => {
    const headers = {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        Origin: 'https://xeev.net',
        Referer: 'https://xeev.net/en/app/lines/edit/792431',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        Cookie: 'privacy_readed=true; PHPSESSID=4rb0qkl47k54mnmdpf2l5idn57',
        'content-length': '0'
    };
    const options = {
        headers: headers,
    };
    try {
        const response = await axios.post('https://xeev.net/en/user/form/edit_x3mcode', null, options);
        const tokenValue = response.data.form.match(/app_code2\[_token\]"\s*value="([^"]*)/)[1];
        editData(codigo, tokenValue)

    } catch (error) {
        console.log(error.message);
    }
};

const editData = async (codigo, tokenValue) => {
    const formData = new FormData();
    formData.append('app_code2[ids]', codigo);
    formData.append('app_code2[executer][message]', '');
    formData.append('app_code2[executer][task]', '2');
    formData.append('app_code2[update_settings]', '1');
    formData.append('app_code2[pluginInfo][playlist_title]', 'XPLAY - Lider En Latinoamerica de Series y Peliculas');
    formData.append('app_code2[pluginInfo][audio_offset]', '0');
    formData.append('app_code2[pluginInfo][ovp_title]', '');
    formData.append('app_code2[pluginInfo][openvpn_url]', '');
    formData.append('app_code2[pluginInfo][openvpn_file]', '(binary)');
    formData.append('app_code2[pluginInfo][openvpn_username]', '');
    formData.append('app_code2[pluginInfo][openvpn_password]', '');
    formData.append('app_code2[pluginInfo][epg_title]', '');
    formData.append('app_code2[pluginInfo][additional_epg]', '');
    formData.append('app_code2[pluginInfo][appearance]', '');
    formData.append('app_code2[pluginInfo][show_homescreen]', '1');
    formData.append('app_code2[pluginInfo][hide_channel_numbers]', '1');
    formData.append('app_code2[pluginInfo][live_tv]', '');
    formData.append('app_code2[pluginInfo][live_autostart]', '1');
    formData.append('app_code2[pluginInfo][player_live]', '-1');
    formData.append('app_code2[pluginInfo][network_caching_live]', '1');
    formData.append('app_code2[pluginInfo][movies]', '');
    formData.append('app_code2[pluginInfo][player_vod]', '-1');
    formData.append('app_code2[pluginInfo][network_caching_vod]', '0');
    formData.append('app_code2[pluginInfo][sorting_vod]', 'additional.added');
    formData.append('app_code2[pluginInfo][series]', '');
    formData.append('app_code2[pluginInfo][player_series]', '-1');
    formData.append('app_code2[pluginInfo][network_caching_series]', '0');
    formData.append('app_code2[pluginInfo][sorting_series]', 'additional.added');
    formData.append('app_code2[pluginInfo][autoplay_next_episode]', '1');
    formData.append('app_code2[pluginInfo][live_archive]', '');
    formData.append('app_code2[pluginInfo][player_archive]', '-1');
    formData.append('app_code2[pluginInfo][livetv_offset]', '0');
    formData.append('app_code2[pluginInfo][recordings]', '');
    formData.append('app_code2[pluginInfo][player_recording]', '-1');
    formData.append('_token', tokenValue);
    const headers = {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        Origin: 'https://xeev.net',
        Referer: 'https://xeev.net/en/app/dev_x3m/edit/spe',
        'Sec-Ch-Ua': '"Chromium";v="110", "Not A(Brand";v="24", "Google Chrome";v="110"',
        'Sec-Ch-Ua-Mobile': '?1',
        'Sec-Ch-Ua-Platform': '"Android"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        Cookie: 'privacy_readed=true; PHPSESSID=4rb0qkl47k54mnmdpf2l5idn57'
    };
    const options = {
        headers: headers,
    };
    try {
        await axios.post('https://xeev.net/en/user/form/edit_x3mcode', formData, options);
    } catch (error) {
        console.log(error.message);
    }
};

  const checkCodes = async () => {
    const pruebas = await Prueba.find({})
    const now = new Date();
    for (const prueba of pruebas) {
        const expireDate = new Date(prueba.expire.split('/').reverse().join('-'));
        if (now > expireDate) {
            await banPruebaAutomatico(prueba._id);
            await deletePruebaAutomatico(prueba.idXeev);
        }
    }
}

setInterval(() => {
    checkCodes();
  }, 5 * 60 * 1000);

const banPruebaAutomatico = async (id) => {
  const status = 'desactivado'
  await Prueba.findByIdAndUpdate(id, {
      status
  })
};

const deletePruebaAutomatico = async (idXeev) => {
  const data = {
      action: 'remove_code',
      ids: [idXeev]
    };
    
    const headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'Origin': 'https://xeev.net',
      'Referer': 'https://xeev.net/en/app/dev_x3m',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'Cookie': 'privacy_readed=true; PHPSESSID=4rb0qkl47k54mnmdpf2l5idn57'
    };
    
    const options = {
      method: 'POST',
      url: 'https://xeev.net/en/user/api',
      headers: headers,
      data: data
    };
   
  try{
    axios(options)
      .then(response => {
      })
      .catch(error => {
        console.log(error);
      });
    } catch (error) {
      console.log(error.message);
  }
      
}
module.exports = { postDataPrueba, getPruebas };