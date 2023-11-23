export const SacrificeAbis = [
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
        internalType: 'uint256',
        name: '_ritualStone',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'NotApproved',
    type: 'error'
  },
  {
    inputs: [],
    name: 'NotHaveRitualStone',
    type: 'error'
  },
  {
    inputs: [],
    name: 'NotOwnedToken',
    type: 'error'
  },
  {
    inputs: [],
    name: 'TokenNotExisted',
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
        internalType: 'uint256',
        name: 'oldId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'newId',
        type: 'uint256'
      }
    ],
    name: 'RitualStoneSet',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'torn',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'spoil',
        type: 'address'
      }
    ],
    name: 'TokenContractSet',
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
        name: 'sacrificeType',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bool',
        name: 'requireRitualStone',
        type: 'bool'
      }
    ],
    name: 'TornSacrificed',
    type: 'event'
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
    inputs: [],
    name: 'ritualStoneId',
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
    inputs: [
      {
        internalType: 'address',
        name: '_account',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_type',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: '_requireRitualStone',
        type: 'bool'
      }
    ],
    name: 'sacrifice',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_ritualStone',
        type: 'uint256'
      }
    ],
    name: 'setRitualStone',
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
