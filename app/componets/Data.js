// import React, { useEffect, useState } from "react";
// import { IoIosAddCircle } from "react-icons/io";
// import { MdDelete } from "react-icons/md";
// const Data = () => {
//   const URL = "/api";
//   const [fetdata, setFetdata] = useState([]);
//   const [task, setTask] = useState("");
//   const [load, setLoad] = useState(true);

//   const handelcheck = async (val, id) => {
//     const response = await fetch(URL, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ _id: id, checked: val }),
//     });
//     const responseData = await response.json();
//     const indexval = fetdata.findIndex((val) => val._id === id);
//     const oldarr = [...fetdata];
//     oldarr[indexval].checked = !oldarr[indexval].checked;
//     setFetdata([...oldarr]);
//   };
//   const handeladdtask = async () => {
//     const response = await fetch(URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ task: task }),
//     });
//     setTask("");
//     const resmes = await response.json();
//     setFetdata([...fetdata, resmes]);
//   };
//   const handeldelet = async (id) => {
//     const response = await fetch(URL, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ _id: id }),
//     });
//     const resmsg = await response.json();
//     const delarrval = fetdata.filter((val) => val._id !== id);
//     setFetdata(delarrval);
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(URL);
//         const data = await response.json();
//         setFetdata(data);
//         if (response) {
//           setLoad(false);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="maindiv">
//       <div className="top">
//         <input
//           type="text"
//           onChange={(e) => setTask(e.target.value)}
//           value={task}
//           placeholder="Add"
//         />{" "}
//         <button onClick={handeladdtask}>
//           <IoIosAddCircle />
//         </button>
//       </div>
//       <ul>
//         {fetdata.length === 0 ? (
//           <p className="pp">{load ? "Loading..." : "ADD YOUR TODO"}</p>
//         ) : (
//           fetdata.map((val) => {
//             return (
//               <li key={val._id} className="col">
//                 <input
//                   type="checkbox"
//                   onChange={() => handelcheck(!val.checked, val._id)}
//                   checked={val.checked}
//                 />
//                 <p
//                   style={{
//                     textDecoration: val.checked ? "line-through" : "none",
//                   }}
//                 >
//                   {val.task}
//                 </p>
//                 <button onClick={() => handeldelet(val._id)}>
//                   {" "}
//                   <MdDelete />
//                 </button>
//               </li>
//             );
//           })
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Data;

import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const Data = () => {
  const URL = "/api";
  const [fetdata, setFetdata] = useState([]);
  const [task, setTask] = useState("");
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(URL);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setFetdata(data);
      setLoad(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data.");
      setLoad(false);
    }
  };

  const handelcheck = async (val, id) => {
    try {
      const response = await fetch(URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id, checked: val }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const responseData = await response.json();
      const updatedData = fetdata.map((item) =>
        item._id === id ? { ...item, checked: !item.checked } : item
      );
      setFetdata(updatedData);
    } catch (error) {
      console.error("Error updating task:", error);
      setError("Failed to update task.");
    }
  };

  const handeladdtask = async () => {
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const newTask = await response.json();
      setFetdata([...fetdata, newTask]);
      setTask("");
    } catch (error) {
      console.error("Error adding task:", error);
      setError("Failed to add task.");
    }
  };

  const handeldelet = async (id) => {
    try {
      const response = await fetch(URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      setFetdata(fetdata.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task.");
    }
  };

  useEffect(() => {
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
      {error && <p className="error">{error}</p>}
      <ul>
        {fetdata.length === 0 ? (
          <p className="pp">{load ? "Loading..." : "ADD YOUR TODO"}</p>
        ) : (
          fetdata.map((val) => (
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
                <MdDelete />
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Data;
