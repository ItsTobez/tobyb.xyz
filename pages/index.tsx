import { H1, H2, P, S } from "../components/design/typography";
import Image from "next/image";
import { age } from "../utils/time";
import Nav from "../components/nav";
import Transition from "../components/transition";
import React from "react";
import Np from "../components/np";
import prisma from "../utils/prisma";

import trees from "../public/trees.jpeg";
import aretav from "../public/aretav.png";
import numbers from "../public/numbers.png";
import plus from "../public/icons/plus.svg";

type IndexPageRef = React.ForwardedRef<HTMLDivElement>;

export default function Home({ data }, ref: IndexPageRef) {
  return (
    <div className="grid justify-center place-items-center m-8 mb-32">
      <Transition ref={ref}>
        <div className="max-w-4xl sm:mt-16">
          <Image
            src={trees}
            alt="asdasd"
            className="rounded-2xl object-cover w-full max-h-full sm:h-[32rem]"
          />
          <H1 className="mt-16">
            Toby Brown is a <>{age}</> year old web developer & designer in
            London{" "}
            <span className="text-darkGrey">
              — currently working as a Storyteller at Hack Club.
            </span>
          </H1>
          <div className="sm:flex mt-24 sm:space-x-8 sm:space-y-0 space-y-8">
            <P>
              Pariatur in consectetur reprehenderit minim velit cupidatat
              consectetur. Cillum ex id amet minim non non. Tempor labore non
              velit Lorem irure veniam eu anim est nisi eiusmod laborum sunt.
              Dolore ad est anim sit consequat.
            </P>
            <P>
              Pariatur in consectetur reprehenderit minim velit cupidatat
              consectetur. Cillum ex id amet minim non non. Tempor labore non
              velit Lorem irure veniam eu anim est nisi eiusmod laborum sunt.
              Dolore ad est anim sit consequat.
            </P>
          </div>
          <div className="mt-16">
            <div className="md:flex justify-between sm:space-x-8 sm:space-y-0 space-y-8">
              <Thing
                name="Aretav"
                type="Work"
                link="https://numbers.tobyb.dev/"
                img={aretav}
              />
              <Thing
                name="Numbers"
                type="Personal"
                link="https://numbers.tobyb.dev/"
                img={numbers}
              />
            </div>
          </div>
          <div className="sm:space-x-8 sm:space-y-0 space-y-8 md:flex mt-16">
            <div className="bg-grey w-full p-4 rounded-xl border h-48 justify-center place-items-center grid">
              <H2 className="flex">
                Add your own entry{" "}
                <span className="ml-2">
                  <Image src={plus} alt="Plus icon" className="self-center" />
                </span>
              </H2>
            </div>
            {((data as Array<any>).slice(0, 3) || []).map((data) => (
              <Entry key={data.id} data={data} />
            ))}
          </div>
        </div>
      </Transition>
      <Nav />
    </div>
  );
}

function Thing({ type, name, link, img }) {
  return (
    <Np href={link} className="space-y-4 w-full">
      <Image
        src={img}
        alt="asdasd"
        className="rounded-2xl object-cover w-full max-h-full h-64 border"
      />
      <div className="space-y-1">
        <S
          className={`text-${
            type === "Work" ? "red" : type === "Personal" && "blue"
          }`}
        >
          {type}
        </S>
        <P className="text-black">{name}</P>
      </div>
    </Np>
  );
}

function Entry({ data }) {
  return (
    <div className="bg-grey w-full p-4 rounded-xl border h-48 justify-center place-items-center grid">
      <div className="space-y-2">
        <P className="text-black">{data.body}</P>
        <S className="text-darkGrey">— {data.created_by}</S>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await prisma.guestbook.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  const serializedData = data.map((data) => {
    return {
      ...data,
      id: data.id.toString(),
      created_at: data.created_at.toISOString(),
    };
  });

  return {
    props: {
      data: serializedData,
    },
  };
}
