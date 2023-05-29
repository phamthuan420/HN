import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileStatistics from './FileStatistics';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS Bootstrap

const FileTable = ({ directoryId }) => {
  const [files, setFiles] = useState([]);
  const [selectedFileIds, setSelectedFileIds] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`/public-api/directory/${directoryId}/file`, {
          headers: { 'Authorization': 'xxftwft1uud79b0pm7g4ohl0' }
        });
        setFiles(response.data.files);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, [directoryId]);

  const handleClick = (fileId) => {
    setSelectedFileIds((prevSelectedFileIds) => {
      if (prevSelectedFileIds.includes(fileId)) {
        return prevSelectedFileIds.filter((id) => id !== fileId);
      } else {
        return [...prevSelectedFileIds, fileId];
      }
    });
  };

  return (
    <div className="container">
      
      <ul className="list-group">
        {files.map((file) => (
          <li key={file.id} className="list-group-item justify-content-between align-items-center">
            <div className="list-group-item justify-content-between align-items-center d-flex">
                 <span>
                     File ID: {file.id}
                      <br />
                      Tên Báo Giá: {file.name}
                 </span>
                 <button className="btn btn-primary" onClick={() => handleClick(file.id)}>
                   Xem chi tiết
                 </button>
            </div>
            
            {selectedFileIds.includes(file.id) && <FileStatistics fileId={file.id} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileTable;