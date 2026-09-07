"use client";

import Image from "next/image";
import { useAppDispatch } from "@/lib/redux/hooks";
import { openAuthModal } from "@/lib/redux/slices/modalSlice";

export default function Landing() {
  const dispatch = useAppDispatch();

  return (
    <section id="landing">
      <div className="page-container">
        <div className="row">
          <div className="landing__wrapper">
            <div className="landing__content">
              <div className="landing__content__title">
                Gain more knowledge <br className="remove--tablet" />
                in less time
              </div>
              <div className="landing__content__subtitle">
                Great summaries for busy people,
                <br className="remove--tablet" />
                individuals who barely have time to read,
                <br className="remove--tablet" />
                and even people who don&apos;t like to read.
              </div>
              <button
                className="btn home__cta--btn"
                onClick={() => dispatch(openAuthModal("login"))}
              >
                Login
              </button>
            </div>
            <figure className="landing__image--mask">
              <Image
                src="/landing.png"
                alt="landing"
                width={779}
                height={740}
                priority
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
