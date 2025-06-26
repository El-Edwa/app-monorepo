import { authActions } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const PicsSection = ({ user }: any) => {
  const dispatch = useDispatch();
  return (
    <div className="w-full">
      <div
        className="w-full h-[150px] sm:h-[180px] md:h-[200px] lg:h-[220px] bg-cover bg-center relative"
        style={
          user.coverPicture
            ? { backgroundImage: `url(${user.coverPicture})` }
            : { backgroundColor: "#333639" }
        }
      >
        {/* Profile picture container with responsive sizing and positioning */}
        <div className="bg-black w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] rounded-full absolute top-[110px] sm:top-[130px] md:top-[140px] lg:top-[150px] left-3 sm:left-4 md:left-5 lg:left-[17px]">
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : "https://res.cloudinary.com/doou4eolq/image/upload/v1708218358/sample.jpg"
            }
            alt="Profile"
            className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] lg:w-[140px] lg:h-[140px] rounded-full border-2 sm:border-3 lg:border-4 border-black object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PicsSection;
