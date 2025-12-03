import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({course}) => {

  const initialValue = 0;
  const total = course.parts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.exercises
  }, initialValue)

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total} />
    </>
  );
};

export default Course;