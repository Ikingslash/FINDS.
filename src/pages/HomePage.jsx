import { useState } from "react";
import Navbar from "../components/Navbar";
import FeedView from "../components/FeedView";
import { HEADING_STROKE, SUBHEADING_STROKE, MUSIC_STROKE, MOVIES_STROKE, ART_STROKE, BOOKS_STROKE, OTHERS_STROKE } from "../constants";

function HomePage({ setModalOpen, items = [], view, setView, username, onDeleteFind, onEditFind }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState("add");

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-r from-[#EAF7EE] via-white to-[#F4F9F5]">
      <Navbar
        setModalOpen={setModalOpen}
        view={view}
        setView={setView}
        username={username}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main className="w-full flex flex-col">
        {view === "home" && (
          <div className="w-full flex flex-col items-center">

            {/* 1. HOMEPAGE HERO CONTAINER */}
            <section className="w-full max-w-6xl h-[calc(100vh-220px)] min-h-[380px] max-h-[520px] flex flex-col items-center justify-center text-center px-4 md:px-8 py-[60px] mx-auto">
              {/* Title */}
              <h1
                className="text-4xl md:text-6xl font-bold flex items-center justify-center gap-3 flex-wrap text-gray-900 text-center w-full"
                style={{ fontFamily: "'OpenRunde', sans-serif" }}
              >
                <span>Welcome to</span>
                <span
                  style={{
                    color: "#FFFFFF",
                    WebkitTextStroke: HEADING_STROKE,
                    paintOrder: "stroke fill",
                  }}
                >
                  FINDS
                </span>
              </h1>

              {/* Subtitle */}
              <h2
                className="text-lg md:text-xl mt-3 font-medium text-green-600 text-center w-full"
                style={{ fontFamily: "'OpenRunde', sans-serif" }}
              >
                Share the things that matter to you
              </h2>

              {/* CTA Button */}
              <button
                onClick={() => setModalOpen(true)}
                className="mt-8 px-7 py-3.5 bg-green-600 text-white font-semibold rounded-lg shadow-xs hover:bg-green-700 transition-colors cursor-pointer mx-auto"
                style={{ fontFamily: "'OpenRunde', sans-serif" }}
              >
                Get Started
              </button>
            </section>

            {/* 2. DASHBOARD CONTAINER */}
            <section className="w-full max-w-6xl px-4 md:px-8 py-6 md:py-10 flex justify-center mx-auto">
              <img
                src="/dashboard.png"
                alt="FINDS Dashboard View"
                className="w-full h-auto rounded-2xl border-0 shadow-none object-cover max-w-5xl"
              />
            </section>

            {/* 3. WHAT IS FINDS SECTION */}
            <section className="w-full max-w-6xl px-4 md:px-8 mt-16 md:mt-24 mb-20 flex flex-col items-center text-center mx-auto">
              <h5
                className="text-xl sm:text-2xl md:text-3xl font-extrabold flex items-center justify-center gap-2 text-gray-900 text-center uppercase leading-none"
                style={{ fontFamily: "'OpenRunde', sans-serif" }}
              >
                <span>What is</span>
                <span
                  style={{
                    color: "#FFFFFF",
                    WebkitTextStroke: HEADING_STROKE,
                    paintOrder: "stroke fill",
                  }}
                >
                  FINDS
                </span>
              </h5>

              <h2
                className="text-xl sm:text-2xl md:text-5xl font-black text-gray-900 mt-4 max-w-4xl text-center uppercase"
                style={{ fontFamily: "'OpenRunde', sans-serif" }}
              >
                FINDS Is A Tool That Helps You Organize All The Things You Love In One Place
              </h2>
            </section>

            {/* 4. BUILT FOR EVERY CATEGORY SECTION (Full-Width Background + Standard Max-Width Container) */}
            <section className="w-full bg-[#FAFAFA] py-16">
              <div className="w-full max-w-6xl px-4 md:px-8 flex flex-col items-center text-center mx-auto">

                {/* Header */}
                <div className="flex flex-col items-center mb-12 max-w-xl">
                  <h5
                    className="text-xl sm:text-2xl md:text-3xl font-extrabold flex items-center justify-center gap-2 text-gray-900 text-center uppercase leading-none"
                    style={{ fontFamily: "'OpenRunde', sans-serif" }}
                  >
                    <span>Built for every</span>
                    <span
                      style={{
                        color: "#FFFFFF",
                        WebkitTextStroke: HEADING_STROKE,
                        paintOrder: "stroke fill",
                      }}
                    >
                      Category
                    </span>
                  </h5>

                  <p
                    className="text-xs md:text-sm font-medium text-gray-700 mt-3 leading-snug"
                    style={{ fontFamily: "'OpenRunde', sans-serif" }}
                  >
                    Whether it’s the music you can’t stop playing, a trip that changed your perspective, there’s a place for it here....
                  </p>
                </div>

                {/* Category Cards Container */}
                <div className="w-full flex flex-col items-center gap-6">

                  {/* Top Row - 3 Uniform Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">

                    {/* 1. Music */}
                    <div className="w-full bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow flex flex-col text-left">
                      <div className="w-full h-44 sm:h-48 overflow-hidden">
                        <img
                          src="/music.png"
                          alt="Music"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5 sm:p-6 flex flex-col gap-1.5 flex-1 justify-between">
                        <div>
                          <h3
                            className="text-xl sm:text-2xl font-black leading-none"
                            style={{
                              fontFamily: "'OpenRunde', sans-serif",
                              color: "#FFFFFF",
                              WebkitTextStroke: MUSIC_STROKE,
                              paintOrder: "stroke fill",
                            }}
                          >
                            Music
                          </h3>
                          <p
                            className="text-xs sm:text-sm font-semibold text-gray-700 leading-snug mt-2"
                            style={{ fontFamily: "'OpenRunde', sans-serif" }}
                          >
                            From Metallica to Kanye West, share the sounds and artists that stay with you.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 2. Movies & TV */}
                    <div className="w-full bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow flex flex-col text-left">
                      <div className="w-full h-44 sm:h-48 overflow-hidden">
                        <img
                          src="/movies.png"
                          alt="Movies & TV"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5 sm:p-6 flex flex-col gap-1.5 flex-1 justify-between">
                        <div>
                          <h3
                            className="text-xl sm:text-2xl font-black leading-none"
                            style={{
                              fontFamily: "'OpenRunde', sans-serif",
                              color: "#FFFFFF",
                              WebkitTextStroke: MOVIES_STROKE,
                              paintOrder: "stroke fill",
                            }}
                          >
                            Movies &amp; TV
                          </h3>
                          <p
                            className="text-xs sm:text-sm font-semibold text-gray-700 leading-snug mt-2"
                            style={{ fontFamily: "'OpenRunde', sans-serif" }}
                          >
                            Share your thrillers, all-time favourites, and even your romcom heartthrob you're obsessed with.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 3. Art */}
                    <div className="w-full bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow flex flex-col text-left">
                      <div className="w-full h-44 sm:h-48 overflow-hidden">
                        <img
                          src="/art.png"
                          alt="Art"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5 sm:p-6 flex flex-col gap-1.5 flex-1 justify-between">
                        <div>
                          <h3
                            className="text-xl sm:text-2xl font-black leading-none"
                            style={{
                              fontFamily: "'OpenRunde', sans-serif",
                              color: "#FFFFFF",
                              WebkitTextStroke: ART_STROKE,
                              paintOrder: "stroke fill",
                            }}
                          >
                            Art
                          </h3>
                          <p
                            className="text-xs sm:text-sm font-semibold text-gray-700 leading-snug mt-2"
                            style={{ fontFamily: "'OpenRunde', sans-serif" }}
                          >
                            The artworks that stop you in your tracks, shift your perspective, and make you feel something you can't quite explain.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Row - 2 Centered Cards */}
                  <div className="w-full flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-[calc(66.666%+0.5rem)]">

                      {/* 4. Books */}
                      <div className="w-full bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow flex flex-col text-left">
                        <div className="w-full h-44 sm:h-48 overflow-hidden">
                          <img
                            src="/books.png"
                            alt="Books"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-5 sm:p-6 flex flex-col gap-1.5 flex-1 justify-between">
                          <div>
                            <h3
                              className="text-xl sm:text-2xl font-black leading-none"
                              style={{
                                fontFamily: "'OpenRunde', sans-serif",
                                color: "#FFFFFF",
                                WebkitTextStroke: BOOKS_STROKE,
                                paintOrder: "stroke fill",
                              }}
                            >
                              Books
                            </h3>
                            <p
                              className="text-xs sm:text-sm font-semibold text-gray-700 leading-snug mt-2"
                              style={{ fontFamily: "'OpenRunde', sans-serif" }}
                            >
                              The pages and stories that kept you up all night and completely changed how you see the world.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 5. Others */}
                      <div className="w-full bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow flex flex-col text-left">
                        <div className="w-full h-44 sm:h-48 overflow-hidden">
                          <img
                            src="/others.png"
                            alt="Others"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-5 sm:p-6 flex flex-col gap-1.5 flex-1 justify-between">
                          <div>
                            <h3
                              className="text-xl sm:text-2xl font-black leading-none"
                              style={{
                                fontFamily: "'OpenRunde', sans-serif",
                                color: "#FFFFFF",
                                WebkitTextStroke: OTHERS_STROKE,
                                paintOrder: "stroke fill",
                              }}
                            >
                              Others
                            </h3>
                            <p
                              className="text-xs sm:text-sm font-semibold text-gray-700 leading-snug mt-2"
                              style={{ fontFamily: "'OpenRunde', sans-serif" }}
                            >
                              For everything that defies a category, follows no rules, and deserves to be discovered anyway.
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* 5. HOW IT WORKS SECTION */}
            <section className="w-full max-w-6xl px-4 md:px-8 py-16 flex flex-col items-center text-center mx-auto">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold flex items-center justify-center gap-2 text-gray-900 leading-none tracking-tight"
                style={{ fontFamily: "'OpenRunde', sans-serif" }}
              >
                <span>How it</span>
                <span
                  style={{
                    color: "#FFFFFF",
                    WebkitTextStroke: HEADING_STROKE,
                    paintOrder: "stroke fill",
                  }}
                >
                  Works
                </span>
              </h2>

              {/* Step Toggle Buttons */}
              <div
                className="flex flex-wrap items-center justify-center gap-3 mt-8 mb-12"
                style={{ fontFamily: "'OpenRunde', sans-serif" }}
              >
                <button
                  type="button"
                  onClick={() => setActiveStep("add")}
                  className={`px-5 py-2.5 font-bold rounded-full text-sm transition-all cursor-pointer ${activeStep === "add"
                    ? "bg-green-600 text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  Add a Find
                </button>

                <button
                  type="button"
                  onClick={() => setActiveStep("details")}
                  className={`px-5 py-2.5 font-bold rounded-full text-sm transition-all cursor-pointer ${activeStep === "details"
                    ? "bg-green-600 text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  Enter your Details
                </button>

                <button
                  type="button"
                  onClick={() => setActiveStep("wrld")}
                  className={`px-5 py-2.5 font-bold rounded-full text-sm transition-all cursor-pointer ${activeStep === "wrld"
                    ? "bg-green-600 text-white shadow-xs"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  Create your Wrld
                </button>
              </div>

              {/* Three Phones Grid with Pop-out Effect */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-3xl items-start justify-items-center mx-auto">

                {/* Step 1: Phone 1 */}
                <div
                  onClick={() => setActiveStep("add")}
                  className={`flex flex-col items-center max-w-[220px] w-full cursor-pointer transition-all duration-300 transform ${activeStep === "add"
                    ? "scale-105 md:-translate-y-3 opacity-100 z-10"
                    : "scale-95 opacity-70 hover:opacity-90"
                    }`}
                >
                  <div className={`w-full max-w-[230px] md:max-w-[250px] flex justify-center transition-all ${activeStep === "add" ? "drop-shadow-2xl" : "drop-shadow-sm"
                    }`}>
                    <img
                      src="/phone-1.png"
                      alt="Add a Find"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <h3
                    className="text-xl md:text-2xl font-black mt-4 leading-none"
                    style={{
                      fontFamily: "'OpenRunde', sans-serif",
                      color: "#FFFFFF",
                      WebkitTextStroke: SUBHEADING_STROKE,
                      paintOrder: "stroke fill",
                    }}
                  >
                    Add A Find
                  </h3>
                  <p
                    className="text-xs font-semibold mt-2 leading-snug text-center max-w-[200px]"
                    style={{ fontFamily: "'OpenRunde', sans-serif" }}
                  >
                    Hop onto Finds and hit “Get Started” to add your first Find!
                  </p>
                </div>

                {/* Step 2: Phone 2 */}
                <div
                  onClick={() => setActiveStep("details")}
                  className={`flex flex-col items-center max-w-[220px] w-full cursor-pointer transition-all duration-300 transform ${activeStep === "details"
                    ? "scale-105 md:-translate-y-3 opacity-100 z-10"
                    : "scale-95 opacity-70 hover:opacity-90"
                    }`}
                >
                  <div className={`w-full max-w-[230px] md:max-w-[250px] flex justify-center transition-all ${activeStep === "details" ? "drop-shadow-2xl" : "drop-shadow-sm"
                    }`}>
                    <img
                      src="/phone-2.png"
                      alt="Enter Your Details"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <h3
                    className="text-xl md:text-2xl font-black mt-4 leading-none"
                    style={{
                      fontFamily: "'OpenRunde', sans-serif",
                      color: "#FFFFFF",
                      WebkitTextStroke: SUBHEADING_STROKE,
                      paintOrder: "stroke fill",
                    }}
                  >
                    Enter Your Details
                  </h3>
                  <p
                    className="text-xs font-semibold mt-2 leading-snug text-center max-w-[200px]"
                    style={{ fontFamily: "'OpenRunde', sans-serif" }}
                  >
                    Spill the details! Fill in your Find’s info and bring it to life.
                  </p>
                </div>

                {/* Step 3: Phone 3 */}
                <div
                  onClick={() => setActiveStep("wrld")}
                  className={`flex flex-col items-center max-w-[220px] w-full cursor-pointer transition-all duration-300 transform ${activeStep === "wrld"
                    ? "scale-105 md:-translate-y-3 opacity-100 z-10"
                    : "scale-95 opacity-70 hover:opacity-90"
                    }`}
                >
                  <div className={`w-full max-w-[230px] md:max-w-[250px] flex justify-center transition-all ${activeStep === "wrld" ? "drop-shadow-2xl" : "drop-shadow-sm"
                    }`}>
                    <img
                      src="/phone-3.png"
                      alt="Create Your Wrld"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <h3
                    className="text-xl md:text-2xl font-black mt-4 leading-none"
                    style={{
                      fontFamily: "'OpenRunde', sans-serif",
                      color: "#FFFFFF",
                      WebkitTextStroke: SUBHEADING_STROKE,
                      paintOrder: "stroke fill",
                    }}
                  >
                    Create Your Wrld
                  </h3>
                  <p
                    className="text-xs font-semibold mt-2 leading-snug text-center max-w-[200px]"
                    style={{ fontFamily: "'OpenRunde', sans-serif" }}
                  >
                    Explore your wrld! Discover, collect, and share all your Finds. Your next fave discovery is out there!
                  </p>
                </div>

              </div>
            </section>

            {/* 6. FINAL CTA & FOOTER SECTION */}
            <section className="w-full max-w-6xl px-4 md:px-8 pt-20 pb-12 flex flex-col items-center text-center mx-auto">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold flex flex-col items-center justify-center gap-2 text-gray-900 leading-none text-center"
                style={{ fontFamily: "'OpenRunde', sans-serif" }}
              >
                <span>Ready to experience the</span>
                <span
                  style={{
                    color: "#FFFFFF",
                    WebkitTextStroke: HEADING_STROKE,
                    paintOrder: "stroke fill",
                  }}
                >
                  Gooood Life
                </span>
              </h2>

              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="mt-8 px-8 py-3.5 bg-green-600 text-white font-bold rounded-xl shadow-xs hover:bg-green-700 transition-colors cursor-pointer text-base md:text-lg"
                style={{ fontFamily: "'OpenRunde', sans-serif" }}
              >
                Get Started
              </button>

              <div className="mt-24 w-full flex justify-center border-t border-transparent pt-4">
                <p
                  className="text-xs md:text-sm font-medium text-gray-400 text-center"
                  style={{ fontFamily: "'OpenRunde', sans-serif" }}
                >
                  © 2026 Pablo Jane Products . All rights reserved.
                </p>
              </div>
            </section>

          </div>
        )}

        {view === "feed" && (
          <>
            <FeedView
              items={items}
              onDeleteFind={onDeleteFind}
              onEditFind={onEditFind}
            />

            <div className="md:hidden fixed bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none">
              <button
                onClick={() => setModalOpen(true)}
                className="px-5 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-xs hover:bg-green-700 pointer-events-auto cursor-pointer"
              >
                <div className="text-2xl">+</div>
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default HomePage;