import { getCurrentYear, getFooterCopy } from '../utils/utils.js'
import newContext from '../Context/context.js'

export default function Footer() {
  return (
    <newContext.Consumer>
      {({ user }) => (
        <footer className="App-footer mt-auto flex flex-col items-center justify-center border-t-2 border-[var(--main-color)] py-4 text-center">
          <p className="italic text-xs sm:text-sm md:text-base">
            Copyright {getCurrentYear()} - {getFooterCopy(false)}
          </p>
          {user.isLoggedIn ? (
            <p>
              <a href="#">Contact us</a>
            </p>
          ) : null}
        </footer>
      )}
    </newContext.Consumer>
  )
}
