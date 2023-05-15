import uniqid from "uniqid";

const defaultCase = createPerson("Уильям", "Гейтс III", "Генри", "28/10/1955", "male");

const child1 = createPerson("Фиби", "Гейтс", "Адель", "14/09/2002", "female");
const child2 = createPerson("Дженнифер", "Гейтс", "Катарин", "25/04/2020", "female");
const child3 = createPerson("Рори", "Гейтс", "Джон", "14/05/2002", "male");
const child4 = createPerson("Кристи", "Гейтс", "Лейла", "14/05/2005", "female");


const parent1 = createPerson("Уильям", "Гейтс II", "Генри", "30/11/1925", "male");
const parent2 = createPerson("Мэри", "Гейтс", "Максвелл", "05/07/1929", "male");

const children = {
  [child1.id]: child1,
  [child2.id]: child2,
  [child3.id]: child3,
  [child4.id]: child4,
}

const parents = {
  [parent1.id]: parent1,
  [parent2.id]: parent2,
}

defaultCase.children.push(child3.id);
defaultCase.children.push(child1.id);
defaultCase.children.push(child4.id);

child3.parents.push(defaultCase.id);
child1.parents.push(defaultCase.id);
child4.parents.push(defaultCase.id);

defaultCase.parents.push(parent1.id);
defaultCase.parents.push(parent2.id);

child1.children.push(child2.id);
child2.parents.push(child1.id)

export default function createPerson(firstName, lastName, fatherName, dateOfBirth, gender) {
  return {
    id: uniqid(),
    firstName,
    lastName,
    fatherName,
    dateOfBirth,
    gender,
    children: [],
    parents: [],
  }
}

export { defaultCase, children, parents };