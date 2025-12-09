import Person from "./Person";

function PersonsList({ filteredPersons, handleDelete }) {
  return (
    <>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          onDelete={() => handleDelete(person.id)}
        />
      ))}
    </>
  );
}

export default PersonsList;
