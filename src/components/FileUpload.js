import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [tags, setTags] = useState('');
  const [category, setCategory] = useState('');  // State for dropdown value
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Generate preview URL
      setError('');
    }
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);  // Update selected category
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile || !category) {
      setError('Please select a file and category');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('tags', tags);
    formData.append('type', category);

    setIsUploading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMzI5OTM0N30.laJzxeeRtZIjbY9vl1QWpV4Hpwihyoo8ho0hFtci0UQ'

        },
      });

      console.log(response.data);
      setIsUploading(false);
      alert('File uploaded successfully!');
    } catch (err) {
      console.error(err);
      setError('Error uploading file');
      setIsUploading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Upload File</h2>

      <div
        className="file-drop-zone"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <p>Drag & Drop Your File Here</p>
        <p>OR</p>
        <input
          type="file"
          onChange={handleFileChange}
          accept="image/*,video/*"
          className="file-input"
        />
      </div>

      {error && <p className="error">{error}</p>}

      {previewUrl && selectedFile && (
        <div className="file-preview">
          {selectedFile.type.startsWith('image') ? (
            <img src={previewUrl} alt="Preview" className="preview-image" />
          ) : (
            <video controls className="preview-video">
              <source src={previewUrl} type={selectedFile.type} />
            </video>
          )}
        </div>
      )}

      <div className="file-info">
        <label>File Name:</label>
        <p>{selectedFile ? selectedFile.name : 'No file selected'}</p>

        <label>Tags:</label>
        <input
          type="text"
          placeholder="Enter tags (comma separated)"
          value={tags}
          onChange={handleTagsChange}
          className="tags-input"
        />

        {/* Dropdown for selecting category */}
        <label>Category:</label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="category-select"
        >
          <option value="">Select a category</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        className="upload-button"
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Upload File'}
      </button>
    </div>
  );
};

export default FileUpload;
