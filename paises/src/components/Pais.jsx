import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import ModalCapital from "./ModalCapital";
import ModalPais from "./ModalPais";

export const Pais = ({ data }) => {
  const { deleteCapital, deletePais } = useTasks();
  const [visibleModalCapital, setVisibleModalCapital] = useState(false);
  const [visibleModalPais, setVisibleModalPais] = useState(false);
  const { id_pais, pais, capital } = data;

  return (
    <li className="bg-gray-100 p-4 mb-2 rounded-md">
      <div className="flex items-center justify-between">
        <div className="mt-2">
          <strong>País:</strong> {pais}
        </div>
        <div>
          <button
            onClick={() => setVisibleModalCapital(true)}
            className="bg-green-500 text-white py-1 px-2 rounded-md mr-2"
          >
            {capital ? "Modificar" : "Agregar"} capital
          </button>
          <button
            onClick={() => setVisibleModalPais(true)}
            className="bg-yellow-500 text-white py-1 px-2 rounded-md mr-2"
          >
            Editar país
          </button>
          <button
            onClick={() => deletePais(id_pais)}
            className="bg-red-500 text-white py-1 px-2 rounded-md mr-2"
          >
            Eliminar país
          </button>
          {capital && (
            <button
              onClick={() => deleteCapital(id_pais)}
              className="bg-red-800 text-white py-1 px-2 rounded-md"
            >
              Eliminar capital
            </button>
          )}
        </div>
      </div>
      <div className="mt-2">
        {capital && (
          <>
            <strong>Capital:</strong> {capital}
          </>
        )}
      </div>
      {visibleModalCapital && (
        <ModalCapital
          onClose={setVisibleModalCapital}
          id={id_pais}
          capital={capital}
        />
      )}
      {visibleModalPais && (
        <ModalPais
          onClose={setVisibleModalPais}
          id={id_pais}
        />
      )}
    </li>
  );
};
