import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
const Data = () => {
  const URL = "/api";
  const [fetdata, setFetdata] = useState([]);
  const [task, setTask] = useState("");
  const [load, setLoad] = useState(true);

  const handelcheck = async (val, id) => {
    const response = await fetch(URL, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id, checked: val }),
    });
    const responseData = await response.json();
    const indexval = fetdata.findIndex((val) => val._id === id);
    const oldarr = [...fetdata];
    oldarr[indexval].checked = !oldarr[indexval].checked;
    setFetdata([...oldarr]);
  };
  const handeladdtask = async () => {
    const response = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: task }),
    });
    setTask("");
    const resmes = await response.json();
    setFetdata([...fetdata, resmes]);
  };
  const handeldelet = async (id) => {
    const response = await fetch(URL, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });
    const resmsg = await response.json();
    const delarrval = fetdata.filter((val) => val._id !== id);
    setFetdata(delarrval);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setFetdata(data);
        if (response) {
          setLoad(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="maindiv">
      <div className="top">
        <input
          type="text"
          onChange={(e) => setTask(e.target.value)}
          value={task}
          placeholder="Add"
        />{" "}
        <button onClick={handeladdtask}>
          <IoIosAddCircle />
        </button>
      </div>
      <ul>
        {fetdata.length === 0 ? (
          <p className="pp">{load ? "Loading..." : "ADD YOUR TODO"}</p>
        ) : (
          fetdata.map((val) => {
            return (
              <li key={val._id} className="col">
                <input
                  type="checkbox"
                  onChange={() => handelcheck(!val.checked, val._id)}
                  checked={val.checked}
                />
                <p
                  style={{
                    textDecoration: val.checked ? "line-through" : "none",
                  }}
                >
                  {val.task}
                </p>
                <button onClick={() => handeldelet(val._id)}>
                  {" "}
                  <MdDelete />
                </button>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default Data;
