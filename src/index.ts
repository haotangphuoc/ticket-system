import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

if (!url) {
  console.log("The url does not exists");
}
else {
  mongoose.connect(url);
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
