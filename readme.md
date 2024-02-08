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


## verification
public route

--- getting the DID as a query
--- recieve file(credentials image) as form data along with the DID