import CourseListRow from './CourseListRow.jsx'

function CourseListContent({ courses = [] }) {
  return (
    <div className="App-body">
      <div className="mx-auto mt-8 w-4/5">
        <table className="w-full">
          <thead>
            <CourseListRow isHeader={true} textFirstCell="Available courses" />
            <CourseListRow
              isHeader={true}
              textFirstCell="Course name"
              textSecondCell="Credit"
            />
          </thead>
          <tbody>
            {courses.length === 0 ? (
              <CourseListRow isHeader={true} textFirstCell="No course available yet" />
            ) : (
              courses.map((course) => (
                <CourseListRow
                  key={course.id}
                  textFirstCell={course.name}
                  textSecondCell={course.credit}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CourseListContent
