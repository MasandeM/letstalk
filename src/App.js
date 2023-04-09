import logo from './logo.svg';
import 'instantsearch.css/themes/satellite.css';
import './App.css';
import React from 'react';
import {   } from 'react-instantsearch-dom';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';
import { InstantSearch, SearchBox, Hits, Highlight, Configure, Snippet, Pagination, RefinementList,useInstantSearch, InfiniteHits } from 'react-instantsearch-hooks-web';

require('dotenv').config()

console.log(process.env.REACT_APP_MEILI_INSTANCE)
const searchClient = instantMeiliSearch(
  process.env.REACT_APP_MEILI_INSTANCE, process.env.REACT_APP_MEILI_PUBLIC_API_KEY,
  {
    keepZeroFacets: true,
    finitePagination: true
  }
);

function FilterableTalkTable(){
    
    return(
            <div className="ais-InstantSearch">
                <h1>Lets Talk!</h1>
                <h3 class="slogan">A better way to search for security conference talks.</h3>
                <p >
                   Security conferences are one of the best sources for keeping up to-date on industry trends. But the sheer number of talks made in any given year, makes it difficult to find those that you might be interested in. 
                    <b>Let's Talk</b> aims to solve this through indexing talk titles, summaries and transcripts from my favourite YT channels and making them searchable! 🔎
                </p>
                <InstantSearch
                    indexName="talks"
                    searchClient={searchClient}
                >
                    <div className="left-panel">
                        <h2>Conference</h2>
                        <RefinementList attribute="channel"  showMore="true" showMoreLimit={50}/>
                        <h2>Year</h2>
                        <RefinementList attribute="year" showMore="true" showMoreLimit={50} sortBy={['name:desc']}/>
                    </div>
                    <div className="right-panel">
                    <SearchBox />
                    <InfiniteHits hitComponent={Hit}  />
                    <Configure
                        hitsPerPage={6}
                    />
                    </div>
                </InstantSearch>
            </div>
    );
}

const Hit = ({ hit }) => (
    <div key={hit.id}>
        <div className="hit-name">
        <Highlight attribute="title" hit={hit} />
        </div>
        <a href={'https://www.youtube.com/watch?v=' + hit.video_id} target="_blank"><img src={'https://img.youtube.com/vi/' + hit.video_id + '/0.jpg'} align="left" alt={hit.title} /></a>
        
        
        <fieldset>
          <legend><h3>Summary</h3></legend>       
          <div className="hit-description" class="scroll">
              <Snippet attribute="description" hit={hit} />
          </div>
      </fieldset>

      <fieldset>
          <legend><h3>Transcript</h3></legend>       
          <div className="hit-description" class="scroll">
              <Snippet attribute="transcript" hit={hit} />
          </div>
      </fieldset>

        <div className="hit-info">YT Channel: {hit.channel}</div>
        <div className="hit-info">Year: {hit.year}</div>
    </div>
);

function App() {
  return (
    <div className="App">
     <FilterableTalkTable />
    </div>
  );
}

export default App;
