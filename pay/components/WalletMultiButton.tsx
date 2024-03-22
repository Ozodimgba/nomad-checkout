import dynamic from "next/dynamic"

export const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
)

const WalletMultiButton = () => {
  return <WalletMultiButtonDynamic style={{background: '#09342A', borderRadius: '0px', paddingInline: '2rem'}} />
}

export default WalletMultiButton
