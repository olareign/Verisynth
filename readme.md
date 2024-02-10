#institution signup
-institution name = string
-email = string
-password = string
-confirm_password = string

numbers of credentials = string
orgnization profile = string
credentials schemas = string

function {
    crud credentials
}

## credentials
types of credentials: ['basic', 'tertiary', 'vocational']

---schema
-unique__DID: used for verification
-recipient_email = string
-recipient_id = string
-full_name = string
-degree_name = string
-date_awarded = string
-expiry_date: optional
pdf = string

  institution_id: string | ISchool;
  credential_ID: string;
  recipient_email: string;
  recipient_ID: string;
  fullname: string;
  degree_name: string;
  awarded_date: string;
  expiration_date: string;
  file_string: string;

 "build": "npx tsc",
 "start": "node dist/app.js",
 "dev": "nodemon src/app.ts"



    "postinstall": "npm install ts-node",
    "start": "tsc && node dist/src/app.js",
    "dev": "npm-run-all --parallel dev:*",
    "dev:server": "nodemon dist/src/app.js",
    "dev:build": "tsc --watch"

## verification
public route

--- getting the DID as a query
--- recieve file(credentials image) as form data along with the DID