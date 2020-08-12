Part 1 & Part 2 are in folder my-app.
1. How to run
Please go to folder my-app, run "npm install", then run "npm start"

2. Features
- Users can search for companies by country and name and display the results in a list. Data are from a JSON file.
- The countries selector and the search field mandatory. Otherwise an error message will show.
- Users click the search icon right after the search bar to get the search results.
- A delay of 1 second is added, so a message "is loading" will show before all results are fetched.
- When clicking on a search result in the list, a modal should be opened with detailed information about that company. 
- Click the 'X' icon on the top-right corner to close the modal.
- Forms in tradeshift UI components library is used.


Part 3 are in folder my-app.
1. How to run
Please go to folder backend, run "npm install", then run "npm start".
Please go to folder frontend, run "npm install", then run "npm start".

2. Features
- A Node.js service is created in the folder backend. It provides APIs to fetch country and results from a JSON file.
- The front-end app calls APIs from the Node.js service.