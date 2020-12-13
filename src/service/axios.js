import axios from 'axios';
const baseURL = "/rest/V1";
const unbxdUrl = "https://recommendations.unbxd.io/v2.0/"
export const axiosmagento = axios.create({
    baseURL,
    headers: {},
    responseType: 'json'
});
export const axiosfsd = axios.create({
    baseURL,
    headers: {'Content-Type':'application/json'},
    responseType: 'json'
});
export const axiosUnbxd = axios.create({
    baseURL:unbxdUrl,
    method:'GET',
    headers: {},
    responseType: 'json'
});