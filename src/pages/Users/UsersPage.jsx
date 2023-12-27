import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(20);

  const [isLoading, setIsloading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const [term, setTerm] = useState("");

  //open detail modal
  const openModal = (user, number) => {
    setSelectedUser({ ...user, number });
    setIsModalOpen(true);
    console.log("user", user);
  };

  // Fungsi untuk menutup modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const getFilteredUsers = () => {
    return currentUsers.filter((user) =>
      user.name.toLowerCase().includes(term.toLowerCase())
    );
  };

  const filteredUsers = getFilteredUsers();

  // fetch data
  const fetchData = async () => {
    setIsloading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}search?country=indonesia`
      );
      setUsers(response.data);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Layout>
        <div className="container mx-auto p-4">
          {errorMsg && <span className="text-red-500 font-sm">{errorMsg}</span>}
          {successsMsg && (
            <span className="text-green-600 font-sm">{successsMsg}</span>
          )}

          <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold my-4">Semua Universitas</h2>

            <div className="flex justify-between">
              <input
                type="text"
                onChange={(e) => setTerm(e.target.value)}
                value={term}
                placeholder="Cari kampus"
                className="p-2 rounded-l-md border border-r-0 focus:outline-none focus:border-blue-500"
              />
              <button
                disabled
                className="bg-blue-500 text-white rounded-r-md px-4 py-2 hover:bg-blue-600"
              >
                Cari
              </button>
            </div>
          </div>
          <table className="min-w-full table-auto">
            <thead className="bg-blue-500">
              <tr>
                <th className="px-4 py-2 text-white">NO</th>
                <th className="px-4 py-2 text-white">Nama Universitas</th>
                <th className="px-4 py-2 text-white">Website</th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr>
                  <td colSpan="3" className="border px-4 py-2">
                    <div className="flex justify-center items-center h-64">
                      Loading...
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user, idx) => (
                    <tr key={user.id}>
                      <td className="border px-4 py-2">
                        {(currentPage - 1) * usersPerPage + idx + 1}
                      </td>
                      <td className="border px-4 py-2">
                        <div
                          onClick={() =>
                            openModal(
                              user,
                              (currentPage - 1) * usersPerPage + idx + 1
                            )
                          }
                          className="text-blue-500 cursor-pointer hover:text-blue-800"
                        >
                          {user.name}
                        </div>
                      </td>
                      <td className="border px-4 py-2">{user.web_pages[0]}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center py-10 ">
                      Tidak ada nama kampus yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            )}
          </table>

          {/* Pagination Component */}
          <div className="py-8 flex justify-center">
            <nav>
              <ul className="flex pl-0 list-none rounded">
                {Array.from(
                  { length: Math.ceil(users.length / usersPerPage) },
                  (_, i) => (
                    <li key={i} className="mr-3">
                      <button
                        onClick={() => {
                          paginate(i + 1);
                          setCurrentPage(i + 1);
                        }}
                        className={`py-1 px-3 leading-tight rounded border ${
                          currentPage === i + 1
                            ? "bg-blue-500 text-white"
                            : "text-blue-700 bg-white border-blue-500 hover:bg-blue-500 hover:text-white"
                        }`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
        </div>
      </Layout>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full">
            <div>
              <h4 className="font-semibold">Nomor: {selectedUser.number}</h4>
            </div>

            <div className="text-start mt-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {selectedUser.name}
              </h3>

              <a
                href={selectedUser.web_pages[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 underline"
              >
                {selectedUser.web_pages}
              </a>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
