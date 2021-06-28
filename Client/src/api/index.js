import axios from 'axios'

export var baseURL = "" 
//console.log(process.env.NODE_ENV)
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    baseURL = "http://localhost:8000";
    console.log("dev", baseURL)
} else {
    // production code
    baseURL = "https://safe-tor-13443.herokuapp.com";
    console.log("prod", baseURL)
}


const api = axios.create({
    baseURL: baseURL+'/api',
})

export const signup = payload => api.post('/signup', payload)
export const signin = payload => api.post('/signin', payload)
export const signout = id => api.get(`/signout`)
export const fileUpload = (payload, headers) => api.post(`/upload`, payload, headers )
export const verifyJWT = (payload) => api.post('/verifyJWT', payload)
export const uploadAssignFile = (payload, headers) => api.post('/uploadAssignFile', payload, headers)
export const downloadAgreement = () => api.get(`/downloadAgreement`)
export const assignment = payload => api.post('/assignment', payload)


const apis = {
    baseURL,
    signup,
    signin, 
    signout,
    fileUpload,
    verifyJWT,
    uploadAssignFile,
    downloadAgreement,
    assignment,
}

export default apis
