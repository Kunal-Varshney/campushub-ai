import axios from "axios";


// Backend API URL
const BASE_URL = "http://localhost:5000/api";


const api = axios.create({

  baseURL: BASE_URL,

  headers: {
    "Content-Type": "application/json",
  },

});



// JWT Token Attach

api.interceptors.request.use(

(config)=>{


const token = localStorage.getItem("token");


if(token){

config.headers.Authorization = `Bearer ${token}`;

}


return config;


},


(error)=>Promise.reject(error)

);





// ===============================
// GET ADMIN STATS
// ===============================

export const getAdminStats = async()=>{

try{


const response = await api.get(
"/admin/stats"
);


return response.data;



}catch(error){


console.error(
"Admin Stats Error:",
error.response?.data || error.message
);



return {

success:false,

message:
error.response?.data?.message ||
"Failed to load stats",


stats:{
totalUsers:0,
students:0,
admins:0,
totalNotes:0
}

};


}

};






// ===============================
// GET ALL USERS
// ===============================

export const getUsers = async()=>{

try{


const response = await api.get(
"/admin/users"
);



return response.data;



}catch(error){


console.error(
"Users Error:",
error.response?.data || error.message
);



return {

success:false,

message:
error.response?.data?.message ||
"Failed to load users",


users:[]

};


}

};







// ===============================
// GET ALL NOTES
// ===============================

export const getNotes = async()=>{

try{


const response = await api.get(
"/admin/notes"
);



return response.data;



}catch(error){


console.error(
"Notes Error:",
error.response?.data || error.message
);



return {

success:false,

message:
error.response?.data?.message ||
"Failed to load notes",


notes:[]

};


}

};






// ===============================
// DELETE USER
// ===============================

export const deleteUser = async(id)=>{


try{


const response = await api.delete(
`/admin/users/${id}`
);



return response.data;



}catch(error){


console.error(
"Delete User Error:",
error.response?.data || error.message
);



return {

success:false,

message:
error.response?.data?.message ||
"Failed to delete user"

};


}

};



export default api;