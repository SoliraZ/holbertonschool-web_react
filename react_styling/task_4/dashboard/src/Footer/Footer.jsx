import { getCurrentYear, getFooterCopy } from '../utils/utils.js'

export default function Footer() {
  return (
    <footer className="App-footer mt-auto flex shrink-0 justify-center border-t-[3px] border-[var(--main-color)] bg-white px-6 py-4 text-center">
      <p className="m-0 text-xs italic font-normal text-black sm:text-sm md:text-base">
        Copyright {getCurrentYear()} - {getFooterCopy(false)}
      </p>
    </footer>
  )
}
