import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

import { ParticleNetwork } from '@particle-network/auth';
import { Avalanche } from '@particle-network/chains';
import { ParticleProvider } from '@particle-network/provider';

import './App.css';

const particle = new ParticleNetwork({
  projectId: process.env.REACT_APP_PROJECT_ID!,
  clientKey: process.env.REACT_APP_CLIENT_KEY!,
  appId: process.env.REACT_APP_APP_ID!,
  chainName: Avalanche.name,
  chainId: Avalanche.id,
  wallet: {
    displayWalletEntry: true,
    uiMode: "dark"
  },
});

if (!window.web3) {
  window.web3 = new Web3(new ParticleProvider(particle.auth));
}

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [avaxBalance, setAvaxBalance] = useState<string | null>(null);

  const fetchAvaxBalance = async (address: string) => {
    const balanceWei = await window.web3.eth.getBalance(address);
    setAvaxBalance(window.web3.utils.fromWei(balanceWei, 'ether'))
  };

  const handleLogin = async (preferredAuthType: 'google' | 'twitter') => {
    const user = !particle.auth.isLogin() ? await particle.auth.login({preferredAuthType}) : particle.auth.getUserInfo();
    setUserInfo(user);
    const accounts = await window.web3.eth.getAccounts();
    fetchAvaxBalance(accounts[0]);
  }

  const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);

  const signMessage = async () => {
    const message = "GM, Particle!";
    const accounts = await window.web3.eth.getAccounts();

    window.web3.eth.personal.sign(message, accounts[0], '', (error, signature) => {
      console.log(error ? `Error: ${error}` : `Signature: ${signature}`);
    });
  };

  useEffect(() => { if (userInfo) window.web3.eth.getAccounts().then(fetchAvaxBalance); }, [userInfo]);

  return (
    <div className="App">
      {!userInfo ? (
        <>
          <button onClick={() => handleLogin('google')} className="button-google">
            <img src="https://i.imgur.com/mmDmdwY.png" alt="Google Logo" className="button-icon" />
            Sign in with Google
          </button>
          <button onClick={() => handleLogin('twitter')} className="button-x">
            <img src="https://i.imgur.com/RN5dcjI.png" alt="X Logo" className="button-icon" />
            Sign in with X
          </button>
        </>
      ) : (
        <div className="profile-card">
          <h2>{userInfo.name}</h2>
          <div className="avax-balance-section">
            <img src={Avalanche.icon} alt="AVAX Logo" style={{ width: '15px', height: 'auto', verticalAlign: 'bottom' }} />
            <small> {avaxBalance} AVAX</small>
          </div>
          {userInfo.thirdparty_user_info.provider === 'google' && (
            <div>
              <p>Email: {userInfo.google_email}</p>
              <p>ID: {userInfo.google_id}</p>
              <img src={userInfo.avatar} alt="Google Avatar" />
            </div>
          )}
          {userInfo.thirdparty_user_info.provider === 'twitter' && (
            <div>
              <p>Email: {userInfo.twitter_email}</p>
              <p>ID: {userInfo.twitter_id}</p>
            </div>
          )}
          {userInfo.wallets.map((wallet: any) => (
            wallet.chain_name === 'evm_chain' && (
              <div className="copy-wallet" onClick={() => copyToClipboard(wallet.public_address)}>
                <span>Copy Avalanche Address</span>
              </div>
            )
          ))}
        </div>
      )}
      {userInfo && (
        <button onClick={signMessage} className="sign-message-button">
          Sign Message
        </button>
      )}
    </div>
  );
};

export default App;