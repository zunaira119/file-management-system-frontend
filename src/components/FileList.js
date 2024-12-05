import React, { useState, useEffect } from 'react';
import FileItem from './FileItem';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Row, Col } from 'react-bootstrap';



const FileList = () => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        // Fetch files on component mount
        const fetchFiles = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (token) {
                    const response = await axios.get('http://localhost:5000/files', {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMzI5OTM0N30.laJzxeeRtZIjbY9vl1QWpV4Hpwihyoo8ho0hFtci0UQ'
                        }
                    });
                    setFiles(response.data);

                } else {
                    const response = await axios.get('http://localhost:5000/get/files');
                    setFiles(response.data);
                }

            } catch (error) {
                console.error('Error fetching files', error);
            }
        };
        fetchFiles();
    }, []);

    const handleDragEnd = (result) => {
        const { destination, source } = result;
        if (!destination) return;

        const reorderedFiles = [...files];
        const [removed] = reorderedFiles.splice(source.index, 1);
        reorderedFiles.splice(destination.index, 0, removed);

        setFiles(reorderedFiles);
        // Optionally send the new order to the server
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="files-list">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {/* <Row> */}
                        <div class="file-grid">
                            {files.map((file, index) => (
                                <div class="file-item">

                                    <Draggable key={file?.id} draggableId={file?.id} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <FileItem file={file} />
                                            </div>
                                        )}
                                    </Draggable>
                                </div>
                            ))}
                        </div>
                        {/* </Row> */}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default FileList;
