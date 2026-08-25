import { createRequire } from 'node:module';

export interface UserCredentials {
    username: string;
    password: string;
}

export interface TestData {
    baseUrl: string;
    users: {
        standard: UserCredentials;
        lockedOut: UserCredentials;
        problem: UserCredentials;
        performanceGlitch: UserCredentials;
        error: UserCredentials;
        visual: UserCredentials;
    };
    checkout: {
        firstName: string;
        lastName: string;
        postalCode: string;
    };
    products: {
        backpack: string;
        bikeLight: string;
        boltTShirt: string;
        fleeceJacket: string;
        onesie: string;
        redTShirt: string;
    };
    sortOptions: {
        nameAscending: string;
        nameDescending: string;
        priceAscending: string;
        priceDescending: string;
    };
}

const require = createRequire(import.meta.url);

export default require('./data.json') as TestData;