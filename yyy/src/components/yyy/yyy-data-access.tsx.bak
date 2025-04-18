'use client'

import { getYyyProgram, getYyyProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useYyyProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getYyyProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getYyyProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['yyy', 'all', { cluster }],
    queryFn: () => program.account.yyy.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['yyy', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ yyy: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useYyyProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useYyyProgram()

  const accountQuery = useQuery({
    queryKey: ['yyy', 'fetch', { cluster, account }],
    queryFn: () => program.account.yyy.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['yyy', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ yyy: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['yyy', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ yyy: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['yyy', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ yyy: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['yyy', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ yyy: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
