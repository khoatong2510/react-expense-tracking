import { Link, NavLink, useLocation } from "react-router";
import Spinner from "./spinner";

type NavbarItem = {
  name: string;
  href: string;
  icon: string;
};

export default function Navbar() {
  const location = useLocation();

  const items: NavbarItem[] = [
    {
      name: "Home",
      href: "/",
      icon: "🏠",
    },
    {
      name: "Transactions",
      href: "/transactions",
      icon: "💰",
    },
    {
      name: "Budget Plan",
      href: "/budget-plan",
      icon: "📅",
    },
  ];

  return (
    <nav className="w-full h-full flex flex-col">
      <div className="flex items-end justify-end font-[Poppins] text-white text-4xl font-bold h-[20vh] px-4">
        My Finance App
      </div>

      <hr className="my-4 border-gray-700" />

      <ul className="flex-1 flex flex-col items-start justify-start">
        {items.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <li
              key={item.name} 
              className="w-full"
            >
              <NavLink 
                to={item.href}
                className={`
                  font-['Inter'] 
                  flex items-center w-full h-14 px-4 
                  text-white text-2xl rounded
                  transition-colors duration-200 ease-in-out
                  select-none
                  ${isActive ? "bg-slate-600 text-gray-100" : "bg-transparent hover:bg-slate-600/50"}
                `}
                style={{
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                }}
              >
                {({ isPending }) => (
                    <>
                      <span>{ isPending  && <Spinner /> }</span>
                      <span className="mr-3">{item.icon}</span>
                      <span className="tracking-normal">{item.name}</span>
                    </>
                  )
                }
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
