const hubSpot = require("../models/hubSpot");
const hubSpotObject = "contacts";

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const upsertContact = async (req, res, next) => {
    try {
        const body = req.body;
        if (!body || Array.isArray(body)) {
            res.status(400).send({
                message: "Invalid body: must be an object and cannot be an array."
            });
            return;
        }

        const { properties, associations } = body;
        if (properties && Object.keys(properties).length) {
            const { email } = properties;
            if (email) {
                if (!validateEmail(email)) {
                    res.status(400).send({
                        message: "Invalid email format."
                    });
                    return;
                }

                const createdRecord = await hubSpot.createObject(hubSpotObject, properties, associations);
                res.send(createdRecord);
            } else {
                res.status(400).send({
                    message: "Email is required."
                });
            }
        } else {
            res.status(400).send({
                message: "Body cannot be null or empty."
            });
        }
    } catch (error) {
        if (error?.response?.status < 500) {
            res.status(error?.response?.status).send(error?.response?.data);
        } else {
            console.error(error);
            res.status(500).send({
                message: "Internal Server Error"
            });
        }
    }
};

const listContacts = async (req, res, next) => {
    try {
        const queryParams = req.query;
        const allowedParams = ["after", "properties", "limit", "propertiesWithHistory", "associations", "archived"];
        const filteredParams = Object.keys(queryParams)
            .filter((key) => allowedParams.includes(key))
            .reduce((obj, key) => {
                obj[key] = queryParams[key];
                return obj;
            }, {});

        const listedRecords = await hubSpot.listObject(hubSpotObject, filteredParams);
        res.send(listedRecords);
    } catch (error) {
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
            res.status(error?.response?.status).send(error?.response?.data);
        } else {
            console.error(error);
            res.status(500).send({
                message: "Internal Server Error"
            });
        }
    }
};

const getContactByEmail = async (req, res, next) => {
    try {
        const params = req.params;
        const queryParams = req.query;
        let { properties } = queryParams;
        const { email } = params;

        if (!validateEmail(email)) {
            res.status(400).send({
                message: "Invalid email format."
            });
            return;
        }

        const filterGroups = [
            {
                filters: [
                    {
                        propertyName: "email",
                        operator: "EQ",
                        value: email
                    }
                ]
            },
            {
                filters: [
                    {
                        propertyName: "hs_additional_emails",
                        operator: "CONTAINS_TOKEN",
                        value: email
                    }
                ]
            }
        ];

        properties = [...(properties?.split(",") ?? []), "hs_additional_emails", "email"];
        const searchResults = await hubSpot.searchObject(hubSpotObject, filterGroups, properties);
        res.send(searchResults);
    } catch (error) {
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
            res.status(error?.response?.status).send(error?.response?.data);
        } else {
            console.error(error);
            res.status(500).send({
                message: "Internal Server Error"
            });
        }
    }
};

module.exports = {
    upsertContact,
    listContacts,
    getContactByEmail
};