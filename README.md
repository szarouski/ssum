# ssum

`ssum` is a command line tool for checksum generation with no dependencies - ideal for paranoiacs like me :D

# Installation

`yarn global add https://github.com/szarouski/ssum` or  
 `npm i https://github.com/szarouski/ssum -g`

Note that `ssum` package **from npm** only contains README.md and nothing else. This is done on purpose so you install package from github. This will ensure that code will be the same as on github as you can't see what you're installing from npm up front.

# Usage

`ssum`, `ssum ~/downloads`, `ssum ~/downloads/file sha512`

Check `ssum --help` for most up-to-date usage examples. `ssum` can generate checksum using algorithms supported by your OS for file or directory. Safe for large files.

# Removal

`yarn global remove ssum` or `npm rm ssum -g`
