import AdvertisementImage from "../../assets/Advertisement.png";

export default function Advertisement() {
  return (
    <div className="row justify-content-md-center mt-5">
      <div className="col-md-auto">
        <img
          className="shadow p-3 mb-5 bg-body rounded"
          src={AdvertisementImage}
          alt="A picture of Advertisement"
        />
      </div>
    </div>
  );
}
