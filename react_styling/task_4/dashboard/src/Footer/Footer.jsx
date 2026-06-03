import { getCurrentYear, getFooterCopy } from '../utils/utils.js'

export default function Footer() {
  return (
    <footer className="App-footer mt-auto flex justify-center border-t-2 border-[var(--main-color)] py-4 text-center">
      <p className="italic text-xs sm:text-sm md:text-base">
        Copyright {getCurrentYear()} - {getFooterCopy(false)}
      </p>
    </footer>
  )
}
