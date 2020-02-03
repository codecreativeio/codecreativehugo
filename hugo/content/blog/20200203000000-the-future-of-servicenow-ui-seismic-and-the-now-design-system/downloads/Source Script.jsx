class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      incidents: []
    };

    this.loadIncidents = this.loadIncidents.bind(this);
    this.unloadIncidents = this.unloadIncidents.bind(this);
  }

  unloadIncidents() {
    this.setState({
      'isLoaded': false,
      'incidents': []
    });
  }

  loadIncidents() {
    var g_ck = window.g_ck || '877fdc0b072a00102e15f9fc7c1ed09671fdf60107ced439cc84aaa997b4391665459074';
    var self = this;
    fetch('https://dev91259.service-now.com/api/now/table/incident?sysparm_query=active%3Dtrue&sysparm_limit=20', {'headers': { 'X-UserToken': g_ck, "mode": "no-cors" } }).then(function(res) {
      return res.json();
    }).then(function(res) {
      var incidents;
      if (res.result) {
        incidents = res.result;
      }
      else {
        incidents = [];
      }

      self.setState({
        isLoaded: true,
        incidents: incidents
      });
    });
  }

  getStyles() {
    return `
	  body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      code {
        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
          monospace;
      }

      .App {
        text-align: center;
      }

      .App-logo {
        height: 40vmin;
        pointer-events: none;
      }

      @media (prefers-reduced-motion: no-preference) {
        .App-logo {
          animation: App-logo-spin infinite 20s linear;
        }
      }

      .App-header {
        background-color: #282c34;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: calc(10px + 2vmin);
        color: white;
      }

      .App-link {
        color: #61dafb;
      }

      .App-card {
        border: 1px solid gray;
        border-radius: 2px;
        width: 33.33%;
        overflow: hidden;
      }

      .App-card h2 {
        font-size: 1.75rem;
        padding: 1.75rem;
        margin: 0;
        text-align: left;
      }

      .App-card ul {
        padding: 0;
        margin: 0;
        list-style-type: none;
        overflow: auto;
        max-height: 400px;
      }

      .App-card ul li {
        text-align: left;
        border-top: 1px solid gray;
        font-size: 1.25rem;
        padding: .5rem;
        padding-left: 1.75rem;
      }

      .App-card ul li .number {
        font-size: 1rem;
        color: gray;
      }

	  a {
        cursor: pointer;
        text-decoration: underline;
      }

      @keyframes App-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `;
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <div className="App">
          <style>
            {this.getStyles()}
          </style>
          <header className="App-header">
            <img src="react.png" className="App-logo" alt="logo" />
            <p>
              Welcome to the React App in ServiceNow's UX Framework.
            </p>
            <a
              className="App-link"
              rel="noopener noreferrer"
              onClick={this.loadIncidents}
            >
              Load Incidents
            </a>
          </header>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <style>
            {this.getStyles()}
          </style>
          <header className="App-header">
            <div className="App-card">
              <h2>Incidents</h2>
              <ul>
                {this.state.incidents.map(function(item){
                  return (<li key={item.sys_id}>
                    <div className="number">{item.number}</div>
                    <div>{item.short_description}</div>
                  </li>);
                })}

                <li>
                  <a
                    className="App-link"
                    rel="noopener noreferrer"
                    onClick={this.unloadIncidents}>
                    Back to Home
                  </a>
                </li>
              </ul>
            </div>
          </header>
        </div>
      );
    }
  }
}

ReactDOM.render(
  <App />,
  document.getElementsByTagName('ux-playground-root')[0]
);
