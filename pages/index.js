import Card from "../components/Card";
import { withApollo } from '../apollo/apollo';
import React, { useEffect, useState } from "react";
import _, {debounce} from 'lodash';
import DefaultCard from "../components/defaultCard";

export async function getStaticProps() {
  const ids = [...Array(591).keys()];
  const characterUrl = `https://rickandmortyapi.com/api/character/${ids.join(",")}`

  const res = await fetch(characterUrl);

  const characters = await res.json()

  return{
    props:{
      characters
    }
  }
}

const IndexPage = ({ characters }) => {

  const [chars, setChars] = useState(characters);

  const [lookup, setLookup] = useState('');

  useEffect(() => {
    const res = _.filter(chars, char => char.name.toLowerCase().includes(lookup.toLowerCase()))
    setChars(res);
  }, [lookup]);

  const handleChange = e => {
    debounce(
      (e) => setLookup(e.target.value), 100
    )
    setLookup(e.target.value);
    if (e.target.value === ''){
      setChars(characters)
    }
  };

  const handleClick = e => {
    e.preventDefault()
    setChars(characters)
  };

  return (
    <div className="bg-gray-200 h-auto w-auto">
      <div className="shadow-lg hero bg-blue-500 font-mono text-white">
        <h1 className="title">Rick & Morty</h1>
        <h3 className="flex justify-center"> with Next.js, Apollo GraphQL</h3>
        <h3 className="flex justify-center">and Tailwind CSS</h3>
        <h3 className="flex justify-center underline">
          <a href={'https://github.com/MuddyBootsCode/tailswinds-ui'}>
            Git Repo here
          </a>
        </h3>
      </div>
      <br/>
      <div className="flex justify-center">
        <input
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username" type="text" placeholder="Character Search" aria-label="Character Search Bar"
          value={lookup}
          onChange={handleChange}
        />
        <button
          className="text-black bg-white hover:bg-black hover:text-white font-mono py-2
         px-4 border border-black rounded m-2"
          onClick={handleClick}
        >
          Reset Search
        </button>
      </div>
        <div className="sm:flex sm:flex-col sm:justify-center md:grid md:grid-cols-2 lg:grid lg:grid-cols-4">
          {chars.map((data) => {
            return (
              chars ? <Card
                  heading={data.name}
                  text={data.status}
                  img={data.image}
                  key={data.id}
                  id={data.id}
                /> : <DefaultCard />
            )
          })}
        </div>
    </div>
  )
};

export default withApollo({ ssr: false })(IndexPage);
