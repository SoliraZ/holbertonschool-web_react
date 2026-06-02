import WithLogging from '../HOC/WithLogging.jsx'
import CourseListRow from './CourseListRow.jsx'

function CourseList({ courses = [] }) {
  return (
    <div className="App-body">
      <div className="mx-auto mt-8 w-[80vw]">
        <table className="w-full">
          {courses.length === 0 ? (
            <thead>
              <CourseListRow isHeader={true} textFirstCell="No course available yet" />
            </thead>
          ) : (
            <>
              <thead>
                <CourseListRow isHeader={true} textFirstCell="Available courses" />
                <CourseListRow
                  isHeader={true}
                  textFirstCell="Course name"
                  textSecondCell="Credit"
                />
              </thead>
              <tbody>
                {courses.map((course) => (
                  <CourseListRow
                    key={course.id}
                    textFirstCell={course.name}
                    textSecondCell={course.credit}
                  />
                ))}
              </tbody>
            </>
          )}
        </table>
      </div>
    </div>
  )
}

export default WithLogging(CourseList)
