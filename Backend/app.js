const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const productRoutes=require('./routes/products');
const postsRoutes=require('./routes/posts');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: [
      "https://agri-link-start-up-code-base.vercel.app/",
      "http://localhost:3000",
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  })
);

// Use routes
app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', postsRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
