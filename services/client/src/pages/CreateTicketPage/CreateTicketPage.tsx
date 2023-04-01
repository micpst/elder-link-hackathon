import { useState } from 'react';
import clsx from 'clsx';
import { useGeolocated } from 'react-geolocated';
import { useNavigate } from 'react-router-dom';

import { IActivity } from '../../types/IActivity';
import { activities } from '../../constants';
import PlusIcon from '../../assets/icons/PlusIcon';
import MinusIcon from '../../assets/icons/MinusIcon';

const CreateTicketPage = () => {
  const [selectedActivities, setSelectedActivities] = useState<IActivity[]>([]);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  });
  const navigate = useNavigate();

  const handleActivityClick = (activity: IActivity) => {
    if (selectedActivities) {
      const activityIndex = selectedActivities.findIndex((a) => a.value === activity.value);
      if (activityIndex >= 0) {
        const newActivities = [...selectedActivities];
        newActivities.splice(activityIndex, 1);
        setSelectedActivities(newActivities);
      } else {
        setSelectedActivities([...selectedActivities, activity]);
      }
    } else {
      setSelectedActivities([activity]);
    }
  };

  const handleProceedClick = () => {
    if (!coords) return;
    const ticket = {
      latitude: coords.latitude,
      longitude: coords.longitude,
      activities: selectedActivities.map((activity) => activity.value),
    };
    window.localStorage.setItem('ticket', JSON.stringify(ticket));
    navigate('/swipe');
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-medium text-xl">Wybrane aktywności: </h1>
      {selectedActivities === null || (selectedActivities.length === 0 && <span>Brak</span>)}
      <div className="flex gap-4 flex-wrap mb-10">
        {selectedActivities?.map((activity) => (
          <div
            key={activity.value}
            className="flex border-2 border-green-400 justify-center items-center gap-3 py-1 px-3 rounded-2xl cursor-pointer shadow-md"
            onClick={() => handleActivityClick(activity)}
          >
            <span className="text-2xl text-green-400">{activity.label}</span>
            <div className="h-7 w-7">
              <MinusIcon />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 flex-wrap">
        {activities
          .filter((activity) =>
            selectedActivities ? !selectedActivities.find((a) => a.value === activity.value) : true,
          )
          .map((activity) => (
            <div
              key={activity.value}
              className="flex border-2 border-gray-400 justify-center items-center gap-3 py-1 px-3 rounded-2xl cursor-pointer shadow-sm"
              onClick={() => handleActivityClick(activity)}
            >
              <span className="text-2xl text-gray-400">{activity.label}</span>
              <div className="h-7 w-7">
                <PlusIcon />
              </div>
            </div>
          ))}
      </div>
      <div
        className={clsx(
          'h-16 flex justify-center items-center mt-10 text-white text-xl font-bold rounded-lg bg-green-400',
          selectedActivities.length === 0 && 'pointer-events-none',
        )}
        onClick={handleProceedClick}
      >
        Przejdź dalej
      </div>
    </div>
  );
};

export default CreateTicketPage;
