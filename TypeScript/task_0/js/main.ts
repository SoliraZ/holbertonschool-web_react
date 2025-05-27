interface Student {
  firstName: string;
  lastName: string;
  age: number;
  location: string;
}

const student1: Student = {
  firstName: "Patrick",
  lastName: "Davis",
  age: 24,
  location: "Lyon",
};

const student2: Student = {
  firstName: "Carlita",
  lastName: "Patterson",
  age: 49,
  location: "London",
};

const studentsList: Student[] = [student1, student2];

document.addEventListener("DOMContentLoaded", () => {
  const table: HTMLTableElement = document.createElement("table");
  const TableBody: HTMLTableSectionElement = document.createElement("tbody");
  const header: HTMLTableRowElement = document.createElement("tr");
  const FirstName: HTMLTableCellElement = document.createElement("th");
  const Location: HTMLTableCellElement = document.createElement("th");

  header.appendChild(FirstName);
  header.appendChild(Location);
  TableBody.appendChild(header);

  studentsList.forEach((student) => {
    const row: HTMLTableRowElement = document.createElement("tr");

    const firstName: HTMLTableCellElement = document.createElement("td");
    firstName.textContent = student.firstName;
    row.appendChild(firstName);

    const location: HTMLTableCellElement = document.createElement("td");
    location.textContent = student.location;
    row.appendChild(location);

    TableBody.appendChild(row);
  });

  table.appendChild(TableBody);

  document.body.appendChild(table);
});
