import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSucess = (message) => {
    console.log(chalk.bgGreen(' SUCESS ') + ' ' + message);
};

const printHelp = () => {
    console.log(
        dedent(`${chalk.bgGreenBright(' HELP ')}
        Without param - weather current place
        -s [CITY] -  setup city
        -h for help
        -t [API_KEY] for save token
        `)
    );
};

const printWeather = (data, icon) => {
    console.log(
        dedent(`${chalk.bgYellow(' WEATHER ')} in the city ${data.name}
        ${icon}  ${data.weather[0].description}
        Temp: ${data.main.temp} C (Feel like:  ${data.main.feels_like} C)
        Humidity: ${data.main.humidity}%
        Wind speed: ${data.wind.speed} m/s
        `)
    );
};

export { printError, printSucess, printHelp, printWeather };