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
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios error"+error)
      } else {
        console.log('Non-Axios error:'+ error);
      }
    }
}


export  async function Get(path,token)
{   
    try{
        const head = {
            headers: {Authorization: `Bearer ${token}`},
          };
     const response = await axios.get(
        path,
        head
      );
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios error"+error)
      } else {
        console.log('Non-Axios error:'+ error);
      }
    }
    
}


