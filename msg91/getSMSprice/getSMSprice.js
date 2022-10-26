const fetch = require('node-fetch')

const handler = async function () {
  try {
    const response = await fetch('https://control.msg91.com/action_layer.php?action=511&request=pricing_details&wallet=1&country=india&currency=INR&noOfSMS=5000')
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      let str = response.statusText;
      let jsn = str.slice(1,-1);
      jsn = JSON.stringify(jsn);
      return { statusCode: response.status, body: jsn }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data }),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      //body: JSON.stringify({ msg: error.message }),
      body: JSON.stringify({ msg: response.text() }),
    }
  }
}

module.exports = { handler }
