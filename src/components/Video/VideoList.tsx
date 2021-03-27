import React,{useState,useEffect} from 'react'
import Video from '../../models/Video'
import * as VideoServices from '../../services/VideoServices'
import VideoItem from '../VideoItem/VideoItem'
 const VideoList = () => {
    
    const [videos, setVideos] = useState<Video[]>([])

    const getVideos=async()=>{
        const res = await VideoServices.getVideos();
        try{
            setVideos(res.data);
        }catch(e){
            console.error(e)
        }
    }
    useEffect(() => {
        getVideos();
    }, [])
    return (
        <div className='row'>
            {
            videos.map(video=><VideoItem key={video._id} video={video} getVideos={getVideos}/>)
            
            }
        </div>
    )
}

export default VideoList;