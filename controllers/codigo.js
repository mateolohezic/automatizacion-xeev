const Code = require('../model/codigo');
const axios = require('axios');
const FormData = require('form-data');

const getCodes = async (req, res) => {
    try {
        const codes = await Code.find({})
        res.status(200).send(codes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getCodeEspecifico = async (req, res) => {
    const { id } = req.params;
    const code = await Code.findById(id)
    res.status(200).send(code);
}

const crearCode = async ( idXeev, code, name, number, seller ) => {
    const date = new Date();
    const expire = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const status = 'activo'
    const nuevoCode = new Code({
        idXeev,
        code,
        name,
        number,
        seller,
        date: date.toLocaleDateString('es-ES'),
        expire: expire.toLocaleDateString('es-ES'),
        status
    })
    await nuevoCode.save()
    console.log('Codigo cargado a la base de datos con exito');
}

const borrarCodePermanente = async (req, res) => {
    const { idXeev, id } = req.body
    await deleteCode( idXeev )
    await Code.findByIdAndDelete(id);
    res.status(200).send(`Se elimino el código con éxito.`)
}

const patchCode = async (req, res) => {
    const { name, number } = req.body
    await Code.findByIdAndUpdate(id, {
        name,
        number
    })
    res.status(200).send(`Se actualizo el código con éxito.`)
};

const renewCode = async (req, res) => {
    const { id } = req.body
    const date = new Date();
    const expire = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const status = 'activo'
    await Code.findByIdAndUpdate(id, {
        expire: expire.toLocaleDateString('es-ES'),
        status
    })
    res.status(200).send(`Se renovó el código con éxito.`)
};

const renewDateCode = async (req, res) => {
    const { id } = req.body
    const date = new Date();
    const expire = new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
    await Code.findByIdAndUpdate(id, {
        expire: expire.toLocaleDateString('es-ES'),
    })
    res.status(200).send(`Se renovó el vencimiento del código con éxito.`)
};

const banCode = async (req, res) => {
    const {id} = req.body
    const status = 'desactivado'
    await Code.findByIdAndUpdate(id, {
        status
    })
    res.status(200).send(`Se desactivo el código con éxito.`)
};

const deleteCode = async (req, res) => {
    const {idXeev} = req.body
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
          console.log('Bien');
        })
        .catch(error => {
          console.log(error);
        });
        res.status(200).json('Exito');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const postData = async (req, res) => {
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
      await crearCode(idXeev, code, name, number, seller)
        res.status(200).json(response.data);
    } catch (error) {
    res.status(500).json({ error: error.message });
  };
}

const renovarPostData = async (req, res) => {
    const {codigo} = req.body
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
      await generarEditData(codigo)
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

let vecesReavivado = 0;

const keepAlive = async () => {
    vecesReavivado = vecesReavivado + 1;
    const data = {
      action: 'get_x3m_dev',
      page: 1,
      limit: 50,
      limit_entries: [10, 25, 50, 100, 500],
      total_count: 1,
      ordering: {
        field: 'id',
        direction: 'desc',
      },
      filter: 'B50F6E55',
    };
  
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      Origin: 'https://xeev.net',
      Referer: 'https://xeev.net/en/app/lines/edit/792431',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      Cookie: 'privacy_readed=true; PHPSESSID=4rb0qkl47k54mnmdpf2l5idn57',
    };
  
    const options = {
      headers: headers,
    };
  
    try {
      const response = await axios.post(
        'https://xeev.net/en/user/api',
        data,
        options
      );
      console.log(`Reavivado ${vecesReavivado}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  keepAlive();

  setInterval(() => {
    keepAlive();
    checkCodes();
  }, 5 * 60 * 1000);

  const checkCodes = async () => {
    const codes = await Code.find({})
    const now = new Date();
    for (const code of codes) {
        const expireDate = new Date(code.expire.split('/').reverse().join('-')); // Convert DD/MM/YYYY to YYYY-MM-DD format
        if (now > expireDate) {
            await banCodeAutomatico(code._id);
            await deleteCodeAutomatico(code.idXeev);
        } else {
        }
    }
}

const banCodeAutomatico = async (id) => {
  const status = 'desactivado'
  await Code.findByIdAndUpdate(id, {
      status
  })
};

const deleteCodeAutomatico = async (idXeev) => {
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
module.exports = { postData, getCodes, getCodeEspecifico, borrarCodePermanente, patchCode, renewCode, banCode, renewDateCode, deleteCode, renovarPostData };