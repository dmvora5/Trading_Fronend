import { useSocket } from "@/context/SocketProvider";
import { AXIOS } from "@/utils";
import { useEffect, useState } from "react";
import { AiOutlineDownload } from "react-icons/ai";
import { Toast } from "../Toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { sdState, setActiveMenu } from "@/redux/reducer/strucralSdSlice";
import { STATERGY_TYPE } from "@/constant";
import SocketPart from "../SocketPart";

const DynamicContent = ({ statergy }) => {
  const { activeMenu } = useSelector(sdState);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async (sid) => {
    try {
      setLoading(true);
      const { data } = await AXIOS.get("/sd/filter/" + sid);
      setData(data?.data || []);
    } catch (err) {
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (statergy) {
      getData(statergy._id);
    }
    getData
  }, [statergy])


  const downloadCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Symbol,Index,Candle,RetestDate,Retest']
        .concat(
          data.map((item) => `${item.symbol},${item.index},${new Date(item.date).toLocaleString()},${new Date(item.retestDate).toLocaleString()},${item.retest}`).join('\n')
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${statergy.name}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  const runAction = async () => {
    try {
      setLoading(true);
      console.log('statergy', statergy);
      if (statergy?.running) {
        const { data } = await AXIOS.post("/sd/stop", {
          id: statergy._id
        });
        if (data?.success) {
          dispatch(setActiveMenu({
            ...activeMenu,
            running: false
          }));
          return Toast.success(data.message);
        }
      } else {
        const { data } = await AXIOS.post("/sd/run", {
          id: statergy._id
        });
        if (data?.success) {
          dispatch(setActiveMenu({
            ...activeMenu,
            running: true
          }));
          return Toast.success(data.message);
        }
      }
    } catch (err) {
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  };

  const runFilter = async () => {
    try {
      setLoading(true);
      const { data } = await AXIOS.get("sd/run-filter", {
        params: {
          id: activeMenu._id
        }
      });
      if (data?.success) {
        setData(data.data)
      }
    } catch (err) {
      console.log('err', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 bg-gradient-to-b from-indigo-100 to-blue-100 rounded-lg shadow-lg h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-800">{activeMenu?.name}</h2>
        </div>
        <div className="flex">
          <button
            disabled={loading} // disable the button when loading is true
            className={`flex items-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            onClick={downloadCSV}
          >
            <AiOutlineDownload className="mr-2" /> Download CSV
          </button>
          {activeMenu?.type === STATERGY_TYPE.INTERVAL &&
            <button
              disabled={loading} // disable the button when loading is true
              className={`flex items-center bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              onClick={runAction}
            >
              {activeMenu?.running ? "Stop" : "Run"}
            </button>}
          {activeMenu?.type === STATERGY_TYPE.FILTER &&
            <button
              disabled={loading} // disable the button when loading is true
              className={`flex items-center bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              onClick={runFilter}
            >
              {loading ? 'Loading...' : 'fetch'}
            </button>}
        </div>
      </div>
      {statergy?.type === STATERGY_TYPE.INTERVAL && <SocketPart statergy={statergy} eventCallback={setData} />}
      <table className="table-auto w-full rounded-lg shadow-md text-center bg-gradient-to-r from-purple-300 to-blue-300">
        <thead>
          <tr className="bg-purple-700 text-white font-semibold text-lg">
            <th className="p-3">Symbol</th>
            <th className="p-3">Index</th>
            <th className="p-3">Candle</th>
            <th className="p-3">RetestDate</th>
            <th className="p-3">Retest</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-3 text-lg font-medium">{item.symbol}</td>
              <td className="p-3 text-lg font-medium">{item.index}</td>
              <td className="p-3 text-lg font-medium">{new Date(item.date).toLocaleString()}</td>
              <td className="p-3 text-lg font-medium">{new Date(item.retestDate).toLocaleString()}</td>
              <td className="p-3">
                <span
                  className={`text-white p-2 rounded ${item.retest === 'RETEST_SUPPORT'
                    ? 'bg-green-500'
                    : 'bg-red-500'
                    }`}
                >
                  {item.retest === 'RETEST_SUPPORT' ? 'Support' : 'Resistance'}
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
