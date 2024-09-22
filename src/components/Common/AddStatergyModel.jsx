import { AXIOS, TIMEFRAME } from "@/utils";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Toast } from "../Toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { createSdStatergyAction } from "@/redux/actions/strucralSdActions";
import { sdState } from "@/redux/reducer/strucralSdSlice";

const TYPE = ["INTERVAL", "FILTER"];
const LEVEL = ["Yes", "No"];

const AddSdStatergyModel = ({ isOpen, closeModal }) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(sdState);

  const [timeFrame, setTimeframe] = useState(TIMEFRAME[0]);
  const [level, setLevel] = useState("No");
  const [type, setType] = useState(TYPE[0]);
  const [index, setIndex] = useState();

  const [indices, setIndices] = useState([]);

  const [localLoading, setLocalLoading] = useState(false);

  const getIndices = async () => {
    try {
      setLocalLoading(true);
      const { data } = await AXIOS.get('filter/indices');
      if (data.success) {
        setIndices(data.data);
        setIndex(data.data[0]);
      }
    } catch (err) {
      console.log('err', err)
    } finally {
      setLocalLoading(false);
    }
  }

  useEffect(() => {
    getIndices()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        createSdStatergyAction({
          type,
          level: level === "Yes" ? true : false,
          timeFrame: timeFrame,
          query: {
            index
          }
        })
      );

      if (result.type === "stcturalSd/createSdStatergyAction/fulfilled") {
        closeModal();
      }
    } catch (err) {
      console.log("err.message", err.message);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30" />
        </Transition.Child>

        <div className="flex items-center justify-center min-h-screen px-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative bg-white p-6 my-8 w-full max-w-md rounded-lg shadow-xl z-50">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-xl font-semibold text-gray-900">
                  Add Sd Statergy
                </Dialog.Title>
                <button
                  onClick={closeModal}
                  className="text-red-500 hover:text-red-700 font-bold"
                >
                  X
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div>
                  <label
                    htmlFor="timeframe"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Timeframe
                  </label>
                  <select
                    id="timeframe"
                    value={timeFrame}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full p-2 mt-1 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  >
                    {TIMEFRAME.map((ele, index) => (
                      <option key={index} value={ele}>
                        {ele}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="level"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Level (Fetch when zone formed)
                  </label>
                  <select
                    id="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full p-2 mt-1 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  >
                    {LEVEL.map((ele, index) => (
                      <option key={index} value={ele}>
                        {ele}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type (Filter or Interval)
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full p-2 mt-1 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  >
                    {TYPE.map((ele, index) => (
                      <option key={index} value={ele}>
                        {ele}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Indices
                  </label>
                  <select
                    id="type"
                    value={index}
                    onChange={(e) => setIndex(e.target.value)}
                    className="w-full p-2 mt-1 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                  >
                    {indices.map((ele, index) => (
                      <option key={index} value={ele}>
                        {ele}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  disabled={localLoading || loading}
                  type="submit"
                  className={`w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${localLoading || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loading ? "Loading..." : "Add Statergy"}
                </button>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddSdStatergyModel;
