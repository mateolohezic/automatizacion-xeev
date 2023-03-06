const puppeteer = require('puppeteer');

const cargarCodigo = async (req, res) => {
  const { lineId, codeValue } = req.body;
  const playlistTitle = 'XPLAY - Lider En Latinoamerica de Series y Peliculas';
  const userEmail = 'carlosguindan@yahoo.com.ar'
  const userPassword = 'sapocapo2332'
  
  try {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      args: [
        '--disable-notifications',
        '--disable-gpu',
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ],
      ignoreDefaultArgs: ['--disable-extensions']
    });
  
    // const page = await browser.newPage();
    
    // // Go to login page
    // await page.goto('https://xeev.net/en/login');

    // // Wait for the email input field to appear on the page
    // await page.waitForSelector('input[name="email"]');
    
    // // Fill email and password inputs
    // for (let i = 0; i < userEmail.length; i++) {
    //   await page.type('input[name="email"]', userEmail.charAt(i));
    //   await page.waitForTimeout(100); // wait 100ms between each letter

    // }

    // for (let i = 0; i < userPassword.length; i++) {
    //   await page.type('input[name="password"]', userPassword.charAt(i));
    //   await page.waitForTimeout(100); // wait 100ms between each letter

    // }


    // // Click on the login button and wait for the page to load
    // await page.click('button[type="submit"]');
    
    // await page.waitForNavigation({ waitUntil: 'networkidle2' });
    // console.log('Successfully logged in!');
    
    // await page.goto(`https://xeev.net/en/app/playlist_line/edit/${lineId}`);
    // console.log('Successfully navigated to the edit page!');
      
    // // Wait for the APP-Code input field to appear
    // await page.waitForSelector('input[placeholder="APP-Code"]');

    // // Fill in the APP-Code input field letter by letter
    // for (let i = 0; i < codeValue.length; i++) {
    //   await page.type('input[placeholder="APP-Code"]', codeValue.charAt(i));
    // }
    // await page.waitForTimeout(2000);
    // // Click the button with class="btn btn-success"
    // await page.click('button.btn.btn-success');
    // console.log('Successfully filled in the APP-Code input field and clicked the button!');

    // await page.waitForTimeout(1000);

    // // Navigate to the edit page
    // await page.goto(`https://xeev.net/en/app/playlist_dev_x3m/edit/${codeValue}`);

    // // Wait for the checkbox to load and click it
    // await page.waitForSelector('input[name="playlist_device2[update_settings]"]');
    // await page.click('input[name="playlist_device2[update_settings]"]');

    // // Wait for the playlist title input field to appear on the page
    // await page.waitForSelector('input[id="playlist_device2_settings_playlist_title"]');
    
    // // Fill the playlist title input field letter by letter
    // for (let i = 0; i < playlistTitle.length; i++) {
    //   await page.type('input[id="playlist_device2_settings_playlist_title"]', playlistTitle.charAt(i));
    // }

    // // Select the "Low" option from the network caching series dropdown
    // await page.select('select[id="playlist_device2_settings_network_caching_series"]', '0');

    // // Wait for half a second
    // await page.waitForTimeout(500);

    // // Click on the form submit button
    // await page.click('#form_submit_button');
    // await page.waitForNavigation({ waitUntil: 'networkidle2' });
    // await page.waitForTimeout(500);

    // // Click on the logout button
    // await page.waitForSelector('#__BVID__20__BV_toggle_');
    // await page.click('#__BVID__20__BV_toggle_');

    // await page.waitForTimeout(500);

    // // Click on the logout link
    // await page.click('.dropdown-item.text-danger');
    // console.log('Finished!');
    // Close the browser when finished
    await browser.close();

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