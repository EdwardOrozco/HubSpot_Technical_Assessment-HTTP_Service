const axios = require("axios");

const axiosRequest = async (method, url, data, headers) => {
    const maxRetries = 5;
    const retryDelay = 1000;
    for (let retryCount = 0; retryCount <= maxRetries; retryCount++) {
        try {
            const response = await axios({
                method: method,
                url: url,
                data: data,
                headers: headers,
            });
            return response.data;
        } catch (err) {
            if (err.response && err.response.status >= 429 && retryCount < maxRetries) {
                const delay = retryDelay * (retryCount + 1);
                console.log("Rate limit exceeded or Issue with the Server. Retrying in " + delay + "ms...");
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
            else {
                throw err;
            }
        }
    }
};

module.exports = { axiosRequest };