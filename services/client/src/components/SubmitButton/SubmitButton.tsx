import Spinner from '../Spinner/Spinner';
import { ISubmitButtonProps } from './SubmitButton.types';

const SubmitButton = ({ text, isLoading }: ISubmitButtonProps) => {
  return (
    <button
      type="submit"
      value={text}
      className="bg-green-400 text-white h-16 w-full rounded-lg font-medium shadow-md"
    >
      {!isLoading ? text : <Spinner />}
    </button>
  );
};

export default SubmitButton;
