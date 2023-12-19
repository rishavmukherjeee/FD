{
    "build": {
      "preview": {
        "android": {
          "buildType": "apk"
        },
        "channel": "preview"
      },
      "preview2": {
        "android": {
          "gradleCommand": ":app:assembleRelease"
        },
        "channel": "preview2"
      },
      "preview3": {
        "developmentClient": true,
        "channel": "preview3"
      },
      "production": {
        "channel": "production"
      }
    }
  }

  {
    "cli": {
      "version": ">= 3.14.0"
    },
    "build": {
      "development": {
        "developmentClient": true,
        "distribution": "internal"
      },
      "preview": {
        "distribution": "internal"
      },
      "production": {}
    },
    "submit": {
      "production": {}
    }
  }