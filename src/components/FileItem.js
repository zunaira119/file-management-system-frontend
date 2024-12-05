import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

const FileItem = ({ file }) => {
    const [tags, setTags] = useState(file.tags || []);

    const handleAddTag = (e) => {
        if (e.key === 'Enter') {
            setTags([...tags, e.target.value]);
            e.target.value = ''; // clear input
            // Optionally, update the backend with new tags
        }
    };
const handleView = async (e) => {
    alert('here');
    try{
    const response = await axios.get(`http://localhost:5000/file/${file.id}`);
    }catch (error){
        console.log(error);
    }
}
    return (

        <div className="file-item">


            <div className="file-preview" >
                {file?.type?.startsWith('image') ? (
                    <img src={file?.shareableLink} alt={file?.name} onClick={handleView} />
                ) : (
                    <video src={file?.shareableLink} controls onClick={handleView}/>
                )}
            </div>
            <div className="file-info">
                <h3>{file?.name}</h3>
                <p>Tags: {tags}</p>
                <h4>Views: {file?.views}</h4>
                {/* <input type="text" placeholder="Add a tag" onKeyDown={handleAddTag} /> */}
                <p><a href={file?.shareableLink}>Share Link</a></p>
            </div>

        </div>
    );
};

export default FileItem;
