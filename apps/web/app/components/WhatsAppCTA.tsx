import React from "react";

const WHATSAPP_LINK = "https://chat.whatsapp.com/C2AIJysYM5SIE7OIhZCkm7";

export default function WhatsAppCTA() {
  return (
    <section
      className="w-full my-8 sm:my-10 md:my-12 flex flex-col items-center"
      aria-label="WhatsApp Community CTA"
    >
      <div className="bg-batter-gold/90 rounded-xl shadow-lg px-6 py-8 sm:px-10 sm:py-10 md:px-16 md:py-12 flex flex-col items-center max-w-2xl w-full border-2 border-batter-gold">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-batter-brown mb-3 text-center">
          Stay in the loop
        </h2>
        <p className="text-batter-brown/90 text-base sm:text-lg md:text-xl mb-6 text-center max-w-md">
          Fresh batches every week. Follow group for offers and delivery schedules.
        </p>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold text-lg sm:text-xl px-6 py-3 rounded-full shadow hover:shadow-md transition-all duration-200"
        >
          Join on WhatsApp
        </a>
      </div>
    </section>
  );
}
