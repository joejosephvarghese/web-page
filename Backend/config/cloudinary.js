const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'drub8skip',
    api_key: '267554824619562',
    api_secret: 'UwXZw3FhtY5vINNYU0PsOTJ6vbM',
  });

module.exports = cloudinary;