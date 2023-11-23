export const RewardAbis = [
  {
    inputs: [
      {
        internalType: 'contract ITorn',
        name: '_torn',
        type: 'address'
      },
      {
        internalType: 'contract ISpoil',
        name: '_spoil',
        type: 'address'
      },
      {
        internalType: 'contract IERC6551Registry',
        name: '_registry',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_implementation',
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
    name: 'InvalidAddress',
    type: 'error'
  },
  {
    inputs: [],
    name: 'NotOwnedToken',
    type: 'error'
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
        name: 'spoilId',
        type: 'uint256'
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
      }
    ],
    name: 'RewardClaimed',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'spoil',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'torn',
        type: 'address'
      }
    ],
    name: 'TokenContractSet',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address'
      }
    ],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: '_wallets',
        type: 'address[]'
      }
    ],
    name: 'insertWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    name: 'onERC721Received',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      }
    ],
    stateMutability: 'pure',
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
      }
    ],
    name: 'setRegistryAndImplementation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_newId',
        type: 'uint256'
      }
    ],
    name: 'setSpoilReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'contract ITorn',
        name: '_torn',
        type: 'address'
      },
      {
        internalType: 'contract ISpoil',
        name: '_spoil',
        type: 'address'
      }
    ],
    name: 'setTokenContract',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'spoil',
    outputs: [
      {
        internalType: 'contract ISpoil',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'spoilRewardId',
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
    name: 'torn',
    outputs: [
      {
        internalType: 'contract ITorn',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
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
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'whitelist',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
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
