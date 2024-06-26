import axios from "axios";
import React, { useEffect, useState } from "react";

const ListDocument = () => {
  const [data, setData] = useState([]);
  console.log(data)
  console.log(import.meta.env.VITE_APP_API_URL + '/document/list/')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_APP_API_URL + '/document/list/');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  return (
    <div className="w-full min-h-[calc(100vh-72px)] py-5 px-10">
      <div className="overflow-x-auto text-gray-200">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-black">
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Document Name</th>
                <th className="border px-4 py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item._id}</td>
                <td className="border px-4 py-2">{item.docName}</td>
                <td className="border px-4 py-2">{item.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListDocument;



