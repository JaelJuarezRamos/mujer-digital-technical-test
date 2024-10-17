# Mujer Digital Technical Test

## Run locally
1. Create a fork for the repository.
2. Clone to your computer the forked repository (not the ActoSoft one).
3. Run `npm i` to install the dependencies.
4. Clone the `.env.example` file and rename the new file to `.env`
5. Create a Firebase project in https://console.firebase.google.com/ (set a name and keep the default options)
6. Once project is created, create a Web application (click on the `</>` icon in the homepage)
7. Set `WebApp` as the app name, enable Firebase Hosting
8. You will have a code snippet with some values like `apiKey`, `authDomain`, `projectId`, etc.
9. In the `.env` file, fill the values. For example, in the `VITE_API_KEY` you will copy and past the value for `apiKey` in the code snippet betweehn the doublequotes.
10. Make sure you're have copied properly the values and pasted in the related variable.
11. Create a database in Cloud Firestore https://console.firebase.google.com/project/mujer-digital-tech-test-q4-24/firestore
12. Keep default options and select `Start in test mode` about rules.
13. Run `npm run dev` to start th app.

## Scope
You will create a simple app for a restaurant, the feature to implement are the following.
- Create an order using a form.
- Read the orders and filter them by customer name.
- See the details or an order
- Update an existing order
- Delete and order

For this, you will use the Cloud Firestore database. This is a NoSQL and realtime database

## Create an order
To create an order you will need to create a form. The form should contain the following inputs:
- Customer Name (text)
- Select multiple menu items (select for multiple options or checkboxes). You can set whatever items, some suggestions:
    - Simple Hamburguer
    - Hotdog
    - Doube Hamburgier
    - Fresh Fries
    - Soda
- Total amount (number)
- Pickup or Delivery (select with single option or radio buttons).
- Submit button.

When the button is clicked, you should create a new document into a `orders` collection
The structure for the collection is the following:
```json
{
    "customerName": "Martin Melo",
    "items": [
        "Simple Hamburger",
        "Soda"
    ],
    "total": 140,
    "modality": "delivery",
    "createdAt": 2024-10-16T11:07:23.434,
    "updatedAt": 2024-10-16T11:07:23.434,
}
```

**BONUS** You can add validations to NOT create a document in the DB if for example, items selected are empty or customer name is empty.

## Retrieve orders

You should be able to see all the orders created. For that you should retrieve the existing documents in the `orders` collection.

Also, you can implement a search input to filter based on the customer name. You should check if the customer name **CONTAINS** the text in the input.

For the orders list you should show at least:
- Customer Name
- Number of items
- Total

## Order detail
On click for any order from the list, you should show the all the information for the order, showing now the names for the items and the `createdAt` and `updatedAt`.

Also, you should add two buttons to the order detail: `Update` and `Delete`.

## Update order
When the `Update` button is clicked in the order detail, you should fill the form with the existing data for the order in the DB.

You should be able to update everything.

On click for Submit button, the document in Firestore should be updated with the new data, and the order information updated in the list.

## Delete order
When the `Delete` button is clicked in the order detail, a confirmation dialog should appearing asking if the user wants to delete the order.

If users confirm, the document should be deleted from the UI and the order should not longer appears in the orders list.

## Bonus/Extra
- You can use Ant Design https://ant.design/ as a Style library
- You can implement React Router https://reactrouter.com/en/main to have different routes per each feature.
- You can deploy your site to Firebase Hosting.
- You can implement Firebase Authentication

*NOTE*: These are extra feature that are not required for the technical challenge.

## Share test
1. Create commits as long you finish small tasks.
2. Push your changes to your forked repository.
3. Create a Pull Request for the `main` branch on your forked repository to the `main` branch of the Actosoft repository.

## Notes
- You can build everything in the `App.jsx` file, or you can create multiple components and import them.
- You must send the progress of your test regarless the number of feature you finished. The important part is to present something, I don't expect to have all the feature implement.