# CommentingSystem
To view/add posts and upvote/downvote existing ones.

Requirements: MongoDB (used v3.2.4), NodeJS and related npm packages
Also manually installed mongoose, express.

The directory CommentingSystem should lie in C:\...\nodejs\

Run the MongoDB server by typing in
    'mongod &'
in the terminal from the mongodb directory (C:\...\mongodb\bin) or else set your environmental variable in system path as so and run directly.

Change directory in another terminal to C:\...\nodejs\CommentingSystem and run
    'npm start'
to run the server at localhost:3000 (now page can be viewed in the browser)

Add your comments by typing in your name (can be left blank) and data in the input box at the bottom.
You can also upvote/downvote existing comments.
