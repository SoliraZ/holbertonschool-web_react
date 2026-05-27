function CourseList({ courses = [] }) {
  return (
    <div className="App-body">
      <p>Available courses</p>
      <table>
        <thead>
          <tr>
            <th>Course name</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.credit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CourseList
