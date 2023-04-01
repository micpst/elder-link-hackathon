import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import { IImageUploadProps } from './ImageUpload.types';
import { imageExtensionsUpload } from '../../constants';
import CameraIcon from '../../assets/icons/CameraIcon';
import TrashIcon from '../../assets/icons/TrashIcon';
import PencilIcon from '../../assets/icons/PencilIcon';

const ImageUpload = ({ value, onChange }: IImageUploadProps) => {
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const [file] = acceptedFiles;
      if (file) {
        const url = URL.createObjectURL(file);
        setImagePreview(url);
        onChange(file);
      }
    },
    [onChange],
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: imageExtensionsUpload,
    multiple: false,
    noClick: true,
    minSize: 0,
  });

  const handleSetPhoto = (e: React.MouseEvent<HTMLElement>) => {
    if (imagePreview) return;
    e.preventDefault();
    open();
  };

  const handleRemovePhoto = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setImagePreview(undefined);
    onChange(undefined);
  };

  const handleEditPhoto = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    open();
  };

  useEffect(() => {
    if (typeof value === 'string' && value.length > 0) {
      setImagePreview(value);
    }
  }, [value]);

  return (
    <div {...getRootProps()} onClick={handleSetPhoto}>
      <input {...getInputProps()} type="file" accept={'image/*'} />
      {!imagePreview ? (
        <div className="flex justify-center flex-col items-center bg-white h-20 shadow-md rounded-md border-2 border-dashed">
          <div className="flex h-6 w-6">
            <CameraIcon />
          </div>
          <span className="text-gray-400">Załącz zdjęcie</span>
        </div>
      ) : (
        <div className="relative">
          <img src={imagePreview} alt="preview of uploaded file" className="rounded-md shadow-md" />
          <div className="flex absolute bottom-4 right-4 gap-4">
            <div
              className="flex h-10 w-10 p-2 justify-center items-center rounded-full bg-white"
              onClick={handleRemovePhoto}
            >
              <TrashIcon />
            </div>
            <div
              className="flex h-10 w-10 p-2 justify-center items-center rounded-full bg-white"
              onClick={handleEditPhoto}
            >
              <PencilIcon />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
