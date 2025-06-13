import axios from "axios";
import type { ContentType } from "../Types/contentType";




export const loadData = async (url: string): Promise<ContentType[]> => {
    const response = await axios.get(url, {
        headers: {
            Authorization: localStorage.getItem("token")
        }

    });

    console.log(response);

    return response.data.content;
}



