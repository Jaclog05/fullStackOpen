import axios from "axios";

const baseUrl = '/api/persons'

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

const updatePerson = (id, personObject) => {
  const promise = axios.put(`${baseUrl}/${id}`, personObject)
  return promise.then(response => response.data)
}

export default {
  getAll,
  create,
  deletePerson,
  updatePerson
}