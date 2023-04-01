export interface IImageUploadProps {
  value: File | string | undefined;
  onChange: (value: File | string | undefined) => void;
}
