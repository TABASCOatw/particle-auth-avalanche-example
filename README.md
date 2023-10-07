<div align="center">
  <a href="https://particle.network/">
    <img src="https://i.imgur.com/xmdzXU4.png" />
  </a>
  <h3>
    Particle Auth Avalanche Example
  </h3>
</div>

⚡️ Example for implementing [Particle Auth](https://docs.particle.network/developers/auth-service) within **Avalanche** applications; including user data display, balance retrieval, and other demo functionality.

Built using **Particle Auth**, **TypeScript**, and **Web3.js**

## 🔑 Particle Auth
Particle Auth, a component of Particle Network's Wallet-as-a-Service, enables seamless onboarding to an application-embedded MPC-TSS/AA wallet facilitated by social login, such as Google, GitHub, email, phone number, etc.

##

👉 Try the demo: https://web-demo.particle.network/connectKit

👉 Learn more about Particle Network: https://particle.network

![Particle Auth Example](https://i.imgur.com/cIbCQEn.png)

## 🛠️ Quickstart

### Clone this repository
```
git clone https://github.com/TABASCOatw/particle-auth-avalanche-example.git
```

### Install dependencies
```
yarn install
```
OR
```
npm install
```

### Set environment variables
This project requires a number of keys from Particle Network and WalletConnect to be defined in `.env`. The following should be defined:
- `REACT_APP_APP_ID`, the ID of the corresponding application in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
- `REACT_APP_PROJECT_ID`, the ID of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).
-  `REACT_APP_CLIENT_KEY`, the client key of the corresponding project in your [Particle Network dashboard](https://dashboard.particle.network/#/applications).

### Start the project
```
npm run dev
```
OR
```
yarn dev
```

##
Originally featured in "[Integrating Particle Auth in Avalanche DApps](https://twitter.com/TABASCOweb3/status/1710546274435621330)"
