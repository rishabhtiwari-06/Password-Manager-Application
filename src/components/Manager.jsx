import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getpasswords = async () => {
    try {
      let req = await fetch("http://localhost:3000/");
      let passwords = null;
      passwords = await req.json();
      setPasswordArray(passwords);
      console.log(passwords);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getpasswords();
  }, []);

  const copyText = (text) => {
    toast("🦄 Copied from clipboard!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const handleEdit =async (id) => {
    
    setForm({...passwordArray.filter((item) => item.id === id)[0], id: id});
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleDelete =async (id) => {
    let c = confirm("Do You Really Wanna Delete??");
    if (c) {
      let newpasswordArray = passwordArray.filter((item) => {
        return item.id !== id;
      });
      setPasswordArray(newpasswordArray);
      let res = await fetch("http://localhost:3000/",{method: "DELETE" , headers:{"Content-type":"application/json"},body:JSON.stringify({id})})
    }
  };

  const handlePassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "text";
    }
  };
  // const savePassword = () => {
  const savePassword = async() => {
    if (form.site && form.username && form.password) {
      console.log("balle")
      await fetch("http://localhost:3000/",{method: "DELETE" , headers:{"Content-type":"application/json"},body:JSON.stringify({id: form.id})})
      let updatePassword = [...passwordArray, { ...form, id: uuidv4() }];
      setPasswordArray(updatePassword);
      await fetch("http://localhost:3000/",{method: "POST" , headers:{"Content-type":"application/json"},body:JSON.stringify({...form,id: uuidv4()})})
      setForm({site:"",username:"", password:""})
    } else {
      toast.error("Please fill out all fields.");
    }
  };

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition=" Bounce"
      />
      <ToastContainer />
      <div className="absolute inset-0  -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
      <div className="container  pt-6 mx-auto max-w-3xl ">
        <div className="flex flex-col justify-center items-center">
          <h1 className="font-bold text-4xl">
            <span className="text-green-500">&lt;</span>Pass{" "}
            <span className="text-green-500">Op/&gt;</span>
          </h1>
          <p className="text-green-900">Your Own Password Manager</p>
        </div>

        <div className="flex flex-col justify-center items-center p-4 gap-6">
          <input
            value={form.site}
            name="site"
            onChange={handleChange}
            placeholder="Enter Website URL"
            className=" border border-green-900 mx-auto w-full rounded-full px-4 py-1"
            type="text"
          />
          <div className="flex w-full gap-8">
            <input
              value={form.username}
              name="username"
              onChange={handleChange}
              placeholder="Enter Username"
              className="border px-4 border-green-900 w-full rounded-full"
              type="text"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className="relative border px-2 border-green-900 w-full rounded-full"
                type="password"
              />
              <span
                onClick={handlePassword}
                className="absolute right-1 cursor-pointer"
              >
                <img
                  ref={ref}
                  className=""
                  src="icons/eye.png"
                  width={25}
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className=" flex justify-center items-center px-2 py-1 rounded-full bg-gray-400 hover:bg-gray-300 border border-black"
          >
            <lord-icon
              src="https://cdn.lordicon.com/zrkkrrpl.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className=" passwords">
          <h2 className=" font-bold text-lg py-2">Your Passwords</h2>
          {passwordArray.length === 0 && <div className="">No passwords</div>}
          {passwordArray.length != 0 && (
            <div className="flex-col md:flex-row p-1 relative overflow-x-auto flex justify-center items-center">
              <table className="w-full text-sm text-left rtl:text-right text-black bg-green-100">
                <thead className="text-sm sm:text-base bg-green-800 text-white">
                  <tr>
                    <th scope="col" className=" sm:px-6 py-3">
                      Website
                    </th>
                    <th scope="col" className=" sm:px-6 py-3">
                      Username
                    </th>
                    <th scope="col" className=" sm:px-6 py-3">
                      Password
                    </th>
                    <th scope="col" className=" sm:px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={index} className=" border">
                        <th
                          scope="row"
                          className="px-1 py-2 sm:px-6 flex flex-col font-medium  whitespace-nowrap text-black"
                        >
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                        </th>
                        <td className=" px-1 sm:px-6 py-2 relative">
                          {" "}
                          {item.username}
                        </td>
                        <td className="px-1 sm:px-4 md:px-6 py-2 sm:flex relative ">
                          {"*".repeat(item.password.length)}{" "}
                          <button
                            onClick={() => copyText(item.password)}
                            className="absolute sm:right-10 rounded-full border  flex justify-center items-center"
                          >
                            <span className="material-symbols-outlined">
                              content_copy
                            </span>
                          </button>
                        </td>
                        <td className="px-6 py-2 relative">
                          <div>
                            <span
                              onClick={() => handleEdit(item.id)}
                              className="material-symbols-outlined cursor-pointer"
                            >
                              edit
                            </span>{" "}
                            <span
                              onClick={() => handleDelete(item.id)}
                              className="material-symbols-outlined cursor-pointer"
                            >
                              delete
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
