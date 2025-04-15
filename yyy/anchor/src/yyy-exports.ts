// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import YyyIDL from '../target/idl/yyy.json'
import type { Yyy } from '../target/types/yyy'

// Re-export the generated IDL and type
export { Yyy, YyyIDL }

// The programId is imported from the program IDL.
export const YYY_PROGRAM_ID = new PublicKey(YyyIDL.address)

// This is a helper function to get the Yyy Anchor program.
export function getYyyProgram(provider: AnchorProvider, address?: PublicKey) {
  return new Program({ ...YyyIDL, address: address ? address.toBase58() : YyyIDL.address } as Yyy, provider)
}

// This is a helper function to get the program ID for the Yyy program depending on the cluster.
export function getYyyProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Yyy program on devnet and testnet.
      return new PublicKey('coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF')
    case 'mainnet-beta':
    default:
      return YYY_PROGRAM_ID
  }
}
