import { API_BASE } from "../../../env";
import { Post } from "../requests";

export async function login(data)
{
    const response=await Post(API_BASE+'/auth/adminLogin',data)
    if (response.status===201)
        {
            return response.data
        }
    else if (response.status===404)
        {
            return {email:"Account Not Found"}
        }
    else if (response.status===401)
        {
            return {password:"Invalid Password"}
        }
    else
    {
        console.log(response)
        return false
    }
}
