import DynamicContent from '@/components/Common/DynamicContent'
import { sdState } from '@/redux/reducer/strucralSdSlice';
import React from 'react'
import { useSelector } from 'react-redux';

const Home = () => {

  const { activeMenu } = useSelector(sdState);

  return (
    <>
      {activeMenu ? (
        <DynamicContent
          statergy={activeMenu}
        />
      ) : (
        <p className="text-center text-gray-600">Please select a menu from the sidebar.</p>
      )}
    </>
  )
}

export default Home