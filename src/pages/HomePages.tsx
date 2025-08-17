import AppStore from "@/components/AppStore";
import DeliveryTakeawayTimes from "@/components/DeliveryTakeawayTimes";
import Offers from "@/components/Offers";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      <DeliveryTakeawayTimes/>
      <AppStore/>
      <Offers/>
   </div>
  );
};

export default HomePage;