export const marketplaceAbis = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_shardToken',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_spoil',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_mythic',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_torn',
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
    inputs: [],
    name: 'InvalidItem',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'spoilIds',
        type: 'uint256[]'
      },
      {
        indexed: false,
        internalType: 'uint256[]',
        name: 'mythicIds',
        type: 'uint256[]'
      }
    ],
    name: 'BaronRewardSet',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'id',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'itemId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'recipient',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'itemType',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'sender',
        type: 'address'
      }
    ],
    name: 'ItemBought',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'item',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'itemId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'ethPrice',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'itemType',
        type: 'uint256'
      }
    ],
    name: 'ItemInEthSet',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'item',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'itemId',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'shardPrice',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'itemType',
        type: 'uint256'
      }
    ],
    name: 'ItemInShardSet',
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
        name: 'shard',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'spoil',
        type: 'address'
      }
    ],
    name: 'TokenSet',
    type: 'event'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_recipient',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'buyByEth',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: '_recipient',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'buyByShard',
    outputs: [],
    stateMutability: 'nonpayable',
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
    name: 'itemInEth',
    outputs: [
      {
        internalType: 'uint256',
        name: 'itemId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'itemType',
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
    name: 'itemInShard',
    outputs: [
      {
        internalType: 'uint256',
        name: 'itemId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'itemType',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'mythic',
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
        internalType: 'uint256[]',
        name: '_spoilIds',
        type: 'uint256[]'
      },
      {
        internalType: 'uint256[]',
        name: '_mythicIds',
        type: 'uint256[]'
      }
    ],
    name: 'setBaronReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_itemId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_ethPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_itemType',
        type: 'uint256'
      }
    ],
    name: 'setItemInEth',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_id',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_itemId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_shardPrice',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_itemType',
        type: 'uint256'
      }
    ],
    name: 'setItemInShard',
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
        internalType: 'address',
        name: '_shardToken',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_spoil',
        type: 'address'
      }
    ],
    name: 'setToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'shard',
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
    inputs: [],
    name: 'withdrawShard',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    stateMutability: 'payable',
    type: 'receive'
  }
]
