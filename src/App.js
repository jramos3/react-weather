import React from "react";
import Search from "./components/Search";
import WeatherCard from "./components/WeatherCard";
import Spinner from "./components/Spinner";
import NotFound from "./components/NotFound";
import "../src/styles/app.css";

class App extends React.Component {
  state = {
    weatherData: [],
    loading: false,
    woeid: null,
    reqType: "",
    dataFound: false
  };

  getWeatherData = location => {
    this.setState({ loading: true, dataFound: false });

    fetch(
      `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${location}`
    )
      .then(response => response.json())
      .then(data => {
        let woeid;
        console.log(data);
        if (data.length === 1) {
          woeid = data[0].woeid;
          this.setState({ woeid });
        } else {
          this.setState({
            woeid: -1,
            loading: false
          });
        }

        if (this.state.woeid !== -1) {
          return fetch(
            `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${woeid}/`
          )
            .then(response2 => {
              return response2.json();
            })
            .then(data => {
              const { title, location_type, consolidated_weather } = data;
              const weatherData = {
                title,
                locationType: location_type,
                consolidatedWeather:
                  this.state.reqType === "today"
                    ? consolidated_weather.slice(0, 1)
                    : consolidated_weather
              };
              this.setState({
                weatherData,
                loading: false,
                dataFound: true
              });
            });
        }
      })
      .catch(error => console.log(error));
  };

  getReqType = reqType => {
    this.setState({ reqType });
  };

  render() {
    const { loading, woeid, weatherData, dataFound } = this.state;

    return (
      <div>
        <Search
          getWeatherData={this.getWeatherData}
          getReqType={this.getReqType}
        />

        {loading ? (
          <Spinner />
        ) : dataFound ? (
          <div>
            <h2 className="city">{`${weatherData.title}, ${
              weatherData.locationType
            }`}</h2>
            <div className="weather-container">
              {weatherData.consolidatedWeather.map(day => (
                <WeatherCard key={day.id} weatherData={day} />
              ))}
            </div>
          </div>
        ) : woeid === -1 ? (
          <NotFound />
        ) : null}
      </div>
    );
  }
}

export default App;
