import React from "react";

interface Card {
  name: string;
  email: string;
  id: number;
}

//Card component with tailwind css

const CardComponent: React.FC<Card> = ({ name, email, id }) => {
  return (
    <div className=" flex justify-center  rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4 justify-center items-center flex flex-col">
        <p className="font-bold text-xl mb-3">Id: {id}</p>
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{email}</p>
      </div>
    </div>
  );
};

export default CardComponent;
