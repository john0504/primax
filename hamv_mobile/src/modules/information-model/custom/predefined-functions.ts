export const functionMap = {
  tempCelsius: (val) => {
    if (val === -32767 || val === undefined || val === null) {
      return {
        value: val,
        text: '--°C',
        icon: 'thermostat',
      };
    }
    return {
      value: val,
      text: round(val, 2) + '°C',
      icon: 'thermostat',
    };
  },
  tempCelsiusToFahrenheit: (val) => {
    if (val === -32767 || val === undefined || val === null) {
      return {
        value: val,
        text: '--°F',
        icon: 'thermostat',
      };
    }
    return {
      value: val,
      text: round(val * (9 / 5) + 32, 2) + '°F',
      icon: 'thermostat',
    };
  },
  tempFahrenheit: (val) => {
    if (val === -32767 || val === undefined || val === null) {
      return {
        value: val,
        text: '--°F',
        icon: 'thermostat',
      };
    }
    return {
      value: val,
      text: round(val, 2) + '°F',
      icon: 'thermostat',
    };
  },
  tempFahrenheitToCelsius: (val) => {
    if (val === -32767 || val === undefined || val === null) {
      return {
        value: val,
        text: '--°C',
        icon: 'thermostat',
      };
    }
    return {
      value: val,
      text: round((val - 32) * 5 / 9, 2) + '°C',
      icon: 'thermostat',
    };
  },
  humidity: (val) => {
    if (val === -32767 || val === undefined || val === null) {
      return {
        value: val,
        text: '--%',
      };
    }
    return {
      value: val,
      text: round(val, 2) + '%',
    };
  },
  timer: (val) => {
    if (val === -32767 || val === undefined || val === null) {
      return {
        value: val,
        text: '--:--',
        icon: 'timer',
      };
    }
    let hour = val / 60 | 0;
    let min = val % 60;
    let hourS = hour < 10 ? '0' + hour : hour + '';
    let minS = min < 10 ? '0' + min : min + '';
    return {
      value: val,
      text: hourS + ':' + minS,
      icon: 'timer',
    };
  },
  timerHour: (val) => {
      if (val === -32767) {
          return {
              value: val,
              text: '--:--',
              icon: 'time',
          };
      }
      let hour = val;
      let hourS = hour < 10 ? '0' + hour : hour + '';
      return {
          value: val,
          text: hourS + ':00',
          icon: 'time',
      };
  },
  dust: (val) => {
      if (val < 0) {
          return {
              value: val,
              text: '--μg/m³',
              icon: 'cloud',
          };
      }
      return {
          value: val,
          text: val + 'μg/m³',
          icon: 'cloud',
      };
  },
  text: (val) => {
      if (val === undefined || val === null || val === -32767) {
          return {
              value: val,
              text: '--',
          };
      }
      return {
          value: val,
          text: round(val, 2) + '',
      };
  },
  red_light: (val) => {
      if (val === undefined || val === null || val === -32767) {
          return {
              value: val,
              text: '--',
              icon: 'red-light'
          };
      }
      return {
          value: val,
          text: round(val, 2) + '',
          icon: 'red-light'
      };
  },
  green_light: (val) => {
      if (val === undefined || val === null || val === -32767) {
          return {
              value: val,
              text: '--',
              icon: 'green-light'
          };
      }
      return {
          value: val,
          text: round(val, 2) + '',
          icon: 'green-light'
      };
  },
  blue_light: (val) => {
      if (val === undefined || val === null || val === -32767) {
          return {
              value: val,
              text: '--',
              icon: 'blue-light'
          };
      }
      return {
          value: val,
          text: round(val, 2) + '',
          icon: 'blue-light'
      };
  },
  white_light: (val) => {
      if (val === undefined || val === null || val === -32767) {
          return {
              value: val,
              text: '--',
              icon: 'white-light'
          };
      }
      return {
          value: val,
          text: round(val, 2) + '',
          icon: 'white-light'
      };
  },
  airbox_humi: (val) => {
      if (val === -32767) {
          return {
              value: val,
              text: '--%',
          };
      }
      return {
          value: val,
          text: round(val / 100, 2) + '%',
      };
  },
  airbox_temp: (val) => {
      if (val === -32767) {
          return {
              value: val,
              text: '--°C',
              icon: 'thermostat',
          };
      }
      return {
          value: val,
          text: round(val / 100, 2) + '°C',
          icon: 'thermostat',
      };
  },
  airbox_pm25: (val) => {
      if (val === -32767) {
          return {
              value: val,
              text: '--μg/m3',
          };
      }
      return {
          value: val,
          text: round(val, 2) + 'μg/m3',
      };
  },
  airbox_co2: (val) => {
      if (val === -32767) {
          return {
              value: val,
              text: '--ppm',
          };
      }
      return {
          value: val,
          text: round(val, 2) + 'ppm',
      };
  },
  airbox_voc: (val) => {
      if (val === -32767) {
          return {
              value: val,
              text: '--ppb',
          };
      }
      return {
          value: val,
          text: round(val, 2) + 'ppb',
      };
  },
  //create more from here
};

function round(value: number, precision: number) {
  const base = 10 ** precision;
  return Math.round(value * base) / base;
}
