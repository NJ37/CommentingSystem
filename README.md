# CommentingSystem
To view/add posts and upvote/downvote existing ones.

Requirements: MongoDB (used v3.2.4), NodeJS and related npm packages.
Also manually installed mongoose, express.

The directory CommentingSystem should lie in C:\...\nodejs\

Run the MongoDB server by typing in
    'mongod &'
in the terminal from the mongodb directory (C:\...\mongodb\bin) or else set your environmental variable in system path as so and run directly.

Change directory in another terminal to C:\...\nodejs\CommentingSystem and run
    'npm start'
to run the server at localhost:3000 (now page can be viewed in the browser by typing 'localhost:3000' or 'localhost:3000/#/home' in the browser's URL)

Add your comments by typing in your name (can be left blank) and data in the input box at the bottom.
You can also upvote/downvote existing comments.

To change the database in which the data is stored, navigate to C:\..\nodejs\CommentingSystem and open 'app.js'.
Change the name from 'database' to the name of your choice (if it doesn't exist earlier, a new one will be created) in line 9: mongoose.connect('mongodb://localhost/database', function(err) { ... }
