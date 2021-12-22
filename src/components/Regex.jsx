export const validEmail = new RegExp(
    '^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$'
 );
 export const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$');