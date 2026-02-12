import React, { useCallback } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import Card from '../ui/Card';

const ResumeUpload = ({ file, setFile }) => {
    const onDrop = useCallback((e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'application/pdf') {
            setFile(droppedFile);
        } else {
            alert("Please upload a PDF file.");
        }
    }, [setFile]);

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        }
    };

    return (
        <Card className="h-full">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="text-blue-500" />
                Upload Resume
            </h2>

            {!file ? (
                <div
                    className="border-2 border-dashed border-gray-600 rounded-xl h-64 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-500/5 transition-all"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={onDrop}
                    onClick={() => document.getElementById('resume-upload').click()}
                >
                    <div className="bg-dark-800 p-4 rounded-full mb-4">
                        <Upload className="w-8 h-8 text-blue-400" />
                    </div>
                    <p className="text-white font-medium text-lg">Click to upload or drag and drop</p>
                    <p className="text-gray-400 text-sm mt-2">PDF (max 5MB)</p>
                    <input
                        type="file"
                        id="resume-upload"
                        className="hidden"
                        accept=".pdf"
                        onChange={onFileChange}
                    />
                </div>
            ) : (
                <div className="bg-dark-800 rounded-xl p-6 flex flex-col items-center justify-center h-64 relative border border-gray-700">
                    <button
                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                    <FileText className="w-16 h-16 text-emerald-500 mb-4" />
                    <p className="text-white font-medium text-lg truncate max-w-xs">{file.name}</p>
                    <p className="text-emerald-400 text-sm mt-1">Ready for analysis</p>
                    <button
                        onClick={() => setFile(null)}
                        className="mt-6 text-sm text-gray-400 hover:text-white underline"
                    >
                        Change file
                    </button>
                </div>
            )}
        </Card>
    );
};

export default ResumeUpload;
