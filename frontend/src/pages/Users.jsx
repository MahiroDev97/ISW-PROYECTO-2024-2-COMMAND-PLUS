import Table from '@components/Table';
import useUsers from '@hooks/users/useGetUsers.jsx';
import Search from '../components/Search';
import Popup from '../components/Popup';
import DeleteIcon from '../assets/deleteIcon.svg';
import UpdateIcon from '../assets/updateIcon.svg';
import UpdateIconDisable from '../assets/updateIconDisabled.svg';
import DeleteIconDisable from '../assets/deleteIconDisabled.svg';
import { useCallback, useState } from 'react';
import useEditUser from '@hooks/users/useEditUser';
import useDeleteUser from '@hooks/users/useDeleteUser';
import Navbar from '../components/Navbar';

const Users = () => {
  const { users, fetchUsers, setUsers } = useUsers();
  const [filterRut, setFilterRut] = useState('');

  const {
    handleClickUpdate,
    handleUpdate,
    isPopupOpen,
    setIsPopupOpen,
    dataUser,
    setDataUser
  } = useEditUser(setUsers);

  const { handleDelete } = useDeleteUser(fetchUsers, setDataUser);

  const handleRutFilterChange = (e) => {
    setFilterRut(e.target.value);
  };

  const handleSelectionChange = useCallback((selectedUsers) => {
    setDataUser(selectedUsers);
  }, [setDataUser]);

  const columns = [
    { title: "Correo electrónico", field: "email", width: 250, responsive: 3 },
    { title: "Nombre", field: "nombreCompleto", width: 250, responsive: 0 },
    { title: "Rut", field: "rut", width: 120, responsive: 2 },
    { title: "Rol", field: "rol", width: 120, responsive: 2 },
    { title: "Creado", field: "createdAt", width: 150, responsive: 2 }
  ];

  return (
    <>
      <Navbar />
      <div className="h-[91vh] bg-gradient-to-br from-gray-50 to-gray-100 pt-[9vh]">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col h-full">
            <div className="mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-extrabold text-gray-900 mb-1">
                    Gestión de Usuarios
                  </h1>
                  <p className="text-xs text-gray-600">
                    Administra los usuarios del sistema
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Search
                    value={filterRut}
                    onChange={handleRutFilterChange}
                    placeholder={'Filtrar por rut'}
                    className="bg-white rounded-lg shadow-sm"
                  />
                  <button
                    onClick={handleClickUpdate}
                    disabled={dataUser.length === 0}
                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    <img
                      src={dataUser.length === 0 ? UpdateIconDisable : UpdateIcon}
                      alt="edit"
                      className="w-5 h-5"
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(dataUser)}
                    disabled={dataUser.length === 0}
                    className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    <img
                      src={dataUser.length === 0 ? DeleteIconDisable : DeleteIcon}
                      alt="delete"
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden flex flex-col max-h-[calc(91vh-130px)]">
              <div className="px-4 py-2 border-b border-gray-200 bg-gray-50/50">
                <h2 className="text-lg font-bold text-gray-900">
                  Lista de Usuarios
                </h2>
              </div>
              <div className="flex-1 p-3 overflow-auto">
                <Table
                  data={users}
                  columns={columns}
                  filter={filterRut}
                  dataToFilter={'rut'}
                  initialSortName={'email'}
                  onSelectionChange={handleSelectionChange}
                  className="text-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Popup show={isPopupOpen} setShow={setIsPopupOpen} data={dataUser} action={handleUpdate} />
    </>
  );
};

export default Users;
