"use client";
import SubsTableItem from "@/Components/adminComponents/SubsTableItem";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [email, setEmail] = useState([]);

  const fetchEmail = async () => {
    const response = await axios.get("/api/email");
    setEmail(response.data.emails);
  };

  const deleteEmail = async (mongoId) => {
    const response = await axios.delete("/api/email", {
      params: {
        id: mongoId,
      },
    });
    if (response.data.success) {
      toast.success(response.data.message);
      fetchEmail();
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchEmail();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Subscriptions</h1>
      <div className="relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-left text-gray-700 uppercase bg-bray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email subscription
              </th>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {email.map((item, index) => {
              return (
                <SubsTableItem
                  deleteEmail={deleteEmail}
                  key={index}
                  mongoId={item._id}
                  email={item.email}
                  date={item.date}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
