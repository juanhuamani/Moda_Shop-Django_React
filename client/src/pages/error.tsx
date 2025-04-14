import { FC } from "react";
import { Link } from "react-router-dom";
import { paths } from "@/config/paths";
import Logo from "@/assets/logo.svg";

export const ErrorRoute: FC = () => {

  return (
    <div className="flex flex-col items-center justify-center bg-[#eaf6ee] h-screen">
      <div className="flex flex-col items-center justify-center mb-8 md:absolute md:top-0 md:left-0 md:mt-10 md:ml-10">
        <Link to="/">
          <img
            src={Logo}
            alt="logo"
            className="w-[120px] h-auto mb-4 md:mb-0"
          />
        </Link>
      </div>
      <h1 className="text-right text-[#69be9c] md:text-[160px] font-semibold font-['Inter'] text-[100px]">
        500
      </h1>
      <div className="h-[58px] justify-center items-center gap-2.5 flex mb-8">
        <div className="text-right text-[#0d1f2d] text-5xl font-semibold font-['Inter']">
          Oops!
        </div>
        <div className="text-[#0d1f2d] text-base font-normal font-['Inter']">
            Something went wrong. Please try again later.
        </div>
      </div>
      <Link
        to={paths.auth.login.getHref()}
        replace
        className="w-40 h-[50px] px-[30px] py-[15px] bg-[#7ed31f] rounded-[200px] justify-center items-center gap-2.5 inline-flex text-white text-sm font-normal font-['Inter']"
      >
        Go to Login
      </Link>
      <div className="absolute bottom-0 px-10 py-4 md:right-0">
        <div className="text-[#0d1f2d] text-sm font-normal font-['Inter']">
          © 2023 All rights reserved.
        </div>
        <div className="text-[#0d1f2d] text-sm font-normal font-['Inter']">
          Terms of Service | Privacy Policy
        </div>
      </div>
    </div>
  );
};
