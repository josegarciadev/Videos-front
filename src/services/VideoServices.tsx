import axios from 'axios'
import Video from '../models/Video'
const API='http://localhost:4000/api/video/';
export const getVideos=async()=>{
    return await axios.get<Video[]>(API);

}
export const createVideo=async(video:Video)=>{
    return await axios.post<Video>(API,video)
}

export const getVideo=async(id:String)=>{
    return await axios.get<Video>(`${API}/one/${id}`)
}

export const deleteVideo= async(id:String)=>{
    return await axios.delete<Video>(`${API}/${id}`)
}
export const updateVideo= async(id:string, video:Video)=>{
    return await axios.put<Video>(`${API}/${id}`,video);
}