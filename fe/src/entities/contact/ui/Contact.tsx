import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

import { SiTistory, SiGmail } from "react-icons/si";

import { Link } from "react-router-dom";

export default function Contact() {
  return (
    <div className="h-[60vh] backdrop-blur-lg w-[60vw] flex flex-col justify-center items-center">
      <h1 className="py-4 text-4xl font-bold">Contact Me</h1>

      <article className="grid grid-cols-[1fr_3fr] gap-y-2">
        <>
          <div>
            <SiGmail />
          </div>
          <div>
            <Link
              to="#"
              target="_blank"
              onClick={(e) => {
                window.location.href = "mailto:blackberry1114@naver.com";
                e.preventDefault();
              }}
            >
              Send Email
            </Link>
          </div>
        </>
        <>
          <div>
            <FaGithub />
          </div>
          <div>
            <Link to="https://github.com/JongMany" target="_blank">
              JongMany Github
            </Link>
          </div>
        </>
        <>
          <div>
            <FaInstagram />
          </div>
          <div>
            <Link
              to="https://www.instagram.com/homebody_coder/"
              target="_blank"
            >
              @homebody_coder
            </Link>
          </div>
        </>
        <>
          <div>
            <SiTistory />
          </div>
          <div>
            <Link to="https://homebody-coder.tistory.com/" target="_blank">
              Tech Blog
            </Link>
          </div>
        </>
        <>
          <div>
            <FaLinkedin />
          </div>
          <div>
            <Link
              to="https://www.linkedin.com/in/%EC%A2%85%EB%AF%BC-%EC%9D%B4-557572284/"
              target="_blank"
            >
              LinkedIn
            </Link>
          </div>
        </>
      </article>
    </div>
  );
}
