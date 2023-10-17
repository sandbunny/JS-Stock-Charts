//  i learned how to structure the charts and how to make it populate in the canvas through query selector
async function main() {
  const timeChartCanvas = document.querySelector("#time-chart");
  const highestPriceChartCanvas = document.querySelector(
    "#highest-price-chart"
  );
  const averagePriceChartCanvas = document.querySelector(
    "#average-price-chart"
  );

  const { GME, MSFT, DIS, BNTX } = mockData;

  const stocks = [GME, MSFT, DIS, BNTX];
  // learned how to address the stock values and how to map them with parseFloat onto a chart
  new Chart(timeChartCanvas.getContext("2d"), {
    type: "line",
    data: {
      labels: stocks[0].values.map((value) => value.datetime),
      datasets: stocks.map((stock) => ({
        label: stock.meta.symbol,
        data: stock.values.map((value) => parseFloat(value.high)),
        backgroundColor: getColor(stock.meta.symbol),
        borderColor: getColor(stock.meta.symbol),
      })),
    },
  });
  // setting the first number to be the highest. comparing each number to the first number. updating the highest value
  function findHighest(values) {
    let highest = values[0].high;
    values.forEach((value) => {
      if (parseFloat(value.high) > highest) {
        highest = value.high;
      }
    });
    // storing the information
    return highest;
  }
  new Chart(highestPriceChartCanvas.getContext("2d"), {
    // changed the value type to a bar graph
    type: "bar",
    data: {
      labels: stocks.map((stock) => stock.meta.symbol),
      datasets: [
        {
          label: "Highest",
          backgroundColor: stocks.map((stock) => getColor(stock.meta.symbol)),
          borderColor: stocks.map((stock) => getColor(stock.meta.symbol)),
          data: stocks.map((stock) => findHighest(stock.values)),
        },
      ],
    },
  });
  // finding average by adding up all the numbers and then dividing it by how many items there are
  function calculateAverage(values) {
    let total = 0;
    values.forEach((value) => {
      total += parseFloat(value.high);
    });
    // storing information and then dividing by the number of items there are
    return total / values.length;
  }

  new Chart(averagePriceChartCanvas.getContext("2d"), {
    type: "pie",
    data: {
      labels: stocks.map((stock) => stock.meta.symbol),
      datasets: [
        {
          label: "Average",
          backgroundColor: stocks.map((stock) => getColor(stock.meta.symbol)),
          borderColor: stocks.map((stock) => getColor(stock.meta.symbol)),
          data: stocks.map((stock) => calculateAverage(stock.values)),
        },
      ],
    },
  });
}

function getColor(stock) {
  if (stock === "GME") {
    return "rgba(61, 161, 61, 0.7)";
  }
  if (stock === "MSFT") {
    return "rgba(209, 4, 25, 0.7)";
  }
  if (stock === "DIS") {
    return "rgba(18, 4, 209, 0.7)";
  }
  if (stock === "BNTX") {
    return "rgba(166, 43, 158, 0.7)";
  }
}

main();
