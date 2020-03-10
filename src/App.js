import React from "react";
import "./App.css";
import MeteoriteTable from "./meteorite-table";
import { Doughnut } from "react-chartjs-2";
import { formatDataFromSizes } from "./utils/utils";
import CentralMap from "./components/map";
import MapLoading from "./components/loading-map";

class App extends React.Component {
  state = {
    meteorites: [],
    isLoading: true,
    testDataset: {
      labels: ["<1kg", "1kg - 10kg", ">10kg"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    },
    activeMeteorite: null
  };

  showMeteoriteData = meteorite => {
    this.setState({ activeMeteorite: meteorite });
  };

  componentDidMount() {
    fetch(
      "https://data.nasa.gov/resource/gh4g-9sfh.json?$order=mass%20desc&$where=mass > 0"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        const tableData = data.slice(0, 200).map(meteorite => {
          const meteoriteCopy = { ...meteorite };
          if (meteoriteCopy.geolocation === undefined) {
            meteoriteCopy.geolocation = {
              latitude: "unknown",
              longitude: "unknown"
            };
          }
          if (meteoriteCopy.year) {
            meteoriteCopy.year = meteoriteCopy.year.slice(0, 4);
          } else if (!meteoriteCopy.year) {
            meteoriteCopy.year = "unknown";
          }

          if (!meteoriteCopy.mass) {
            meteoriteCopy.mass = "unknown";
          }
          return meteoriteCopy;
        });
        // .slice(0, 100);
        const sizeData = formatDataFromSizes(tableData);
        const dataset = { ...this.state.testDataset };
        dataset.datasets[0].data = sizeData;
        this.setState({
          isLoading: false,
          meteorites: tableData,
          testDataset: dataset
        });
      });
  }

  render() {
    const { meteorites, testDataset, activeMeteorite, isLoading } = this.state;
    return (
      <div className="App">
        {isLoading ? (
          <MapLoading />
        ) : (
          <CentralMap
            meteorites={meteorites}
            activeMeteorite={activeMeteorite}
            showMeteoriteData={this.showMeteoriteData}
          />
        )}
        <p>placeholder</p>
        <div className="title">
          <h1>Meteorite Map</h1>
          <p>A react app for plotting meteorites</p>
        </div>
      </div>
    );
  }
}

export default App;
