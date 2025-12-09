import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const promise = axios.get(baseUrl)
  return promise.then(response => response.data)
}

const create = (personObject) => {
  const promise = axios.post(baseUrl, personObject)
  return promise.then(response => response.data)
}

const deletePerson = (id) => {
  const promise = axios.delete(`${baseUrl}/${id}`)
  return promise.then(response => response.data)
}

export default {
  getAll,
  create,
  deletePerson
}