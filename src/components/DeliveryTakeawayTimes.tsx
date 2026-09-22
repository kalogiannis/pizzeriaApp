import ScooterIcon from "../assets/delivery.svg";

const DeliveryTakeawayTimes = ({ time = 15 }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-32 mt-10">
      {/* 1. overflow-hidden clips the slanted edges.
          2. min-h allows the bar to grow taller if text wraps on mobile.
          3. bg-green-600 ensures the right side is green.
      */}
      <div className="flex min-h-[80px] overflow-hidden rounded-xl shadow-lg bg-green-600">
        
        {/* LEFT WHITE PANEL 
            - Use -ml-4 to push the slanted edge off-screen so the left side looks flat.
            - w-24 on mobile is enough for the icon, md:w-48 for desktop.
        */}
        <div className="flex-none w-24 md:w-48 bg-white flex items-center justify-center -skew-x-12 -ml-6 origin-top">
          {/* We "un-skew" the content so the icon stays straight */}
          <div className="skew-x-12 translate-x-2">
            <img 
              src={ScooterIcon} 
              className="w-8 h-8 md:w-10 md:h-10" 
              alt="Delivery icon" 
            />
          </div>
        </div>

        {/* RIGHT GREEN CONTENT 
            - flex-1 takes up all remaining space.
            - p-4 gives space for wrapping text on mobile.
        */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="flex flex-wrap items-center justify-center text-center gap-x-2">
            <span className="text-white text-sm md:text-lg font-bold leading-tight">
              Ο μέσος χρόνος παραλαβής στα καταστήματά μας είναι
            </span>
            <span className="text-white text-3xl md:text-4xl font-black">
              {time}′
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryTakeawayTimes;