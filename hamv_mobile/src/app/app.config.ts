export interface AppConfig {
  appEngine: {
    solutionId: string,
    productId: string,
  };
  mixpanel: {
    token: string,
  };
  hockeyApp: {
    ids: {
      android: string,
      ios: string,
    }
  };
  app: {
    group: {
      max: number,
      devices: number,
    },
    schedule: {
      max: number,
    },
    support: {
      email: string,
    },
    disableLog?: boolean;
    logConfig: {
      recordLimit?: number,
    }
    theme: {
      primaryColor: string,
      productName: string,
      wifiName: string,
    },
    amazonAlexa: {
      skillName: string,
    },
    ifttt: {
      actionName: string,
    },
    googleHome: {
      ghName: string,
    },
    ble: {
      bleProductName: string,
      bleName: string,
    },
  };
}

export const appConfig: AppConfig = {
  appEngine: {
    solutionId: 'primax-mqtt',
    productId: 'q4684vgmkd0w00000',
  },
  mixpanel: {
    token: 'YOUR_TOKEN',
  },
  hockeyApp: {
    ids: {
      android: '',
      ios: '',
    }
  },
  app: {
    group: {
      max: 10, // Max group per user
      devices: 10, //Max device number per group
    },
    schedule: {
      max: 10, // Max schedule number per device
    },
    support: {
      email: '',
    },
    disableLog: false,
    logConfig: {
      recordLimit: 10000,
    },
    theme: {
      primaryColor: '#00baff',
      productName: 'Smart Light',
      wifiName: 'Breezey-XXXX',
    },
    amazonAlexa: {
      skillName: 'Smart Light & Plug',
    },
    ifttt: {
      actionName: 'ifttt_name',
    },
    googleHome: {
      ghName: 'Smart Light and Plug',
    },
    ble: {      
      bleProductName: 'AirBox',
      bleName: 'BLE-XXXX',
    },
  }
};
