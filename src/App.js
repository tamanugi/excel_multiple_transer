import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import cheerio from 'cheerio'

class App extends Component {
  

  changeTextare = (e) => {

    console.log(e.clipboardData) 
    let html = e.clipboardData.getData('text/html')
    if (/<table/i.test(html)) {
      const $ = cheerio.load(html),
      r = $("table");
      let trs = r.children().children("tr");
      console.log(r.html())

      let json = []
      let headers = []
      trs.each((i, tr) => {
        // 1行目はヘッダーとして処理する
        if(i === 0){
          $(tr).children("td").map((ii, td) => {
            headers.push($(td).text())
          })
          return 
        }

        let obj = {}
        $(tr).children("td").map((ii, td) => {
          let header = headers[ii]
          obj[header] = $(td).text()
        })

        json.push(obj)

      })
      console.log(JSON.stringify(json))
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <textarea onPaste={this.changeTextare}></textarea>
      </div>
    );
  }
}

export default App;
