

import ScooterIcon from "../assets/delivery.svg";

const DeliveryTakeawayTimes = ({ time = 15 }) => {
  return (
    <div className="md:px-32 -mt-16">
      <div className="flex h-20 overflow-hidden rounded-lg shadow-md">
        {/* LEFT WHITE PANEL */}
        <div className="flex-none w-40 bg-white flex items-center justify-center transform -skew-x-12 origin-bottom-left">
          <div className="transform skew-x-12">
            <img src={ScooterIcon} className="w-8 h-8" alt="Delivery icon" />
          </div>
        </div>

        {/* RIGHT GREEN PANEL */}
        <div className="flex-1 bg-green-600 px-6 flex items-center justify-center">
          {/* Centering Wrapper */}
          <div className="text-center">
            <span className="text-lg font-semibold text-white">
              Ο μέσος χρόνος παραλαβής στα καταστήματά μας είναι
            </span>
            {/* Add a space for readability between the text and the time */}
            <span className="text-4xl font-bold text-white ml-2">{time}′</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTakeawayTimes;

