import React,{ChangeEvent, FormEvent, useState, useEffect} from 'react'
import * as VideoServices from '../../services/VideoServices'
import Video from '../../models/Video';
import {useHistory, useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
interface Params{
    id:string
}
 const VideoForm = () => {
    const history= useHistory();
    const params = useParams<Params>();
    const initialState={title:'',description:'',url:''}
    const [video, setvideo] = useState<Video>(initialState)

    const hanledChange=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setvideo({...video,[e.target.name]:e.target.value})
    }
    const handledSubmit=async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(params.id){
            await VideoServices.updateVideo(params.id,video);
            try {
                toast.success('Updated!')
                history.push('/');
            } catch (error) {
                console.error(error);
            }
        }else{
            await VideoServices.createVideo(video);
            try {
                toast.success('Created!')
                history.push('/');
            } catch (error) {
                console.error(error);
            }
        }

    }

    const getVideo= async(id:string)=>{
        const video = await VideoServices.getVideo(id)
        try {
            setvideo(video.data)
        } catch (error) {
            
        }
    }

    const resetForm = ()=>{
        Array.from(document.querySelectorAll('input')).forEach(input=>{
            input.value = '';
        })
        Array.from(document.querySelectorAll('textarea')).forEach(textarea=>{
            textarea.value='';
        })
    }
   useEffect(() => {
       if(!params.id){
           resetForm();
       }else{ getVideo(params.id);}
   })
    return (
        <div className="row">
        <div className="col-4 offset-md-4">
            <div className="card m-4">
                <div className="card-body ">
                    <form onSubmit={handledSubmit}>
                        <h3 className='text-center text-primary'>New Video</h3>
                        <hr/>

                        <div className='form-group'>
                            <input type='text' name='title' placeholder='WRITE A TITLE' className='form-control' autoFocus onChange={hanledChange} value={video.title} />
                        </div>
                        <div className='form-group'>
                            <input type='url' name='url' placeholder='Insert url' className='form-control' onChange={hanledChange} value={video.url}/>
                        </div>
                        <div className='form-group'>
                            <textarea name="description"  rows={3} className='form-control  ' onChange={hanledChange} placeholder='Write description' value={video.description}></textarea>
                        </div>

                        <div className="d-flex justify-content-center">
                        <button className="btn btn-primary m-1" type="submit">Create</button>
                        <button className="btn btn-primary m-1" type="reset">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default VideoForm;