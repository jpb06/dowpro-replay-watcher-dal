Data access layer for dowpro ladder

# Purpose

Code factorization package for dowpro-replays-watcher-api & crevette-bot-ts.

# Environment

- Targeted for node.js.
- Typescript superset for coding.
- Mongodb for persistence.

# Version history

*  0.0.1 : Library creation; two stores: games and members. Embedding as well types along with their validation helpers.
*  0.0.2 : Fixing typos. Removing generic store from exports.
*  0.0.3 : Removing Games.Id; useless. GamesStore.FindById is now FindByHash.
*  0.0.4 : Fixing typo on Games.Version.
*  0.0.5 : Add functions expect an object, not an array of objects.
*  0.0.6 : Adding a generic create function in generic store.