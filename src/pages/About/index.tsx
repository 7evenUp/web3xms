import Contacts from "./components/Contacts"
import Ecosystem from "./components/Ecosystem"
import Organizators from "./components/Organizators"
import Partners from "./components/Partners"
import Sponsors from "./components/Sponsors"

const About = () => {
  return (
    <section className="bg-gray p-2.5 2xl:p-[15px] overflow-hidden">
      <div className="relative min-h-[calc(100vh-20px)] 2xl:min-h-[calc(100vh-30px)] bg-black flex flex-col gap-3 2xl:gap-4 3xl:gap-5 items-center pt-20 phone:pt-[14.06vw] pb-[140px] 2xl:pb-[160px] 3xl:pb-[200px]">
        <div className="title-bg absolute top-0" />

        <Organizators />
        <Sponsors />
        <Partners />
        <Ecosystem />
        <Contacts />
      </div>
    </section>
  )
}

export default About
