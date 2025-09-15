import { useState, useRef } from 'react';
import Button from './Button.jsx';

function UploadModal({ isOpen, onClose }) {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Handle file selection (browse)
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);
  };

  // Handle drag-and-drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  // Process files with mock upload
  const processFiles = (newFiles) => {
    const updatedFiles = newFiles.map((file) => ({
      name: file.name,
      status: 'Uploading',
      error: null,
    }));

    setFiles((prev) => [...prev, ...updatedFiles]);

    // Simulate upload with timeout
    updatedFiles.forEach((file, index) => {
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((f, i) =>
            i === prev.length - updatedFiles.length + index
              ? {
                  ...f,
                  status: Math.random() > 0.2 ? 'Success' : 'Error',
                  error: Math.random() > 0.2 ? null : 'Failed to process file',
                }
              : f
          )
        );
      }, 2000); // 2-second delay per file
    });
  };

  // Trigger file input click
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-black/30 backdrop-blur-md rounded-2xl shadow-md max-w-lg w-full p-6 border border-cyan-400/50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-extrabold text-cyan-400 shadow-cyan-500/50 uppercase">
            Upload Contracts
          </h2>
          <button
            onClick={onClose}
            className="text-cyan-200 hover:text-cyan-100 transition-all duration-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Drag-and-Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
            dragActive
              ? 'border-cyan-500 bg-cyan-500/20 ring-2 ring-cyan-500'
              : 'border-cyan-400/50 bg-black/50'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            className="hidden"
            accept=".pdf,.doc,.docx"
          />
          <p className="text-cyan-200/80 mb-2">
            Drag and drop files here or{' '}
            <button
              onClick={handleBrowseClick}
              className="text-cyan-100 hover:text-cyan-200 font-medium transition-all duration-300"
            >
              browse
            </button>
          </p>
          <p className="text-sm text-cyan-200/60">
            Supported formats: PDF, DOC, DOCX
          </p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-extrabold text-cyan-400 shadow-cyan-500/50 mb-2 uppercase">
              Uploaded Files
            </h3>
            <div className="space-y-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-black/50 rounded-lg border border-cyan-400/50 hover:ring-2 hover:ring-cyan-500 transition-all duration-300"
                >
                  <span className="text-sm text-cyan-200">{file.name}</span>
                  <span
                    className={`text-sm ${
                      file.status === 'Uploading'
                        ? 'text-cyan-400'
                        : file.status === 'Success'
                        ? 'text-green-400'
                        : 'text-pink-400'
                    }`}
                  >
                    {file.status}
                    {file.error && `: ${file.error}`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={onClose}
            className="bg-cyan-500/50 text-cyan-200 hover:bg-cyan-600 hover:ring-2 hover:ring-cyan-500 backdrop-blur-md border border-cyan-400/50 rounded-md transition-all duration-300"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;