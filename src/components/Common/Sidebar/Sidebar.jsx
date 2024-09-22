import { Transition } from '@headlessui/react';
import React, { useState } from 'react'
import { FaAngleDown, FaAngleRight, FaPlus, FaTrash } from 'react-icons/fa';
import SdMenu from './SdMenu/SdMenu';
import FilterMenu from './FilterMenu/FilterMenu';

// Sidebar Component with Toggleable Submenus and Multiple Main Menus with + Icon
const Sidebar = ({ openModal }) => {
    const [isOtherMenuOpen, setIsOtherMenuOpen] = useState(false); // Toggle state for other main menu
  
    return (
      <div className="w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 flex flex-col justify-between">
        <div>
          <ul className="space-y-4">
            <li>
              
              <SdMenu openModal={openModal} />
            </li>
  
            {/* Another Main Menu Example */}
            <li>
             <FilterMenu openModal={openModal} />
            </li>
          </ul>
        </div>
  
        <footer className="text-center text-sm text-gray-400">
          &copy; 2024 Structural S/D Filter
        </footer>
      </div>
    );
  };

export default Sidebar