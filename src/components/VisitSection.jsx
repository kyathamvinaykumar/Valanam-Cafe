import React from 'react';


export default function VisitSection() {
  return (
    <>
      <hr className="border-none border-t border-royalLine m-0" />
      <section className="bg-dark px-6 py-[clamp(60px,10vh,100px)] flex flex-col justify-center items-center" id="visit">
        <p className="reveal font-playfair italic text-[clamp(1.2rem,2vw,1.6rem)] text-parchment text-center mb-0">
          "Come as a stranger. Leave as a regular."
        </p>
      </section>
    </>
  );
}
