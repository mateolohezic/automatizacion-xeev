// const puppeteer = require('puppeteer');

// // const lineId = '827635';
// // const codeValue = '4B44D260';

// const cargarCodigo =  async (req, res) => {

//   const { lineId, codeValue } = req.body;
//   const playlistTitle = 'Mateo es un capo';

//   try {
//     const browser = await puppeteer.launch({
//       headless: false,
//       defaultViewport: null,
//       args: [
//         '--disable-notifications',
//         '--disable-gpu'
//       ],
//     });
  
//     const page = await browser.newPage();
    
//     // Go to login page
//     await page.goto('https://xeev.net/en/login');
  
//     // Fill in login details and submit
//     await page.waitForSelector('#username');
//     await page.type('#username', 'mateolohezic');
//     await page.type('#password', 'residentevil');
//     await page.evaluate(() => {
//       document.querySelector('form').submit();
//     });
  
//     // Wait for navigation and go to target page
//     await page.waitForNavigation({ waitUntil: 'networkidle2' });
//     await page.goto(`https://xeev.net/en/pro/line/edit/${lineId}`);
//     console.log('Successfully navigated to the edit page!');
  
//     // Fill in the input field with code
//     await page.waitForSelector('.form-control.addcodeinput');
//     await page.type('.form-control.addcodeinput', codeValue);
//     console.log('Code entered successfully!');
  
//     // Click the button to send the code
//     await page.waitForSelector('button[alt="New APP Code"]');
//     await page.click('button[alt="New APP Code"]');
//     console.log('Code sent successfully!');
  
//     await page.waitForTimeout(3000);
//     // Click the save button
//     await page.click('#savebtn');
//     console.log('Save button clicked successfully!');

//     await page.waitForSelector('a[href="#appdev2"]');
//     await page.click('a[href="#appdev2"]');
//     console.log('Target link clicked successfully!');

//     // Wait for the input field to appear and fill with codeValue
//     await page.waitForSelector('#table_search');
//     await page.type('#table_search', codeValue);

//     // Submit the form
//     await page.waitForSelector('#app2LinesForm');
//     await page.evaluate(() => {
//       document.querySelector('#app2LinesForm').submit();
//     });
//     console.log('Form submitted successfully!');

//     await page.waitForTimeout(3000);
//     // Wait for search results to load
//     await page.waitForSelector('.table.table-striped.table-condensed');

//     // Find the <a> tag with the gear icon
//     const gearLink = await page.$('a:has(i.fa.fa-gear.fa-fw)');

//     // Click on the gear icon link
//     await gearLink.click();
//     console.log('Clicked on gear icon link successfully!');

//     await page.waitForSelector('#app_code_update_settings');
//     await page.click('#app_code_update_settings');

//     // Fill in the playlist title input
//     await page.waitForSelector('#app_code_pluginInfo_playlist_title');
//     await page.type('#app_code_pluginInfo_playlist_title', playlistTitle);
//     console.log('Playlist title entered successfully!');

//     // Select dropdown menu and option value
//     await page.select('#app_code_pluginInfo_network_caching_series', '0');

//     await page.waitForTimeout(3000);
//     // Click the save button
//     await page.click('#savebtn');
//     console.log('Save button clicked successfully!');

//     // Logout
//     await page.goto('https://xeev.net/en/logout');

//     // Close the browser when finished
//     await browser.close();

//     res.status(200).json({ message: 'Script executed successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = { cargarCoasfdigo }

// lineid = 5024
// codeValue = 66617011
