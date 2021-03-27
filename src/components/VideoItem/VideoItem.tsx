import React from 'react'
import Video from '../../models/Video'
import ReactPlayer from 'react-player'
import * as VideoServices from '../../services/VideoServices'
import {useHistory} from 'react-router-dom'
import './videoItem.css';
import {toast} from 'react-toastify'
interface Props{
    video:Video
    getVideos:()=>void;
}

const VideoItem = ({video,getVideos}:Props) => {
    const history= useHistory();

    const hanledDelete=async(id:String)=>{
      await VideoServices.deleteVideo(id);
        try{
            toast.warning('Deleted!')
           getVideos();
           
        }catch(e){
            console.error(e)
        }   
    }
    return (
        <div className='col-md-4'>
            <div className='card-body m-4 pt-4 Videos'>
                <div className='d-flex justify-content-between title'>
                    <h3 onClick={()=>video._id && history.push(`/update/${video._id}`)}>{video.title}</h3>
                    <span className="text-danger p-1" onClick={()=>video._id && hanledDelete(video._id)}>X</span>
                </div>
                <ReactPlayer url={video.url} width='100%' height='70%'/>
                <p className='des'>{video.description}</p>
            </div>
        </div>
    )
}
export default VideoItem;