class Employee {
    constructor(firstName, lastName, baseSalary, experience) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.baseSalary = baseSalary;
        this.experience = experience;
    }

    get countedSalary() {
        let salary = this.baseSalary;
        if (this.experience > 5) {
            salary = salary * 1.2 + 500;
        } else if (this.experience > 2) {
            salary += 200;
        }
        return salary;
    }
}

class Developer extends Employee {}

class Designer extends Employee {
    constructor(firstName, lastName, baseSalary, experience, effCoeff) {
        super(firstName, lastName, baseSalary, experience);
        this.effCoeff = effCoeff;
    }

    get countedSalary() {
        return super.countedSalary * this.effCoeff;
    }
}

class Manager extends Employee {
    constructor(firstName, lastName, baseSalary, experience, team = []) {
        super(firstName, lastName, baseSalary, experience);
        this.team = team;
    }

    get countedSalary() {
        let salary = super.countedSalary;
        if (this.team.length > 10) {
            salary += 300;
        } else if (this.team.length > 5) {
            salary += 200;
        }
        const developersCount = this.team.filter(member => member instanceof Developer).length;
        if (developersCount > this.team.length / 2) {
            salary *= 1.1;
        }
        return salary;
    }
}

class Department {
    constructor(managers = []) {
        this.managers = managers;
    }

    giveSalary() {
        const allEmployees = [];
        this.managers.forEach(manager => {
            allEmployees.push(manager);
            allEmployees.push(...manager.team);
        });

        const resultElement = document.getElementById('salaryResult');
        resultElement.innerHTML = allEmployees.map(employee => 
            `${employee.firstName} ${employee.lastName} отримав ${employee.countedSalary.toFixed(2)} шекелів`
        ).join('<br>');
    }
}

const dev1 = new Developer('Макс', 'Ильченко', 2500, 4);
const dev2 = new Developer('Діма', 'Пироженко', 3200, 6);
const designer1 = new Designer('Анна', 'Овсіенко', 2800, 2, 0.8);
const designer2 = new Designer('Марія', 'Кравчук', 2900, 4, 0.9);
const manager1 = new Manager('Сергій', 'Назаренко', 5000, 7, [dev1, dev2, designer1, designer2]);
const department = new Department([manager1]);