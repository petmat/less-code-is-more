const faunadb = require('faunadb')

const q = faunadb.query
const serverClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
})

const handler = async event => {
  const data = {
    remoteAddress: event.headers['client-ip'],
    userAgent: event.headers['user-agent'],
    time: new Date().toISOString(),
  }
  try {
    const response = await serverClient.query(
      q.Create(q.Collection('visits'), { data })
    )
    console.log('success')
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    }
  } catch (error) {
    console.log('error', error)
    return {
      statusCode: 400,
      body: JSON.stringify(error),
    }
  }
}

module.exports = { handler }
