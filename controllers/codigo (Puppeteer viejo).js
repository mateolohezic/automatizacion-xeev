const puppeteer = require('puppeteer-extra')
const Client = require('@infosimples/node_two_captcha');
const Captcha = require("2captcha")
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const request = require('request');
const timers = require('timers-promises')

let codigoCaptcha = null;

puppeteer.use(StealthPlugin())

puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: '2captcha',
      token: 'aab9de09fc40871f013970b848ab8354' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
    },
    visualFeedback: false, // colorize reCAPTCHAs (violet = detected, green = solved)
    solveScoreBased: true,
    solveInactiveChallenges:true
  })
)

const Enviar = async () => {
  try {

    await request.post(
      'http://2captcha.com/in.php',
      { json: { 
        method: 'userrecaptcha',
        key: 'aab9de09fc40871f013970b848ab8354',
        version: 'v3',
        min_score: 0.4,
        googlekey: '6Les5LsUAAAAAHETMg3GsVl0FllXMr366eCb66mK',
        pageurl: 'https://xeev.net/en/login',
        action: 'login',
        json: 1
      } },
      async function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
          await timers.setTimeout(20000)
          await Recibir(body.request)
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
  }

const Recibir = async (idRecibido) => {
  try {
    await request.get(
      `http://2captcha.com/res.php?key=aab9de09fc40871f013970b848ab8354&action=get&json=1&id=${idRecibido}`,
      async function (error, response, body) {
          if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            console.log(body);
            codigoCaptcha = body.request;
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
}

// A new 'solver' instance with our API key
const solver = new Captcha.Solver('aab9de09fc40871f013970b848ab8354')

// Declare your client
client = new Client('aab9de09fc40871f013970b848ab8354', {
  timeout: 60000,
  polling: 5000,
  throwErrors: false});

const playlistTitle = 'XPLAY - Lider En Latinoamerica de Series y Peliculas';
const userEmail = 'carlosguindan@yahoo.com.ar'
const userPassword = 'sapocapo2332'
const apiKey = 'aab9de09fc40871f013970b848ab8354';
const siteKey = '6Les5LsUAAAAAHETMg3GsVl0FllXMr366eCb66mK';

const cargarCodigo = async (req, res) => {
  const { lineId, codeValue } = req.body;
  
  try {
    const browser = await puppeteer.launch({
      executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      headless: false,
      defaultViewport: null,
      args: [
        '--disable-notifications',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials',
        '--site-per-process,SitePerProcess',
        '--flag-switches-begin',
        '--disable-site-isolation-trials',
        '--flag-switches-end'
      ],  
      ignoreDefaultArgs: ['--disable-extensions']
    });
  
    const page = await browser.newPage();
    
    // Go to login page
    await page.goto('https://xeev.net/en/login');

    // Wait for the email input field to appear on the page
    await page.waitForSelector('button[type="submit"]');

    // Fill email and password inputs
    for (let i = 0; i < userEmail.length; i++) {
      await page.type('input[name="email"]', userEmail.charAt(i));
      await page.waitForTimeout(100);

    }

    for (let i = 0; i < userPassword.length; i++) {
      await page.type('input[name="password"]', userPassword.charAt(i));
      await page.waitForTimeout(100);
    }

    // Loop over all potential frames on that page
    // for (const frame of page.mainFrame().childFrames()) {
    //   // Attempt to solve any potential captchas in those frames
    //   await frame.solveRecaptchas()
    // }

    
    // let { captchas, filtered, error } = await page.findRecaptchas()
    // console.log(captchas, filtered, error);
    // let { solutions, errors } = await page.getRecaptchaSolutions(captchas)
    // console.log(errors);
    // console.log('Soluciones:');
    // console.log(solutions);
    // let { solved, errorss } = await page.enterRecaptchaSolutions(solutions)
    // console.log(errorss);
    // console.log('Solucionado:');
    // console.log(solved);
        
    // await client.decodeRecaptchaV3({
    //   googlekey: '6Les5LsUAAAAAHETMg3GsVl0FllXMr366eCb66mK',
    //   pageurl: 'https://xeev.net/en/login',
    //   action: 'login'
    // }).then(async function(response) {
    //   captchaCode = response.text
    // });
      
    // console.log(captchaCode);
    
    // Click on the login button
    // await page.click('button[type="submit"]')
      
    await Enviar()
    
    await page.waitForTimeout(25000);

    console.log(codigoCaptcha);

    const recaptchaTokenInput = await page.$('#recaptcha-token');
    await page.evaluate((input) => {
      input.value = 'HOALHOLAHOLA';
    }, recaptchaTokenInput);

    console.log('Successfully logged in!');
    
    // await page.goto(`https://xeev.net/en/app/lines/edit/${lineId}`);
    // console.log('Successfully navigated to the line page!');
    
    // // Wait for the input field to appear and fill it with codeValue
    // await page.waitForSelector('input.form-control[type="text"][placeholder="App-Code"]');
    // await page.type('input.form-control[type="text"][placeholder="App-Code"]', codeValue);
    
    // // Click the button with class="btn btn-success"
    // await page.click('button.btn.btn-success');
    // console.log('Successfully filled in the APP-Code input field and clicked the button!');

    // await page.waitForTimeout(1000);

    // // Navigate to the edit page
    // await page.goto(`https://xeev.net/en/app/dev_x3m/edit/${codeValue}`);
    // console.log('Successfully navigated to the edit page!');

    // // Wait for the checkbox to load and click it
    // await page.waitForSelector('input[name="app_code2[update_settings]"]');
    // await page.click('input[name="app_code2[update_settings]"]');

    // // Wait for the playlist title input field to appear on the page
    // await page.waitForSelector('input[id="app_code2_pluginInfo_playlist_title"]');
    
    // // Fill the playlist title input field letter by letter
    // await page.type('input[id="app_code2_pluginInfo_playlist_title"]', playlistTitle);

    // // Select the "Low" option from the network caching series dropdown
    // await page.select('select[id="app_code2_pluginInfo_network_caching_series"]', '0');

    // // Wait for half a second
    // await page.waitForTimeout(500);

    // // Click on the form submit button
    // await page.click('#form_submit_button');
    // await page.waitForTimeout(1000);

    console.log('Finished!');

    // Close the browser when finished
    // await browser.close();
    

    res.status(200).json({ message: 'Script executed successfully' });
  } catch (error) {
    console.error('Captcha!');
    res.status(500).json({ error: error.message });
  }
};

module.exports = { cargarCodigo };


// lineid = 5024
// codeValue = 66617011

// 66617011
// C3AB54BB
// FCF5643C
// 07CD4E2C
// 166464D0

// 09AJBLKW2DW4qZVZv_IIBK7iV_-iZfXik7qUHyoa-FS5Blq_5j32LLFwk_bGxr3jY16XA-OLOTcQm9jD865xOrJGmzp0CLXY2GF84


// 09AJBLKW3kVIUU4SSOxEDuP_MjaufRx2M-Vk2NeShgem7nfAFQJNTW7LkN3o_RlzPQR0e1aiXJ8En6Zirt8BABCcofD0CJCN6v4CU

// 120,120,120

// RECAPTCHA : 6Les5LsUAAAAAHETMg3GsVl0FllXMr366eCb66mK