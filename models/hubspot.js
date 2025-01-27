const { axiosRequest } = require("../services/request.js");
const HS_TOKEN_01 = process.env.HS_ACCESS_TOKEN_01;
const HS_TOKEN_02 = process.env.HS_ACCESS_TOKEN_02;
const HS_TOKEN_03 = process.env.HS_ACCESS_TOKEN_03;
const EMPTY_OBJECT = {};
let accesTokenIndex = 0;

const getAccessToken = () => {
    const accessTokens = [
        HS_TOKEN_01,
        HS_TOKEN_02,
        HS_TOKEN_03
    ];
    accesTokenIndex++;
    if (accesTokenIndex < accessTokens.length) {
        return accessTokens[accesTokenIndex];
    } else {
        accesTokenIndex = 0;
        return accessTokens[accesTokenIndex];
    }
};

const createObject = async (objectType, properties, associations) => {
    const method = "post";
    const url = `https://api.hubapi.com/crm/v3/objects/${objectType}`;
    const data = { properties, associations };
    const headers = {
        authorization: `Bearer ${getAccessToken()}`,
        "content-type": "application/json",
    };
    const response = await axiosRequest(method, url, data, headers);
    return response
};

const updateObject = async (objectType, id, properties) => {
    const method = "patch";
    const url = `https://api.hubapi.com/crm/v3/objects/${objectType}/${id}`;
    const data = { properties };
    const headers = {
        authorization: `Bearer ${getAccessToken()}`,
        "content-type": "application/json",
    };
    const response = await axiosRequest(method, url, data, headers);
    return response
};

const getObject = async (objectType, id, properties) => {
    const method = "get";
    const url = `https://api.hubapi.com/crm/v3/objects/${objectType}/${id}?properties=${properties}`;
    const headers = {
        authorization: `Bearer ${getAccessToken()}`,
        "content-type": "application/json",
    };
    const response = await axiosRequest(method, url, EMPTY_OBJECT, headers);
    return response
};

const listObject = async (objectType, params) => {
    const method = "get";
    let url = `https://api.hubapi.com/crm/v3/objects/${objectType}/?`;
    for (const key in params) {
        if (params[key]) { // HubSpot API assumes false value of boolean params if empty
            url = `${url}${key}=${params[key]}&`
        }
    }
    const headers = {
        authorization: `Bearer ${getAccessToken()}`,
        "content-type": "application/json",
    };
    const response = await axiosRequest(method, url, EMPTY_OBJECT, headers);
    return response
};

const createObjectBatch = async (objectType, inputs) => {
    const method = "post";
    const url = `https://api.hubapi.com/crm/v3/objects/${objectType}/batch/create`;
    const data = { inputs };
    const headers = {
        authorization: `Bearer ${getAccessToken()}`,
        "content-type": "application/json",
    };
    const response = await axiosRequest(method, url, data, headers);
    return response
};


const searchObject = async (objectType, filterGroups, properties, after) => {
    const method = "post";
    const url = `https://api.hubapi.com/crm/v3/objects/${objectType}/search`;
    const data = {
        filterGroups,
        properties,
        limit: 100,
        after: after || 0,
    };
    const headers = {
        authorization: `Bearer ${getAccessToken()}`,
        "content-type": "application/json",
    };
    const response = await axiosRequest(method, url, data, headers);
    return response?.results;
};

const createAssociation = async (objectType, objectId, toObjectType, toObjectId, associations) => {
    const method = "put";
    const url = `https://api.hubapi.com/crm/v4/objects/${objectType}/${objectId}/associations/${toObjectType}/${toObjectId}`;
    const data = associations;
    const headers = {
        authorization: `Bearer ${getAccessToken()}`,
        "content-type": "application/json",
    };
    const response = await axiosRequest(method, url, data, headers);
    return response;
};

const getAssociations = async (fromObject, toObject, id, after) => {
    const method = "get";
    const url = `https://api.hubapi.com/crm/v4/objects/${fromObject}/${id}/associations/${toObject}?after=${after}&limit=500`;
    const data = {};
    const headers = {
        authorization: `Bearer ${getAccessToken()}`,
        "content-type": "application/json",
    };
    const response = await axiosRequest(method, url, data, headers);
    return response;
};

const getPropertyInfo = async (objectType, propertyName) => {
    const method = "get";
    const url = `https://api.hubapi.com/crm/v3/properties/${objectType}/${propertyName}`;
    const data = {};
    const headers = {
        authorization: `Bearer ${getAccessToken()}`,
        "content-type": "application/json",
    };
    const response = await axiosRequest(method, url, data, headers);
    return response;
};

const updatePropertyInfo = async (objectType, propertyName, propertyInfo) => {
    const method = "patch";
    const url = `https://api.hubapi.com/crm/v3/properties/${objectType}/${propertyName}`;
    const data = propertyInfo;
    const headers = {
        authorization: `Bearer ${getAccessToken()}`,
        "content-type": "application/json",
    };
    const response = await axiosRequest(method, url, data, headers);
    return response;
};

const getPropertiesInfo = async (objectType) => {
    const method = "get";
    const url = `https://api.hubapi.com/crm/v3/properties/${objectType}`;
    const data = {};
    const headers = {
        authorization: `Bearer ${getAccessToken()}`,
        "content-type": "application/json",
    };
    const response = await axiosRequest(method, url, data, headers);
    return response;
};

const getOwnerById = async (id) => {
    const method = "get";
    const url = `https://api.hubapi.com/crm/v3/owners/${id}?idProperty=id`;
    const headers = {
        authorization: `Bearer ${getAccessToken()}`,
        "content-type": "application/json",
    };
    const response = await axiosRequest(method, url, EMPTY_OBJECT, headers);
    return response;
};

module.exports = { createObject, updateObject, searchObject, createAssociation, getAssociations, createObjectBatch, getPropertyInfo, getObject, getPropertiesInfo, getOwnerById, updatePropertyInfo, listObject };