import { useSocket } from "@/context/SocketProvider";
import { sdState, setEventDataAction } from "@/redux/reducer/strucralSdSlice";
import { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";




const DynamicContent = ({ statergy }) => {

    const { socket } = useSocket();
    const { eventData } = useSelector(sdState);
    const dispatch = useDispatch();


    const eventLisernar = (data) => {
      console.log(statergy?.name);
      dispatch(setEventDataAction({
        name: statergy?.name,
        data: data
      }))
    }

    useEffect(()=> {
      if(!socket || !statergy?.eventName) return;

      socket.on(statergy?.eventName, eventLisernar);

      return () => {
        socket.off(statergy?.eventName, eventLisernar);
      }

    },[socket, statergy?.eventName])




    const dummyData = data || [
      { name: 'Item 1', value: '10', status: 'Completed', color: 'green' },
      { name: 'Item 2', value: '20', status: 'Pending', color: 'yellow' },
      { name: 'Item 3', value: '15', status: 'Failed', color: 'red' },
    ];
  
    const downloadCSV = () => {
      const csvContent =
        'data:text/csv;charset=utf-8,' +
        ['Name,Value,Status']
          .concat(
            dummyData.map((item) => `${item.name},${item.value},${item.status}`).join('\n')
          )
          .join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${menu.title}.csv`);
      document.body.appendChild(link);
      link.click();
    };
  
    const runAction = () => {
      // Placeholder for run action logic
      alert(`Running actions for ${menu.title}`);
    };
  
    return (
      <div className="p-6 bg-gradient-to-b from-indigo-100 to-blue-100 rounded-lg shadow-lg h-full">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-800">{menu.title}</h2>
            <p className="text-gray-600 text-sm font-medium">{menu.description}</p>
          </div>
          <div className="flex">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded flex items-center mr-2"
              onClick={downloadCSV}
            >
              <AiOutlineDownload className="mr-2" /> Download CSV
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded flex items-center"
              onClick={runAction}
            >
              Run
            </button>
          </div>
        </div>
  
        <table className="table-auto w-full rounded-lg shadow-md text-center bg-gradient-to-r from-purple-300 to-blue-300">
          <thead>
            <tr className="bg-purple-700 text-white font-semibold text-lg">
              <th className="p-3">Name</th>
              <th className="p-3">Value</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyData.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="p-3 text-lg font-medium">{item.name}</td>
                <td className="p-3 text-lg font-medium">{item.value}</td>
                <td className="p-3">
                  <span
                    className={`text-white p-2 rounded ${
                      item.color === 'green'
                        ? 'bg-green-500'
                        : item.color === 'yellow'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };



  export default DynamicContent;