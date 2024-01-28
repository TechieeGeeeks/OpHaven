# Op.Haven

This project is a modified vault inspired by ERC-4326, tailored to enhance functionality and cater to specific use cases. The smart contract at the core of this project allows an owner to deposit ERC-20 tokens, subsequently minting ownership tokens for a predefined list of recipients. These ownership tokens, also referred to as bearing tokens, are subject to specific conditions, such as being transferable only to whitelisted addresses.

Whitelisted addresses, once in possession of bearing tokens, gain the opportunity to redeem the original ERC-20 tokens corresponding to their earned bearing tokens. To maintain control and manage the flow of assets, the owner has the ability to set daily withdrawal limits for whitelisted addresses. The protocol incorporates small transaction fees to facilitate its operations.

In addition to its primary functionalities, this protocol is designed to serve as a foundation for crowdfunding and grants within DAOs (Decentralized Autonomous Organizations). Users participate by purchasing voting tokens, which serve a dual purpose as quadratic voting tools and contribute to funding the project. An intriguing feature ensures that in the event of a potential rug pull by the project, all users will have their tokens returned, fostering trust within the Optimism blockchain ecosystem.

This innovative project has been successfully deployed on the Optimism blockchain, showcasing its practical implementation and utility within the broader blockchain landscape.
