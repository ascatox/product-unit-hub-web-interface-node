import smartBay from './ProductUnitWebInterface'
import winston from 'winston'

const port = process.env.PORT || 3000


smartBay.listen(port, (err) => {
  if (err) {
    return console.log(err)
  }

  return console.log(`server is listening on ${port}`)
})
