(function(React, ReactDOM) {
    function _instanceof(left, right) {
        if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
            return !!right[Symbol.hasInstance](left);
        } else {
            return left instanceof right;
        }
    }

    function _typeof(obj) {
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
            _typeof = function _typeof(obj) {
                return typeof obj;
            };
        } else {
            _typeof = function _typeof(obj) {
                return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
        }
        return _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
        if (!_instanceof(instance, Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    function _possibleConstructorReturn(self, call) {
        if (call && (_typeof(call) === "object" || typeof call === "function")) {
            return call;
        }
        return _assertThisInitialized(self);
    }

    function _getPrototypeOf(o) {
        _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
            return o.__proto__ || Object.getPrototypeOf(o);
        };
        return _getPrototypeOf(o);
    }

    function _assertThisInitialized(self) {
        if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function");
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                writable: true,
                configurable: true
            }
        });
        if (superClass) _setPrototypeOf(subClass, superClass);
    }

    function _setPrototypeOf(o, p) {
        _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
            o.__proto__ = p;
            return o;
        };
        return _setPrototypeOf(o, p);
    }

    var App =
        /*#__PURE__*/
        function(_React$Component) {
            "use strict";

            _inherits(App, _React$Component);

            function App(props) {
                var _this;

                _classCallCheck(this, App);

                _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
                _this.state = {
                    error: null,
                    isLoaded: false,
                    incidents: []
                };
                _this.loadIncidents = _this.loadIncidents.bind(_assertThisInitialized(_this));
                _this.unloadIncidents = _this.unloadIncidents.bind(_assertThisInitialized(_this));
                return _this;
            }

            _createClass(App, [{
                key: "unloadIncidents",
                value: function unloadIncidents() {
                    this.setState({
                        'isLoaded': false,
                        'incidents': []
                    });
                }
            }, {
                key: "loadIncidents",
                value: function loadIncidents() {
                    var g_ck = window.g_ck || '877fdc0b072a00102e15f9fc7c1ed09671fdf60107ced439cc84aaa997b4391665459074';
                    var self = this;
                    fetch('https://dev91259.service-now.com/api/now/table/incident?sysparm_query=active%3Dtrue&sysparm_limit=20', {
                        'headers': {
                            'X-UserToken': g_ck,
                            "mode": "no-cors"
                        }
                    }).then(function(res) {
                        return res.json();
                    }).then(function(res) {
                        var incidents;

                        if (res.result) {
                            incidents = res.result;
                        } else {
                            incidents = [];
                        }

                        self.setState({
                            isLoaded: true,
                            incidents: incidents
                        });
                    });
                }
            }, {
                key: "getStyles",
                value: function getStyles() {
                    return "\n\t  body {\n        margin: 0;\n        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n      }\n\n      code {\n        font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',\n          monospace;\n      }\n\n      .App {\n        text-align: center;\n      }\n      \n      .App-logo {\n        height: 40vmin;\n        pointer-events: none;\n      }\n      \n      @media (prefers-reduced-motion: no-preference) {\n        .App-logo {\n          animation: App-logo-spin infinite 20s linear;\n        }\n      }\n      \n      .App-header {\n        background-color: #282c34;\n        min-height: 100vh;\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        justify-content: center;\n        font-size: calc(10px + 2vmin);\n        color: white;\n      }\n      \n      .App-link {\n        color: #61dafb;\n      }\n\n      .App-card {\n        border: 1px solid gray;\n        border-radius: 2px;\n        width: 33.33%;\n        overflow: hidden;\n      }\n\n      .App-card h2 {\n        font-size: 1.75rem;\n        padding: 1.75rem;\n        margin: 0;\n        text-align: left;\n      }\n\n      .App-card ul {\n        padding: 0;\n        margin: 0;\n        list-style-type: none;\n        overflow: auto;\n        max-height: 400px;\n      }\n\n      .App-card ul li {\n        text-align: left;\n        border-top: 1px solid gray;\n        font-size: 1.25rem;\n        padding: .5rem;\n        padding-left: 1.75rem;\n      }\n\n      .App-card ul li .number {\n        font-size: 1rem;\n        color: gray;\n      }\n\n\t  a {\n        cursor: pointer;\n        text-decoration: underline;\n      }\n      \n      @keyframes App-logo-spin {\n        from {\n          transform: rotate(0deg);\n        }\n        to {\n          transform: rotate(360deg);\n        }\n      }\n    ";
                }
            }, {
                key: "render",
                value: function render() {
                    if (!this.state.isLoaded) {
                        return React.createElement("div", {
                            className: "App"
                        }, React.createElement("style", null, this.getStyles()), React.createElement("header", {
                            className: "App-header"
                        }, React.createElement("img", {
                            src: "react.png",
                            className: "App-logo",
                            alt: "logo"
                        }), React.createElement("p", null, "Welcome to the React App in ServiceNow's UX Framework."), React.createElement("a", {
                            className: "App-link",
                            rel: "noopener noreferrer",
                            onClick: this.loadIncidents
                        }, "Load Incidents")));
                    } else {
                        return React.createElement("div", {
                            className: "App"
                        }, React.createElement("style", null, this.getStyles()), React.createElement("header", {
                            className: "App-header"
                        }, React.createElement("div", {
                            className: "App-card"
                        }, React.createElement("h2", null, "Incidents"), React.createElement("ul", null, this.state.incidents.map(function(item) {
                            return React.createElement("li", {
                                key: item.sys_id
                            }, React.createElement("div", {
                                className: "number"
                            }, item.number), React.createElement("div", null, item.short_description));
                        }), React.createElement("li", null, React.createElement("a", {
                            className: "App-link",
                            rel: "noopener noreferrer",
                            onClick: this.unloadIncidents
                        }, "Back to Home"))))));
                    }
                }
            }]);

            return App;
        }(React.Component);

    ReactDOM.render(React.createElement(App, null), document.getElementsByTagName('ux-playground-root')[0]);
})(__TECTONIC__react, __TECTONIC__react_dom);
