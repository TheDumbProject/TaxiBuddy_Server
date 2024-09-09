const jwt = require('jsonwebtoken');
require('dotenv').config();

// const secret = process.env.SUPABASE_SECRET;

const secret =
  '4U7bvJVkuep7bLX8e+Y/VBzhgtADOcN1Ipn/9mGSDZtidy0i19wMBXquuOxGAfFEJMzRi095Oq9LUpF1n8hrEg==';

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  //   console.log(token);
  if (!token) {
    return res.status(403).send('Access denied');
  }
  try {
    const decodedToken = jwt.verify(token, secret);

    // const accessToken =
    //   'eyJhbGciOiJIUzI1NiIsImtpZCI6ImEzbG5NeDYwSzM5cVVUUDkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2lqbXVnbHhmdHl1Y3V6c3Nsa25pLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI2MTY1NTQzMi01ODljLTQ3NmEtYWVmMS05YmNiZGI2NWM3YTEiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzM1Mzg5Mzg5LCJpYXQiOjE3MjUzODU3ODksImVtYWlsIjoiYW5zaDIzYmNzMTUxQGlpaXRrb3R0YXlhbS5hYy5pbiIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZ29vZ2xlIiwicHJvdmlkZXJzIjpbImdvb2dsZSJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJfdXJsIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSlhUU3RORXRTQW5UVHdGdERjRm5Fa1hfTFUtZFVEVzlvaG95Yi1GeDdINlVmRDNnPXM5Ni1jIiwiY3VzdG9tX2NsYWltcyI6eyJoZCI6ImlpaXRrb3R0YXlhbS5hYy5pbiJ9LCJlbWFpbCI6ImFuc2gyM2JjczE1MUBpaWl0a290dGF5YW0uYWMuaW4iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiZnVsbF9uYW1lIjoiQU5TSCBSQVNUT0dJIC1JSUlUSyIsImlzcyI6Imh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbSIsIm5hbWUiOiJBTlNIIFJBU1RPR0kgLUlJSVRLIiwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSlhUU3RORXRTQW5UVHdGdERjRm5Fa1hfTFUtZFVEVzlvaG95Yi1GeDdINlVmRDNnPXM5Ni1jIiwicHJvdmlkZXJfaWQiOiIxMDU0Nzg4MTkzODYwOTI2NjMyMzAiLCJzdWIiOiIxMDU0Nzg4MTkzODYwOTI2NjMyMzAifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJvYXV0aCIsInRpbWVzdGFtcCI6MTcyNTM4NTc4OX1dLCJzZXNzaW9uX2lkIjoiZWNlZGM5OTAtOGVhMi00MTNjLWI0YjQtNDBmMTExOTRkMmI1IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.u0EdkTYtgtN7B95pzdqo-mSNbeIneyqe757XpOGABtU';
    // const secret =
    //   '4U7bvJVkuep7bLX8e+Y/VBzhgtADOcN1Ipn/9mGSDZtidy0i19wMBXquuOxGAfFEJMzRi095Oq9LUpF1n8hrEg==';
    // const decoded = jwt.verify(accessToken, secret);
    console.log(decodedToken);
    console.log('User verified');
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send(error);
  }
};

module.exports = verifyToken;
