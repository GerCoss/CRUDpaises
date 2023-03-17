import { useEffect, useState } from "react";
import "./App.css";
import { Pais } from "./components/Pais";
import { useTasks } from "./context/TaskContext";

function App() {

  const {data, loadTask, createPais} = useTasks();

  useEffect(() => {
    loadTask()
  }, [])
  
  const [pais, setPais] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("nombre", pais);
    createPais(data);
    setPais('');
  };

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-xl font-bold mb-4">CRUD de países y capitales</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center mb-4">
            <input
              type="text"
              className="border border-gray-300 rounded-md w-full p-2"
              placeholder="Ingresa un país"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white ml-2 py-2 px-4 rounded-md"
            >
              Agregar país
            </button>
          </div>
        </form>
        <ul>
          {data.map((pais) => (
            <Pais key={pais.id_pais} data={pais} fun={loadTask}/>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
