#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Hero {
    name;
    health = 100;
    constructor(name) {
        this.name = name;
    }
    decreaseHealth() {
        this.health -= 20;
    }
    increaseHealth() {
        this.health = 100;
    }
}
async function main() {
    const { heroName } = await inquirer.prompt([
        {
            type: "input",
            name: "heroName",
            message: chalk.yellow("Enter your hero name"),
        }
    ]);
    const { enemyType } = await inquirer.prompt([
        {
            type: "list",
            name: "enemyType",
            choices: ["alien", "witch", "zombie"],
            message: chalk.blue("Select the enemy you fight with:")
        }
    ]);
    const hero = new Hero(heroName);
    console.log(`Enemy: ${enemyType} vs Hero: ${hero.name}`);
    do {
        const { action } = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                choices: ["attack", "defend", "range target", "run"],
                message: chalk.yellow("Choose the attack type to perform action")
            }
        ]);
        switch (action) {
            case "attack":
                const randomNum = Math.random();
                if (randomNum > 0.5) {
                    hero.decreaseHealth();
                    console.log(`${hero.name} health: ${hero.health}`);
                    if (hero.health <= 0) {
                        console.log(chalk.red("You loss! Try Again"));
                        return;
                    }
                }
                else {
                    hero.decreaseHealth();
                    console.log(`${hero.name} health: ${hero.health}`);
                    if (hero.health <= 0) {
                        console.log(chalk.green("Congratulations! you won"));
                        return;
                    }
                }
                break;
        }
    } while (true);
}
main();
