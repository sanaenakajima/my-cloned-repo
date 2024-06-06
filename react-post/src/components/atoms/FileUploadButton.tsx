// src/components/atoms/FileUploadButton.tsx
import React from 'react';
import ErrorMessage from './ErrorMessage';

interface FileUploadButtonProps {
    onFileSelect: (base64: string | null, fileName: string | null) => void;
    imageUrl: string;
    error?: string;
    className?: string;
}

const FileUploadButton: React.FC<FileUploadButtonProps> = ({ onFileSelect, imageUrl, error, className }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
                if (loadEvent.target) {
                    const base64 = loadEvent.target.result as string;
                    onFileSelect(base64, file.name);
                }
            };
            reader.readAsDataURL(file);
        } else {
            onFileSelect(null, null);
        }
    };

    return (
        <div className={`file-upload-button ${className}`}>
            <label className="block text-gray-700 text-sm text-left font-bold mb-2">ユーザーアイコン画像</label>
            <label htmlFor="file-upload" className="cursor-pointer inline-block">
                <img src={imageUrl} className="w-32 h-32 object-cover rounded-full mb-2" alt="User Icon" />
                <input type="file" id="file-upload" className="hidden" onChange={handleFileChange} />
            </label>
            <div className="text-sm text-gray-600">タップして画像を変更</div>
            <ErrorMessage error={error} />
        </div>
    );
};

export default FileUploadButton;