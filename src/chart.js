class Chart {
  constructor(element, options) {
    this.element = element;
    this.options = options;
    this.chart = new Chart(element, options);
  }

  update() {
    this.chart.update();
  }
}
