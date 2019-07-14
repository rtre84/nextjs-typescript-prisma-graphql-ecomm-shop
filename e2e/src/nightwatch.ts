const {
  NIGHTWATCH_LAUNCH_URL = 'http://localhost:5000',
  SELENIUM_HOST = 'localhost',
  SELENIUM_PORT = 4444,
  SAUCE_USERNAME,
  SAUCE_ACCESS_KEY,
  TRAVIS_JOB_NUMBER,
} = process.env;

export = {
  src_folders: ['dist/tests'],
  output_folder: 'reports',
  custom_commands_path: 'dist/commands',
  custom_assertions_path: '',
  page_objects_path: '',
  globals_path: '',

  selenium: {
    start_process: true,
    server_path: '/Users/mr.mac/Downloads/selenium-server-standalone-3.141.59.jar',
    log_path: '',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': '/Users/mr.mac/Downloads/chromedriver_76_latest',
      // 'webdriver.gecko.driver': '',
      // 'webdriver.edge.driver': '',
    },
  },

  test_settings: {
    default: {
      launch_url: NIGHTWATCH_LAUNCH_URL,
      selenium_host: SELENIUM_HOST,
      selenium_port: SELENIUM_PORT,
      silent: true,
      screenshots: {
        enabled: false,
        path: '',
      },
      username: SAUCE_USERNAME,
      access_key: SAUCE_ACCESS_KEY,
      globals: {
        waitForConditionTimeout: 10000,
      },
      desiredCapabilities: {
        build: `build-${TRAVIS_JOB_NUMBER}`,
        'tunnel-identifier': TRAVIS_JOB_NUMBER,
        browserName: 'chrome',
      },
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },

    'chrome:nojs': {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          prefs: {
            'profile.managed_default_content_settings.javascript': 2,
          },
        },
      },
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        marionette: true,
      },
    },

    edge: {
      desiredCapabilities: {
        browserName: 'MicrosoftEdge',
      },
    },
  },
};
