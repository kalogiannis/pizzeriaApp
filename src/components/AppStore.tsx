import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";

const AppStore = () => {
  return (   
    <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the MernEats App for faster ordering and personalised
            recommendations
          </span>
          <img src={appDownloadImage} />
        </div>
       </div>
  )
}

export default AppStore