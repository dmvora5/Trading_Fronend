import { STATERGY_TYPE } from '@/constant';
import { deleteSdStatergyAction, getAllSdStatergyAction, reRunSdStatergyAction } from '@/redux/actions/strucralSdActions';
import { sdState, setActiveMenu } from '@/redux/reducer/strucralSdSlice';
import { Transition } from '@headlessui/react';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FaAngleDown, FaAngleRight, FaPlus, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const SdMenu = ({ openModal }) => {
  const dispatch = useDispatch();
  const { statergies, filters, loading, activeMenu } = useSelector(sdState);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(true);

  console.log('statergies', statergies)

  useEffect(() => {
    dispatch(getAllSdStatergyAction(STATERGY_TYPE.INTERVAL));
    dispatch(reRunSdStatergyAction());
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
    if (statergies.length) {
       activeMenuFun(statergies[0]);
    }
  }, [statergies, filters]);

  const toggleSubMenu = useCallback(() => {
    setIsSubMenuOpen((prev) => !prev);
  }, []);

  // Memoized list of strategies to avoid unnecessary re-renders
  const renderedStatergies = useMemo(
    () =>
      statergies.map((statergy) => (
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
    [statergies, activeMenuFun, deleteStatergy]
  );

  return (
    <>
      <div
        className="flex justify-between items-center bg-gray-700 p-3 rounded cursor-pointer"
        onClick={toggleSubMenu}
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

export default React.memo(SdMenu);
