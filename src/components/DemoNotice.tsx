import { Link } from "react-router-dom"

const DemoNotice = () => (
  <div className="fixed z-30 bottom-3 left-3 max-w-[calc(100vw-24px)] rounded-lg border border-white/20 bg-black/90 px-3 py-2 text-white font-circe-bold shadow-lg">
    <span className="text-xs">Портфолио-демо · виртуальные призы</span>
    <Link to="/quest/phase-3" className="ml-3 text-xs text-yellow underline underline-offset-2">Кейсы →</Link>
  </div>
)
export default DemoNotice
