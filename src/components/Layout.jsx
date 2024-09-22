import React, { useState } from 'react'
import Header from './Common/Header';
import Sidebar from './Common/Sidebar/Sidebar';
import AddSdStatergyModel from './Common/AddStatergyModel';
import dynamic from 'next/dynamic';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';
import { sdState } from '@/redux/reducer/strucralSdSlice';



const SuccessAnimation = dynamic(
  () => import("@/components/Toast/Success/successAnimation"),
  { ssr: false }
);
const ErrorAnimation = dynamic(
  () => import("@/components/Toast/ErrorAnimation/ErrorAnimation"),
  { ssr: false }
);

const Layout = ({ children }) => {

  const { activeMenu } = useSelector(sdState);

  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('activeMenu', activeMenu)



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
          openModal={openModal}
        />
        <div className="flex-1 p-6 bg-gray-50 h-full overflow-auto">
          {children}
        </div>
      </div>
      <AddSdStatergyModel isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
}

export default Layout