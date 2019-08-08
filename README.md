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
*  0.0.7 : Adding a set function for members store & a PostedToDiscord boolean to the game type.
*  0.0.8 : Adding bcrypt & moment as dependencies; creating an authorizedusers store (security related).
*  0.0.9 : Exporting cryptoutil.
*  0.1.0 : Oh no! Forgot authorized users store in exports.
*  0.1.1 : Renaming users store to authorized users.
*  0.1.2 : Simplifying setup.
*  0.1.3 : Making it easier to setup the Dal.
*  0.1.4: Fixing invalid type in config interface.
*  0.1.5: Fixing typo in members store set function.
*  0.1.6: Adding a filesystem manipulation subset.
*  0.1.7: Oh no! Forgot to export file util.
*  0.1.8: Rationalizing exports.
*  0.1.9: Adding IPC types (message broker related).
*  0.2.0: Adding Mod name property to queue message IPC type.
*  0.2.1: Adding Mod name property to the persisted game type.
*  0.2.2: Adding Mod version to the GameResult type.
*  0.2.3: Rationalizing types (ModVersion & ModName related).
*  0.2.4: Fixing GameResult validation (forgot ModName property).
*  0.2.5: Factoring readResult function.
*  0.2.6: Fixing Util subset.
*  0.2.7: Util namespace should be FileSystem.
*  0.2.8: Factoring business logic code; this is no longer a dal ):
*  0.2.9: Exporting business types.
*  0.3.0: Awaiting on mongodb connection close.