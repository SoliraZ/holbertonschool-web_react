import { getCurrentYear, getFooterCopy } from '../utils/utils.js'

export default function Footer() {
  return (
    <footer className="App-footer mt-auto shrink-0 border-t-[3px] border-[var(--main-color)] bg-white px-6 py-4 text-center">
      <p className="m-0 text-[0.95rem] italic font-normal text-black">
        Copyright {getCurrentYear()} - {getFooterCopy(true)}
      </p>
    </footer>
  )
}
