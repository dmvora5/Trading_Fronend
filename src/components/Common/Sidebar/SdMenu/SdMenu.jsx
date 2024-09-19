import { getAllSdStatergyAction } from '@/redux/actions/strucralSdActions';
import { sdState } from '@/redux/reducer/strucralSdSlice';
import { Transition } from '@headlessui/react';
import React, { useEffect, useState } from 'react'
import { FaAngleDown, FaAngleRight, FaPlus, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const SdMenu = ({ onMenuClick, onDeleteMenu, openModal }) => {

    const dispatch = useDispatch();

    const { statergies, loading } = useSelector(sdState)

    const [isSubMenuOpen, setIsSubMenuOpen] = useState(true); // Toggle state for structuralsd submenu
    // const [isOtherMenuOpen, setIsOtherMenuOpen] = useState(false); // Toggle state for other main menu

    useEffect(() => {
        dispatch(getAllSdStatergyAction())
    },[])
    

    return (
        <>
            <div
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
            </div>

            {/* Submenu with transition */}
            <Transition
                show={isSubMenuOpen}
                enter="transition duration-300 ease-out"
                enterFrom="transform scale-y-0 opacity-0"
                enterTo="transform scale-y-100 opacity-100"
                leave="transition duration-200 ease-in"
                leaveFrom="transform scale-y-100 opacity-100"
                leaveTo="transform scale-y-0 opacity-0"
            >
                <ul className="mt-2 space-y-2 pl-4">
                    {statergies.map(({ name }, index) => (
                        <li
                            key={index}
                            className="bg-gray-600 p-2 rounded flex justify-between items-center cursor-pointer hover:bg-gray-500"
                            onClick={() => onMenuClick(name)}
                        >
                            {name}
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
            </Transition>
        </>
    )
}

export default SdMenu