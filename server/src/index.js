const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const valueSetRoutes = require('./routes/valuesetRoutes'); 
const codeSystemRoutes = require('./routes/codeSystemRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));  
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// Use routes defined in valuesetRoutes.js and codeSystemRoutes.js
app.use('/api', valueSetRoutes); 
app.use('/api', codeSystemRoutes); // Add the new routes for CodeSystems

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
