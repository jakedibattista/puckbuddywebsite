
"use client";

export default function Home() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <iframe
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
        src="https://www.youtube.com/embed/CQrJG1xyXUE?autoplay=1&loop=1&mute=1&playlist=CQrJG1xyXUE&controls=0&showinfo=0&autohide=1"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />

      <div className="absolute inset-0 bg-black opacity-50" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-6xl font-bold mb-4">Puckbuddy</h1>
        <p className="text-2xl mb-8">
          Because everyone needs a Puck Buddy
        </p>
        <p className="text-xl mb-8">
          Coming soon! Sign up to get notified when we launch.
        </p>

        <div className="flex flex-col items-center space-y-4">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfuzAHzlNInvbxn8fCKJm05Q-IzOnrBPrGvC5vCCP06M102NQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get Notified When We Launch
          </a>
          <p className="text-sm text-gray-300 opacity-80">
            Opens in a new tab • Takes 10 seconds
          </p>
        </div>
      </div>
    </div>
  );
}
