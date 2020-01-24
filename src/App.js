import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'
import HomeView from "./Views/HomeView"
import SearchView from './Views/SearchView'


export default function BooksApp() {
  const shelves = ["wantToRead", "currentlyReading", "read"];
  return (
    <Switch>
      <Route exact path="/"><HomeView shelves={shelves} /></Route>
      <Route path={"/search"}><SearchView shelves={shelves} /></Route>
      {
        //TODO: path=["/search/:query"]
      }
    </Switch>
  )
}