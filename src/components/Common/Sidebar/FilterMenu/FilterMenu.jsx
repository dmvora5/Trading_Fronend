import { STATERGY_TYPE } from '@/constant';
import { deleteSdStatergyAction, getAllSdFilterAction } from '@/redux/actions/strucralSdActions';
import { sdState, setActiveMenu } from '@/redux/reducer/strucralSdSlice';
import { AXIOS } from '@/utils';
import { Transition } from '@headlessui/react';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FaAngleDown, FaAngleRight, FaPlus, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const FilterMenu = ({ openModal }) => {

    const dispatch = useDispatch();
    const { statergies, loading, activeMenu, filters } = useSelector(sdState);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(true);

    console.log('filters', filters)


    useEffect(() => {
        dispatch(getAllSdFilterAction(STATERGY_TYPE.FILTER));
      }, [dispatch]);

    // Memoized function for deleting a strategy
    const deleteStatergy = useCallback(
        (statergy) => {
            dispatch(deleteSdStatergyAction(statergy));
        },
        [dispatch]
    );

    const activeMenuFun = useCallback((statergy) => {
        dispatch(setActiveMenu(statergy));
    }, [dispatch]);

    useEffect(() => {
            if (filters.length > 0 && statergies.length === 0) {
                // If there are filters and no active menu, set the first filter as active
                activeMenuFun(filters[0]);
            } else if (statergies.length === 0 && filters.length === 0) {
                // If no filters and no strategies, clear the active menu
                activeMenuFun(null);
            }
        
    }, [filters, statergies]);

    const toggleSubMenu = useCallback(() => {
        setIsSubMenuOpen((prev) => !prev);
    }, []);



    // Memoized list of strategies to avoid unnecessary re-renders
    const renderedStatergies = useMemo(
        () =>
            filters.map((statergy) => (
                <li
                    key={statergy._id}
                    className="bg-gray-600 p-2 rounded flex justify-between items-center cursor-pointer hover:bg-gray-500"
                    onClick={() => activeMenuFun(statergy)}
                >
                    {statergy.name}
                    <FaTrash
                        className="text-red-500 hover:text-red-700"
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteStatergy(statergy);
                        }}
                    />
                </li>
            )),
        [filters, activeMenuFun, deleteStatergy]
    );

    return (
        <>
            <div
                className="flex justify-between items-center bg-gray-700 p-3 rounded cursor-pointer"
                onClick={toggleSubMenu}
            >
                <span>structuralSDFilters</span>
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
                {loading ? (
                    <div className="text-white p-4">Loading...</div>
                ) : (
                    <ul className="mt-2 space-y-2 pl-4">
                        {renderedStatergies.length ? renderedStatergies : <div className="text-white p-4">No strategies found</div>}
                    </ul>
                )}
            </Transition>
        </>
    );
};

export default React.memo(FilterMenu);
