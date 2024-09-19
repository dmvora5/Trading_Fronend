import { TIMEFRAME } from "@/utils";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Toast } from "../Toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { createSdStatergyAction } from "@/redux/actions/strucralSdActions";
import { sdState } from "@/redux/reducer/strucralSdSlice";

const TYPE = [
  "INTERVAL",
 "FILTER"
]

const LEVEL = [
  "Yes",
  "No"
]

const AddSdStatergyModel = ({ isOpen, closeModal, onAddMenu }) => {

  const dispatch = useDispatch();
  const {loading} = useSelector(sdState);
    
  const [timeFrame, setTimeframe] = useState(TIMEFRAME[0]);
  const [eventName, setEventName] = useState();
  const [level, setLevel] = useState("No");
  const [type, setType] = useState(TYPE[0]);


  //pending query thing


    const handleLevelType = (e) => {
      if(e.target.value === "Yes") {
        setLevel(true);
      }else{
        setLevel(false);
      }
    } 
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if(!eventName) {
          return Toast.error("Event name is required");
          }
        
        const result = await dispatch(createSdStatergyAction({
          eventName,
          type,
          level: level === 'Yes' ? true : false,
          timeFrame: timeFrame
        }));

        console.log("call", result)

        if(result.type === "stcturalSd/createSdStatergyAction/fulfilled")
        setEventName('');
        closeModal();
      } catch (err) {
        console.log('err.message', err.message)
      }
     
    };
  
    return (
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
          {/* Fade-in overlay */}
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
  
          {/* Modal with zoom effect */}
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
                <div className="flex justify-between items-center">
                  <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                    Add Sd Statergy
                  </Dialog.Title>
                  <button onClick={closeModal} className="text-red-500 font-bold">X</button>
                </div>
  
                <form onSubmit={handleSubmit} className="mt-4">
                  <input
                    type="text"
                    placeholder="eventName"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  />
                  <select
                    value={timeFrame}
                    onChange={(e) => setTimeframe(e.target.value)}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  >
                    {TIMEFRAME.map((ele, index) => (
                      <option value={ele}>{ele}</option>
                    ))}
                  </select>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  >
                    {LEVEL.map((ele, index) => (
                      <option value={ele}>{ele}</option>
                    ))}
                  </select>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full p-2 mb-2 rounded border border-gray-300"
                  >
                    {TYPE.map((ele, index) => (
                      <option value={ele}>{ele}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
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
  

  export default AddSdStatergyModel




// import { Dialog, Transition } from "@headlessui/react";
// import { Fragment, useState } from "react";

// const AddStatergyModel = ({ isOpen, closeModal, onAddMenu }) => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('Category 1');
//   const [customFields, setCustomFields] = useState([{ key: '', value: '' }]);

//   // Handle the form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const customFieldsObj = customFields.reduce((obj, field) => {
//       if (field.key) {
//         obj[field.key] = field.value;
//       }
//       return obj;
//     }, {});

//     // Pass the values back, including custom fields
//     onAddMenu({ title, description, category, customFields: customFieldsObj });
    
//     setTitle('');
//     setDescription('');
//     setCategory('Category 1');
//     setCustomFields([{ key: '', value: '' }]); // Reset custom fields
//     closeModal();
//   };

//   // Handle change in dynamic fields
//   const handleCustomFieldChange = (index, field, value) => {
//     const updatedCustomFields = [...customFields];
//     updatedCustomFields[index][field] = value;
//     setCustomFields(updatedCustomFields);
//   };

//   // Add a new empty custom field row
//   const addCustomField = () => {
//     setCustomFields([...customFields, { key: '', value: '' }]);
//   };

//   return (
//     <Transition appear show={isOpen} as={Fragment}>
//       <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={closeModal}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black bg-opacity-30" />
//         </Transition.Child>

//         <div className="flex items-center justify-center min-h-screen px-4">
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0 scale-95"
//             enterTo="opacity-100 scale-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100 scale-100"
//             leaveTo="opacity-0 scale-95"
//           >
//             <div className="relative bg-white p-6 my-8 w-full max-w-md rounded-lg shadow-xl z-50">
//               <div className="flex justify-between items-center">
//                 <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
//                   Add New Strategy
//                 </Dialog.Title>
//                 <button onClick={closeModal} className="text-red-500 font-bold">X</button>
//               </div>

//               <form onSubmit={handleSubmit} className="mt-4">
//                 {/* Constant Fields */}
//                 <input
//                   type="text"
//                   placeholder="Title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="w-full p-2 mb-2 rounded border border-gray-300"
//                 />
//                 <textarea
//                   placeholder="Description"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="w-full p-2 mb-2 rounded border border-gray-300"
//                 />
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="w-full p-2 mb-2 rounded border border-gray-300"
//                 >
//                   <option value="Category 1">Category 1</option>
//                   <option value="Category 2">Category 2</option>
//                   <option value="Category 3">Category 3</option>
//                 </select>

//                 {/* Dynamic Custom Fields */}
//                 <div className="mt-4">
//                   <h3 className="text-lg font-medium">Custom Fields</h3>
//                   {customFields.map((field, index) => (
//                     <div key={index} className="flex space-x-2 mt-2">
//                       <input
//                         type="text"
//                         placeholder="Key"
//                         value={field.key}
//                         onChange={(e) => handleCustomFieldChange(index, 'key', e.target.value)}
//                         className="w-1/2 p-2 rounded border border-gray-300"
//                       />
//                       <input
//                         type="text"
//                         placeholder="Value"
//                         value={field.value}
//                         onChange={(e) => handleCustomFieldChange(index, 'value', e.target.value)}
//                         className="w-1/2 p-2 rounded border border-gray-300"
//                       />
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={addCustomField}
//                     className="mt-2 text-blue-500 hover:underline"
//                   >
//                     + Add Custom Field
//                   </button>
//                 </div>

//                 <button
//                   type="submit"
//                   className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
//                 >
//                   Add Strategy
//                 </button>
//               </form>
//             </div>
//           </Transition.Child>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// };

// export default AddStatergyModel;
