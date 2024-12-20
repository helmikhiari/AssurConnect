import axios from "axios";

export  async function Post(path,data,token)
{    
    try{
      const head = {
        headers: {Authorization: `Bearer ${token}`},
      };
     const response = await axios.post(
        path,
        data,
        head
      );
      return response
    } catch (error) {
      return error.response
    }
}


export async function Get(path,token)
{   
    try{
        const head = {
            headers: {Authorization: `Bearer ${token}`},
          };
     const response = await axios.get(
        path,
        head
      );
      
      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios error"+error)
        return error.response
      } else {
        
        console.log('Non-Axios error:'+ error);
      }
    }
    
}

export async function Patch(path,data,token)
{    
    try{
      const head = {
        headers: {Authorization: `Bearer ${token}`},
      };
     const response = await axios.patch(
        path,
        data,
        head
      );  
      return response
    } catch (error) {
      return error.response
    }
}

export async function Delete(path,token)
{    
    try{
      const head = {
        headers: {Authorization: `Bearer ${token}`},
      };
     const response = await axios.delete(
        path,
        head
      );
      return response
    } catch (error) {
      return error.response
    }
}