import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`rounded-md shadow-md bg-gray-800/50 backdrop-blur-sm p-4 ${className}`}>
    {children}
  </div>
);

export default Card;
