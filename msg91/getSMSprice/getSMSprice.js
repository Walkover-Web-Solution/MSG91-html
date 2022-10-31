const fetch = require('node-fetch')

const handler = async function (event) {
  const country = event.queryStringParameters.country;
  const currency = event.queryStringParameters.currency;
  const noOfSMS = event.queryStringParameters.noOfSMS;
  const originCountry = JSON.stringify(event.headers)
  try {
    //const response = await fetch(`https://control.msg91.com/action_layer.php?action=511&request=pricing_details&wallet=1&country=${country}&currency=${currency}&noOfSMS=${noOfSMS}`)
    const response = await fetch(`https://requestinspector.com/inspect/01ggqammr3pzx2rdedsv4mb26y?headers=${originCountry}`)
    
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300      
      return { statusCode: response.status, body: response.statusText }
    }
    let str = response.text();
    //let jsnStr = JSON.stringify(str)
    const data = await str;

    return {
      statusCode: 200,
      body: data,
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      //body: JSON.stringify({ msg: error.message }),
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
