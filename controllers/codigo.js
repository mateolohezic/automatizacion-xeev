const puppeteer = require('puppeteer');

const cargarCodigo = async (req, res) => {
  const { lineId, codeValue } = req.body;
  const playlistTitle = 'XPLAY - Liderr En Latinoamerica de Series y Peliculas';
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
        '--disable-setuid-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials'
      ],  
      ignoreDefaultArgs: ['--disable-extensions']
    });
  
    const page = await browser.newPage();
    
    // Go to login page
    await page.goto('https://xeev.net/en/login');

    // Wait for the email input field to appear on the page
    await page.waitForSelector('input[name="email"]');

    // Set a value in local storage
    await page.evaluate(() => {
      localStorage.setItem('_grecaptcha', '09AJBLKW2DW4qZVZv_IIBK7iV_-iZfXik7qUHyoa-FS5Blq_5j32LLFwk_bGxr3jY16XA-OLOTcQm9jD865xOrJGmzp0CLXY2GF84');
    });

    // Fill email and password inputs
    for (let i = 0; i < userEmail.length; i++) {
      await page.type('input[name="email"]', userEmail.charAt(i));
      await page.waitForTimeout(100);

    }

    for (let i = 0; i < userPassword.length; i++) {
      await page.type('input[name="password"]', userPassword.charAt(i));
      await page.waitForTimeout(100);
    }

    // // Click on the login button and wait for the page to load
    await page.click('button[type="submit"]');
    
    console.log('Successfully logged in!');
    
    await page.waitForTimeout(1000);
    
    
    await page.goto(`https://xeev.net/en/app/lines/edit/${lineId}`);
    console.log('Successfully navigated to the line page!');
    
    // // Wait for the input field to appear and fill it with codeValue
    await page.waitForSelector('input.form-control[type="text"][placeholder="App-Code"]');
    await page.type('input.form-control[type="text"][placeholder="App-Code"]', codeValue);
    
    // // Click the button with class="btn btn-success"
    await page.click('button.btn.btn-success');
    console.log('Successfully filled in the APP-Code input field and clicked the button!');

    await page.waitForTimeout(1000);

    // // // Navigate to the edit page
    await page.goto(`https://xeev.net/en/app/dev_x3m/edit/${codeValue}`);
    console.log('Successfully navigated to the edit page!');

    // // // Wait for the checkbox to load and click it
    await page.waitForSelector('input[name="app_code2[update_settings]"]');
    await page.click('input[name="app_code2[update_settings]"]');

    // // // Wait for the playlist title input field to appear on the page
    await page.waitForSelector('input[id="app_code2_pluginInfo_playlist_title"]');
    
    // // // Fill the playlist title input field letter by letter
    await page.type('input[id="app_code2_pluginInfo_playlist_title"]', playlistTitle);

    // // // Select the "Low" option from the network caching series dropdown
    await page.select('select[id="app_code2_pluginInfo_network_caching_series"]', '0');

    // // // Wait for half a second
    await page.waitForTimeout(500);

    // // // Click on the form submit button
    await page.click('#form_submit_button');
    await page.waitForTimeout(1000);

    console.log('Finished!');

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

// 09AJBLKW2DW4qZVZv_IIBK7iV_-iZfXik7qUHyoa-FS5Blq_5j32LLFwk_bGxr3jY16XA-OLOTcQm9jD865xOrJGmzp0CLXY2GF84


// 09AJBLKW3kVIUU4SSOxEDuP_MjaufRx2M-Vk2NeShgem7nfAFQJNTW7LkN3o_RlzPQR0e1aiXJ8En6Zirt8BABCcofD0CJCN6v4CU

// 120,120,120