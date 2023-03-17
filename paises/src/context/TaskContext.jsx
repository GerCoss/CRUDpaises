import { createContext, useContext, useState } from "react";
import {
  createCapitalRequest,
  createTaskRequest,
  deleteTaskRequest,
  deleteTaskRequestCapital,
  getTasksRequest,
  updateTaskRequest,
  updateTaskRequestPais,
} from "../api/task.api";

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskContextProvider");
  }
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  async function loadTask() {
    const response = await getTasksRequest();
    setData(response.data);
    console.log('loadTask')
  }

  const deletePais = async (id) => {
    try {
      await deleteTaskRequest(id);
      loadTask();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCapital = async (id) => {
    try {
      await deleteTaskRequestCapital(id);
      loadTask();
    } catch (error) {
      console.log(error);
    }
  };

  const createCapital = async (data) => {
    try {
      const response = await createCapitalRequest(data);
      loadTask();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const createPais = async (data) => {
    try {
        const response = await createTaskRequest(data);
        console.log(response);
        loadTask();
      } catch (error) {
        console.log(error);
      }
  };

  const updateCapital = async (id, inputValue) => {
    try {
      await updateTaskRequest(id, inputValue);
      loadTask();
    } catch (error) {
      console.log(error);
    }
  };

  const updatePais = async (id, inputValue) => {
    try {
      await updateTaskRequestPais(id, inputValue);
      loadTask();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        data,
        loadTask,
        deleteCapital,
        deletePais,
        createCapital,
        updateCapital,
        updatePais,
        createPais
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
