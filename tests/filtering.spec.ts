import { test, expect } from '../fixtures/fixtures';
import { FILTERS } from '../helpers/credentials';
import { isSortedAsc, isSortedDesc } from '../helpers/sortUtils';

test.describe('[HP] - Filter products suite', () => {

    test('[HP] - Filter products ASC - should display products according ASC option', { tag: '@regression' }, async ({ loggedInPage, inventoryPage }) => {
        await inventoryPage.filterBy(FILTERS.priceLow);
        const prices = await inventoryPage.getPrices();
        const numbers = prices.map(p => parseFloat(p.replace('$', '')));
        expect(isSortedAsc(numbers)).toBeTruthy();
    })

    test('[HP] - Filter products DESC - should display products according DESC option', { tag: '@regression' }, async ({ loggedInPage, inventoryPage }) => {
        await inventoryPage.filterBy(FILTERS.priceHigh);
        const prices = await inventoryPage.getPrices();
        const numbers = prices.map(p => parseFloat(p.replace('$', '')));
        expect(isSortedDesc(numbers)).toBeTruthy();
    })

     test('[HP] - Filter products by Name A-Z - should display products by Name A-Z option', { tag: '@regression' }, async ({ loggedInPage, inventoryPage }) => {
        await inventoryPage.filterBy(FILTERS.nameAsc);
        const names = await inventoryPage.getNames();
        expect(isSortedAsc(names)).toBeTruthy();
    })

    test('[HP] - Filter products by Name Z-A - should display products by Name Z-A option', { tag: '@regression' }, async ({ loggedInPage, inventoryPage }) => {
        await inventoryPage.filterBy(FILTERS.nameDesc);
        const names = await inventoryPage.getNames();
        expect(isSortedDesc(names)).toBeTruthy();
    })
})