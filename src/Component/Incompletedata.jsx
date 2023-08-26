import React, { useState,useEffect } from 'react';
import Followers from './Followers';
import { FaClipboardList, FaRegCalendar } from 'react-icons/fa';
import useMenu from '../hooks/useMenu';
import { useQuery } from 'react-query';
const Incompletedata = ({item}) => {
    //const [menu,loading, setMenu] = useMenu();
    //console.log(menu);
    const {clientname,clientpicture,followers,followers_info,description,messages,files,date,Suppliername,Supplierpicture,status,id} = item;
    const words = description.split(" ");
    const shortenedDescription = words.slice(0, 6).join(" ");
    const data = followers_info.slice(0,2);
    const [selectedFiles, setSelectedFiles] = useState([]);


    const { data: menu, refetch: refetchMenu } = useQuery(['menu', Date.now()], async () =>  {
        const response = await fetch('http://localhost:2000/menu');
        const newData = await response.json();
        return newData;
      });


    const  handleFileSelection = async (event) => {
        setSelectedFiles(Array.from(event.target.files));
        //console.log(selectedFiles.length);
        updateFilesOnBackend(id,selectedFiles.length);
    }

    useEffect(() => {
        //console.log('Selected files length:', selectedFiles.length);
        if (selectedFiles.length > 0) {
          updateFilesOnBackend(id, selectedFiles.length);
        }
      }, [selectedFiles, id]);
  const numberoffiles = files;
  
    const updateFilesOnBackend = async (id, fileCount) => {
        const updateData = {
            fileCount: numberoffiles + fileCount
        };
        console.log(updateData);
    
        fetch(`http://localhost:2000/files/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update files on the backend');
            }
            return response.json();
        })
        .then(updatedFileData => {
            console.log('Files updated:', updatedFileData);
            // fetch(`http://localhost:2000/files/${id}`)
            //     .then(response => response.json())
            //     .then(newData => {
            //         console.log('New Data:', newData);
                    

            //         setMenu(prevMenu => ({
            //             ...prevMenu,
            //             ...newData
            //           }));
                      

            //         //setMenu(newData);
            //         console.log(menu);
                    
            //     })
            //     .catch(error => {
            //         console.error('Error fetching new data:', error);
            //     });
            refetchMenu().then(() => {
                console.log('Menu data refetched.');
            })
        })
        .catch(error => {
            console.error('Error updating files:', error);
        });
    }

    
        
        
        
    return (
        <div className='mx-10'>
            <div className="card w-full bg-base-100 shadow-xl">
               <div className="card-body">
                <div className='flex justify-between'>
                    <div className='flex justify-items-center'>
                        <img className='h-7 w-7 rounded-full mr-1' src={clientpicture} alt="" />
                        <h1 className='font-semibold'>{clientname}</h1>
                    </div>
                    <div className='flex'>
                        <img className='h-7 w-7 rounded-full mr-1' src={Supplierpicture} alt="" />
                        <h1 className='font-semibold'>{Suppliername}</h1>
                    </div>
                </div>
                <div className='flex  justify-between mt-5'>
                <div className='flex'>
                    <div>
                        <img  className='h-4 w-4 mr-1 mt-1' src="books.png" alt="" />
                    </div>
                    <div>
                        <small>{shortenedDescription}...</small>
                    </div>
                </div>
                
                    <div className='flex bg-base-300'>
                    <div className='mt-1'>
                         <FaClipboardList /> 
                    </div>
                    <div>
                        <h1>1/2</h1>
                    </div>
                    </div>
                </div>
    

    <div className='flex justify-between mt-5'>
          {
            data.map(item => 
                    <Followers
                key={item._id}
                item={item}
            ></Followers>
            )
          }
         <div className='bg-base-300 rounded-3xl px-1'>
         <small>{followers > 1 ? '1+' : followers}</small>
         </div>
         <div className='h-7 w-7 rounded-full'>
            <img src="chat_4232884.png" alt="" />
         </div>
         <div>
            {messages}
         </div>
         <div className='h-7 w-7 rounded-full'>
         <input type="file" id="files" name="files" multiple onChange={handleFileSelection}
                            style={{ display: 'none' }}/>
                        <img
                            src="noun-attachment-1075053.png"
                            alt=""
                            onClick={() => {
                                const fileInput = document.getElementById(`files`);
                                fileInput.click();
                            }}
                        />
         </div>
         <div>
            {files}
         </div>
         <div className='mt-1'>
            <FaRegCalendar/>
         </div>
         <div>
            {date}
         </div>
    </div>
  </div>
</div>
        </div>
    );
};

export default Incompletedata;