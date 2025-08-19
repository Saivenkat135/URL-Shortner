const validUrl = require('valid-url');

const validateUrl = (req, res, next) => {
  const { url } = req.body;
  if (!url || !validUrl.isUri(url)) {
    return res.status(400).json({ error: "Invalid URL format" });
  }
  next();
};

module.exports = validateUrl;
