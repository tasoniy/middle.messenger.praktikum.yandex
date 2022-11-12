//in packege.json "start": "npm run build && node ./server.js"
const path = require('path');
const express = require('express');


const app = express();
const PORT = 3000;


// app.set('view engine', 'hbs');

// app.get('/', (req, res) => {
//   res.render('index.hbs')
// })

app.use(express.static(path.resolve(__dirname, 'dist')));




app.listen(PORT, () => {
  console.log(`Listen port: ${PORT}`);
});
