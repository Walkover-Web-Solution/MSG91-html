const fetch = require('node-fetch')

const handler = async function () {
  try {
    const response = await fetch('https://control.msg91.com/action_layer.php?action=511&request=pricing_details&wallet=1&country=india&currency=INR&noOfSMS=5000')
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText }
    }
    const data = await response.json()

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: data.joke }),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
