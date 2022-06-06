const axios = require("axios");

const playgroundRoutes = async (req, res) => {
  try {
    const { script, language, versionIndex, stdin } = req.body;
    const result = await axios.post("https://api.jdoodle.com/v1/execute", {
      script,
      language,
      versionIndex,
      stdin,
      clientId: "238b1b046fda7e518ed332c1945cfaed",
      clientSecret:
        "8f67dd97e7069d94895b08b91d1a90f6e36e7a457ebdf3baebfc34fb3c237271",
    });
    res.status(200).json(result.data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = playgroundRoutes;
