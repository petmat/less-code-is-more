const faunadb = require('faunadb')

const q = faunadb.query
const adminClient = new faunadb.Client({
  secret: process.env.FAUNADB_ADMIN_SECRET,
})

const handler = async () => {
  try {
    const response = await adminClient.query(
      q.CreateDatabase({ name: 'lesscodeismore' })
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
