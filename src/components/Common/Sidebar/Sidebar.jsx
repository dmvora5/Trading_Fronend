import { Transition } from '@headlessui/react';
import React, { useState } from 'react'
import { FaAngleDown, FaAngleRight, FaPlus, FaTrash } from 'react-icons/fa';
import SdMenu from './SdMenu/SdMenu';

// Sidebar Component with Toggleable Submenus and Multiple Main Menus with + Icon
const Sidebar = ({ menus, onMenuClick, onDeleteMenu, openModal }) => {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(true); // Toggle state for structuralsd submenu
    const [isOtherMenuOpen, setIsOtherMenuOpen] = useState(false); // Toggle state for other main menu
  
    return (
      <div className="w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 flex flex-col justify-between">
        <div>
          <ul className="space-y-4">
            <li>
              {/* <div
                className="flex justify-between items-center bg-gray-700 p-3 rounded cursor-pointer"
                onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
              >
                <span>structuralsd</span>
                <div className="flex items-center">
                  <FaPlus
                    className="text-white hover:text-blue-500 mr-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal();
                    }}
                  />
                  {isSubMenuOpen ? <FaAngleDown /> : <FaAngleRight />}
                </div>
              </div> */}
  
              {/* Submenu with transition */}
              {/* <Transition
                show={isSubMenuOpen}
                enter="transition duration-300 ease-out"
                enterFrom="transform scale-y-0 opacity-0"
                enterTo="transform scale-y-100 opacity-100"
                leave="transition duration-200 ease-in"
                leaveFrom="transform scale-y-100 opacity-100"
                leaveTo="transform scale-y-0 opacity-0"
              >
                <ul className="mt-2 space-y-2 pl-4">
                  {menus.map((menu, index) => (
                    <li
                      key={index}
                      className="bg-gray-600 p-2 rounded flex justify-between items-center cursor-pointer hover:bg-gray-500"
                      onClick={() => onMenuClick(menu)}
                    >
                      {menu.title}
                      <FaTrash
                        className="text-red-500 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteMenu(menu.title);
                        }}
                      />
                    </li>
                  ))}
                </ul>
              </Transition> */}
              <SdMenu onMenuClick={onMenuClick} onDeleteMenu={onDeleteMenu} openModal={openModal} />
            </li>
  
            {/* Another Main Menu Example */}
            <li>
              <div
                className="flex justify-between items-center bg-gray-700 p-3 rounded cursor-pointer"
                onClick={() => setIsOtherMenuOpen(!isOtherMenuOpen)}
              >
                <span>Other Main Menu</span>
                <div className="flex items-center">
                  <FaPlus
                    className="text-white hover:text-blue-500 mr-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal();
                    }}
                  />
                  {isOtherMenuOpen ? <FaAngleDown /> : <FaAngleRight />}
                </div>
              </div>
  
              {/* Other Main Menu Submenu */}
              <Transition
                show={isOtherMenuOpen}
                enter="transition duration-300 ease-out"
                enterFrom="transform scale-y-0 opacity-0"
                enterTo="transform scale-y-100 opacity-100"
                leave="transition duration-200 ease-in"
                leaveFrom="transform scale-y-100 opacity-100"
                leaveTo="transform scale-y-0 opacity-0"
              >
                <ul className="mt-2 space-y-2 pl-4">
                  <li className="bg-gray-600 p-2 rounded hover:bg-gray-500 cursor-pointer">
                    Item 1
                  </li>
                  <li className="bg-gray-600 p-2 rounded hover:bg-gray-500 cursor-pointer">
                    Item 2
                  </li>
                </ul>
              </Transition>
            </li>
          </ul>
        </div>
  
        <footer className="text-center text-sm text-gray-400">
          &copy; 2024 Dynamic Menu System
        </footer>
      </div>
    );
  };

export default Sidebar