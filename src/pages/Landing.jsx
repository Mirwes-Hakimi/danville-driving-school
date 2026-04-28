import Hero from '../components/Hero'
import Stats from '../components/Stats'
import Services from '../components/Services'
import About from '../components/About'
import Fleet from '../components/Fleet'
import Pricing from '../components/Pricing'
import Reviews from '../components/Reviews'
import ServiceArea from '../components/ServiceArea'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'

export default function Landing() {
  return (
    <main className="pb-20 md:pb-0">
      <Hero />
      <Stats />
      <Services />
      <Pricing />
      <About />
<Fleet />
      <Reviews />
      <ServiceArea />
      <FAQ />
      <Contact />
    </main>
  )
}
