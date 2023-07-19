/* eslint-disable react/prop-types */
import {
  useLocation
} from "react-router-dom";
import { IoCalendarClearSharp, IoHome, IoBookSharp, IoVideocamSharp, IoLogOutSharp } from 'react-icons/io5';

const Sidebar = ({ user, onLogout }) => {
  const links = [
    // { label: 'HOME', icon: <IoHome />, href: '/' },
    { label: 'VIDEOS', icon: <IoVideocamSharp />, href: '/videos' },
    { label: 'DIRECTORY', icon: <IoBookSharp />, href: '/users' },
    { label: 'CALENDAR', icon: <IoCalendarClearSharp />, href: '/coming-soon' },
    // Add more links with their respective icons as needed
  ];

  // Check if the window width is below the breakpoint for mobile view
  const isMobileView = window.innerWidth <= 768; // Set the breakpoint as you prefer

  const { pathname } = useLocation();
  console.log({ pathname })

  return (
    <div className={`relative w-16 md:w-64  ${isMobileView ? 'w-16' : 'w-64'}`}>
      <div className={`flex flex-col w-16 md:w-64 bg-black h-screen fixed top-0`}>
        {/* Logo */}
        <div className="pt-4">
          <img src="/Logo.png" alt="Logo" className="w-100 pt-4 md:px-10 px-2" />
        </div>

        {/* Links */}
        <div className="flex-grow pb-4 flex items-center justify-center">
          <ul className="py-4 text-center">
            {links.map((link) => (
              <li key={link.label} className="px-4 py-2 text-white hover:text-lime-400 text-xl font-semibold">
                <a href={link.href} className={`flex items-center justify-center ${pathname.toLowerCase() === link.href.toLowerCase() && 'green-gradient-text'}`}>
                  <span className="md:hidden">{link.icon}</span>
                  <span className={`hidden md:block text-3xl`}>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="pb-5">
          <div className="justify-center hidden md:flex flex-col items-center">
            <span className="text-xl"> {user && user.name}</span>
            <a onClick={onLogout} href="#">LOGOUT</a>
          </div>

          <IoLogOutSharp onClick={onLogout} className="md:hidden w-full text-2xl" />
        </div>

      </div>
    </div >
  );
};

export default Sidebar;
