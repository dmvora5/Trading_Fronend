import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaTrash, FaAngleDown, FaAngleRight, FaPlus } from 'react-icons/fa';
import { AiOutlineDownload } from 'react-icons/ai';
import AddStatergyModel from '@/components/Common/AddStatergyModel';
import { Toast } from '@/components/Toast/Toast';
import { toast } from 'react-toastify';


// Header Component
const Header = () => {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-purple-800 text-white p-4">
      <h1 className="text-2xl font-bold">Dynamic Menu Management System</h1>
    </div>
  );
};

// Sidebar Component with Toggleable Submenus and Multiple Main Menus with + Icon
const Sidebar = ({ menus, onMenuClick, onDeleteMenu, openModal }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(true); // Toggle state for structuralsd submenu
  const [isOtherMenuOpen, setIsOtherMenuOpen] = useState(false); // Toggle state for other main menu

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 flex flex-col justify-between">
      <div>
        <ul className="space-y-4">
          <li>
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
                {menus.map((menu, index) => (
                  <li
                    key={index}
                    className="bg-gray-600 p-2 rounded flex justify-between items-center cursor-pointer hover:bg-gray-500"
                    onClick={() => onMenuClick(menu)}
                  >
                    {menu.title}
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
          </li>

          {/* Another Main Menu Example */}
          <li>
            <div
              className="flex justify-between items-center bg-gray-700 p-3 rounded cursor-pointer"
              onClick={() => setIsOtherMenuOpen(!isOtherMenuOpen)}
            >
              <span>Other Main Menu</span>
              <div className="flex items-center">
                <FaPlus
                  className="text-white hover:text-blue-500 mr-3 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal();
                  }}
                />
                {isOtherMenuOpen ? <FaAngleDown /> : <FaAngleRight />}
              </div>
            </div>

            {/* Other Main Menu Submenu */}
            <Transition
              show={isOtherMenuOpen}
              enter="transition duration-300 ease-out"
              enterFrom="transform scale-y-0 opacity-0"
              enterTo="transform scale-y-100 opacity-100"
              leave="transition duration-200 ease-in"
              leaveFrom="transform scale-y-100 opacity-100"
              leaveTo="transform scale-y-0 opacity-0"
            >
              <ul className="mt-2 space-y-2 pl-4">
                <li className="bg-gray-600 p-2 rounded hover:bg-gray-500 cursor-pointer">
                  Item 1
                </li>
                <li className="bg-gray-600 p-2 rounded hover:bg-gray-500 cursor-pointer">
                  Item 2
                </li>
              </ul>
            </Transition>
          </li>
        </ul>
      </div>

      <footer className="text-center text-sm text-gray-400">
        &copy; 2024 Dynamic Menu System
      </footer>
    </div>
  );
};

// Modal for Adding Menu with Select Input and Close Button (with transition)
const AddMenuModal = ({ isOpen, closeModal, onAddMenu }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Category 1'); // Default category

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddMenu({ title, description, category });
    setTitle('');
    setDescription('');
    closeModal();
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
                  Add New Menu
                </Dialog.Title>
                <button onClick={closeModal} className="text-red-500 font-bold">X</button>
              </div>

              <form onSubmit={handleSubmit} className="mt-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 mb-2 rounded border border-gray-300"
                >
                  <option value="Category 1">Category 1</option>
                  <option value="Category 2">Category 2</option>
                  <option value="Category 3">Category 3</option>
                </select>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                  Add Menu
                </button>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

// Dynamic Component to Render Table with Dummy Data and Download CSV Button
const DynamicComponent = ({ menu, data }) => {
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



// Main Home Component
const Home = () => {
  const [menus, setMenus] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuData, setMenuData] = useState({});
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

  const openModal = () => {
    console.log("call")
    toast.success("Test")
    setIsModalOpen(true)
  };
  const closeModal = () => setIsModalOpen(false);




  return (
    <>
      <Header />
      <div className="flex h-screen">
        <Sidebar
          menus={menus}
          onMenuClick={handleMenuClick}
          onDeleteMenu={handleDeleteMenu}
          openModal={openModal}
        />
        <div className="flex-1 p-6 bg-gray-50 h-full overflow-auto">
          {activeMenu ? (
            <DynamicComponent
              menu={activeMenu}
              data={menuData[activeMenu.title]} // Pass stored data (can be extended)
            />
          ) : (
            <p className="text-center text-gray-600">Please select a menu from the sidebar.</p>
          )}
        </div>
      </div>
      <AddStatergyModel isOpen={isModalOpen} closeModal={closeModal} onAddMenu={handleAddMenu} />
    </>
  );
};

export default Home;
