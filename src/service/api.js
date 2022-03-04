import axios from 'axios';

const url = 'http://localhost:8000';

export const authenticateLogin = async (user) => {
    try {
        return await axios.post(`${url}/login`, user)
    } catch (error) {
        console.log('error while calling login API: ', error);
    }
}

export const authenticateSignup = async (user) => {
    try {
        return await axios.post(`${url}/signup`, user)
    } catch (error) {
        console.log('error while calling Signup API: ', error);
    }
}
export const authenticateOrganization = async (user) => {
    try {
        return await axios.post(`${url}/organization`, user)
    } catch (error) {
        console.log('error while calling Signup API: ', error);
    }
}
export const authenticateOthers = async (user) => {
    try {
        return await axios.post(`${url}/otherDetails`, user)
    } catch (error) {
        console.log('error while calling Signup API: ', error);
    }
}
export const authenticateGetDetail = async (user) => {
    try {
        return await axios.post(`${url}/getDetails`, user)
    } catch (error) {
        console.log('error while calling Signup API: ', error);
    }
}
export const authenticateSetDetail = async (user) => {
    try {
        return await axios.post(`${url}/setDetails`, user)
    } catch (error) {
        console.log('error while calling Signup API: ', error);
    }
}

export const sendInData = async (data) =>{
    try{
        return await axios.post(`${url}/excelToCollection`, data);
    }
    catch(error){
        console.log('error while calling sendinData API: ', error);   
    }
}
export const bringInData = async(data)=>{
    try{
        return await axios.post(`${url}/collectionToExcel`,data);
    }
    catch(error){
        console.log('error while calling bringinData API: ', error)
    }
}
export const sendInDataPerTon = async (file) =>{
    try{
        return await axios.post(`${url}/excelToCollectionPerTon`, file);
    }
    catch(error){
        console.log('error while calling sendinData API: ', error);   
    }
}
export const bringInDataPerTon = async(data)=>{
    try{
        return await axios.post(`${url}/collectionToExcelPerTon`,data);
    }
    catch(error){
        console.log('error while calling bringinData API: ', error)
    }
}
export const sendInDataFreqLanes = async (file) =>{
    try{
        return await axios.post(`${url}/excelToCollectionFreqLanes`, file);
    }
    catch(error){
        console.log('error while calling sendinData API: ', error);   
    }
}
export const bringInDataFreqLanes = async(data)=>{
    try{
        return await axios.post(`${url}/collectionToExcelFreqLanes`,data);
    }
    catch(error){
        console.log('error while calling bringinData API: ', error)
    }
}
export const authenticateForgotPass = async (user) => {
    try {
        return await axios.post(`${url}/forgotpassword`, user)
    } catch (error) {
        console.log('error while calling Signup API: ', error);
    }
}