import React, { useState } from 'react'
import Header from './Common/Header';
import Sidebar from './Common/Sidebar/Sidebar';
import AddStatergy from './Common/AddStatergyModel';
import AddSdStatergyModel from './Common/AddStatergyModel';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";



const SuccessAnimation = dynamic(
  () => import("@/components/Toast/Success/successAnimation"),
  { ssr: false }
);
const ErrorAnimation = dynamic(
  () => import("@/components/Toast/ErrorAnimation/ErrorAnimation"),
  { ssr: false }
);

const Layout = ({ children }) => {

  const [menus, setMenus] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMenu = (menu) => {
    setMenus([...menus, menu]);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const handleDeleteMenu = (menuTitle) => {
    setMenus(menus.filter((menu) => menu.title !== menuTitle));
    if (activeMenu?.title === menuTitle) {
      setActiveMenu(null);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        icon={({ type, icon }) => {
          switch (type) {
            case "success":
              return <SuccessAnimation />;
            case "error":
              return <ErrorAnimation />;
            default:
              return icon;
          }
        }}
      />
      <Header />
      <div className="flex h-screen">
        <Sidebar
          menus={menus}
          onMenuClick={handleMenuClick}
          onDeleteMenu={handleDeleteMenu}
          openModal={openModal}
        />
        <div className="flex-1 p-6 bg-gray-50 h-full overflow-auto">
          {children}
          {/* {activeMenu ? (
            <DynamicComponent
              menu={activeMenu}
              data={menuData[activeMenu.title]} // Pass stored data (can be extended)
            />
          ) : (
            <p className="text-center text-gray-600">Please select a menu from the sidebar.</p>
          )} */}
        </div>
      </div>
      <AddSdStatergyModel isOpen={isModalOpen} closeModal={closeModal} onAddMenu={handleAddMenu} />
    </>
  );
}

export default Layout