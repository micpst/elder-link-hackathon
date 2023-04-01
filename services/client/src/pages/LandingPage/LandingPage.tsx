import { Link } from 'react-router-dom';

import CustomButton from '../../components/CustomButton/CustomButton';
import useMobile from '../../hooks/useMobile';
import volunteerImage from '../../assets/images/volunteer.jpg';
import seniorImage from '../../assets/images/senior.jpg';
import { routePaths } from '../../constants';

const LandingPage = () => {
  const isMobile = useMobile();

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col md:flex-row">
          <h1 className="text-5xl font-bold text-center mb-20 text-green-400">Kim jesteś?</h1>
          <div className="flex flex-col">
            <CustomButton text="SENIOR" onClick={() => {}} />
            <CustomButton text="Opiekun" onClick={() => {}} />
          </div>
        </div>
      ) : (
        <div className="flex max-h-screen p-10 w-full overflow-hidden">
          <Link
            to={routePaths.login}
            className="relative flex justify-center items-center grayscale hover:grayscale-0"
          >
            <img src={seniorImage} />
            <div className="absolute z-10 flex rounded-lg shadow-md justify-center items-center font-bold text-3xl bg-white w-56 h-16">
              SENIOR
            </div>
          </Link>
          <Link
            to={routePaths.login}
            className="relative flex justify-center items-center grayscale hover:grayscale-0"
          >
            <img src={volunteerImage} />
            <div className="absolute flex z-10 rounded-lg shadow-md justify-center items-center font-bold text-3xl bg-white w-56 h-16">
              OPIEKUN
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default LandingPage;
