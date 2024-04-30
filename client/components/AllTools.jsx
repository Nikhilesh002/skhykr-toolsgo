import axios from "axios";
import { useEffect, useState } from "react";
import './AllTools.css';

const AllTools = () => {
  const [tools, setTools] = useState([]);
  const [newTool, setNewTool] = useState({
    toolid: "",
    ownername: "",
    toolname: "",
    cost: "",
    location: "",
  });

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const response = await axios.get("http://localhost:4000/tools-api/tools");
      console.log(response);
      setTools(response.data.payload);
    } catch (error) {
      console.error("Error fetching tools:", error);
    }
  };

  const deleteTool = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/tools-api/delete-id/${id}`);
      setTools(tools.filter((tool) => tool.toolid !== id));
      // refresh website
      location.reload();
    } catch (error) {
      console.error("Error deleting tool:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.post("http://localhost:4000/tools-api/update", newTool);
      fetchTools();
      setNewTool({
        toolid: "",
        ownername: "",
        toolname: "",
        cost: "",
        location: "",
      });
    } catch (error) {
      console.error("Error updating tool:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTool((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/tools-api/register", newTool);
      // Refresh tools after registration
      fetchTools();
      // Clear the form
      setNewTool({
        toolid: "",
        ownername: "",
        toolname: "",
        cost: "",
        location: "",
      });
    } catch (error) {
      console.error("Error registering tool:", error);
    }
  };

  return (
    <div className="bgImg">
      <div className="container py-5">

      <div className="w-50 container bg-white border shadow-lg rounded-4">
        <h2 className="pt-4 mb-3 text-center">Add New Tool</h2>
        <form className="mb-5" onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" className="form-control" name="ownername" value={newTool.ownername} placeholder="Owner Name" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" name="toolname" value={newTool.toolname} placeholder="Tool Name" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="number" className="form-control" name="cost" value={newTool.cost} placeholder="Cost" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="text" className="form-control" name="location" value={newTool.location} placeholder="Location" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Register Tool</button>
        </form>
      </div>

      <h2 className="mb-3 text-center mt-3">All Tools</h2>
      <div className="d-grid ">
        <div className="row w-100 gap-3 row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 ">
        {tools.map((tool) => (
          <div key={tool.toolid} className="card shadow pt-2 p-1 text-center" style={{width:'400px',height:'220px'}}>
            <p>Owner Name: {tool.ownername}</p>
            <p>Tool Name: {tool.toolname}</p>
            <p>Cost: {tool.cost}</p>
            <p>Location: {tool.location}</p>
            <button
              onClick={() => deleteTool(tool.toolid)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        ))}
        </div>
      </div>

      </div>
    </div>
  );
};

export default AllTools;
