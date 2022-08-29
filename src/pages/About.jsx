import { BsGithub, BsLinkedin } from "react-icons/bs";
import NavBar from "../components/NavBar";

export default function About() {
  return (
    <div>
      <NavBar />
      <div className="bg-white">
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="mx-auto mb-10 lg:max-w-xl sm:text-center">
            <p className="inline-block px-3 py-px mb-4 text-xl font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400 ">
              Dream Team
            </p>
          </div>
          <div className="gap-10 mx-auto lg:max-w-screen-lg sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-row items-center justify-center my-8">
              <div className="flex flex-col items-center mx-6">
                <img
                  className="object-cover w-20 h-20 mb-2 rounded-full shadow"
                  src="https://avatars.githubusercontent.com/u/77481421?v=4"
                  alt="Person"
                />
                <div className="flex flex-col items-center mx-6">
                  <p className="text-lg font-bold">Daniel Avila</p>
                  <div className="flex">
                    <a href="https://github.com/sdin2" className="px-2 py-1">
                      <BsGithub />
                    </a>
                    <a href="#" className="px-2 py-1">
                      <BsLinkedin />
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center mx-6">
                <img
                  className="object-cover w-20 h-20 mb-2 rounded-full shadow"
                  src="https://avatars.githubusercontent.com/u/89920583?v=4"
                  alt="Person"
                />
                <div className="flex flex-col items-center mx-6">
                  <p className="text-lg font-bold">Facundo Faccioli</p>
                  <div className="flex">
                    <a href="https://github.com/facuf18" className="px-2 py-1">
                      <BsGithub />
                    </a>
                    <a href="#" className="px-2 py-1">
                      <BsLinkedin />
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center mx-6">
                <img
                  className="object-cover w-20 h-20 mb-2 rounded-full shadow"
                  src="https://avatars.githubusercontent.com/u/83725367?v=4"
                  alt="Person"
                />
                <div className="flex flex-col items-center mx-6">
                  <p className="text-lg font-bold">Federico Valdez</p>
                  <div className="flex">
                    <a
                      href="https://github.com/fvaldezz96"
                      className="px-2 py-1"
                    >
                      <BsGithub />
                    </a>
                    <a href="#" className="px-2 py-1">
                      <BsLinkedin />
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center mx-6">
                <img
                  className="object-cover w-20 h-20 mb-2 rounded-full shadow"
                  src="https://avatars.githubusercontent.com/u/96742221?v=4"
                  alt="Person"
                />
                <div className="flex flex-col items-center mx-6">
                  <p className="text-lg font-bold">Francisco Fernández</p>
                  <div className="flex">
                    <a href="https://github.com/TotiFz" className="px-2 py-1">
                      <BsGithub />
                    </a>
                    <a href="#" className="px-2 py-1">
                      <BsLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center">
              <div className="flex flex-col items-center mx-6">
                <img
                  className="object-cover w-20 h-20 mb-2 rounded-full shadow"
                  src="https://avatars.githubusercontent.com/u/94920569?v=4"
                  alt="Person"
                />
                <div className="flex flex-col items-center mx-6">
                  <p className="text-lg font-bold">Mateo Solá</p>
                  <div className="flex">
                    <a
                      href="https://github.com/Matusola01"
                      className="px-2 py-1"
                    >
                      <BsGithub />
                    </a>
                    <a href="#" className="px-2 py-1">
                      <BsLinkedin />
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center mx-6">
                <img
                  className="object-cover w-20 h-20 mb-2 rounded-full shadow"
                  src="https://avatars.githubusercontent.com/u/91898474?v=4"
                  alt="Person"
                />
                <div className="flex flex-col items-center mx-6">
                  <p className="text-lg font-bold">Patricio Alassia</p>
                  <div className="flex">
                    <a href="https://github.com/Patoad" className="px-2 py-1">
                      <BsGithub />
                    </a>
                    <a href="#" className="px-2 py-1">
                      <BsLinkedin />
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center mx-6">
                <img
                  className="object-cover w-20 h-20 mb-2 rounded-full shadow"
                  src="https://avatars.githubusercontent.com/u/90922661?v=4"
                  alt="Person"
                />
                <div className="flex flex-col items-center mx-6">
                  <p className="text-lg font-bold">Sebastian Valencia </p>
                  <div className="flex">
                    <a href="https://github.com/eseval" className="px-2 py-1">
                      <BsGithub />
                    </a>
                    <a href="#" className="px-2 py-1">
                      <BsLinkedin />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
