import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";

const ModalCapital = ({ onClose, id, capital }) => {
  const { createCapital,updateCapital } = useTasks();
  const [inputValue, setInputValue] = useState("");

  document.body.style.overflow = "hidden";

  const handleOnClose = (e) => {
    if (e.target.id === "container"){
      document.body.style.overflow = "visible";
      onClose();
    } 
  };

  const handleSubmit = async (event) => {
    document.body.style.overflow = "visible";
    event.preventDefault();
    if (!capital) {
      let data = new FormData();
      data.append("nombre", inputValue);
      data.append("id", id);
      createCapital(data);
      setInputValue("");
      onClose();
    } else {
      updateCapital(id,inputValue);
      setInputValue("");
      onClose();
    }
  };

  return (
    <div
      id="container"
      onClick={handleOnClose}
      className="fixed inset-0 bg-neutral-500 bg-opacity-75 flex items-center justify-center "
    >
      <div className="flex flex-col  border border-gray-100 rounded-lg bg-white max-w-xl w-1/2 h-1/4 justify-center">
        <div className="container mx-auto px-4">
          <div className="text-4xl pb-10">Capital</div>
          <form onSubmit={handleSubmit} className="flex items-center space-x-4">
            <input
              type="text"
              className="border border-gray-300 rounded-md w-full p-2"
              placeholder="Escribe aquí"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCapital;
