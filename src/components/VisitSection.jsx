import React from 'react';

const HOURS_DATA = [
  { day: 'Saturday', time: '10:30 am – 11 pm', weekend: true },
  { day: 'Sunday', time: '10:30 am – 11 pm', weekend: true },
  { day: 'Monday', time: '10:30 am – 10:30 pm', weekend: false },
  { day: 'Tuesday', time: '10:30 am – 10:30 pm', weekend: false },
  { day: 'Wednesday', time: '10:30 am – 10:30 pm', weekend: false },
  { day: 'Thursday', time: '10:30 am – 10:30 pm', weekend: false },
  { day: 'Friday', time: '10:30 am – 11 pm', weekend: true },
];

export default function VisitSection() {
  return (
    <>
      <hr className="border-none border-t border-royalLine m-0" />
      <section className="bg-dark px-6 py-[clamp(60px,10vh,100px)]" id="visit">
        <p className="reveal font-playfair italic text-[clamp(1.2rem,2vw,1.6rem)] text-parchment text-center mb-[60px]">
          "Come as a stranger. Leave as a regular."
        </p>
        <div className="flex flex-col md:flex-row gap-[80px] max-w-[900px] mx-auto items-start">
          <div className="reveal flex-1">
            <h3 className="font-playfair text-[1.05rem] text-amber tracking-[0.2em] uppercase mb-5">
              Find Us
            </h3>
            <p className="font-playfair text-[1rem] leading-[2] text-parchment mb-6">
              Valanam Kitchen<br />
              Vidya Nagar, Vigyanapuri Colony, Adikmet<br />
              Hyderabad, Telangana 500044
            </p>

            <div className="font-inter text-[0.75rem] tracking-[0.25em] text-amber uppercase mb-3">
              HOURS
            </div>
            <div className="font-playfair text-[0.9rem] text-parchment italic mb-2.5">
              Valanam A Fabled Kitchen Cafe & Restaurant
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1">
              {HOURS_DATA.map((h, idx) => (
                <React.Fragment key={idx}>
                  <span className="font-inter text-[0.82rem] text-parchment opacity-65">
                    {h.day}
                  </span>
                  <span
                    className={`font-inter text-[0.82rem] text-parchment ${
                      h.weekend ? 'opacity-100 font-normal' : 'opacity-90'
                    }`}
                  >
                    {h.time}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="reveal reveal-d2 flex flex-col items-center justify-center flex-1 pt-2.5 w-full">
            <div className="w-full max-w-[480px] h-[300px] rounded-[8px] overflow-hidden border border-royalLine relative">
              <iframe
                src="https://www.openstreetmap.org/export/embed.html?bbox=78.4480,17.4400,78.4580,17.4470&layer=mapnik&marker=17.4435,78.4530"
                width="100%"
                height="340"
                style={{
                  border: 'none',
                  display: 'block',
                  filter: 'sepia(0.4) contrast(0.9) brightness(0.85)',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
                loading="lazy"
                title="Valanam Kitchen location"
              ></iframe>
            </div>
            <a
              className="block mt-4 text-amber font-inter text-[0.85rem] underline text-center"
              href="https://maps.app.goo.gl/rNxf2kxKSKkAjF8W6"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
