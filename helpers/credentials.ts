// Interfaces
interface User {
    username: string;
    password: string;
}

interface Users {
    standard: User;
    locked: User;
    invalid: User;
}

interface Product {
    itemName: string;
    displayName: string;
    price: string;
}

interface Products {
    backpack: Product;
}

interface Customer {
    firstName: string;
    lastName: string;
    postalCode: string;
}

//Use
const BASE_URL = process.env.BASE_URL || 'https://www.saucedemo.com';

export const URLS = {
    base_url: BASE_URL,
    inventory_url: `${BASE_URL}/inventory.html`,
    cart_url: `${BASE_URL}/cart.html`,
    checkout_url: `${BASE_URL}/checkout-step-one.html`,
    checkout_overview_url: `${BASE_URL}/checkout-step-two.html`,
    order_complete_url: `${BASE_URL}/checkout-complete.html`
}

export const USERS: Users = {
    standard: { username: process.env.STANDARD_USERNAME || 'standard_user',
                password: process.env.PASSWORD || 'secret_sauce' },
    locked: { username: process.env.LOCKED_USERNAME || 'locked_out_user',
              password: process.env.PASSWORD || 'secret_sauce' },
    invalid: {username: process.env.INVALID_USERNAME || 'invalid_username',
              password: process.env.INVALID_PASSWORD || 'invalid_password'}
}

export const MESSAGES = {
    invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
    usernameRequired: 'Epic sadface: Username is required',
    passwordRequired: 'Epic sadface: Password is required',
    lockedOut: 'Epic sadface: Sorry, this user has been locked out.',
    completeOrder: 'Thank you for your order!',
    firstNameRequiredMsg: 'Error: First Name is required',
    lastNameRequiredMsg: 'Error: Last Name is required',
    postalCodeRequiredMsg: 'Error: Postal Code is required'
}

export const PRODUCTS : Products = {
    backpack: {
        itemName: 'backpack',
        displayName: 'Sauce Labs Backpack',
        price: '$29.99'
    }
}

export const CUSTOMER: Customer = {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
} 

export const FILTERS = {
    nameAsc: 'az',
    nameDesc: 'za',
    priceLow: 'lohi',
    priceHigh: 'hilo'
}

export const SECURITY = {
    sqlInjection: "' OR 1=1--"
}
