const axios = require("axios");

const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhZGl0eWFwdW5kaXI1MDJAZ21haWwuY29tIiwiZXhwIjoxNzUyNTU3MDE4LCJpYXQiOjE3NTI1NTYxMTgsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI3MTcxZWVhMS0zYmE3LTQxYzQtYmMzZS1iNzYyY2M2YTQ2ODciLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJhZGl0eWEgIHB1bmRpciIsInN1YiI6IjAxYjc4NDg4LWIxYTUtNGE0OS04ZWE3LTU0ZDkzYjY0NDVkMSJ9LCJlbWFpbCI6ImFkaXR5YXB1bmRpcjUwMkBnbWFpbC5jb20iLCJuYW1lIjoiYWRpdHlhICBwdW5kaXIiLCJyb2xsTm8iOiIyMjE4MjI2IiwiYWNjZXNzQ29kZSI6IlFBaERVciIsImNsaWVudElEIjoiMDFiNzg0ODgtYjFhNS00YTQ5LThlYTctNTRkOTNiNjQ0NWQxIiwiY2xpZW50U2VjcmV0IjoiWHRuQ1FIS3daVEFLeEJIVCJ9.8Mwx_cNioOTYSPOfKCKeVfC-fF2TfJLPw7iJfHtK024";

function log(stack, level, packageName, message) {
  if (!accessToken) {
    console.error("Access token is missing!");
    return;
  }

  axios
    .post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      console.log("Log sent successfully:", response.data);
    })
    .catch((err) => {
      console.error("Logging error:", err.response?.data || err.message);
    });
}

module.exports = log;
