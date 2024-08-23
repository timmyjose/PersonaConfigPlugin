const { withProjectBuildGradle } = require('expo/config-plugins')

const ANDROID_BUILD_GRADLE_CHANGE = '\n\t\t\t\tmaven {\n\t\t\t\t url \'https://sdk.withpersona.com/android/releases\'\n\t\t\t }'

const configureAndroid = (config) => {
  return withProjectBuildGradle(config, (config) => {
    const gradleContents = config.modResults.contents

    const anchorText = 'maven { url \'https://www.jitpack.io\' }'
    const anchorTextEndIdx = gradleContents.indexOf(anchorText) + anchorText.length
    config.modResults.contents = 
        gradleContents.substring(0, anchorTextEndIdx) + 
        ANDROID_BUILD_GRADLE_CHANGE + 
        gradleContents.substring(anchorTextEndIdx)

    return config
  })
}

const configurePersona = (config) => {
  config = configureAndroid(config)
  return config
}

module.exports = configurePersona
