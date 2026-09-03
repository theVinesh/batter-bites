import React from "react";

const WHATSAPP_LINK = "https://chat.whatsapp.com/C2AIJysYM5SIE7OIhZCkm7";

export default function WhatsAppCTA() {
  return (
    <section
      className="w-full my-8 sm:my-10 md:my-12 flex flex-col items-center"
      aria-label="Join WhatsApp Group CTA"
    >
      <div className="bg-batter-gold/90 rounded-xl shadow-lg px-6 py-8 sm:px-10 sm:py-10 md:px-16 md:py-12 flex flex-col items-center max-w-2xl w-full border-2 border-batter-gold">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-batter-brown mb-3 text-center">
          Join Batter Bites on WhatsApp!
        </h2>
        <p className="text-batter-brown/90 text-base sm:text-lg md:text-xl mb-4 text-center max-w-md">
          Be the first to get fresh batches, weekly specials, and place your orders directly with us.
        </p>

        <div className="bg-white/80 rounded-lg p-3 sm:p-4 mb-6 text-xs sm:text-sm text-batter-brown border border-batter-brown/20 text-center w-full max-w-md">
          <p className="font-semibold text-batter-brown mb-1">📋 Order Information</p>
          <div className="grid grid-cols-2 gap-2 text-batter-brown/90 text-xs">
            <div>• Min batter order: <b>1 kg</b></div>
            <div>• Delivery fee: <b>€1.00</b></div>
            <div className="col-span-2">• Order cancellation fee: <b>€1.00</b></div>
          </div>
        </div>

        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold text-lg sm:text-xl px-6 py-3 rounded-full shadow hover:shadow-md transition-all duration-200"
        >
          Order on WhatsApp
        </a>
      </div>
    </section>
  );
}
