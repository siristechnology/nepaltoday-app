# NepalToday App

![Android Apk - Build & Release](https://github.com/siristechnology/nepaltoday-app/workflows/Android%20Apk%20-%20Build%20&%20Release/badge.svg)
[![Build status](https://build.appcenter.ms/v0.1/apps/034ab548-ee10-4898-8d10-32c39ed6db38/branches/main/badge)](https://appcenter.ms)
![Android Detox Test](https://github.com/siristechnology/nepaltoday-app/workflows/Android%20Detox%20Test/badge.svg)
[![DeepScan grade](https://deepscan.io/api/teams/5348/projects/7146/branches/66889/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=5348&pid=7146&bid=66889)
[![Known Vulnerabilities](https://snyk.io/test/github/siristechnology/nepaltoday-app/badge.svg?targetFile=android/app/build.gradle)](https://snyk.io/test/github/siristechnology/nepaltoday-app?targetFile=android/app/build.gradle)

<br/>
<div>
<img src="android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png" alt="screenshot-1" height="80" style="margin-right:10px"/>
<a href='https://play.google.com/store/apps/details?id=com.siristechnology.nepaltodayapp&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1' target='_blank' rel="noopener noreferrer"><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' height="80"/></a>
</div>

## Latest screenshot

<div>
<img width="311" alt="image" src="https://user-images.githubusercontent.com/503803/188253396-acaa4c11-cbbb-4b19-a0c4-6fde32dd0a5b.png">
<img width="310" alt="image" src="https://user-images.githubusercontent.com/503803/188253406-5982f1cd-8684-4418-b720-1792f7181cff.png">
</div>

## How to Run Android app locally

-   Install Android Studio
-   Install node (16.x), yarn (1.x)
-   Create .env file from .env.qa
-   Run Android emulator. (from Android Studio or Genymotion)
-   Run Metro bundler. `yarn start`
-   Run Android app. `yarn android`

## How to Run IOS app locally

-   Install XCode
-   Install node (16.x), yarn (1.x)
-   Create .env file from .env.qa
-   Run Metro bundler. `yarn start`
-   Install Pod depedencies. `pod install --repo-update`
-   Run Android app. `yarn ios`

## How to Run Detox test on Android Emulator

-   Install detox cli. `yarn global add detox-cli`
-   Build apk for testing. `yarn build-detox-android`
-   Run detox test on apk. `yarn test-detox-android`

## How to Publish app into Google Play Store

-   Create a git tag. `git tag -a release-09-02-second -m "release 09-02 second"`
-   Push git tag. `git push origin release-09-02-second`

## Tips

-   Run `yarn refresh` to reload android app quickly without rebuilding
-   Run `yarn reset` to reset package manager cache
-   Run `adb uninstall com.siristechnology.nepaltodayapp` to uninstall app from the android simulator
-   Run `adb logcat` to view android emulator logs in terminal
