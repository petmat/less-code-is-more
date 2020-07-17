const faunadb = require('faunadb')

const q = faunadb.query
const serverClient = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
})

const handler = async () => {
  try {
    const response = await serverClient.query(
      q.CreateCollection({ name: 'visits' })
    )
    console.log('success', response)
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
