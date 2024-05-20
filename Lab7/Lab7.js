        // Завдання 1
        function checkNumber() {
            const input = document.getElementById('numberInput').value;
            const resultElement = document.getElementById('checkNumberResult');
            resultElement.textContent = checkIfNumber(input);
        }

        function checkIfNumber(arg) {
            const num = Number(arg);
            if (isNaN(num)) {
                return '';
            } else {
                return num % 2 === 0 ? 'Число парне' : 'Число непарне';
            }
        }

        // Завдання 2
        function sumFirstFivePrimes() {
            const resultElement = document.getElementById('sumPrimesResult');
            resultElement.textContent = findAndSumFirstFivePrimes();
        }

        function findAndSumFirstFivePrimes() {
            const primes = [];
            let num = 1;
            while (primes.length < 5) {
                num++;
                if (isPrime(num)) {
                    primes.push(num);
                }
            }
            const sum = primes.reduce((acc, curr) => acc + curr, 0);
            return `Сума перших 5 простих чисел: ${sum}`;
        }

        function isPrime(num) {
            if (num <= 1) return false;
            for (let i = 2; i <= Math.sqrt(num); i++) {
                if (num % i === 0) return false;
            }
            return true;
        }

        // Завдання 3
        function calculateSeriesSum() {
            const n = document.getElementById('seriesInput').value;
            const resultElement = document.getElementById('seriesSumResult');
            resultElement.textContent = calculateSumOfSeries(Number(n));
        }

        function calculateSumOfSeries(n) {
            let sum = 0;
            let currentNumber = 0;
            for (let i = 1; i <= n; i++) {
                currentNumber = currentNumber * 10 + 1;
                sum += currentNumber;
            }
            return `Сума ряду: ${sum}`;
        }