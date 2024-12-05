import React, { useState } from 'react';
import FileUpload from './FileUpload';
import FileList from './FileList';

const Dashboard = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleUploadSuccess = (file) => {
        setUploadedFiles((prevFiles) => [...prevFiles, file]);
    };

    return (
        <div className="dashboard-container">
            <h2>Upload Your Files</h2>
            <FileUpload onUploadSuccess={handleUploadSuccess} />
            <FileList />


            {/* <div className="uploaded-files">
        <h3>Uploaded Files</h3>
        {uploadedFiles.length > 0 ? (
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        ) : (
          <p>No files uploaded yet.</p>
        )}
      </div> */}
        </div>
    );
};

export default Dashboard;
