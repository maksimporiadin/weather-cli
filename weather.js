#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { printHelp, printSucess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, getKeyValue, STORAGE_DICTIONARY } from './services/storage.service.js';
import { getWeather, getIcon } from './services/api.service.js';

const saveToken = async (token) => {
    if (!token.length) {
        printError('Token is apsent!');
        return;
    }

    try {
        await saveKeyValue(STORAGE_DICTIONARY.TOKEN, token);
        printSucess('Token was saved')
    } catch (e) {
        printError(e.message);
    }
};

const saveCity = async (city) => {
    if (!city.length) {
        printError('City is apsent!');
        return;
    }

    if (city.length <= 3 ) {
        printError('City was not save! The name should be longer than 3 symbol!');
        return;
    }

    try {
        await saveKeyValue(STORAGE_DICTIONARY.CITY, city);
        printSucess('City was saved');
    } catch (e) {
        printError(e.message);
    }

};

const getCity = async () => {
    return await getKeyValue(STORAGE_DICTIONARY.CITY);
};

const getForecast = async (city) => {
    try {
        const city = await getCity();

        if (city) {
            const data = await getWeather(city);
            printWeather(data, getIcon(data.weather[0].icon));
        }
    } catch (e) {
        if (e?.response?.status == 404) {
            printError('Wrong city name.');
        } else if (e?.response?.status == 401) {
            printError('Wrong token');
        } else {
            printError(e.message);
        }
    }
};

const initCLI = async () => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }

    if (args.s) {
        await saveCity(args.s);
    }

    if (args.t) {
        await saveToken(args.t);

    }

    getForecast();
};

initCLI();