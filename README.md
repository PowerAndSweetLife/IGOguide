
# IGOguide

Booking application for a client in Bordeaux

## Introduction
IGOguide is a booking application developed for a client in Bordeaux. This README provides instructions on how to install and use the application.
## Prerequisites
Make sure you have Node.js and npm installed.
## Automatic installation

Install all packages
```bash
  npm install
```
## Manual installation
Install React Native Async Storage

```bash
  npm i @react-native-async-storage/async-storage
```

Install Navigation
```bash
  npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
```

Install Gesture handler
```bash
  npm install react-native-gesture-handler
```

Install Screen and Safe Area Context
```bash
  npm install react-native-screens react-native-safe-area-context
```
Note: react-native-screens package requires one additional configuration step to properly work on Android devices. Edit MainActivity.java file which is located in android/app/src/main/java/<your package name>/MainActivity.java.
Add the highlighted code to the body of MainActivity class:
```java
public class MainActivity extends ReactActivity {
  // ...
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
  // ...
}
```
and make sure to add the following import statement at the top of this file below your package statement
```java
import android.os.Bundle;
```

Install React Native SVG
```bash
npm i react-native-svg
```
    