
import axios from "axios";

export const getTasksRequest = async () =>
  await axios.get("http://localhost/paises/");

export const createTaskRequest = async (task) =>
  await axios.post("http://localhost/paises/", task);

export const createCapitalRequest = async (task) =>
  await axios.post("http://localhost/paises/", task);

export const deleteTaskRequest = async (id) =>
  await axios.delete(`http://localhost/paises/?id=${id}`);

export const deleteTaskRequestCapital = async (id) =>
  await axios.delete(`http://localhost/paises/?id_cap=${id}`);

export const updateTaskRequest = async (id, nombre) =>
  await axios.put(`http://localhost/paises/?id_cap=${id}&nombre=${nombre}`);

export const updateTaskRequestPais = async (id, nombre) =>
  await axios.put(`http://localhost/paises/?id=${id}&nombre=${nombre}`);
