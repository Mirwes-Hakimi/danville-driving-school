import { useInView, useStagger } from '../hooks/useInView'

const reviews = [
  { name: 'Tyler B.', location: 'Danville, CA', stars: 5, text: 'My mom made me do the Driver Education class even though I was against it. Now I would tell every teen to take it. I get it now — it actually teaches things that matter.' },
  { name: 'Mike R.', location: 'San Ramon, CA', stars: 5, text: 'Danville Driving School runs a good class, period. I have recommended them to every parent and student I know. No fluff, just real instruction.' },
  { name: 'Jennifer K.', location: 'Alamo, CA', stars: 5, text: 'Confidence matters. We signed up with a cheaper online service but came back to Danville Driving School for the real classroom experience. Worth every penny.' },
  { name: 'Lisa M.', location: 'Danville, CA', stars: 5, text: "Most parents would be lying if they said they were ready to let their teenagers start to drive. Danville Driving School made us all feel prepared — both my kids and me!" },
  { name: 'David T.', location: 'Walnut Creek, CA', stars: 5, text: "I'll admit I was nervous about having my daughter go out for a driving lesson, but the instructor was so professional and patient. She passed the DMV test on the first try!" },
  { name: 'Rachel S.', location: 'Pleasanton, CA', stars: 5, text: 'Danville Driving School was there for our community when we needed them. Small business with a big heart. They truly care about the students they teach.' },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-4 h-4 ${i < count ? 'text-red-500' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  )
}

export default function Reviews() {
  const headRef = useInView()
  const cardsRef = useStagger()

  return (
    <section id="reviews" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={headRef} className="reveal text-center mb-14">
          <div className="inline-block bg-red-100 text-red-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-3">
            Student Reviews
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">What Our Students Say</h2>
          <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-5 py-3 shadow-sm mt-2">
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5"/>
            <Stars count={5} />
            <span className="font-bold text-slate-900">5.0</span>
            <span className="text-slate-500 text-sm">· Google Reviews</span>
          </div>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div key={i} data-stagger
              className="reveal bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex flex-col gap-3 hover-lift">
              <div className="flex items-center justify-between">
                <Stars count={r.stars} />
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 opacity-50"/>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed flex-1">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-700 font-bold text-sm shrink-0">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{r.name}</div>
                  <div className="text-slate-400 text-xs">{r.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
