import { Check } from "lucide-react";
import React from "react";

const Subscription = () => {
  return (
    <div className="w-full mx-auto bg-[#15202b] px-5 text-gray-600 mb-10">
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-1 text-white">
          Pricing
        </h1>
        <h1 className="mb-4 text-2xl text-white font-normal md:text-3xl lg:text-4xl">
          Our <span className="font-semibold text-gray-600">plans</span> for
          your <span className="font-semibold text-gray-600">strategies</span>
        </h1>
      </div>
      <div className="max-w-4xl mx-auto md:flex">
        <div className="w-full md:w-1/3 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col">
          <div className="w-full flex-grow flex flex-col items-center">
            <h2 className="text-center font-bold uppercase mb-4">Basic Plan</h2>
            <h3 className="text-center font-bold text-4xl mb-5">Free</h3>
            <ul className="text-sm mb-8">
              <li className="leading-tight font-semibold text-gray-500 flex items-center">
                <Check color="green" size={15} className="me-2" /> 5 Tweets
              </li>
              <li className="leading-tight flex font-semibold text-gray-500 items-center">
                <Check color="green" size={15} className="me-2" /> Image
                Uploading
              </li>
              <li className="leading-tight flex font-semibold text-gray-500 items-center">
                <Check color="green" size={15} className="me-2" /> Profile
                Updation
              </li>
            </ul>
          </div>
          <div className="w-full">
            <button
              disabled
              className="font-bold bg-gray-600 hover:bg-gray-700 text-white rounded-md px-10 py-2 transition-colors w-full"
            >
              Free Plan
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/3 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:-mx-3 md:mb-0 rounded-md shadow-lg shadow-gray-600 md:relative md:z-50 md:flex md:flex-col">
          <div className="w-full flex-grow flex flex-col items-center">
            <h2 className="text-center font-bold uppercase mb-4">Pro</h2>
            <h3 className="text-center font-bold text-4xl md:text-5xl mb-5">
              $50/year
            </h3>
            <ul className="text-sm px-5 mb-8">
              <li className="leading-tight font-semibold text-gray-500 flex items-center">
                <Check color="green" size={15} className="me-2" /> Blue Tick
              </li>
              <li className="leading-tight font-semibold text-gray-500 flex items-center">
                <Check color="green" size={15} className="me-2" /> Unlimited
                Tweets
              </li>
              <li className="leading-tight font-semibold text-gray-500 flex items-center">
                <Check color="green" size={15} className="me-2" /> Image
                Uploading
              </li>
              <li className="leading-tight font-semibold text-gray-500 flex items-center">
                <Check color="green" size={15} className="me-2" /> Video
                Uploading
              </li>
            </ul>
          </div>
          <div className="w-full">
            <button className="font-bold bg-gray-600 hover:bg-gray-700 text-white rounded-md px-10 py-2 transition-colors w-full">
              Buy Now
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/3 md:max-w-none bg-white px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto md:my-6 rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col">
          <div className="w-full flex-grow flex flex-col items-center">
            <h2 className="text-center font-bold uppercase mb-4">Premium</h2>
            <h3 className="text-center font-bold text-4xl mb-5">$5/mo</h3>
            <ul className="text-sm px-5 mb-8">
              <li className="leading-tight font-semibold text-gray-500 flex items-center">
                <Check color="green" size={15} className="me-2" /> Blue Tick
              </li>
              <li className="leading-tight font-semibold text-gray-500 flex items-center">
                <Check color="green" size={15} className="me-2" /> Unlimited
                Tweets
              </li>
              <li className="leading-tight font-semibold text-gray-500 flex items-center">
                <Check color="green" size={15} className="me-2" /> Image
                Uploading
              </li>
              <li className="leading-tight font-semibold text-gray-500 flex items-center">
                <Check color="green" size={15} className="me-2" /> Video
                Uploading
              </li>
            </ul>
          </div>
          <div className="w-full">
            <button className="font-bold bg-gray-600 hover:bg-gray-700 text-white rounded-md px-10 py-2 transition-colors w-full">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
