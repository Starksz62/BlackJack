
interface WalletProps {
    balance: number;
  }

  const Wallet: React.FC<WalletProps> = ({ balance }) => {

  return (
    <div>
      <h1>{balance}</h1>
    </div>
  )
}

export default Wallet ;