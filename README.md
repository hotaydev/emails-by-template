# Hotay's Custom Email Builder service

We use [EmailBuilder.js](https://www.usewaypoint.com/open-source/emailbuilderjs) as an open source block editor for emails.
Then, we save the JSON specification of these emails into the `/emails/` folder, and parse them by the API from inside the `/api/` folder.

All the structure is very simple and we want to improve it in the future, but for now it's working fine!

## Folder structure
* `/api` - API for retrieving HTML-formatted emails from the emails that are in the `/emails` folder.
* `/editor` - The visual editor for our emails. We run it locally when working on a new email.
* `/emails` - The folder with our finalized emails in JSON format. The API parse this JSON into HTML-formatted emails.

## Running the project

Both, editor and api are nodejs projects, so enter their folders and run a `npm i`.
After it you can run both with `npm run dev` inside their folders.

The API is published into Vercel by runninng `vercel deploy`.

## Saving and viewing the emails

By the editor you can save the emails as JSON files. Place these files inside the `/emails` folder in a way the path of the email is understandable.
We usually place the same email but in different languages into a same folder, to be easier, and we separate them by our projects names.

When using the API, you can provide the email you want passing a parameter `?email=path/to/email`. It will get the JSON from GitHub and parse it into HTML.
