export const referralAbis = [
  {
    inputs: [
      {
        internalType: 'contract IERC6551Registry',
        name: '_registry',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_implementation',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_tornAddress',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'AccountNotSupport',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InsufficientBalance',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'account',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'rewardType',
        type: 'uint256'
      }
    ],
    name: 'Claimed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'registry',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'implementation',
        type: 'uint256'
      }
    ],
    name: 'RegistryAndImplementationSet',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_rewardType',
        type: 'uint256'
      }
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'fee',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract IERC6551Registry',
        name: '_registry',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_implementation',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_tornAddress',
        type: 'address'
      }
    ],
    name: 'setContract',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    stateMutability: 'payable',
    type: 'receive'
  }
]
