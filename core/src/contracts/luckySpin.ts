export const luckySpinAbis = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'coordinator',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'shard',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'InsufficientBalance',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidAccount',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidShardAmount',
    type: 'error'
  },
  {
    inputs: [],
    name: 'InvalidTokenOwner',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'have',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'want',
        type: 'address'
      }
    ],
    name: 'OnlyCoordinatorCanFulfill',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ratio',
        type: 'uint256'
      }
    ],
    name: 'ChanceSet',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'keyHash',
        type: 'bytes32'
      },
      {
        indexed: false,
        internalType: 'uint64',
        name: 'accId',
        type: 'uint64'
      },
      {
        indexed: false,
        internalType: 'uint32',
        name: 'callbackGasLimit',
        type: 'uint32'
      }
    ],
    name: 'ConfigSet',
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
        name: 'account',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'Spin',
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
        name: 'requestId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'result',
        type: 'uint256'
      }
    ],
    name: 'SpinResult',
    type: 'event'
  },
  {
    inputs: [],
    name: 'SHARD',
    outputs: [
      {
        internalType: 'contract IERC20',
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
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256'
      }
    ],
    name: 'cancelRequest',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
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
    inputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256'
      },
      {
        internalType: 'uint256[]',
        name: 'randomWords',
        type: 'uint256[]'
      }
    ],
    name: 'rawFulfillRandomWords',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'sAccId',
    outputs: [
      {
        internalType: 'uint64',
        name: '',
        type: 'uint64'
      }
    ],
    stateMutability: 'view',
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
    name: 'sAccountDetail',
    outputs: [
      {
        internalType: 'uint256',
        name: 'spinCount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'winCount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'spinAmount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'claimed',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'sCallbackGasLimit',
    outputs: [
      {
        internalType: 'uint32',
        name: '',
        type: 'uint32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'sChance',
    outputs: [
      {
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'ratio',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'sKeyHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'sMinAmount',
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
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'sRequestIdToDetail',
    outputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'sRequestIdToResult',
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
        internalType: 'uint256',
        name: 'index',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'reward',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'ratio',
        type: 'uint256'
      }
    ],
    name: 'setChance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'keyHash',
        type: 'bytes32'
      },
      {
        internalType: 'uint64',
        name: 'accId',
        type: 'uint64'
      },
      {
        internalType: 'uint32',
        name: 'callbackGasLimit',
        type: 'uint32'
      }
    ],
    name: 'setConfig',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'shard',
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
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'spin',
    outputs: [
      {
        internalType: 'uint256',
        name: 'requestId',
        type: 'uint256'
      }
    ],
    stateMutability: 'payable',
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
        internalType: 'uint64',
        name: 'accId',
        type: 'uint64'
      }
    ],
    name: 'withdrawTemporary',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    stateMutability: 'payable',
    type: 'receive'
  }
]
